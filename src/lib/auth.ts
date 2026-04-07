/* ============================================
   Noora — Auth Service
   ============================================ */

import { supabase, isSupabaseConfigured } from './supabase';
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
  if (!isSupabaseConfigured()) {
    return mockSignUp(email, fullName, role);
  }

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
  if (!isSupabaseConfigured()) {
    return mockSignIn(email);
  }

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
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<void> {
  if (!isSupabaseConfigured()) return;

  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/dashboard` },
  });
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await supabase.auth.signOut();
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured()) return { success: true };

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });

  return error ? { success: false, error: error.message } : { success: true };
}

/**
 * Get user profile from DB
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  if (!isSupabaseConfigured()) return null;

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
  if (!isSupabaseConfigured()) return { success: true };

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
  if (!isSupabaseConfigured()) return { success: true };

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  return error ? { success: false, error: error.message } : { success: true };
}

/**
 * Get current session user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) return null;

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

// ── Mock functions ──

function mockSignUp(email: string, fullName: string, role: 'academic' | 'student'): AuthResult {
  return { success: true, user: { id: 'mock-' + Date.now(), email, name: fullName, role } };
}

function mockSignIn(email: string): AuthResult {
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return { success: true, user: { id: 'mock-' + Date.now(), email, name, role: 'academic' } };
}
