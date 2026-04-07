/* ============================================
   Noora — Auth Service
   Supabase Auth is the single source of truth.
   ============================================ */

import { supabase } from './supabase';
import type { Profile } from './database.types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'academic' | 'student';
  institution?: string | null;
  department?: string | null;
  orcid_id?: string | null;
  avatar_url?: string | null;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  needsVerification?: boolean;
}

/**
 * Sign up with email & password
 */
export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: 'academic' | 'student'
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user && !data.session) {
    return { success: true, needsVerification: true };
  }

  if (data.user) {
    // Profile is auto-created by DB trigger, but upsert just in case
    await supabase.from('profiles').upsert({
      id: data.user.id,
      email,
      full_name: fullName,
      role,
    } as Record<string, unknown>);

    return {
      success: true,
      user: { id: data.user.id, email, name: fullName, role },
    };
  }

  return { success: false, error: 'An unexpected error occurred' };
}

/**
 * Sign in with email & password
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    const profile = await getProfile(data.user.id);
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        name: profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0],
        role: (profile?.role || data.user.user_metadata?.role || 'student') as 'academic' | 'student',
        institution: profile?.institution,
        department: profile?.department,
        orcid_id: profile?.orcid_id,
        avatar_url: profile?.avatar_url,
      },
    };
  }

  return { success: false, error: 'An unexpected error occurred' };
}

/**
 * Sign in with Google OAuth via Supabase
 */
export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });

  if (error) {
    console.error('Google OAuth error:', error.message);
  }
}

/**
 * Sign in with ORCID via Supabase (custom OIDC provider)
 *
 * ORCID must be configured as a custom OIDC provider in the Supabase dashboard:
 *   Authentication → Providers → Add custom OIDC
 *   - Issuer URL: https://orcid.org
 *   - Client ID / Secret: from orcid.org/developer-tools
 *
 * Returns false if ORCID is not yet configured.
 */
export async function signInWithOrcid(): Promise<{ started: boolean; error?: string }> {
  try {
    // Supabase custom OIDC providers use the provider slug you set in the dashboard.
    // If you named it 'orcid', use 'orcid' here.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'orcid' as any, // Custom OIDC provider — not in the built-in type
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      // Provider not configured in Supabase
      if (error.message.includes('unsupported') || error.message.includes('not found') || error.message.includes('provider')) {
        return { started: false, error: 'ORCID sign-in is not yet configured. Please contact an administrator.' };
      }
      return { started: false, error: error.message };
    }

    return { started: true };
  } catch (err) {
    return { started: false, error: 'ORCID sign-in is currently unavailable.' };
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });

  return error ? { success: false, error: error.message } : { success: true };
}

/**
 * Get user profile from DB
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return data as Profile | null;
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  updates: {
    full_name?: string;
    institution?: string | null;
    department?: string | null;
    orcid_id?: string | null;
    role?: 'academic' | 'student';
  }
): Promise<AuthResult> {
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() } as Record<string, unknown>)
    .eq('id', userId);

  return error ? { success: false, error: error.message } : { success: true };
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  return error ? { success: false, error: error.message } : { success: true };
}

/**
 * Get current session user (validates against Supabase session)
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  const profile = await getProfile(session.user.id);

  return {
    id: session.user.id,
    email: session.user.email || '',
    name: profile?.full_name || session.user.user_metadata?.full_name || '',
    role: (profile?.role || session.user.user_metadata?.role || 'student') as 'academic' | 'student',
    institution: profile?.institution,
    department: profile?.department,
    orcid_id: profile?.orcid_id,
    avatar_url: profile?.avatar_url,
  };
}
