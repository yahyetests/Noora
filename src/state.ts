/* ============================================
   Noora — App State (Supabase-integrated)
   ============================================ */

import { supabase, isSupabaseConfigured } from './lib/supabase';
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

    get(): AppState {
        return { ...this.state };
    }

    set(partial: Partial<AppState>): void {
        this.state = { ...this.state, ...partial };
        this.listeners.forEach(fn => fn(this.state));
    }

    login(user: AppState['user']): void {
        this.set({ isLoggedIn: true, user, loading: false });
        // Persist to localStorage as fallback
        localStorage.setItem('sf-user', JSON.stringify(user));
    }

    logout(): void {
        this.set({ isLoggedIn: false, user: null, currentProject: null, loading: false });
        localStorage.removeItem('sf-user');
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
     * Restore session from Supabase or localStorage fallback
     */
    async restore(): Promise<void> {
        this.set({ loading: true });

        if (isSupabaseConfigured()) {
            try {
                const authUser = await getCurrentUser();
                if (authUser) {
                    this.setUserFromAuth(authUser);
                    return;
                }
            } catch {
                // Fall through to localStorage
            }
        }

        // Fallback: restore from localStorage
        const saved = localStorage.getItem('sf-user');
        if (saved) {
            try {
                const user = JSON.parse(saved);
                // Ensure the user object has an id field
                if (!user.id) user.id = 'local-' + Date.now();
                this.set({ isLoggedIn: true, user, loading: false });
                return;
            } catch { /* ignore */ }
        }

        this.set({ loading: false });
    }

    onChange(listener: (state: AppState) => void): void {
        this.listeners.push(listener);
    }
}

export const appState = new StateManager();

// ── Listen for Supabase auth state changes ──
if (isSupabaseConfigured()) {
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
            const authUser = await getCurrentUser();
            if (authUser) {
                appState.setUserFromAuth(authUser);
            }
        } else if (event === 'SIGNED_OUT') {
            appState.logout();
        }
    });
}
