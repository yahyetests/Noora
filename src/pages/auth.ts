/* ============================================
   Noora — Auth Pages (Login / Register / 2FA)
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';

export function renderLogin(app: HTMLElement): void {
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-card">
          <a href="/" data-link class="nav-brand" style="text-decoration:none">
            ${icon('logo', 32)}
            <span>Noora</span>
          </a>
          <h1>Welcome back</h1>
          <p class="auth-subtitle">Sign in to continue your research</p>

          <div class="social-logins">
            <button class="social-btn" id="googleLoginBtn">
              ${icon('google', 20)}
              Continue with Google
            </button>
            <button class="social-btn" id="orcidLoginBtn">
              ${icon('orcid', 20)}
              Continue with ORCID
            </button>
          </div>

          <div class="auth-divider">or sign in with email</div>

          <form class="auth-form" id="loginForm">
            <div class="form-group">
              <label class="form-label" for="loginEmail">Email address</label>
              <div class="form-input-icon">
                ${icon('mail', 18)}
                <input type="email" id="loginEmail" class="form-input" placeholder="you@university.edu" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="loginPassword">Password</label>
              <div class="form-input-icon">
                ${icon('lock', 18)}
                <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required />
              </div>
            </div>
            <div class="form-row">
              <label class="form-checkbox">
                <input type="checkbox" checked /> Remember me
              </label>
              <a href="#" class="form-link">Forgot password?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-2)">
              Sign In
            </button>
          </form>

          <div class="auth-footer">
            Don't have an account? <a href="/register" data-link>Create one free</a>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-right-content">
          <h2>Accelerate Your Research</h2>
          <p>Join a growing community of researchers who've made their systematic reviews faster, more collaborative, and more rigorous.</p>
          <div class="auth-right-features">
            <div class="auth-right-feature">
              <span class="icon">${icon('search', 18)}</span>
              <span>Search 10+ academic databases at once</span>
            </div>
            <div class="auth-right-feature">
              <span class="icon">${icon('users', 18)}</span>
              <span>Real-time collaboration with your team</span>
            </div>
            <div class="auth-right-feature">
              <span class="icon">${icon('shield', 18)}</span>
              <span>PRISMA-compliant systematic review workflow</span>
            </div>
            <div class="auth-right-feature">
              <span class="icon">${icon('download', 18)}</span>
              <span>Export to Word, PDF, LaTeX seamlessly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Login handler
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('loginEmail') as HTMLInputElement)?.value;
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    appState.login({ name, email, role: 'academic' });
    router.navigate('/dashboard');
  });

  document.getElementById('googleLoginBtn')?.addEventListener('click', () => {
    appState.login({ name: 'Dr. Sarah Chen', email: 'sarah.chen@stanford.edu', role: 'academic' });
    router.navigate('/mfa');
  });

  document.getElementById('orcidLoginBtn')?.addEventListener('click', () => {
    appState.login({ name: 'Dr. Sarah Chen', email: 'sarah.chen@stanford.edu', role: 'academic' });
    router.navigate('/mfa');
  });
}

export function renderRegister(app: HTMLElement): void {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedRole = urlParams.get('role') || '';

  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-card">
          <a href="/" data-link class="nav-brand" style="text-decoration:none">
            ${icon('logo', 32)}
            <span>Noora</span>
          </a>
          <h1>Create your account</h1>
          <p class="auth-subtitle">Start your free research journey</p>

          <div class="social-logins">
            <button class="social-btn" id="googleRegBtn">
              ${icon('google', 20)}
              Sign up with Google
            </button>
            <button class="social-btn" id="orcidRegBtn">
              ${icon('orcid', 20)}
              Sign up with ORCID
            </button>
          </div>

          <div class="auth-divider">or register with email</div>

          <div class="role-selection">
            <div class="role-option ${preselectedRole === 'academic' ? 'selected' : ''}" data-role="academic">
              ${icon('award', 24)}
              <h4>Academic / PI</h4>
              <p>Lead research teams</p>
            </div>
            <div class="role-option ${preselectedRole === 'student' ? 'selected' : ''}" data-role="student">
              ${icon('edit', 24)}
              <h4>Student / RA</h4>
              <p>Join & contribute</p>
            </div>
          </div>

          <form class="auth-form" id="registerForm">
            <div class="form-group">
              <label class="form-label" for="regName">Full name</label>
              <div class="form-input-icon">
                ${icon('user', 18)}
                <input type="text" id="regName" class="form-input" placeholder="Dr. Sarah Chen" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="regEmail">Email address</label>
              <div class="form-input-icon">
                ${icon('mail', 18)}
                <input type="email" id="regEmail" class="form-input" placeholder="you@university.edu" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="regPassword">Password</label>
              <div class="form-input-icon">
                ${icon('lock', 18)}
                <input type="password" id="regPassword" class="form-input" placeholder="Create a strong password" required />
              </div>
              <div class="password-strength">
                <div class="password-strength-segment"></div>
                <div class="password-strength-segment"></div>
                <div class="password-strength-segment"></div>
                <div class="password-strength-segment"></div>
              </div>
            </div>
            <label class="form-checkbox" style="margin-top:var(--space-1)">
              <input type="checkbox" required /> I agree to the <a href="#" class="form-link" style="margin-left:4px">Terms of Service</a>
            </label>
            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-2)">
              Create Account
            </button>
          </form>

          <div class="auth-footer">
            Already have an account? <a href="/login" data-link>Sign in</a>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-right-content">
          <h2>Research, Simplified</h2>
          <p>Everything you need for a rigorous, collaborative systematic review — from search to publication.</p>
          <div class="auth-right-features">
            <div class="auth-right-feature">
              <span class="icon">${icon('zap', 18)}</span>
              <span>Get started in under 2 minutes</span>
            </div>
            <div class="auth-right-feature">
              <span class="icon">${icon('users', 18)}</span>
              <span>Free tier: up to 3 collaborators</span>
            </div>
            <div class="auth-right-feature">
              <span class="icon">${icon('edit', 18)}</span>
              <span>Notion-like editor with /cite commands</span>
            </div>
            <div class="auth-right-feature">
              <span class="icon">${icon('globe', 18)}</span>
              <span>Used by researchers at 200+ institutions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Role selection
  let selectedRole = preselectedRole || 'academic';
  document.querySelectorAll('.role-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      selectedRole = el.getAttribute('data-role') || 'academic';
    });
  });

  // Password strength
  const pwInput = document.getElementById('regPassword') as HTMLInputElement;
  pwInput?.addEventListener('input', () => {
    const len = pwInput.value.length;
    const segments = document.querySelectorAll('.password-strength-segment');
    const strength = len === 0 ? 0 : len < 4 ? 1 : len < 8 ? 2 : len < 12 ? 3 : 4;
    const cls = strength <= 1 ? 'weak' : strength <= 2 ? 'medium' : 'strong';
    segments.forEach((seg, i) => {
      seg.className = 'password-strength-segment';
      if (i < strength) seg.classList.add('active', cls);
    });
  });

  // Register handler
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('regName') as HTMLInputElement)?.value;
    const email = (document.getElementById('regEmail') as HTMLInputElement)?.value;
    appState.login({ name, email, role: selectedRole as 'academic' | 'student' });
    router.navigate('/mfa');
  });

  document.getElementById('googleRegBtn')?.addEventListener('click', () => {
    appState.login({ name: 'Dr. Sarah Chen', email: 'sarah.chen@stanford.edu', role: 'academic' });
    router.navigate('/mfa');
  });

  document.getElementById('orcidRegBtn')?.addEventListener('click', () => {
    appState.login({ name: 'Dr. Sarah Chen', email: 'sarah.chen@stanford.edu', role: 'academic' });
    router.navigate('/mfa');
  });
}

export function renderMFA(app: HTMLElement): void {
  const user = appState.get().user;
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-card">
          <a href="/" data-link class="nav-brand" style="text-decoration:none">
            ${icon('logo', 32)}
            <span>Noora</span>
          </a>
          <div class="mfa-container">
            <div class="mfa-icon">${icon('shield', 32)}</div>
            <h1>Two-Step Verification</h1>
            <p class="auth-subtitle">
              We've sent a 6-digit code to <strong>${user?.email || 'your email'}</strong>. Enter it below to verify your identity.
            </p>
            <div class="mfa-inputs">
              <input type="text" class="mfa-input" maxlength="1" data-index="0" autofocus />
              <input type="text" class="mfa-input" maxlength="1" data-index="1" />
              <input type="text" class="mfa-input" maxlength="1" data-index="2" />
              <input type="text" class="mfa-input" maxlength="1" data-index="3" />
              <input type="text" class="mfa-input" maxlength="1" data-index="4" />
              <input type="text" class="mfa-input" maxlength="1" data-index="5" />
            </div>
            <div class="mfa-actions">
              <button class="btn btn-primary btn-lg" id="mfaVerifyBtn" style="width:100%">
                Verify & Continue
              </button>
              <label class="form-checkbox" style="margin-top:var(--space-2)">
                <input type="checkbox" checked /> Remember this device for 30 days
              </label>
            </div>
            <div class="mfa-resend" id="mfaResend">
              Didn't receive a code? <strong>Resend</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-right-content">
          <h2>${icon('shield', 48)}</h2>
          <h2 style="margin-top:var(--space-4)">Your Research, Protected</h2>
          <p>Two-step verification adds an extra layer of security to your account, ensuring only you can access your research data.</p>
        </div>
      </div>
    </div>
  `;

  // Auto-focus and auto-advance
  const inputs = document.querySelectorAll('.mfa-input') as NodeListOf<HTMLInputElement>;
  inputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && idx > 0) {
        inputs[idx - 1].focus();
      }
    });
  });

  document.getElementById('mfaVerifyBtn')?.addEventListener('click', () => {
    router.navigate('/dashboard');
  });

  document.getElementById('mfaResend')?.addEventListener('click', () => {
    const resend = document.getElementById('mfaResend');
    if (resend) resend.innerHTML = 'Code resent! Check your inbox.';
  });
}
