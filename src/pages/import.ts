/* ============================================
   Noora — Import / Reference Library Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

const importedReferences = [
  { id: 'REF-001', title: 'Cognitive Behavioral Therapy for Anxiety Disorders in Youth: A Meta-Analysis', authors: 'Smith J, Chen L, Williams R', journal: 'J Clinical Psychology', year: 2023, source: 'PubMed', doi: '10.1234/jcp.2023.001', status: 'included' },
  { id: 'REF-002', title: 'Effectiveness of CBT vs. Medication in Adolescent Anxiety Treatment', authors: 'Garcia M, Johnson K, Lee S', journal: 'JAMA Psychiatry', year: 2022, source: 'Scopus', doi: '10.1234/jama.2022.045', status: 'included' },
  { id: 'REF-003', title: 'School-Based Interventions for Childhood Anxiety: A Systematic Review', authors: 'Brown A, Davis T, Wilson P', journal: 'School Psychology Review', year: 2023, source: 'PubMed', doi: '10.1234/spr.2023.012', status: 'pending' },
  { id: 'REF-004', title: 'Parent-Delivered CBT for Child Anxiety: Randomized Controlled Trial', authors: 'Taylor R, Anderson M', journal: 'Behaviour Research and Therapy', year: 2021, source: 'Web of Science', doi: '10.1234/brat.2021.089', status: 'excluded' },
  { id: 'REF-005', title: 'Digital CBT Interventions for Anxiety in Young People', authors: 'Patel S, Thompson E, Ali H', journal: 'Digital Health', year: 2024, source: 'Scopus', doi: '10.1234/dh.2024.033', status: 'pending' },
  { id: 'REF-006', title: 'Long-term Outcomes of CBT for Generalized Anxiety Disorder', authors: 'Kim J, Park Y, Choi W', journal: 'J Anxiety Disorders', year: 2022, source: 'PubMed', doi: '10.1234/jad.2022.067', status: 'included' },
  { id: 'REF-007', title: 'Group vs. Individual CBT for Social Anxiety in Adolescents', authors: 'Martinez C, Lopez A', journal: 'Clinical Child Psychology', year: 2023, source: 'IEEE', doi: '10.1234/ccpp.2023.044', status: 'duplicate' },
  { id: 'REF-008', title: 'Mindfulness-Augmented CBT for Pediatric Anxiety', authors: 'Nguyen T, Roberts J, Evans K', journal: 'Mindfulness', year: 2024, source: 'PubMed', doi: '10.1234/mind.2024.019', status: 'pending' },
];

export function renderImport(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) { router.navigate('/login'); return; }

  const statusColors: Record<string, string> = {
    included: 'var(--color-success)',
    excluded: 'var(--color-error)',
    pending: 'var(--brand-purple)',
    duplicate: 'var(--color-warning)',
  };

  renderAppShell(app, 'import', `
    <div class="import-page">
      <!-- Import Header -->
      <div class="page-header">
        <div>
          <h1>Reference Library</h1>
          <p class="page-subtitle">${importedReferences.length} references imported · ${importedReferences.filter(r => r.status === 'included').length} included · ${importedReferences.filter(r => r.status === 'duplicate').length} duplicates detected</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-ghost" id="deduplicateBtn">${icon('refreshCw', 16)} De-duplicate</button>
          <button class="btn btn-primary" id="uploadBtn">${icon('upload', 16)} Upload File</button>
        </div>
      </div>

      <!-- Import Methods -->
      <div class="import-methods">
        <div class="import-method-card" id="uploadRisCard">
          <div class="import-method-icon">${icon('upload', 24)}</div>
          <h3>Upload Citation File</h3>
          <p>Import RIS, BibTeX, or EndNote XML files from your reference manager.</p>
          <span class="badge badge-brand">RIS · BibTeX · XML</span>
        </div>
        <div class="import-method-card" id="importDoiCard">
          <div class="import-method-icon">${icon('link', 24)}</div>
          <h3>Import by ID</h3>
          <p>Paste DOIs, PMIDs, or arXiv IDs to automatically fetch reference metadata.</p>
          <span class="badge badge-brand">DOI · PMID · arXiv</span>
        </div>
        <div class="import-method-card" id="searchImportCard">
          <div class="import-method-icon">${icon('search', 24)}</div>
          <h3>Search & Import</h3>
          <p>Search databases directly and add results to your library.</p>
          <span class="badge badge-brand">PubMed · Scopus · More</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="import-filter-bar">
        <div class="filter-group">
          <button class="filter-chip active" data-filter="all">All (${importedReferences.length})</button>
          <button class="filter-chip" data-filter="included">Included (${importedReferences.filter(r => r.status === 'included').length})</button>
          <button class="filter-chip" data-filter="pending">Pending (${importedReferences.filter(r => r.status === 'pending').length})</button>
          <button class="filter-chip" data-filter="excluded">Excluded (${importedReferences.filter(r => r.status === 'excluded').length})</button>
          <button class="filter-chip" data-filter="duplicate">Duplicates (${importedReferences.filter(r => r.status === 'duplicate').length})</button>
        </div>
        <div class="filter-search">
          ${icon('search', 16)}
          <input type="text" placeholder="Search references..." class="filter-search-input" id="refSearch" />
        </div>
      </div>

      <!-- Reference Table -->
      <div class="ref-table-wrap">
        <table class="ref-table">
          <thead>
            <tr>
              <th style="width:36px"><input type="checkbox" id="selectAll" /></th>
              <th>Reference</th>
              <th style="width:120px">Source</th>
              <th style="width:70px">Year</th>
              <th style="width:100px">Status</th>
              <th style="width:60px"></th>
            </tr>
          </thead>
          <tbody>
            ${importedReferences.map(ref => `
              <tr class="ref-row" data-status="${ref.status}">
                <td><input type="checkbox" class="ref-check" /></td>
                <td>
                  <div class="ref-title">${ref.title}</div>
                  <div class="ref-meta">${ref.authors} · ${ref.journal} · ${ref.doi}</div>
                </td>
                <td><span class="badge badge-brand" style="font-size:11px">${ref.source}</span></td>
                <td style="font-variant-numeric:tabular-nums">${ref.year}</td>
                <td>
                  <span class="ref-status" style="color:${statusColors[ref.status]}">
                    <span class="ref-status-dot" style="background:${statusColors[ref.status]}"></span>
                    ${ref.status.charAt(0).toUpperCase() + ref.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button class="btn btn-icon btn-ghost btn-sm">${icon('trash', 14)}</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Proceed -->
      <div class="import-footer">
        <div class="import-footer-info">
          ${icon('alertCircle', 16)}
          <span>${importedReferences.filter(r => r.status === 'pending').length} references pending review. Proceed to screening when ready.</span>
        </div>
        <a href="/project/screen-abstract" data-link class="btn btn-primary">
          Proceed to Screening ${icon('arrowRight', 16)}
        </a>
      </div>
    </div>
  `);

  // Upload modal simulation
  document.getElementById('uploadBtn')?.addEventListener('click', () => showUploadModal());
  document.getElementById('uploadRisCard')?.addEventListener('click', () => showUploadModal());

  document.getElementById('importDoiCard')?.addEventListener('click', () => showDoiModal());

  document.getElementById('searchImportCard')?.addEventListener('click', () => {
    router.navigate('/project/search');
  });

  // De-duplicate
  document.getElementById('deduplicateBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('deduplicateBtn') as HTMLButtonElement;
    if (btn) {
      btn.innerHTML = `${icon('check', 16)} 1 Duplicate Removed`;
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = `${icon('refreshCw', 16)} De-duplicate`;
        btn.disabled = false;
      }, 2000);
    }
  });

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      document.querySelectorAll('.ref-row').forEach(row => {
        const status = row.getAttribute('data-status');
        (row as HTMLElement).style.display = (filter === 'all' || status === filter) ? '' : 'none';
      });
    });
  });

  // Select all
  document.getElementById('selectAll')?.addEventListener('change', (e) => {
    const checked = (e.target as HTMLInputElement).checked;
    document.querySelectorAll('.ref-check').forEach(cb => {
      (cb as HTMLInputElement).checked = checked;
    });
  });
}

function showUploadModal(): void {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Upload Citation File</h3>
        <button class="btn btn-icon btn-ghost modal-close">${icon('x', 18)}</button>
      </div>
      <div class="modal-body">
        <div class="upload-dropzone" id="dropzone">
          ${icon('upload', 32)}
          <p>Drag & drop your file here, or click to browse</p>
          <span class="upload-formats">Supported: .ris, .bib, .xml, .nbib, .enw</span>
          <input type="file" id="fileInput" accept=".ris,.bib,.xml,.nbib,.enw" style="display:none" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="importFileBtn">${icon('upload', 16)} Import File</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.modal-close')?.addEventListener('click', () => overlay.remove());
  overlay.querySelector('.modal-cancel')?.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  const dropzone = overlay.querySelector('#dropzone');
  dropzone?.addEventListener('click', () => {
    (overlay.querySelector('#fileInput') as HTMLInputElement)?.click();
  });

  overlay.querySelector('#importFileBtn')?.addEventListener('click', () => {
    const btn = overlay.querySelector('#importFileBtn') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 16)} 12 References Imported`;
    btn.disabled = true;
    setTimeout(() => overlay.remove(), 1500);
  });
}

function showDoiModal(): void {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Import by Identifier</h3>
        <button class="btn btn-icon btn-ghost modal-close">${icon('x', 18)}</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Paste DOIs, PMIDs, or arXiv IDs (one per line)</label>
          <textarea class="form-input" rows="6" placeholder="10.1234/example.2024.001&#10;PMID: 12345678&#10;arXiv:2401.12345"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="lookupBtn">${icon('search', 16)} Look Up & Import</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.modal-close')?.addEventListener('click', () => overlay.remove());
  overlay.querySelector('.modal-cancel')?.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelector('#lookupBtn')?.addEventListener('click', () => {
    const btn = overlay.querySelector('#lookupBtn') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 16)} 3 References Found & Imported`;
    btn.disabled = true;
    setTimeout(() => overlay.remove(), 1500);
  });
}
