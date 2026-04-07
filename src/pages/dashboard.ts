/* ============================================
   Noora — Dashboard Page (Supabase-integrated)
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';
import { getUserProjects, createProject, type ProjectWithStats } from '../lib/projects';

export function renderDashboard(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) {
    router.navigate('/login');
    return;
  }

  // Determine greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Show loading first, then load projects
  renderAppShell(app, 'dashboard', `
    <div class="dashboard-header">
      <h1 class="dashboard-greeting">${greeting}, ${user.name.split(' ')[0]} 👋</h1>
      <p class="dashboard-subtext">Here's an overview of your research projects and activity.</p>
    </div>
    <div id="dashboardContent">
      <div style="text-align:center;padding:var(--space-6)">
        <div class="btn-spinner-lg"></div>
        <p style="color:var(--text-tertiary);margin-top:var(--space-3)">Loading projects...</p>
      </div>
    </div>
  `);

  loadDashboardContent(user.id);
}

async function loadDashboardContent(userId: string): Promise<void> {
  const projects = await getUserProjects(userId);
  const container = document.getElementById('dashboardContent');
  if (!container) return;

  const totalRefs = projects.reduce((sum, p) => sum + p.references_count, 0);
  const totalMembers = projects.reduce((sum, p) => sum + p.members_count, 0);
  const avgProgress = projects.length > 0
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    : 0;

  container.innerHTML = `
    <!-- Stats -->
    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-card-label">Active Projects</div>
        <div class="stat-card-value">${projects.length}</div>
        <div class="stat-card-change positive">${projects.length > 0 ? 'Active' : 'Create your first!'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">References Managed</div>
        <div class="stat-card-value tabular-nums">${totalRefs.toLocaleString()}</div>
        <div class="stat-card-change positive">Across all projects</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Avg. Progress</div>
        <div class="stat-card-value tabular-nums">${avgProgress}%</div>
        <div class="stat-card-change positive">Screening & extraction</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Team Members</div>
        <div class="stat-card-value tabular-nums">${totalMembers}</div>
        <div class="stat-card-change positive">Across all projects</div>
      </div>
    </div>

    <!-- Projects -->
    <div class="dashboard-projects-header">
      <h2>Your Projects</h2>
      <button class="btn btn-primary btn-sm" id="newProjectBtn">
        ${icon('plus', 16)} New Project
      </button>
    </div>

    <div class="projects-grid">
      ${projects.map(p => renderProjectCard(p)).join('')}
      <div class="project-card new-project-card" id="newProjectCard">
        ${icon('plus', 32)}
        <span>Create New Project</span>
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="activity-section">
      <h2 style="font-size:var(--text-section-heading);margin-bottom:var(--space-4)">Recent Activity</h2>
      <div class="activity-feed">
        ${projects.length === 0 ? `
          <div class="activity-item">
            <div class="activity-dot" style="background:var(--brand-purple)"></div>
            <div class="activity-content">
              <div class="activity-text">Welcome to Noora! Create your first project to get started.</div>
              <div class="activity-time">Just now</div>
            </div>
          </div>
        ` : `
          <div class="activity-item">
            <div class="activity-dot" style="background:var(--color-success)"></div>
            <div class="activity-content">
              <div class="activity-text"><strong>You</strong> have ${projects.length} active project${projects.length !== 1 ? 's' : ''} with ${totalRefs.toLocaleString()} total references.</div>
              <div class="activity-time">Current</div>
            </div>
          </div>
          ${projects.slice(0, 3).map(p => `
            <div class="activity-item">
              <div class="activity-dot" style="background:var(--brand-purple)"></div>
              <div class="activity-content">
                <div class="activity-text"><strong>${p.title}</strong> — ${p.progress}% complete (${p.screened_count} of ${p.references_count} screened)</div>
                <div class="activity-time">Updated ${formatRelativeTime(p.updated_at)}</div>
              </div>
            </div>
          `).join('')}
        `}
      </div>
    </div>
  `;

  // Project card click handlers
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const project = card.getAttribute('data-project');
      appState.set({ currentProject: project });
      router.navigate('/project/search');
    });
  });

  // New project buttons
  document.getElementById('newProjectBtn')?.addEventListener('click', () => showNewProjectModal());
  document.getElementById('newProjectCard')?.addEventListener('click', () => showNewProjectModal());
}

function renderProjectCard(p: ProjectWithStats): string {
  const statusMap: Record<string, { label: string; badge: string }> = {
    active: { label: p.progress > 60 ? 'In Progress' : p.progress > 30 ? 'Screening' : 'Starting', badge: p.progress > 60 ? 'badge-brand' : p.progress > 30 ? 'badge-success' : 'badge-warning' },
    archived: { label: 'Archived', badge: 'badge-warning' },
    completed: { label: 'Completed', badge: 'badge-success' },
  };
  const status = statusMap[p.status] || statusMap['active'];

  return `
    <div class="project-card" data-project="${p.id}">
      <div class="project-card-header">
        <div>
          <div class="project-card-title">${p.title}</div>
        </div>
        <span class="badge ${status.badge}">${status.label}</span>
      </div>
      ${p.description ? `<p class="project-card-desc">${p.description}</p>` : ''}
      <div class="project-stats-row">
        <div class="project-stat-item">
          <div class="project-stat-num">${p.references_count.toLocaleString()}</div>
          <div class="project-stat-label">References</div>
        </div>
        <div class="project-stat-item">
          <div class="project-stat-num">${p.screened_count.toLocaleString()}</div>
          <div class="project-stat-label">Screened</div>
        </div>
        <div class="project-stat-item">
          <div class="project-stat-num">${p.included_count.toLocaleString()}</div>
          <div class="project-stat-label">Included</div>
        </div>
        <div class="project-stat-item">
          <div class="project-stat-num">${p.extracted_count}</div>
          <div class="project-stat-label">Extracted</div>
        </div>
      </div>
      <div class="project-progress">
        <div class="project-progress-label">
          <span>Overall Progress</span>
          <span class="tabular-nums">${p.progress}%</span>
        </div>
        <div class="project-progress-bar">
          <div class="project-progress-fill" style="width:${p.progress}%"></div>
        </div>
      </div>
      <div class="project-card-footer">
        <div class="project-collaborators">
          <div class="project-collab-avatar">${p.members_count}</div>
          <span style="font-size:12px;color:var(--text-tertiary)">${p.members_count} member${p.members_count !== 1 ? 's' : ''}</span>
        </div>
        <div class="project-card-date">Updated ${formatRelativeTime(p.updated_at)}</div>
      </div>
    </div>
  `;
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

function showNewProjectModal(): void {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Create New Project</h3>
        <button class="btn btn-icon btn-ghost modal-close">${icon('x', 18)}</button>
      </div>
      <div class="modal-body">
        <form id="newProjectForm">
          <div class="form-group" style="margin-bottom:var(--space-3)">
            <label style="display:block;font-size:var(--text-label);font-weight:600;margin-bottom:var(--space-1)">Project Title</label>
            <input type="text" class="form-input" id="npTitle" placeholder="e.g. Effects of Exercise on Depression" required />
          </div>
          <div class="form-group" style="margin-bottom:var(--space-3)">
            <label style="display:block;font-size:var(--text-label);font-weight:600;margin-bottom:var(--space-1)">Research Question (optional)</label>
            <textarea class="form-input" id="npQuestion" rows="3" placeholder="What is the effect of [intervention] on [outcome] in [population]?"></textarea>
          </div>
          <div class="form-group" style="margin-bottom:var(--space-3)">
            <label style="display:block;font-size:var(--text-label);font-weight:600;margin-bottom:var(--space-1)">Review Type</label>
            <select class="form-input" id="npType">
              <option>Systematic Review</option>
              <option>Meta-Analysis</option>
              <option>Scoping Review</option>
              <option>Rapid Review</option>
              <option>Literature Review</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="createProjectBtn">${icon('plus', 16)} Create Project</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  modal.querySelector('.modal-close')?.addEventListener('click', () => modal.remove());
  modal.querySelector('.modal-cancel')?.addEventListener('click', () => modal.remove());

  document.getElementById('createProjectBtn')?.addEventListener('click', async () => {
    const title = (document.getElementById('npTitle') as HTMLInputElement)?.value;
    if (!title) return;

    const btn = document.getElementById('createProjectBtn') as HTMLButtonElement;
    btn.innerHTML = '<span class="btn-spinner"></span> Creating...';
    btn.disabled = true;

    const user = appState.get().user;
    const result = await createProject(user?.id || 'mock', {
      title,
      description: (document.getElementById('npQuestion') as HTMLTextAreaElement)?.value || undefined,
      review_type: (document.getElementById('npType') as HTMLSelectElement)?.value,
    });

    if (result.success && result.project) {
      appState.set({ currentProject: result.project.id });
      modal.remove();
      router.navigate('/project/search');
    } else {
      btn.innerHTML = `${icon('plus', 16)} Create Project`;
      btn.disabled = false;
    }
  });
}
