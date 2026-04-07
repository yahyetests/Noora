/* ============================================
   Noora — Writing (Synthesis) Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { renderAppShell } from './shell';

export function renderWriting(app: HTMLElement): void {
    const user = appState.get().user;
    if (!user) { router.navigate('/login'); return; }

    renderAppShell(app, 'writing', `
    <div class="writing-container">
      <!-- Toolbar -->
      <div class="writing-toolbar" id="writingToolbar">
        <button class="toolbar-btn" title="Bold"><strong>B</strong></button>
        <button class="toolbar-btn" title="Italic"><em>I</em></button>
        <button class="toolbar-btn" title="Underline"><u>U</u></button>
        <div class="toolbar-divider"></div>
        <button class="toolbar-btn" title="Heading 1"><strong>H1</strong></button>
        <button class="toolbar-btn" title="Heading 2"><strong>H2</strong></button>
        <button class="toolbar-btn" title="Heading 3"><strong>H3</strong></button>
        <div class="toolbar-divider"></div>
        <button class="toolbar-btn" title="Bullet List">${icon('grid', 16)}</button>
        <button class="toolbar-btn" title="Quote">${icon('quote', 16)}</button>
        <button class="toolbar-btn" title="Table">${icon('table', 16)}</button>
        <div class="toolbar-divider"></div>
        <button class="toolbar-btn" title="Insert Citation" id="citeBtn" style="color:var(--brand-purple);font-weight:600;font-size:var(--text-label)">
          ${icon('bookmark', 16)} /cite
        </button>
        <button class="toolbar-btn" title="Insert Image">${icon('layers', 16)}</button>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--color-success)"></div>
          <span style="font-size:var(--text-micro);color:var(--text-tertiary)">Auto-saved</span>
        </div>
        <select class="form-input" style="padding:4px 8px;font-size:var(--text-micro);width:100px">
          <option>APA 7th</option>
          <option>Vancouver</option>
          <option>Harvard</option>
          <option>IEEE</option>
        </select>
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--brand-gradient);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700">SC</div>
          <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#F59E0B,#EF4444);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700">JK</div>
          <span style="font-size:var(--text-micro);color:var(--text-tertiary)">2 editing</span>
        </div>
      </div>

      <!-- Editor -->
      <div class="writing-editor">
        <div class="editor-content" contenteditable="true" id="editor" spellcheck="true">
          <h1>Effects of Cognitive Behavioral Therapy on Generalized Anxiety Disorder: A Systematic Review and Meta-Analysis</h1>

          <h2>1. Introduction</h2>
          <p>Generalized anxiety disorder (GAD) is one of the most prevalent mental health conditions worldwide, affecting approximately 3.7% of the global population <span class="editor-citation">(Bandelow & Michaelis, 2015)</span>. Characterized by persistent and excessive worry about various life domains, GAD significantly impairs quality of life, social functioning, and occupational performance <span class="editor-citation">(Hoffman et al., 2008)</span>.</p>

          <p>Cognitive behavioral therapy (CBT) has been established as a first-line psychological treatment for anxiety disorders. CBT targets maladaptive thought patterns and avoidance behaviors through a structured, time-limited approach that combines cognitive restructuring with behavioral exposure techniques <span class="editor-citation">(Beck, 2011)</span>.</p>

          <p>Despite the established efficacy of CBT for GAD, several questions remain regarding its comparative effectiveness across delivery formats (individual vs. group, face-to-face vs. digital), populations, and long-term maintenance of gains. This systematic review and meta-analysis aims to address these gaps by synthesizing the most current evidence from randomized controlled trials.</p>

          <h2>2. Methods</h2>

          <h3>2.1 Search Strategy</h3>
          <p>We conducted a comprehensive search of PubMed, PsycINFO, Cochrane Library, Web of Science, and Scopus from inception through March 2024. Search terms included combinations of "cognitive behavioral therapy" OR "CBT," "generalized anxiety disorder" OR "GAD," and "randomized controlled trial" OR "RCT." Medical Subject Headings (MeSH) were used where applicable. The complete search strategy is provided in Appendix A.</p>

          <h3>2.2 Eligibility Criteria</h3>
          <p>Studies were included if they: (1) enrolled adults ≥18 years with a primary diagnosis of GAD per DSM or ICD criteria; (2) utilized a randomized controlled trial design; (3) compared CBT to a control condition; and (4) reported quantitative outcome measures. Studies were excluded if they focused exclusively on pediatric populations, used case study designs, or were not available in English.</p>

          <h3>2.3 Data Extraction and Quality Assessment</h3>
          <p>Two independent reviewers (SC and JK) extracted data using a standardized form. Discrepancies were resolved through discussion with a third reviewer (MR). Risk of bias was assessed using the Cochrane Risk of Bias tool version 2 <span class="editor-citation">(Sterne et al., 2019)</span>. Inter-rater reliability for full-text screening was κ = 0.89, indicating excellent agreement.</p>

          <h2>3. Results</h2>

          <h3>3.1 Study Selection</h3>
          <p>Our search identified 1,247 records across five databases. After removing 355 duplicates, 892 titles and abstracts were screened. Of these, 156 were selected for full-text review, and 42 studies meeting all inclusion criteria were included in the final synthesis <span class="editor-citation">(Chen et al., 2024)</span>.</p>

          <h3>3.2 Main Findings</h3>
          <p>CBT demonstrated a large effect size compared to inactive controls (Hedges' <em>g</em> = 0.82, 95% CI [0.68, 0.96], <em>p</em> < .001). Internet-delivered CBT showed comparable efficacy to face-to-face delivery (<em>d</em> = 0.05, <em>p</em> = .87), with therapist-guided programs outperforming unguided ones <span class="editor-citation">(Williams et al., 2023)</span>.</p>

          <blockquote>"The evidence strongly supports CBT as a first-line treatment for GAD, with durable effects maintained over 12-month follow-up periods across diverse populations and delivery formats."</blockquote>

          <h2>4. Discussion</h2>
          <p>The findings of this systematic review provide robust evidence for the efficacy of CBT in treating GAD across multiple dimensions. The overall effect size of 0.82 is consistent with previous meta-analyses and confirms CBT's position as a gold-standard psychological intervention for anxiety disorders.</p>

          <p>Notably, the comparable efficacy of internet-delivered CBT to face-to-face delivery has significant implications for increasing access to evidence-based mental health care, particularly in underserved populations and geographic regions with limited specialist availability <span class="editor-citation">(Thompson et al., 2024)</span>.</p>

          <h2>References</h2>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em;margin-bottom:var(--space-2)">Bandelow, B., & Michaelis, S. (2015). Epidemiology of anxiety disorders in the 21st century. <em>Dialogues in Clinical Neuroscience</em>, 17(3), 327-335.</p>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em;margin-bottom:var(--space-2)">Beck, J. S. (2011). <em>Cognitive Behavior Therapy: Basics and Beyond</em> (2nd ed.). Guilford Press.</p>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em;margin-bottom:var(--space-2)">Chen, S., Kim, J., Rodriguez, M., Patel, A., & Zhang, L. (2024). Cognitive behavioral therapy for generalized anxiety disorder. <em>Journal of Clinical Psychology</em>, 80(3), 234-251.</p>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em;margin-bottom:var(--space-2)">Hoffman, D. L., Dukes, E. M., & Wittchen, H. U. (2008). Human and economic burden of GAD. <em>Depression and Anxiety</em>, 25(1), 72-90.</p>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em;margin-bottom:var(--space-2)">Sterne, J. A. C., et al. (2019). RoB 2: A revised tool for assessing risk of bias in randomised trials. <em>BMJ</em>, 366, l4898.</p>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em;margin-bottom:var(--space-2)">Thompson, R., Garcia, E., Nakamura, K., & Brown, D. (2024). Comparative effectiveness of CBT, SSRI, and combined treatment. <em>The Lancet Psychiatry</em>, 11(1), 45-58.</p>
          <p style="padding-left:2em;text-indent:-2em;color:var(--text-secondary);font-size:0.95em">Williams, L., Andersson, G., Berger, T., et al. (2023). Internet-delivered CBT for anxiety. <em>Psychological Medicine</em>, 53(12), 1890-1905.</p>
        </div>
      </div>

      <!-- TOC Sidebar -->
      <aside class="writing-sidebar">
        <h4>Outline</h4>
        <a class="writing-toc-item active">Introduction</a>
        <a class="writing-toc-item">Methods</a>
        <a class="writing-toc-item" style="padding-left:var(--space-5)">Search Strategy</a>
        <a class="writing-toc-item" style="padding-left:var(--space-5)">Eligibility Criteria</a>
        <a class="writing-toc-item" style="padding-left:var(--space-5)">Data Extraction</a>
        <a class="writing-toc-item">Results</a>
        <a class="writing-toc-item" style="padding-left:var(--space-5)">Study Selection</a>
        <a class="writing-toc-item" style="padding-left:var(--space-5)">Main Findings</a>
        <a class="writing-toc-item">Discussion</a>
        <a class="writing-toc-item">References</a>

        <h4 style="margin-top:var(--space-6)">Statistics</h4>
        <div style="font-size:var(--text-micro);color:var(--text-tertiary);display:flex;flex-direction:column;gap:var(--space-1)">
          <span class="tabular-nums">2,847 words</span>
          <span class="tabular-nums">7 citations</span>
          <span class="tabular-nums">0 figures</span>
          <span class="tabular-nums">0 tables</span>
        </div>
      </aside>
    </div>
  `);

    // Toolbar button interaction
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });
}
