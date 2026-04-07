/* ============================================
   Noora — OAuth Callback Handler
   Processes the OAuth redirect from Google/ORCID.
   No auto-login — only processes explicit OAuth flows.
   ============================================ */

import { icon } from '../icons';
import { supabase } from '../lib/supabase';
import { getProfile, type AuthUser } from '../lib/auth';
import { appState } from '../state';
import { router } from '../router';

export function renderAuthCallback(app: HTMLElement): void {
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-card" style="text-align:center">
          <a href="/" data-link class="nav-brand" style="text-decoration:none">
            ${icon('logo', 32)}
            <span>Noora</span>
          </a>
          <div style="margin-top:var(--space-6)">
            <div class="callback-spinner" id="callbackSpinner">
              <div style="width:48px;height:48px;margin:0 auto 16px;border:3px solid var(--border-subtle);border-top-color:var(--brand-purple);border-radius:50%;animation:spin 0.8s linear infinite"></div>
              <h2 style="margin-bottom:var(--space-2)">Completing sign-in…</h2>
              <p class="auth-subtitle">Please wait while we verify your identity.</p>
            </div>
            <div id="callbackError" style="display:none">
              <div style="font-size:48px;margin-bottom:var(--space-3)">⚠️</div>
              <h2 style="margin-bottom:var(--space-2)">Sign-in failed</h2>
              <p class="auth-subtitle" id="callbackErrorMessage">Something went wrong during authentication.</p>
              <a href="/login" data-link class="btn btn-primary" style="margin-top:var(--space-4)">
                Return to Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-right-content">
          <h2>Almost there…</h2>
          <p>We're securely verifying your credentials and setting up your session.</p>
        </div>
      </div>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
  `;

  handleCallback();
}

async function handleCallback(): Promise<void> {
  try {
    // Check for error in URL hash (Supabase puts OAuth errors there)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const errorDescription = hashParams.get('error_description');
    if (errorDescription) {
      showCallbackError(errorDescription);
      return;
    }

    // Check for error in URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const searchError = searchParams.get('error_description') || searchParams.get('error');
    if (searchError) {
      showCallbackError(searchError);
      return;
    }

    // Wait for Supabase to process the OAuth tokens from the URL hash.
    // detectSessionInUrl: true handles this automatically.
    // We poll getSession() to wait for it to complete.
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds max

    const checkSession = async (): Promise<void> => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        showCallbackError(error.message);
        return;
      }

      if (session?.user) {
        // Session established — build user object
        const profile = await getProfile(session.user.id);

        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email || '',
          name: profile?.full_name || session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
          role: (profile?.role || session.user.user_metadata?.role || 'student') as 'academic' | 'student',
          institution: profile?.institution,
          department: profile?.department,
          orcid_id: profile?.orcid_id,
          avatar_url: profile?.avatar_url || session.user.user_metadata?.avatar_url,
        };

        appState.setUserFromAuth(authUser);

        // If no profile exists yet (new OAuth user), send to onboarding
        if (!profile) {
          // Create initial profile
          await supabase.from('profiles').upsert({
            id: session.user.id,
            email: session.user.email,
            full_name: authUser.name,
            role: 'student', // Default role for new OAuth users
          } as Record<string, unknown>);

          router.navigate('/onboarding');
        } else {
          router.navigate('/dashboard');
        }
        return;
      }

      // No session yet — retry
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkSession, 500);
      } else {
        showCallbackError('Authentication timed out. Please try signing in again.');
      }
    };

    await checkSession();
  } catch (err) {
    showCallbackError('An unexpected error occurred during sign-in.');
  }
}

function showCallbackError(message: string): void {
  const spinner = document.getElementById('callbackSpinner');
  const errorDiv = document.getElementById('callbackError');
  const errorMsg = document.getElementById('callbackErrorMessage');

  if (spinner) spinner.style.display = 'none';
  if (errorDiv) errorDiv.style.display = 'block';
  if (errorMsg) errorMsg.textContent = message;
}
