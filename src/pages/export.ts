/* ============================================
   Noora — Export Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

export function renderExport(app: HTMLElement): void {
    const user = appState.get().user;
    if (!user) { router.navigate('/login'); return; }

    renderAppShell(app, 'export', `
    <div class="export-container">
      <div style="margin-bottom:var(--space-8)">
        <h2 style="font-size:var(--text-page-title);margin-bottom:var(--space-2)">Export Your Work</h2>
        <p style="color:var(--text-secondary);max-width:600px">Download your manuscript, data, references, and PRISMA diagrams in industry-standard formats, ready for submission or further analysis.</p>
      </div>

      <!-- Document Export -->
      <h3 style="font-size:var(--text-section-heading);margin-bottom:var(--space-4)">
        ${icon('fileText', 20)} Manuscript Export
      </h3>
      <div class="export-grid">
        <div class="export-card" id="exportDocx">
          <div class="export-icon">${icon('fileText', 28)}</div>
          <h3>Microsoft Word</h3>
          <p>Formatted .docx with headings, citations, bibliography, and tables preserved.</p>
          <span class="export-format">.docx</span>
        </div>

        <div class="export-card" id="exportPdf">
          <div class="export-icon">${icon('eye', 28)}</div>
          <h3>PDF Document</h3>
          <p>Print-ready PDF with proper formatting, title page, and page numbers.</p>
          <span class="export-format">.pdf</span>
        </div>

        <div class="export-card" id="exportLatex">
          <div class="export-icon">${icon('edit', 28)}</div>
          <h3>LaTeX + BibTeX</h3>
          <p>LaTeX .tex file with a companion .bib for Overleaf or local editing.</p>
          <span class="export-format">.tex + .bib</span>
        </div>
      </div>

      <!-- Data Export -->
      <h3 style="font-size:var(--text-section-heading);margin-bottom:var(--space-4);margin-top:var(--space-8)">
        ${icon('table', 20)} Data Export
      </h3>
      <div class="export-grid">
        <div class="export-card">
          <div class="export-icon">${icon('table', 28)}</div>
          <h3>Extraction Data</h3>
          <p>All extracted fields across included studies as a spreadsheet.</p>
          <span class="export-format">.csv / .xlsx</span>
        </div>

        <div class="export-card">
          <div class="export-icon">${icon('database', 28)}</div>
          <h3>Reference Library</h3>
          <p>Full reference library with metadata for import into Zotero, EndNote, or Mendeley.</p>
          <span class="export-format">.ris / .bib</span>
        </div>

        <div class="export-card">
          <div class="export-icon">${icon('clipboard', 28)}</div>
          <h3>Audit Trail</h3>
          <p>Complete activity log with who screened, extracted, and decided on each reference.</p>
          <span class="export-format">.csv</span>
        </div>
      </div>

      <!-- PRISMA Diagram -->
      <h3 style="font-size:var(--text-section-heading);margin-bottom:var(--space-4);margin-top:var(--space-8)">
        ${icon('barChart', 20)} PRISMA Flow Diagram
      </h3>
      <div class="prisma-preview">
        <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">Auto-generated from your screening data. Ready for download or inclusion in your manuscript.</p>
        <div class="prisma-flow">
          <div class="prisma-box highlighted">
            <strong>Identification</strong><br/>
            Records identified through database searching<br/>
            <span style="font-size:var(--text-section-heading);font-weight:var(--weight-bold);color:var(--brand-purple)" class="tabular-nums">n = 1,247</span>
          </div>
          <div class="prisma-arrow"></div>
          <div class="prisma-branch">
            <div>
              <div class="prisma-box">
                <strong>Screening</strong><br/>
                Records after duplicates removed<br/>
                <span style="font-weight:var(--weight-bold)" class="tabular-nums">n = 892</span>
              </div>
              <div class="prisma-arrow" style="margin:0 auto"></div>
              <div class="prisma-box">
                Records screened (title/abstract)<br/>
                <span style="font-weight:var(--weight-bold)" class="tabular-nums">n = 892</span>
              </div>
            </div>
            <div style="padding-top:40px">
              <div class="prisma-box" style="border-color:var(--color-error);color:var(--color-error)">
                Records excluded<br/>
                <span style="font-weight:var(--weight-bold)" class="tabular-nums">n = 736</span>
              </div>
            </div>
          </div>
          <div class="prisma-arrow"></div>
          <div class="prisma-branch">
            <div>
              <div class="prisma-box">
                <strong>Eligibility</strong><br/>
                Full-text articles assessed<br/>
                <span style="font-weight:var(--weight-bold)" class="tabular-nums">n = 156</span>
              </div>
            </div>
            <div style="padding-top:20px">
              <div class="prisma-box" style="border-color:var(--color-error);color:var(--color-error)">
                Full-text excluded with reasons<br/>
                <span style="font-weight:var(--weight-bold)" class="tabular-nums">n = 114</span>
              </div>
            </div>
          </div>
          <div class="prisma-arrow"></div>
          <div class="prisma-box highlighted">
            <strong>Included</strong><br/>
            Studies included in qualitative synthesis<br/>
            <span style="font-size:var(--text-section-heading);font-weight:var(--weight-bold);color:var(--brand-purple)" class="tabular-nums">n = 42</span>
          </div>
          <div class="prisma-arrow"></div>
          <div class="prisma-box highlighted">
            Studies included in meta-analysis<br/>
            <span style="font-size:var(--text-section-heading);font-weight:var(--weight-bold);color:var(--brand-purple)" class="tabular-nums">n = 38</span>
          </div>
        </div>
        <div style="margin-top:var(--space-8);display:flex;gap:var(--space-3);justify-content:center">
          <button class="btn btn-secondary btn-sm">
            ${icon('download', 14)} Download as SVG
          </button>
          <button class="btn btn-secondary btn-sm">
            ${icon('download', 14)} Download as PNG
          </button>
          <button class="btn btn-primary btn-sm">
            ${icon('edit', 14)} Insert into Document
          </button>
        </div>
      </div>

      <!-- Preview Section -->
      <div style="margin-top:var(--space-10);text-align:center;padding:var(--space-8);background:var(--surface-content-bg);border:1px solid var(--surface-content-border);border-radius:var(--radius-xl)">
        <h3 style="margin-bottom:var(--space-3)">Ready to Export?</h3>
        <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">Preview how your document will look in the selected format before downloading.</p>
        <div style="display:flex;gap:var(--space-3);justify-content:center">
          <button class="btn btn-secondary">
            ${icon('eye', 16)} Preview Document
          </button>
          <button class="btn btn-primary btn-lg">
            ${icon('download', 18)} Export All
          </button>
        </div>
      </div>
    </div>
  `);

    // Export handlers (simulate download feedback)
    ['exportDocx', 'exportPdf', 'exportLatex'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', () => {
            const card = document.getElementById(id);
            if (card) {
                const orig = card.innerHTML;
                card.innerHTML = `
          <div class="export-icon" style="background:var(--color-success-soft);color:var(--color-success)">${icon('check', 28)}</div>
          <h3 style="color:var(--color-success)">Downloaded!</h3>
          <p style="font-size:var(--text-label);color:var(--text-secondary)">File saved to Downloads folder</p>
        `;
                setTimeout(() => { card.innerHTML = orig; }, 2000);
            }
        });
    });
}
