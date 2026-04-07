/* ============================================
   Noora — Dashboard Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

export function renderDashboard(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) {
    router.navigate('/login');
    return;
  }

  renderAppShell(app, 'dashboard', `
    <div class="dashboard-header">
      <h1 class="dashboard-greeting">Good afternoon, ${user.name.split(' ')[0]} 👋</h1>
      <p class="dashboard-subtext">Here's an overview of your research projects and activity.</p>
    </div>

    <!-- Stats -->
    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-card-label">Active Projects</div>
        <div class="stat-card-value">4</div>
        <div class="stat-card-change positive">+1 this month</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">References Managed</div>
        <div class="stat-card-value tabular-nums">3,847</div>
        <div class="stat-card-change positive">+284 this week</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Screening Progress</div>
        <div class="stat-card-value tabular-nums">67%</div>
        <div class="stat-card-change positive">+12% this week</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-label">Team Members</div>
        <div class="stat-card-value tabular-nums">8</div>
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
      <!-- Project 1 -->
      <div class="project-card" data-project="cbt-anxiety">
        <div class="project-card-header">
          <div>
            <div class="project-card-title">Effects of CBT on Anxiety Disorders</div>
          </div>
          <span class="badge badge-brand">In Progress</span>
        </div>
        <p class="project-card-desc">Systematic review and meta-analysis of randomized controlled trials examining cognitive behavioral therapy for generalized anxiety disorder in adults.</p>
        <div class="project-stats-row">
          <div class="project-stat-item">
            <div class="project-stat-num">1,247</div>
            <div class="project-stat-label">References</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">892</div>
            <div class="project-stat-label">Screened</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">156</div>
            <div class="project-stat-label">Included</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">42</div>
            <div class="project-stat-label">Extracted</div>
          </div>
        </div>
        <div class="project-progress">
          <div class="project-progress-label">
            <span>Overall Progress</span>
            <span class="tabular-nums">58%</span>
          </div>
          <div class="project-progress-bar">
            <div class="project-progress-fill" style="width:58%"></div>
          </div>
        </div>
        <div class="project-card-footer">
          <div class="project-collaborators">
            <div class="project-collab-avatar">SC</div>
            <div class="project-collab-avatar" style="background:linear-gradient(135deg,#F59E0B,#EF4444)">JK</div>
            <div class="project-collab-avatar" style="background:linear-gradient(135deg,#10B981,#3B82F6)">MR</div>
            <div class="project-collab-more">+2</div>
          </div>
          <div class="project-card-date">Updated 2h ago</div>
        </div>
      </div>

      <!-- Project 2 -->
      <div class="project-card" data-project="ai-education">
        <div class="project-card-header">
          <div>
            <div class="project-card-title">AI in Higher Education: A Scoping Review</div>
          </div>
          <span class="badge badge-success">Screening</span>
        </div>
        <p class="project-card-desc">Mapping the landscape of artificial intelligence applications in university-level teaching and learning environments across STEM disciplines.</p>
        <div class="project-stats-row">
          <div class="project-stat-item">
            <div class="project-stat-num">2,340</div>
            <div class="project-stat-label">References</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">1,180</div>
            <div class="project-stat-label">Screened</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">210</div>
            <div class="project-stat-label">Included</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">0</div>
            <div class="project-stat-label">Extracted</div>
          </div>
        </div>
        <div class="project-progress">
          <div class="project-progress-label">
            <span>Overall Progress</span>
            <span class="tabular-nums">32%</span>
          </div>
          <div class="project-progress-bar">
            <div class="project-progress-fill" style="width:32%"></div>
          </div>
        </div>
        <div class="project-card-footer">
          <div class="project-collaborators">
            <div class="project-collab-avatar">SC</div>
            <div class="project-collab-avatar" style="background:linear-gradient(135deg,#8B5CF6,#EC4899)">LW</div>
          </div>
          <div class="project-card-date">Updated yesterday</div>
        </div>
      </div>

      <!-- Project 3 -->
      <div class="project-card" data-project="nutrition-aging">
        <div class="project-card-header">
          <div>
            <div class="project-card-title">Nutritional Interventions for Healthy Aging</div>
          </div>
          <span class="badge badge-warning">Extraction</span>
        </div>
        <p class="project-card-desc">Review of dietary and supplementation strategies for cognitive decline prevention in adults aged 60+.</p>
        <div class="project-stats-row">
          <div class="project-stat-item">
            <div class="project-stat-num">780</div>
            <div class="project-stat-label">References</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">780</div>
            <div class="project-stat-label">Screened</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">89</div>
            <div class="project-stat-label">Included</div>
          </div>
          <div class="project-stat-item">
            <div class="project-stat-num">67</div>
            <div class="project-stat-label">Extracted</div>
          </div>
        </div>
        <div class="project-progress">
          <div class="project-progress-label">
            <span>Overall Progress</span>
            <span class="tabular-nums">78%</span>
          </div>
          <div class="project-progress-bar">
            <div class="project-progress-fill" style="width:78%"></div>
          </div>
        </div>
        <div class="project-card-footer">
          <div class="project-collaborators">
            <div class="project-collab-avatar">SC</div>
            <div class="project-collab-avatar" style="background:linear-gradient(135deg,#6366F1,#3B82F6)">TA</div>
            <div class="project-collab-avatar" style="background:linear-gradient(135deg,#14B8A6,#10B981)">PD</div>
          </div>
          <div class="project-card-date">Updated 3 days ago</div>
        </div>
      </div>

      <!-- New Project Card -->
      <div class="project-card new-project-card" id="newProjectCard">
        ${icon('plus', 32)}
        <span>Create New Project</span>
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="activity-section">
      <h2 style="font-size:var(--text-section-heading);margin-bottom:var(--space-4)">Recent Activity</h2>
      <div class="activity-feed">
        <div class="activity-item">
          <div class="activity-dot" style="background:var(--color-success)"></div>
          <div class="activity-content">
            <div class="activity-text"><strong>Dr. James Kim</strong> completed abstract screening for "Effects of CBT on Anxiety" — 45 references reviewed</div>
            <div class="activity-time">2 hours ago</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot" style="background:var(--brand-purple)"></div>
          <div class="activity-content">
            <div class="activity-text"><strong>Marcus Rodriguez</strong> uploaded 8 PDFs for full-text screening in "AI in Higher Education"</div>
            <div class="activity-time">5 hours ago</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot" style="background:var(--color-warning)"></div>
          <div class="activity-content">
            <div class="activity-text"><strong>3 screening conflicts</strong> need resolution in "Nutritional Interventions for Healthy Aging"</div>
            <div class="activity-time">Yesterday</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot" style="background:var(--brand-blue)"></div>
          <div class="activity-content">
            <div class="activity-text"><strong>Dr. Li Wei</strong> added 340 references from PubMed search to "AI in Higher Education"</div>
            <div class="activity-time">2 days ago</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot" style="background:var(--color-success)"></div>
          <div class="activity-content">
            <div class="activity-text"><strong>You</strong> completed data extraction for 12 studies in "Nutritional Interventions"</div>
            <div class="activity-time">3 days ago</div>
          </div>
        </div>
      </div>
    </div>
  `);

  // Project card click handlers
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const project = card.getAttribute('data-project');
      appState.set({ currentProject: project });
      router.navigate('/project/search');
    });
  });

  // New project
  document.getElementById('newProjectBtn')?.addEventListener('click', showNewProjectModal);
  document.getElementById('newProjectCard')?.addEventListener('click', showNewProjectModal);
}

function showNewProjectModal(): void {
  const existing = document.querySelector('.modal-backdrop');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h2>Create New Project</h2>
        <button class="modal-close" id="closeModal">${icon('x', 20)}</button>
      </div>
      <form class="auth-form" id="newProjectForm">
        <div class="form-group">
          <label class="form-label">Project Title</label>
          <input type="text" class="form-input" placeholder="e.g. Effects of Exercise on Depression" required />
        </div>
        <div class="form-group">
          <label class="form-label">Research Question (PICO)</label>
          <textarea class="form-input" rows="3" placeholder="What is the effect of [intervention] on [outcome] in [population]?"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Review Type</label>
          <select class="form-input">
            <option>Systematic Review</option>
            <option>Meta-Analysis</option>
            <option>Scoping Review</option>
            <option>Rapid Review</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Invite Collaborators (optional)</label>
          <input type="text" class="form-input" placeholder="colleague@university.edu, student@uni.edu" />
        </div>
        <div style="display:flex;gap:var(--space-3);margin-top:var(--space-4)">
          <button type="button" class="btn btn-secondary" id="cancelModal" style="flex:1">Cancel</button>
          <button type="submit" class="btn btn-primary" style="flex:1">Create Project</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  document.getElementById('closeModal')?.addEventListener('click', () => modal.remove());
  document.getElementById('cancelModal')?.addEventListener('click', () => modal.remove());
  document.getElementById('newProjectForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    modal.remove();
    appState.set({ currentProject: 'new-project' });
    router.navigate('/project/search');
  });
}
