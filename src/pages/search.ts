/* ============================================
   Noora — Literature Search Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

const mockResults = [
    {
        title: 'Cognitive Behavioral Therapy for Generalized Anxiety Disorder: A Systematic Review and Meta-Analysis of Randomized Controlled Trials',
        authors: 'Chen S, Kim J, Rodriguez M, Patel A, Zhang L',
        journal: 'Journal of Clinical Psychology, 2024; 80(3): 234-251',
        abstract: 'Background: Generalized anxiety disorder (GAD) affects approximately 6.8 million adults in the United States. Cognitive behavioral therapy (CBT) has been widely studied as a treatment for GAD. Objective: This systematic review and meta-analysis aimed to evaluate the efficacy of CBT for GAD across diverse populations...',
        doi: '10.1002/jclp.23456',
        year: 2024,
        source: 'PubMed',
    },
    {
        title: 'Internet-Delivered CBT for Anxiety: Effectiveness, Moderators, and Long-Term Outcomes',
        authors: 'Williams L, Andersson G, Berger T, et al.',
        journal: 'Psychological Medicine, 2023; 53(12): 1890-1905',
        abstract: 'Digital mental health interventions have grown substantially in recent years. This study investigated the effectiveness of internet-delivered cognitive behavioral therapy (iCBT) for anxiety disorders, examining potential moderators including severity, age, and comorbidity...',
        doi: '10.1017/S0033291723001234',
        year: 2023,
        source: 'Scopus',
    },
    {
        title: 'Comparative Effectiveness of CBT, SSRI, and Combined Treatment for Anxiety Disorders in Adults',
        authors: 'Thompson R, Garcia E, Nakamura K, Brown D',
        journal: 'The Lancet Psychiatry, 2024; 11(1): 45-58',
        abstract: 'This network meta-analysis compared the efficacy and acceptability of cognitive behavioral therapy (CBT), selective serotonin reuptake inhibitors (SSRIs), and their combination for the treatment of major anxiety disorders. We searched five databases from inception to June 2023...',
        doi: '10.1016/S2215-0366(23)00345-9',
        year: 2024,
        source: 'Web of Science',
    },
    {
        title: 'Mindfulness-Enhanced CBT for Treatment-Resistant Anxiety: A Pilot RCT',
        authors: 'Patel V, Srinivasan R, Desai M, Kumar A',
        journal: 'Behaviour Research and Therapy, 2023; 168: 104382',
        abstract: 'Treatment-resistant anxiety remains a significant clinical challenge. This pilot randomized controlled trial evaluated a novel mindfulness-enhanced CBT (ME-CBT) protocol for adults with GAD who failed to respond to standard CBT or pharmacotherapy...',
        doi: '10.1016/j.brat.2023.104382',
        year: 2023,
        source: 'PubMed',
    },
    {
        title: 'Group-Based Cognitive Behavioral Therapy for Social Anxiety Disorder: A Multi-Site Clinical Trial',
        authors: 'O\'Brien K, Fischer H, Lundqvist D, et al.',
        journal: 'JAMA Psychiatry, 2024; 81(2): 156-168',
        abstract: 'Social anxiety disorder (SAD) is among the most prevalent anxiety disorders globally. This multi-site randomized controlled trial compared group-based CBT with individual CBT and waitlist control for SAD across 12 clinical sites in 6 countries...',
        doi: '10.1001/jamapsychiatry.2023.4567',
        year: 2024,
        source: 'PubMed',
    },
];

export function renderSearch(app: HTMLElement): void {
    const user = appState.get().user;
    if (!user) { router.navigate('/login'); return; }

    const databases = ['PubMed', 'Scopus', 'Web of Science', 'IEEE Xplore', 'Google Scholar', 'arXiv', 'Cochrane Library', 'CINAHL'];

    renderAppShell(app, 'search', `
    <div class="search-container">
      <div class="search-bar-wrapper">
        <div class="search-input-row">
          <input type="text" class="search-main-input" id="searchInput"
            placeholder="e.g. (CBT OR &quot;cognitive behavioral therapy&quot;) AND anxiety AND RCT"
            value='(CBT OR "cognitive behavioral therapy") AND (anxiety OR GAD) AND randomized' />
          <button class="btn btn-primary" id="searchBtn">
            ${icon('search', 18)} Search
          </button>
        </div>

        <div style="font-size:var(--text-label);font-weight:var(--weight-semibold);color:var(--text-secondary);margin-bottom:var(--space-3)">
          Databases
        </div>
        <div class="db-checkboxes" id="dbCheckboxes">
          ${databases.map((db, i) => `
            <label class="db-checkbox ${i < 3 ? 'checked' : ''}" data-db="${db}">
              <input type="checkbox" ${i < 3 ? 'checked' : ''} />
              ${db}
            </label>
          `).join('')}
        </div>

        <div style="display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap">
          <span style="font-size:var(--text-label);color:var(--text-secondary)">Filters:</span>
          <input type="number" class="form-input search-filter-input" placeholder="Year from" value="2018" />
          <input type="number" class="form-input search-filter-input" placeholder="Year to" value="2024" />
          <select class="form-input search-filter-input" style="width:150px">
            <option>All languages</option>
            <option selected>English</option>
          </select>
          <label class="db-checkbox checked">
            <input type="checkbox" checked />
            MeSH terms
          </label>
        </div>
      </div>

      <!-- Results -->
      <div id="searchResults">
        <div class="search-results-header">
          <div>
            <span style="font-weight:var(--weight-semibold)">${mockResults.length} results</span>
            <span style="color:var(--text-tertiary);margin-left:var(--space-2)">from 3 databases · 12 duplicates removed</span>
          </div>
          <div style="display:flex;gap:var(--space-3)">
            <button class="btn btn-sm btn-ghost" id="selectAllBtn">Select All</button>
            <button class="btn btn-sm btn-primary" id="importSelectedBtn">
              ${icon('import', 14)} Import Selected (0)
            </button>
          </div>
        </div>

        <div class="search-results">
          ${mockResults.map((r, i) => `
            <div class="result-card">
              <div class="result-checkbox">
                <input type="checkbox" data-index="${i}" class="result-check" />
              </div>
              <div class="result-content">
                <div class="result-title">${r.title}</div>
                <div class="result-authors">${r.authors}</div>
                <div class="result-journal">${r.journal}</div>
                <div class="result-abstract">${r.abstract}</div>
                <div class="result-meta">
                  <span class="result-tag">${r.source}</span>
                  <span class="result-tag">${r.year}</span>
                  <span class="result-tag">DOI: ${r.doi}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);

    // Database toggle
    document.querySelectorAll('.db-checkbox').forEach(el => {
        el.addEventListener('click', () => {
            const input = el.querySelector('input') as HTMLInputElement;
            if (input) {
                el.classList.toggle('checked', input.checked);
            }
        });
    });

    // Select all
    let selectedCount = 0;
    const updateCount = () => {
        const btn = document.getElementById('importSelectedBtn');
        const checks = document.querySelectorAll('.result-check:checked');
        selectedCount = checks.length;
        if (btn) btn.innerHTML = `${icon('import', 14)} Import Selected (${selectedCount})`;
    };

    document.getElementById('selectAllBtn')?.addEventListener('click', () => {
        const checks = document.querySelectorAll('.result-check') as NodeListOf<HTMLInputElement>;
        const allChecked = Array.from(checks).every(c => c.checked);
        checks.forEach(c => c.checked = !allChecked);
        updateCount();
    });

    document.querySelectorAll('.result-check').forEach(el => {
        el.addEventListener('change', updateCount);
    });

    // Import
    document.getElementById('importSelectedBtn')?.addEventListener('click', () => {
        if (selectedCount > 0) {
            router.navigate('/project/screen-abstract');
        }
    });
}
