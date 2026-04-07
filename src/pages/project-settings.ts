/* ============================================
   Noora — Project Settings Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

export function renderProjectSettings(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) { router.navigate('/login'); return; }

  renderAppShell(app, 'settings', `
    <div class="project-settings-page">
      <div class="page-header">
        <div>
          <h1>Project Settings</h1>
          <p class="page-subtitle">Effects of CBT on Anxiety in Adolescents</p>
        </div>
      </div>

      <div class="settings-sections">
        <!-- General -->
        <div class="settings-card">
          <h3>General</h3>
          <form class="settings-form" id="projectForm">
            <div class="form-group">
              <label>Project Title</label>
              <input type="text" class="form-input" value="Effects of CBT on Anxiety in Adolescents" />
            </div>
            <div class="form-group">
              <label>Research Question</label>
              <textarea class="form-input" rows="3">What is the effectiveness of cognitive behavioral therapy on anxiety symptoms in adolescents aged 12-18?</textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Review Type</label>
                <select class="form-input">
                  <option selected>Systematic Review</option>
                  <option>Scoping Review</option>
                  <option>Meta-Analysis</option>
                  <option>Rapid Review</option>
                </select>
              </div>
              <div class="form-group">
                <label>Citation Style</label>
                <select class="form-input">
                  <option selected>APA 7th Edition</option>
                  <option>Vancouver (Numbered)</option>
                  <option>Harvard</option>
                  <option>Chicago</option>
                  <option>IEEE</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">${icon('check', 16)} Save Changes</button>
          </form>
        </div>

        <!-- Screening Configuration -->
        <div class="settings-card">
          <h3>Screening Configuration</h3>
          <div class="config-options">
            <div class="config-option">
              <div>
                <strong>Dual-Reviewer Screening</strong>
                <p>Require two independent reviewers per reference.</p>
              </div>
              <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
            </div>
            <div class="config-option">
              <div>
                <strong>Require Exclusion Reasons</strong>
                <p>Force reviewers to select a reason when excluding a reference.</p>
              </div>
              <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
            </div>
            <div class="config-option">
              <div>
                <strong>Auto-Resolve Agreements</strong>
                <p>Automatically accept decisions when both reviewers agree.</p>
              </div>
              <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
            </div>
          </div>
        </div>

        <!-- Inclusion/Exclusion Criteria -->
        <div class="settings-card">
          <h3>Inclusion / Exclusion Criteria</h3>
          <p style="color:var(--text-secondary);margin-bottom:var(--space-4)">These criteria will be displayed to reviewers during screening.</p>
          <div class="criteria-section">
            <h4 style="color:var(--color-success)">Inclusion Criteria</h4>
            <div class="criteria-list" id="inclusionList">
              <div class="criteria-item">${icon('check', 14)} <span contenteditable="true">Participants aged 12-18 years</span></div>
              <div class="criteria-item">${icon('check', 14)} <span contenteditable="true">CBT intervention (individual or group)</span></div>
              <div class="criteria-item">${icon('check', 14)} <span contenteditable="true">Validated anxiety outcome measure</span></div>
              <div class="criteria-item">${icon('check', 14)} <span contenteditable="true">Published in English</span></div>
            </div>
            <button class="btn btn-ghost btn-sm" id="addInclusionBtn">${icon('plus', 14)} Add Criterion</button>
          </div>
          <div class="criteria-section" style="margin-top:var(--space-4)">
            <h4 style="color:var(--color-error)">Exclusion Criteria</h4>
            <div class="criteria-list" id="exclusionList">
              <div class="criteria-item">${icon('x', 14)} <span contenteditable="true">Case studies or single-subject designs</span></div>
              <div class="criteria-item">${icon('x', 14)} <span contenteditable="true">Interventions not primarily CBT</span></div>
              <div class="criteria-item">${icon('x', 14)} <span contenteditable="true">No control or comparison group</span></div>
            </div>
            <button class="btn btn-ghost btn-sm" id="addExclusionBtn">${icon('plus', 14)} Add Criterion</button>
          </div>
        </div>

        <!-- Exclusion Reasons -->
        <div class="settings-card">
          <h3>Exclusion Reason Categories</h3>
          <p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Reviewers will choose from these when excluding a reference.</p>
          <div class="reason-chips">
            <span class="reason-chip">Wrong population <button class="btn-chip-remove">&times;</button></span>
            <span class="reason-chip">Wrong intervention <button class="btn-chip-remove">&times;</button></span>
            <span class="reason-chip">Wrong study design <button class="btn-chip-remove">&times;</button></span>
            <span class="reason-chip">Wrong outcome <button class="btn-chip-remove">&times;</button></span>
            <span class="reason-chip">Not in English <button class="btn-chip-remove">&times;</button></span>
            <span class="reason-chip">Duplicate <button class="btn-chip-remove">&times;</button></span>
            <span class="reason-chip">No full text available <button class="btn-chip-remove">&times;</button></span>
          </div>
          <div class="form-group" style="margin-top:var(--space-3)">
            <div style="display:flex;gap:var(--space-2)">
              <input type="text" class="form-input" placeholder="Add new reason..." id="newReasonInput" />
              <button class="btn btn-ghost" id="addReasonBtn">${icon('plus', 16)} Add</button>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-card danger-card">
          <h3>Danger Zone</h3>
          <div class="config-option">
            <div>
              <strong>Archive Project</strong>
              <p>Mark this project as archived. It will become read-only.</p>
            </div>
            <button class="btn btn-ghost" style="color:var(--color-warning)">Archive</button>
          </div>
          <div class="config-option">
            <div>
              <strong>Delete Project</strong>
              <p>Permanently delete this project and all associated data. This cannot be undone.</p>
            </div>
            <button class="btn btn-ghost" style="color:var(--color-error)">Delete Project</button>
          </div>
        </div>
      </div>
    </div>
  `);

  // Save project form
  document.getElementById('projectForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 16)} Saved!`;
    setTimeout(() => { btn.innerHTML = `${icon('check', 16)} Save Changes`; }, 2000);
  });

  // Add criteria
  document.getElementById('addInclusionBtn')?.addEventListener('click', () => {
    const list = document.getElementById('inclusionList');
    if (list) {
      const div = document.createElement('div');
      div.className = 'criteria-item';
      div.innerHTML = `${icon('check', 14)} <span contenteditable="true">New criterion...</span>`;
      list.appendChild(div);
    }
  });

  document.getElementById('addExclusionBtn')?.addEventListener('click', () => {
    const list = document.getElementById('exclusionList');
    if (list) {
      const div = document.createElement('div');
      div.className = 'criteria-item';
      div.innerHTML = `${icon('x', 14)} <span contenteditable="true">New criterion...</span>`;
      list.appendChild(div);
    }
  });

  // Add reason
  document.getElementById('addReasonBtn')?.addEventListener('click', () => {
    const input = document.getElementById('newReasonInput') as HTMLInputElement;
    if (input?.value) {
      const chips = document.querySelector('.reason-chips');
      if (chips) {
        const chip = document.createElement('span');
        chip.className = 'reason-chip';
        chip.innerHTML = `${input.value} <button class="btn-chip-remove">&times;</button>`;
        chips.appendChild(chip);
        input.value = '';
      }
    }
  });
}
