/* ============================================
   Noora — Data Extraction Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

const extractionData = [
    {
        id: 'Chen 2024',
        authors: 'Chen S, Kim J, et al.',
        design: 'Meta-Analysis',
        population: 'Adults ≥18 with GAD (N=3,847)',
        intervention: 'CBT (various formats)',
        comparator: 'Waitlist, TAU, placebo',
        outcomes: 'Hedges g=0.82 (CI 0.68-0.96)',
        findings: 'CBT highly effective for GAD; effects maintained at 12-month follow-up',
        status: 'complete',
    },
    {
        id: 'Williams 2023',
        authors: 'Williams L, et al.',
        design: 'Systematic Review',
        population: 'Adults with anxiety disorders (N=2,450)',
        intervention: 'Internet-delivered CBT',
        comparator: 'Waitlist, F2F CBT',
        outcomes: 'd=0.68 vs control',
        findings: 'iCBT effective; therapist-guided shows larger effects (d=0.82 vs 0.52)',
        status: 'complete',
    },
    {
        id: 'Thompson 2024',
        authors: 'Thompson R, et al.',
        design: 'Network Meta-Analysis',
        population: 'Adults with major anxiety disorders',
        intervention: 'CBT, SSRIs, Combined',
        comparator: 'Each other + control',
        outcomes: 'NMA rankings provided',
        findings: 'Combined CBT+SSRI most effective; CBT alone preferred for long-term',
        status: 'in-progress',
    },
    {
        id: 'Patel 2023',
        authors: 'Patel V, et al.',
        design: 'Pilot RCT',
        population: 'Treatment-resistant GAD adults (N=68)',
        intervention: 'Mindfulness-enhanced CBT',
        comparator: 'Standard CBT',
        outcomes: 'Hamilton Anxiety Rating Scale',
        findings: '',
        status: 'pending',
    },
    {
        id: "O'Brien 2024",
        authors: "O'Brien K, et al.",
        design: 'Multi-site RCT',
        population: 'Adults with SAD, 12 sites, 6 countries',
        intervention: 'Group-based CBT',
        comparator: 'Individual CBT, waitlist',
        outcomes: 'Liebowitz Social Anxiety Scale',
        findings: '',
        status: 'pending',
    },
];

export function renderExtraction(app: HTMLElement): void {
    const user = appState.get().user;
    if (!user) { router.navigate('/login'); return; }

    const complete = extractionData.filter(d => d.status === 'complete').length;
    const inProgress = extractionData.filter(d => d.status === 'in-progress').length;
    const pending = extractionData.filter(d => d.status === 'pending').length;

    renderAppShell(app, 'extraction', `
    <div class="extraction-container">
      <!-- Toolbar -->
      <div class="extraction-toolbar">
        <div style="flex:1">
          <span style="font-weight:var(--weight-semibold)">${extractionData.length} studies</span>
          <span style="color:var(--text-tertiary);margin-left:var(--space-2)">·</span>
          <span style="color:var(--color-success);margin-left:var(--space-2)">${complete} complete</span>
          <span style="color:var(--text-tertiary);margin-left:var(--space-2)">·</span>
          <span style="color:var(--color-warning);margin-left:var(--space-2)">${inProgress} in progress</span>
          <span style="color:var(--text-tertiary);margin-left:var(--space-2)">·</span>
          <span style="color:var(--text-tertiary);margin-left:var(--space-2)">${pending} pending</span>
        </div>
        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-sm btn-ghost">
            ${icon('filter', 14)} Filter
          </button>
          <button class="btn btn-sm btn-secondary">
            ${icon('settings', 14)} Customize Fields
          </button>
          <button class="btn btn-sm btn-secondary">
            ${icon('download', 14)} Export CSV
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="extraction-table-wrapper">
        <table class="extraction-table">
          <thead>
            <tr>
              <th style="width:100px">Study ID</th>
              <th style="width:120px">Authors</th>
              <th style="width:100px">Design</th>
              <th style="width:160px">Population</th>
              <th style="width:140px">Intervention</th>
              <th style="width:130px">Comparator</th>
              <th style="width:160px">Outcomes</th>
              <th style="width:200px">Key Findings</th>
              <th style="width:80px">Status</th>
            </tr>
          </thead>
          <tbody>
            ${extractionData.map(d => `
              <tr>
                <td>
                  <span style="font-weight:var(--weight-semibold);font-size:var(--text-label)">${d.id}</span>
                </td>
                <td>
                  <span style="font-size:var(--text-label);color:var(--text-secondary)">${d.authors}</span>
                </td>
                <td>
                  <span class="result-tag">${d.design}</span>
                </td>
                <td>
                  <div class="extraction-cell-editable" contenteditable="${d.status !== 'pending'}" tabindex="0">${d.population}</div>
                </td>
                <td>
                  <div class="extraction-cell-editable" contenteditable="${d.status !== 'pending'}" tabindex="0">${d.intervention}</div>
                </td>
                <td>
                  <div class="extraction-cell-editable" contenteditable="${d.status !== 'pending'}" tabindex="0">${d.comparator}</div>
                </td>
                <td>
                  <div class="extraction-cell-editable" contenteditable="${d.status !== 'pending'}" tabindex="0">${d.outcomes}</div>
                </td>
                <td>
                  <div class="extraction-cell-editable" contenteditable="true" tabindex="0" style="min-height:40px">${d.findings || '<span style="color:var(--text-tertiary);font-style:italic">Click to add...</span>'}</div>
                </td>
                <td>
                  <div class="extraction-status">
                    <div class="extraction-status-dot" style="background:${d.status === 'complete' ? 'var(--color-success)' : d.status === 'in-progress' ? 'var(--color-warning)' : 'var(--text-tertiary)'}"></div>
                    <span style="font-size:var(--text-micro);color:var(--text-secondary)">${d.status === 'complete' ? 'Done' : d.status === 'in-progress' ? 'In Progress' : 'Pending'}</span>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Custom Fields Info -->
      <div style="margin-top:var(--space-6);padding:var(--space-5);background:var(--surface-content-bg);border:1px solid var(--surface-content-border);border-radius:var(--radius-xl)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4)">
          <h3 style="font-size:var(--text-body);font-weight:var(--weight-semibold)">Custom Subgroup Fields</h3>
          <button class="btn btn-sm btn-ghost">${icon('plus', 14)} Add Field</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--space-3)">
          ${['Outcome: Anxiety Score', 'Outcome: Quality of Life', 'Risk of Bias', 'Follow-Up Duration', 'Dropout Rate'].map(name => `
            <div style="padding:var(--space-3);background:var(--bg-subtle);border-radius:var(--radius-md);text-align:center">
              <div style="font-size:var(--text-micro);color:var(--text-tertiary);margin-bottom:var(--space-1)">Custom Field</div>
              <div style="font-size:var(--text-label);font-weight:var(--weight-medium)">${name}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top:var(--space-6);text-align:center">
        <button class="btn btn-primary" id="finalizeBtn">
          ${icon('check', 16)} Finalize Included Studies & Proceed to Writing
        </button>
      </div>
    </div>
  `);

    document.getElementById('finalizeBtn')?.addEventListener('click', () => {
        router.navigate('/project/writing');
    });
}
