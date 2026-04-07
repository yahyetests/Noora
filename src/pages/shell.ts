/* ============================================
   Noora — App Shell (Sidebar + Topbar)
   ============================================ */

import { icon } from '../icons';
import { themeManager } from '../theme';
import { appState } from '../state';
import { router } from '../router';

type ActivePage = 'dashboard' | 'search' | 'import' | 'screen-abstract' | 'screen-fulltext' | 'extraction' | 'writing' | 'export' | 'settings' | 'team' | 'project-settings' | 'activity';

export function renderAppShell(app: HTMLElement, activePage: ActivePage, content: string): void {
    const user = appState.get().user;
    if (!user) return;

    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const isProjectPage = activePage !== 'dashboard' && activePage !== 'settings';

    const titleMap: Record<string, string> = {
        'dashboard': 'Dashboard',
        'search': 'Literature Search',
        'import': 'Reference Library',
        'screen-abstract': 'Abstract Screening',
        'screen-fulltext': 'Full-Text Screening',
        'extraction': 'Data Extraction',
        'writing': 'Synthesis & Writing',
        'export': 'Export & Output',
        'settings': 'Settings',
        'team': 'Team Settings',
        'project-settings': 'Project Settings',
        'activity': 'Activity Log',
    };

    app.innerHTML = `
    <div class="app-shell">
      <!-- Sidebar -->
      <aside class="app-sidebar" id="appSidebar">
        <div class="sidebar-header">
          <a href="/dashboard" data-link class="sidebar-brand">
            ${icon('logo', 28)}
            <span>Noora</span>
          </a>
        </div>

        <nav class="sidebar-nav">
          <div class="sidebar-section-label">General</div>
          <a href="/dashboard" data-link class="sidebar-item ${activePage === 'dashboard' ? 'active' : ''}">
            ${icon('home', 20)} Dashboard
          </a>

          ${isProjectPage ? `
          <div class="sidebar-section-label" style="margin-top:var(--space-2)">Project Workflow</div>
          <a href="/project/search" data-link class="sidebar-item ${activePage === 'search' ? 'active' : ''}">
            ${icon('search', 20)} Literature Search
          </a>
          <a href="/project/import" data-link class="sidebar-item ${activePage === 'import' ? 'active' : ''}">
            ${icon('import', 20)} Import References
          </a>
          <a href="/project/screen-abstract" data-link class="sidebar-item ${activePage === 'screen-abstract' ? 'active' : ''}">
            ${icon('eye', 20)} Abstract Screening
            <span class="sidebar-badge">355</span>
          </a>
          <a href="/project/screen-fulltext" data-link class="sidebar-item ${activePage === 'screen-fulltext' ? 'active' : ''}">
            ${icon('fileText', 20)} Full-Text Screening
            <span class="sidebar-badge">50</span>
          </a>
          <a href="/project/extraction" data-link class="sidebar-item ${activePage === 'extraction' ? 'active' : ''}">
            ${icon('table', 20)} Data Extraction
          </a>
          <a href="/project/writing" data-link class="sidebar-item ${activePage === 'writing' ? 'active' : ''}">
            ${icon('edit', 20)} Synthesis & Writing
          </a>
          <a href="/project/export" data-link class="sidebar-item ${activePage === 'export' ? 'active' : ''}">
            ${icon('download', 20)} Export & Output
          </a>

          <div class="sidebar-section-label" style="margin-top:var(--space-2)">Project</div>
          <a href="/project/team" data-link class="sidebar-item ${activePage === 'team' ? 'active' : ''}">
            ${icon('users', 20)} Team Settings
          </a>
          <a href="/project/settings" data-link class="sidebar-item ${activePage === 'project-settings' ? 'active' : ''}">
            ${icon('settings', 20)} Project Settings
          </a>
          <a href="/project/activity" data-link class="sidebar-item ${activePage === 'activity' ? 'active' : ''}">
            ${icon('barChart', 20)} Activity Log
          </a>
          ` : `
          <div class="sidebar-section-label" style="margin-top:var(--space-2)">Quick Actions</div>
          <div class="sidebar-item" style="cursor:pointer" id="sidebarNewProject">
            ${icon('plus', 20)} New Project
          </div>
          `}

          <div class="sidebar-section-label" style="margin-top:var(--space-2)">Account</div>
          <a href="/settings" data-link class="sidebar-item ${activePage === 'settings' ? 'active' : ''}">
            ${icon('settings', 20)} Settings
          </a>
          <a href="/settings" data-link class="sidebar-item">
            ${icon('bell', 20)} Notifications
            <span class="sidebar-badge">3</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-user" id="sidebarUser">
            <div class="sidebar-avatar">${initials}</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">${user.name}</div>
              <div class="sidebar-user-role">${user.role === 'academic' ? 'Academic / PI' : 'Student / RA'}</div>
            </div>
            ${icon('chevronDown', 16)}
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="app-main">
        <header class="app-topbar">
          <div class="topbar-left">
            <button class="btn btn-icon btn-ghost" id="sidebarToggle" style="display:none">
              ${icon('menu', 20)}
            </button>
            ${isProjectPage ? `
            <div class="topbar-breadcrumb">
              <a href="/dashboard" data-link>Projects</a>
              ${icon('chevronRight', 14)}
              <span>Effects of CBT on Anxiety</span>
              ${icon('chevronRight', 14)}
              <span style="color:var(--text-primary);font-weight:500">${titleMap[activePage]}</span>
            </div>
            ` : `
            <div class="topbar-title">${titleMap[activePage]}</div>
            `}
          </div>
          <div class="topbar-right">
            <button class="btn btn-icon btn-ghost" id="themeToggleDash" aria-label="Toggle theme">
              ${themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20)}
            </button>
            <button class="btn btn-icon btn-ghost" aria-label="Notifications">
              ${icon('bell', 20)}
            </button>
          </div>
        </header>
        <div class="app-content">
          ${content}
        </div>
      </main>
    </div>
  `;

    // Theme toggle
    document.getElementById('themeToggleDash')?.addEventListener('click', () => {
        themeManager.toggle();
        const btn = document.getElementById('themeToggleDash');
        if (btn) btn.innerHTML = themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20);
    });

    // Mobile sidebar toggle
    const mobileCheck = () => {
        const toggleBtn = document.getElementById('sidebarToggle');
        if (toggleBtn) toggleBtn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    };
    mobileCheck();
    window.addEventListener('resize', mobileCheck);

    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
        document.getElementById('appSidebar')?.classList.toggle('open');
    });

    // User menu
    document.getElementById('sidebarUser')?.addEventListener('click', () => {
        appState.logout();
        router.navigate('/');
    });
}
