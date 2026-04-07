/* ============================================
   Noora — Theme Manager
   ============================================ */

export type Theme = 'light' | 'dark';

class ThemeManager {
    private currentTheme: Theme;
    private listeners: ((theme: Theme) => void)[] = [];

    constructor() {
        const saved = localStorage.getItem('sf-theme') as Theme | null;
        if (saved) {
            this.currentTheme = saved;
        } else {
            this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        this.apply();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('sf-theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.apply();
                this.notify();
            }
        });
    }

    get theme(): Theme {
        return this.currentTheme;
    }

    toggle(): void {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('sf-theme', this.currentTheme);
        this.apply();
        this.notify();
    }

    setTheme(theme: Theme): void {
        this.currentTheme = theme;
        localStorage.setItem('sf-theme', theme);
        this.apply();
        this.notify();
    }

    onChange(listener: (theme: Theme) => void): void {
        this.listeners.push(listener);
    }

    private apply(): void {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    private notify(): void {
        this.listeners.forEach(fn => fn(this.currentTheme));
    }
}

export const themeManager = new ThemeManager();
