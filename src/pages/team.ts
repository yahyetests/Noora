/* ============================================
   Noora — Team Management Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

const teamMembers = [
  { name: 'Dr. Sarah Chen', email: 'chen@stanford.edu', role: 'Admin', status: 'online', stages: ['search', 'screen-abstract', 'screen-fulltext', 'extraction', 'writing', 'export'], screened: 142, extracted: 18 },
  { name: 'James Wilson', email: 'jwilson@stanford.edu', role: 'Reviewer', status: 'online', stages: ['screen-abstract', 'screen-fulltext', 'extraction'], screened: 98, extracted: 12 },
  { name: 'Maria Garcia', email: 'mgarcia@mit.edu', role: 'Reviewer', status: 'offline', stages: ['screen-abstract', 'screen-fulltext', 'writing'], screened: 67, extracted: 0 },
  { name: 'Alex Kim', email: 'akim@berkeley.edu', role: 'Collaborator', status: 'offline', stages: ['screen-abstract'], screened: 45, extracted: 0 },
];

export function renderTeam(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) { router.navigate('/login'); return; }

  renderAppShell(app, 'settings', `
    <div class="team-page">
      <div class="page-header">
        <div>
          <h1>Team Settings</h1>
          <p class="page-subtitle">${teamMembers.length} members · 2 online now</p>
        </div>
        <button class="btn btn-primary" id="inviteBtn">${icon('userPlus', 16)} Invite Member</button>
      </div>

      <!-- Team Members -->
      <div class="team-list">
        ${teamMembers.map((m, i) => `
          <div class="team-card">
            <div class="team-card-left">
              <div class="team-avatar ${m.status === 'online' ? 'online' : ''}">
                ${m.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div class="team-info">
                <div class="team-name">${m.name} ${i === 0 ? '<span class="badge badge-brand" style="font-size:10px;margin-left:4px">You</span>' : ''}</div>
                <div class="team-email">${m.email}</div>
              </div>
            </div>
            <div class="team-card-mid">
              <div class="team-stat">
                <span class="team-stat-value">${m.screened}</span>
                <span class="team-stat-label">Screened</span>
              </div>
              <div class="team-stat">
                <span class="team-stat-value">${m.extracted}</span>
                <span class="team-stat-label">Extracted</span>
              </div>
            </div>
            <div class="team-card-right">
              <select class="form-input team-role-select" ${i === 0 ? 'disabled' : ''}>
                <option ${m.role === 'Admin' ? 'selected' : ''}>Admin</option>
                <option ${m.role === 'Reviewer' ? 'selected' : ''}>Reviewer</option>
                <option ${m.role === 'Collaborator' ? 'selected' : ''}>Collaborator</option>
              </select>
              ${i > 0 ? `<button class="btn btn-icon btn-ghost btn-sm">${icon('trash', 14)}</button>` : ''}
            </div>
          </div>

          ${i > 0 ? `
          <div class="team-permissions">
            <div class="permissions-label">Stage Access:</div>
            <div class="permissions-toggles">
              <label class="permission-toggle">
                <input type="checkbox" ${m.stages.includes('search') ? 'checked' : ''} />
                <span>Search</span>
              </label>
              <label class="permission-toggle">
                <input type="checkbox" ${m.stages.includes('screen-abstract') ? 'checked' : ''} />
                <span>Abstract Screening</span>
              </label>
              <label class="permission-toggle">
                <input type="checkbox" ${m.stages.includes('screen-fulltext') ? 'checked' : ''} />
                <span>Full-Text Screening</span>
              </label>
              <label class="permission-toggle">
                <input type="checkbox" ${m.stages.includes('extraction') ? 'checked' : ''} />
                <span>Data Extraction</span>
              </label>
              <label class="permission-toggle">
                <input type="checkbox" ${m.stages.includes('writing') ? 'checked' : ''} />
                <span>Writing</span>
              </label>
              <label class="permission-toggle">
                <input type="checkbox" ${m.stages.includes('export') ? 'checked' : ''} />
                <span>Export</span>
              </label>
            </div>
          </div>
          ` : ''}
        `).join('')}
      </div>

      <!-- Pending Invitations -->
      <div class="team-section">
        <h3>Pending Invitations</h3>
        <div class="pending-invites">
          <div class="pending-invite">
            <div class="team-info">
              <div class="team-name">pending@university.edu</div>
              <div class="team-email">Invited 2 days ago · Role: Reviewer</div>
            </div>
            <div class="pending-actions">
              <button class="btn btn-ghost btn-sm">${icon('refreshCw', 14)} Resend</button>
              <button class="btn btn-ghost btn-sm" style="color:var(--color-error)">${icon('x', 14)} Revoke</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  document.getElementById('inviteBtn')?.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Invite Team Member</h3>
          <button class="btn btn-icon btn-ghost modal-close">${icon('x', 18)}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" class="form-input" placeholder="colleague@university.edu" id="inviteEmail" />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select class="form-input">
              <option>Reviewer</option>
              <option>Collaborator</option>
              <option>Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label>Stage Access</label>
            <div class="permissions-toggles">
              <label class="permission-toggle"><input type="checkbox" checked /><span>Abstract Screening</span></label>
              <label class="permission-toggle"><input type="checkbox" checked /><span>Full-Text Screening</span></label>
              <label class="permission-toggle"><input type="checkbox" /><span>Data Extraction</span></label>
              <label class="permission-toggle"><input type="checkbox" /><span>Writing</span></label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost modal-cancel">Cancel</button>
          <button class="btn btn-primary" id="sendInviteBtn">${icon('send', 16)} Send Invitation</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.modal-close')?.addEventListener('click', () => overlay.remove());
    overlay.querySelector('.modal-cancel')?.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    overlay.querySelector('#sendInviteBtn')?.addEventListener('click', () => {
      const btn = overlay.querySelector('#sendInviteBtn') as HTMLButtonElement;
      btn.innerHTML = `${icon('check', 16)} Invitation Sent!`;
      btn.disabled = true;
      setTimeout(() => overlay.remove(), 1500);
    });
  });
}
