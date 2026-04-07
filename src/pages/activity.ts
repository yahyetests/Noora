/* ============================================
   Noora — Activity Log Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

const activities = [
  { user: 'Dr. Sarah Chen', action: 'included', target: 'Reference REF-042 in abstract screening', time: '5 minutes ago', type: 'screening', icon: 'check' },
  { user: 'James Wilson', action: 'excluded', target: 'Reference REF-038 (Reason: Wrong population)', time: '12 minutes ago', type: 'screening', icon: 'x' },
  { user: 'Dr. Sarah Chen', action: 'resolved conflict', target: 'on Reference REF-029 (Included)', time: '25 minutes ago', type: 'conflict', icon: 'alertCircle' },
  { user: 'Maria Garcia', action: 'completed extraction', target: 'for Study: Kim et al. 2022', time: '1 hour ago', type: 'extraction', icon: 'table' },
  { user: 'James Wilson', action: 'uploaded PDF', target: 'for Reference REF-015', time: '1 hour ago', type: 'import', icon: 'upload' },
  { user: 'Dr. Sarah Chen', action: 'added comment', target: 'in Synthesis document: "Methods section needs revision"', time: '2 hours ago', type: 'writing', icon: 'edit' },
  { user: 'Alex Kim', action: 'included', target: 'Reference REF-031 in abstract screening', time: '2 hours ago', type: 'screening', icon: 'check' },
  { user: 'Maria Garcia', action: 'excluded', target: 'Reference REF-044 (Reason: Wrong study design)', time: '3 hours ago', type: 'screening', icon: 'x' },
  { user: 'Dr. Sarah Chen', action: 'imported', target: '24 references from PubMed search', time: '4 hours ago', type: 'import', icon: 'import' },
  { user: 'James Wilson', action: 'completed extraction', target: 'for Study: Smith et al. 2023', time: '5 hours ago', type: 'extraction', icon: 'table' },
  { user: 'Dr. Sarah Chen', action: 'invited', target: 'pending@university.edu as Reviewer', time: 'Yesterday', type: 'team', icon: 'userPlus' },
  { user: 'Alex Kim', action: 'joined', target: 'the project as Collaborator', time: 'Yesterday', type: 'team', icon: 'users' },
  { user: 'Dr. Sarah Chen', action: 'created', target: 'the project "Effects of CBT on Anxiety"', time: '3 days ago', type: 'project', icon: 'folder' },
];

const typeColors: Record<string, string> = {
  screening: 'var(--color-success)',
  conflict: 'var(--color-warning)',
  extraction: 'var(--brand-purple)',
  import: 'var(--brand-blue)',
  writing: 'var(--color-info, var(--brand-blue))',
  team: 'var(--text-tertiary)',
  project: 'var(--brand-purple)',
};

export function renderActivity(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) { router.navigate('/login'); return; }

  renderAppShell(app, 'settings', `
    <div class="activity-page">
      <div class="page-header">
        <div>
          <h1>Activity Log</h1>
          <p class="page-subtitle">All actions across the project, tracked for transparency and auditability.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-ghost" id="exportLogBtn">${icon('download', 16)} Export Log</button>
        </div>
      </div>

      <!-- Filters -->
      <div class="activity-filters">
        <button class="filter-chip active" data-filter="all">All Activity</button>
        <button class="filter-chip" data-filter="screening">Screening</button>
        <button class="filter-chip" data-filter="extraction">Extraction</button>
        <button class="filter-chip" data-filter="writing">Writing</button>
        <button class="filter-chip" data-filter="import">Import</button>
        <button class="filter-chip" data-filter="team">Team</button>
        <button class="filter-chip" data-filter="conflict">Conflicts</button>
      </div>

      <!-- Activity Timeline -->
      <div class="activity-timeline">
        ${activities.map(a => `
          <div class="activity-entry" data-type="${a.type}">
            <div class="activity-dot" style="background:${typeColors[a.type]}"></div>
            <div class="activity-line"></div>
            <div class="activity-card">
              <div class="activity-card-header">
                <div class="activity-user">
                  <div class="activity-avatar">${a.user.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</div>
                  <strong>${a.user}</strong>
                </div>
                <span class="activity-time">${a.time}</span>
              </div>
              <div class="activity-desc">
                <span class="activity-action-icon" style="color:${typeColors[a.type]}">${icon(a.icon as any, 14)}</span>
                <span><strong>${a.action}</strong> ${a.target}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="activity-load-more">
        <button class="btn btn-ghost">Load More Activity</button>
      </div>
    </div>
  `);

  // Filter
  document.querySelectorAll('.activity-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.activity-filters .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      document.querySelectorAll('.activity-entry').forEach(entry => {
        const type = entry.getAttribute('data-type');
        (entry as HTMLElement).style.display = (filter === 'all' || type === filter) ? '' : 'none';
      });
    });
  });

  // Export log
  document.getElementById('exportLogBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('exportLogBtn') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 16)} Log Exported`;
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = `${icon('download', 16)} Export Log`;
      btn.disabled = false;
    }, 2000);
  });
}
