/* ============================================
   Noora — Screening Pages
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

const mockStudies = [
    {
        id: 1,
        title: 'Cognitive Behavioral Therapy for Generalized Anxiety Disorder: A Systematic Review and Meta-Analysis of Randomized Controlled Trials',
        authors: 'Chen S, Kim J, Rodriguez M, Patel A, Zhang L',
        journal: 'Journal of Clinical Psychology',
        year: 2024,
        doi: '10.1002/jclp.23456',
        abstract: `Background: Generalized anxiety disorder (GAD) is one of the most common anxiety disorders, affecting approximately 6.8 million adults in the United States alone. Cognitive behavioral therapy (CBT) has been widely recognized as a first-line psychological treatment for GAD.

Objective: This systematic review and meta-analysis aimed to comprehensively evaluate the efficacy of CBT for GAD compared to control conditions (waitlist, treatment as usual, placebo) across diverse populations, settings, and delivery formats.

Methods: We searched PubMed, PsycINFO, Cochrane Library, and Web of Science from inception through March 2024. Randomized controlled trials (RCTs) comparing CBT to a control condition in adults diagnosed with GAD (per DSM or ICD criteria) were included. Two reviewers independently screened titles/abstracts and full texts. Data extraction was performed using a standardized form. Risk of bias was assessed using the Cochrane Risk of Bias tool version 2. Random-effects meta-analyses were conducted.

Results: 42 RCTs met inclusion criteria (N = 3,847 participants). CBT demonstrated a large effect size compared to inactive controls (Hedges' g = 0.82, 95% CI 0.68–0.96) and a moderate effect compared to active controls (g = 0.41, 95% CI 0.28–0.54). Effects were maintained at 6-month (g = 0.72) and 12-month follow-up (g = 0.65). No significant moderating effects of delivery format, session number, or participant demographics were found.

Conclusions: CBT is highly effective for GAD across a range of formats and populations. These findings support the continued use of CBT as a first-line treatment for GAD and provide evidence for its long-term durability.`,
        keywords: ['CBT', 'anxiety', 'GAD', 'systematic review', 'meta-analysis', 'RCT'],
    },
    {
        id: 2,
        title: 'Internet-Delivered CBT for Anxiety: Effectiveness, Moderators, and Long-Term Outcomes',
        authors: 'Williams L, Andersson G, Berger T, et al.',
        journal: 'Psychological Medicine',
        year: 2023,
        doi: '10.1017/S0033291723001234',
        abstract: `Digital mental health interventions have grown substantially in recent years, particularly following the COVID-19 pandemic. Internet-delivered cognitive behavioral therapy (iCBT) offers a scalable approach to treating anxiety disorders while reducing barriers to access.

This study investigated the effectiveness of iCBT for anxiety disorders using data from 15 randomized controlled trials (N = 2,450). We examined potential moderators of treatment outcomes including baseline severity, age, gender, comorbidity with depression, and therapist guidance level. Long-term outcomes were assessed at 6, 12, and 24 months post-treatment.

Results indicated that iCBT was significantly more effective than waitlist controls (d = 0.68) but similar to face-to-face CBT (d = 0.05, n.s.). Therapist-guided iCBT showed larger effects than unguided programs (d = 0.82 vs d = 0.52). Treatment gains were maintained over 24 months. Baseline severity and therapist guidance were significant moderators.

Conclusions: iCBT is an effective treatment for anxiety disorders that can extend access to evidence-based care. Therapist guidance enhances outcomes, supporting a stepped-care model of delivery.`,
        keywords: ['iCBT', 'digital intervention', 'anxiety', 'telehealth'],
    },
];

let currentStudyIndex = 0;

export function renderAbstractScreening(app: HTMLElement): void {
    const user = appState.get().user;
    if (!user) { router.navigate('/login'); return; }

    const study = mockStudies[currentStudyIndex];
    const total = 892;
    const screened = 537;
    const included = 156;
    const excluded = 381;
    const conflicts = 12;

    renderAppShell(app, 'screen-abstract', `
    <div class="screening-container">
      <!-- Progress -->
      <div class="screening-progress">
        <div class="screening-progress-info">
          <div class="progress-label">Abstract Screening Progress</div>
          <div class="project-progress-bar" style="height:8px">
            <div class="project-progress-fill" style="width:${Math.round(screened / total * 100)}%"></div>
          </div>
          <div style="font-size:var(--text-micro);color:var(--text-tertiary);margin-top:var(--space-2)" class="tabular-nums">
            ${screened} of ${total} screened (${Math.round(screened / total * 100)}%)
          </div>
        </div>
        <div class="screening-stats">
          <div class="screening-stat">
            <div class="screening-stat-value" style="color:var(--color-success)">${included}</div>
            <div class="screening-stat-label">Included</div>
          </div>
          <div class="screening-stat">
            <div class="screening-stat-value" style="color:var(--color-error)">${excluded}</div>
            <div class="screening-stat-label">Excluded</div>
          </div>
          <div class="screening-stat">
            <div class="screening-stat-value" style="color:var(--color-warning)">${conflicts}</div>
            <div class="screening-stat-label">Conflicts</div>
          </div>
        </div>
      </div>

      <!-- Criteria -->
      <div class="criteria-panel">
        <h3>${icon('clipboard', 16)} Inclusion / Exclusion Criteria</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
          <div class="criteria-list">
            <div class="criteria-item criteria-include">${icon('check', 14)} Adults (≥18) with diagnosed GAD</div>
            <div class="criteria-item criteria-include">${icon('check', 14)} Randomized controlled trial design</div>
            <div class="criteria-item criteria-include">${icon('check', 14)} CBT as the primary intervention</div>
          </div>
          <div class="criteria-list">
            <div class="criteria-item criteria-exclude">${icon('x', 14)} Non-English language publications</div>
            <div class="criteria-item criteria-exclude">${icon('x', 14)} Case studies or case series</div>
            <div class="criteria-item criteria-exclude">${icon('x', 14)} Pediatric populations only</div>
          </div>
        </div>
      </div>

      <!-- Study Card -->
      <div class="screening-card" id="screeningCard">
        <div class="screening-card-header">
          <span class="badge badge-brand">Study ${currentStudyIndex + 1} of ${total - screened}</span>
          <div style="display:flex;align-items:center;gap:var(--space-2)">
            <span style="font-size:var(--text-micro);color:var(--text-tertiary)">Reviewer: Dr. Sarah Chen</span>
            <div style="width:8px;height:8px;border-radius:50%;background:var(--color-success)"></div>
          </div>
        </div>
        <div class="screening-card-body">
          <h2 class="screening-title">${study.title}</h2>
          <div class="screening-abstract">${study.abstract.split('\n\n').map(p => `<p style="margin-bottom:var(--space-4)">${p}</p>`).join('')}</div>
          <div class="screening-meta">
            <span>${icon('user', 14)} ${study.authors}</span>
            <span>${icon('bookmark', 14)} ${study.journal}, ${study.year}</span>
            <span>${icon('globe', 14)} DOI: ${study.doi}</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3)">
            ${study.keywords.map(k => `<span class="result-tag">${k}</span>`).join('')}
          </div>
        </div>
        <div class="screening-actions">
          <button class="btn btn-include" id="includeBtn">
            ${icon('check', 18)} Include
          </button>
          <button class="btn btn-maybe" id="maybeBtn">
            ${icon('clock', 18)} Maybe
          </button>
          <button class="btn btn-exclude" id="excludeBtn">
            ${icon('x', 18)} Exclude
          </button>
        </div>
      </div>

      <!-- Exclusion Reason Dropdown -->
      <div id="excludeReasonPanel" style="display:none">
        <div class="screening-card" style="padding:var(--space-6)">
          <h3 style="margin-bottom:var(--space-4)">Exclusion Reason</h3>
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            <label class="form-checkbox"><input type="radio" name="reason" value="irrelevant" /> Irrelevant topic</label>
            <label class="form-checkbox"><input type="radio" name="reason" value="design" /> Wrong study design</label>
            <label class="form-checkbox"><input type="radio" name="reason" value="population" /> Wrong population</label>
            <label class="form-checkbox"><input type="radio" name="reason" value="intervention" /> Wrong intervention</label>
            <label class="form-checkbox"><input type="radio" name="reason" value="language" /> Non-English language</label>
            <label class="form-checkbox"><input type="radio" name="reason" value="other" /> Other</label>
          </div>
          <div style="display:flex;gap:var(--space-3);margin-top:var(--space-4)">
            <button class="btn btn-secondary btn-sm" id="cancelExclude">Cancel</button>
            <button class="btn btn-primary btn-sm" id="confirmExclude">Confirm Exclusion</button>
          </div>
        </div>
      </div>

      <div class="screening-keyboard-hint">
        Keyboard shortcuts: <kbd>I</kbd> Include · <kbd>M</kbd> Maybe · <kbd>E</kbd> Exclude · <kbd>←</kbd><kbd>→</kbd> Navigate
      </div>
    </div>
  `);

    // Button handlers
    const nextStudy = () => {
        currentStudyIndex = (currentStudyIndex + 1) % mockStudies.length;
        renderAbstractScreening(app);
    };

    document.getElementById('includeBtn')?.addEventListener('click', () => {
        const card = document.getElementById('screeningCard');
        if (card) {
            card.style.transform = 'translateX(100px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.3s';
            setTimeout(nextStudy, 300);
        }
    });

    document.getElementById('maybeBtn')?.addEventListener('click', nextStudy);

    document.getElementById('excludeBtn')?.addEventListener('click', () => {
        document.getElementById('excludeReasonPanel')!.style.display = 'block';
        document.getElementById('screeningCard')!.style.display = 'none';
    });

    document.getElementById('cancelExclude')?.addEventListener('click', () => {
        document.getElementById('excludeReasonPanel')!.style.display = 'none';
        document.getElementById('screeningCard')!.style.display = 'block';
    });

    document.getElementById('confirmExclude')?.addEventListener('click', () => {
        const card = document.getElementById('excludeReasonPanel');
        if (card) {
            card.style.transform = 'translateX(-100px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.3s';
            setTimeout(nextStudy, 300);
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function handler(e: KeyboardEvent) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        if (e.key === 'i' || e.key === 'I') document.getElementById('includeBtn')?.click();
        if (e.key === 'e' || e.key === 'E') document.getElementById('excludeBtn')?.click();
        if (e.key === 'm' || e.key === 'M') document.getElementById('maybeBtn')?.click();
    });
}

export function renderFullTextScreening(app: HTMLElement): void {
    const user = appState.get().user;
    if (!user) { router.navigate('/login'); return; }

    const study = mockStudies[0];

    renderAppShell(app, 'screen-fulltext', `
    <div>
      <!-- Progress -->
      <div class="screening-progress" style="margin-bottom:var(--space-6)">
        <div class="screening-progress-info">
          <div class="progress-label">Full-Text Screening Progress</div>
          <div class="project-progress-bar" style="height:8px">
            <div class="project-progress-fill" style="width:34%"></div>
          </div>
          <div style="font-size:var(--text-micro);color:var(--text-tertiary);margin-top:var(--space-2)" class="tabular-nums">
            17 of 50 screened (34%)
          </div>
        </div>
        <div class="screening-stats">
          <div class="screening-stat">
            <div class="screening-stat-value" style="color:var(--color-success)">12</div>
            <div class="screening-stat-label">Included</div>
          </div>
          <div class="screening-stat">
            <div class="screening-stat-value" style="color:var(--color-error)">5</div>
            <div class="screening-stat-label">Excluded</div>
          </div>
          <div class="screening-stat">
            <div class="screening-stat-value" style="color:var(--color-warning)">2</div>
            <div class="screening-stat-label">Conflicts</div>
          </div>
        </div>
      </div>

      <!-- Split View -->
      <div class="fulltext-split">
        <!-- PDF Viewer -->
        <div class="pdf-viewer">
          <div class="pdf-toolbar">
            <div style="display:flex;align-items:center;gap:var(--space-2)">
              <button class="btn btn-icon btn-ghost btn-sm">${icon('chevronDown', 16)}</button>
              <span style="font-size:var(--text-label);color:var(--text-secondary)">Page 1 of 12</span>
              <button class="btn btn-icon btn-ghost btn-sm" style="transform:rotate(180deg)">${icon('chevronDown', 16)}</button>
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-2)">
              <button class="btn btn-sm btn-ghost">${icon('search', 14)} Find</button>
              <select class="form-input" style="padding:4px 8px;font-size:var(--text-micro);width:80px">
                <option>100%</option>
                <option>125%</option>
                <option>150%</option>
              </select>
            </div>
          </div>
          <div class="pdf-content">
            <div style="text-align:center">
              <div style="font-size:var(--text-page-title);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">
                ${study.title.substring(0, 60)}...
              </div>
              <div style="color:var(--text-secondary);margin-bottom:var(--space-6)">${study.authors}</div>
              <div style="width:80%;margin:0 auto;text-align:left;font-size:var(--text-body);line-height:1.8;color:var(--text-secondary)">
                <p style="margin-bottom:var(--space-4)"><strong>Abstract</strong></p>
                <p>${study.abstract.substring(0, 500)}...</p>
                <p style="margin-top:var(--space-6);color:var(--text-tertiary);font-size:var(--text-label);text-align:center">[PDF content preview — upload a PDF for full viewing]</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Decision Panel -->
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div class="screening-card" style="flex:1">
            <div class="screening-card-header">
              <span class="badge badge-brand">Study 18 of 50</span>
            </div>
            <div class="screening-card-body">
              <h3 style="margin-bottom:var(--space-4)">${study.title}</h3>
              <div style="font-size:var(--text-label);color:var(--text-secondary);margin-bottom:var(--space-4)">${study.authors} · ${study.journal}, ${study.year}</div>
              
              <div style="margin-bottom:var(--space-4)">
                <label class="form-label">Notes & Annotations</label>
                <textarea class="form-input" rows="4" placeholder="Add notes about this study..."></textarea>
              </div>

              <div style="margin-bottom:var(--space-4)">
                <label class="form-label">Tags</label>
                <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
                  <span class="badge badge-brand" style="cursor:pointer">RCT</span>
                  <span class="badge badge-success" style="cursor:pointer">Low Risk of Bias</span>
                  <button class="btn btn-sm btn-ghost">${icon('plus', 12)} Add Tag</button>
                </div>
              </div>
            </div>
            <div class="screening-actions">
              <button class="btn btn-include">${icon('check', 18)} Include</button>
              <button class="btn btn-maybe">${icon('clock', 18)} Maybe</button>
              <button class="btn btn-exclude">${icon('x', 18)} Exclude</button>
            </div>
          </div>
        </div>
      </div>

      <div class="screening-keyboard-hint" style="margin-top:var(--space-4)">
        Keyboard shortcuts: <kbd>I</kbd> Include · <kbd>M</kbd> Maybe · <kbd>E</kbd> Exclude · Upload PDF via drag & drop
      </div>
    </div>
  `);
}
