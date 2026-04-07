/* ============================================
   Noora — App State
   ============================================ */

export interface AppState {
    isLoggedIn: boolean;
    user: {
        name: string;
        email: string;
        role: 'academic' | 'student';
        avatar?: string;
    } | null;
    currentProject: string | null;
}

class StateManager {
    private state: AppState = {
        isLoggedIn: false,
        user: null,
        currentProject: null,
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
        this.set({ isLoggedIn: true, user });
        localStorage.setItem('sf-user', JSON.stringify(user));
    }

    logout(): void {
        this.set({ isLoggedIn: false, user: null, currentProject: null });
        localStorage.removeItem('sf-user');
    }

    restore(): void {
        const saved = localStorage.getItem('sf-user');
        if (saved) {
            try {
                const user = JSON.parse(saved);
                this.set({ isLoggedIn: true, user });
            } catch { /* ignore */ }
        }
    }

    onChange(listener: (state: AppState) => void): void {
        this.listeners.push(listener);
    }
}

export const appState = new StateManager();
