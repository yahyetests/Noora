/* ============================================
   Noora — App State (Supabase-integrated)
   Supabase Auth is the single source of truth.
   No localStorage session fallback.
   ============================================ */

import { supabase } from './lib/supabase';
import { getCurrentUser, type AuthUser } from './lib/auth';

export interface AppState {
    isLoggedIn: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        role: 'academic' | 'student';
        avatar?: string;
        institution?: string | null;
        department?: string | null;
        orcid_id?: string | null;
    } | null;
    currentProject: string | null;
    loading: boolean;
}

class StateManager {
    private state: AppState = {
        isLoggedIn: false,
        user: null,
        currentProject: null,
        loading: true,
    };

    private listeners: ((state: AppState) => void)[] = [];
    private initialSessionHandled = false;

    get(): AppState {
        return { ...this.state };
    }

    set(partial: Partial<AppState>): void {
        this.state = { ...this.state, ...partial };
        this.listeners.forEach(fn => fn(this.state));
    }

    login(user: AppState['user']): void {
        this.set({ isLoggedIn: true, user, loading: false });
    }

    logout(): void {
        this.set({ isLoggedIn: false, user: null, currentProject: null, loading: false });
    }

    setUserFromAuth(authUser: AuthUser): void {
        this.login({
            id: authUser.id,
            name: authUser.name,
            email: authUser.email,
            role: authUser.role,
            institution: authUser.institution,
            department: authUser.department,
            orcid_id: authUser.orcid_id,
            avatar: authUser.avatar_url || undefined,
        });
    }

    /**
     * Restore session from Supabase only.
     * No localStorage fallback — Supabase is the single source of truth.
     */
    async restore(): Promise<void> {
        this.set({ loading: true });

        try {
            const authUser = await getCurrentUser();
            if (authUser) {
                this.setUserFromAuth(authUser);
                this.initialSessionHandled = true;
                return;
            }
        } catch (err) {
            console.error('Session restore failed:', err);
        }

        this.initialSessionHandled = true;
        this.set({ loading: false });
    }

    onChange(listener: (state: AppState) => void): void {
        this.listeners.push(listener);
    }

    /** Whether the initial session check has completed */
    isInitialized(): boolean {
        return this.initialSessionHandled;
    }
}

export const appState = new StateManager();

// ── Listen for Supabase auth state changes ──
// Only react to SIGNED_IN / SIGNED_OUT events that happen AFTER
// the initial session restore to prevent double-processing.
supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
        // Skip if this is the initial session load (already handled by restore())
        if (!appState.isInitialized()) return;

        const authUser = await getCurrentUser();
        if (authUser) {
            appState.setUserFromAuth(authUser);
        }
    } else if (event === 'SIGNED_OUT') {
        appState.logout();
    }
});
