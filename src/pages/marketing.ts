/* ============================================
   Noora — Marketing Pages
   ============================================ */

import { icon } from '../icons';
import { themeManager } from '../theme';

function marketingShell(content: string, activeNav: string): string {
  return `
    <nav class="landing-nav scrolled" id="landingNav">
      <div class="container nav-inner">
        <a href="/" data-link class="nav-brand">
          ${icon('logo', 32)}
          <span>Noora</span>
        </a>
        <div class="nav-links">
          <a href="/for-academics" data-link class="${activeNav === 'academics' ? 'active' : ''}">For Academics</a>
          <a href="/for-students" data-link class="${activeNav === 'students' ? 'active' : ''}">For Students</a>
          <a href="/how-it-works" data-link class="${activeNav === 'how-it-works' ? 'active' : ''}">How It Works</a>
          <a href="/pricing" data-link class="${activeNav === 'pricing' ? 'active' : ''}">Pricing</a>
        </div>
        <div class="nav-actions">
          <button class="btn btn-icon btn-ghost" id="themeToggle" aria-label="Toggle theme">
            ${themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20)}
          </button>
          <a href="/login" data-link class="btn btn-ghost btn-sm">Log In</a>
          <a href="/register" data-link class="btn btn-primary btn-sm">Get Started Free</a>
        </div>
      </div>
    </nav>
    ${content}
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-brand">${icon('logo', 28)}<span>Noora</span></div>
            <p>The modern platform for systematic literature reviews and academic research collaboration.</p>
          </div>
          <div class="footer-col">
            <h4>Product</h4>
            <a href="/how-it-works" data-link>How It Works</a>
            <a href="/pricing" data-link>Pricing</a>
            <a href="/contact" data-link>Contact</a>
          </div>
          <div class="footer-col">
            <h4>For Users</h4>
            <a href="/for-academics" data-link>For Academics</a>
            <a href="/for-students" data-link>For Students</a>
            <a href="/register" data-link>Sign Up</a>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <a href="/privacy" data-link>Privacy Policy</a>
            <a href="/terms" data-link>Terms of Service</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; 2026 Noora. All rights reserved.</span>
          <span>Built with care for the research community</span>
        </div>
      </div>
    </footer>
  `;
}

function bindMarketingEvents(): void {
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    themeManager.toggle();
    if (themeBtn) themeBtn.innerHTML = themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20);
  });
}

/* ── For Academics ── */
export function renderForAcademics(app: HTMLElement): void {
  app.innerHTML = marketingShell(`
    <section class="mkt-hero">
      <div class="container">
        <div class="mkt-hero-badge">${icon('award', 16)}<span>For Academics & PIs</span></div>
        <h1>Lead Your Reviews<br/><span class="gradient-text">With Confidence</span></h1>
        <p class="mkt-hero-sub">Oversee your team's systematic reviews with powerful project management, unlimited collaborators, and PRISMA-compliant workflows — all in one place.</p>
        <div class="hero-ctas">
          <a href="/register?role=academic" data-link class="btn btn-primary btn-lg">${icon('arrowRight', 20)} Start Free as an Academic</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Built for Research Leaders</h2>
          <p>Every feature designed to help PIs and faculty manage large-scale systematic reviews efficiently.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">${icon('users', 24)}</div>
            <h3>Unlimited Collaborators</h3>
            <p>Invite your entire team — grad students, postdocs, and co-investigators — with no limits on paid plans.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('shield', 24)}</div>
            <h3>Role-Based Access</h3>
            <p>Assign Admin, Reviewer, or Collaborator roles with granular stage-level permissions for each team member.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('eye', 24)}</div>
            <h3>Dual-Reviewer Screening</h3>
            <p>Independent screening with automatic conflict detection and a dedicated resolution dashboard.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('barChart', 24)}</div>
            <h3>PRISMA Compliance</h3>
            <p>Auto-generated PRISMA flow diagrams and full audit trails for transparent, reproducible methodology.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('download', 24)}</div>
            <h3>Publication-Ready Export</h3>
            <p>Export to Word, PDF, or LaTeX with properly formatted citations and bibliography in one click.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('activity', 24)}</div>
            <h3>Activity Monitoring</h3>
            <p>Track who screened what, when data was extracted, and review team progress in real time.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <h2>Accelerate Your Next Systematic Review</h2>
          <p>Join thousands of academic researchers who trust Noora for their literature reviews.</p>
          <a href="/register?role=academic" data-link class="btn btn-lg">Create Free Account ${icon('arrowRight', 20)}</a>
        </div>
      </div>
    </section>
  `, 'academics');
  bindMarketingEvents();
}

/* ── For Students ── */
export function renderForStudents(app: HTMLElement): void {
  app.innerHTML = marketingShell(`
    <section class="mkt-hero">
      <div class="container">
        <div class="mkt-hero-badge">${icon('edit', 16)}<span>For Students & RAs</span></div>
        <h1>Your Thesis Review,<br/><span class="gradient-text">Made Simple</span></h1>
        <p class="mkt-hero-sub">Navigate your first literature review with confidence. Guided workflows, free-tier access, and easy collaboration with your advisor.</p>
        <div class="hero-ctas">
          <a href="/register?role=student" data-link class="btn btn-primary btn-lg">${icon('arrowRight', 20)} Start Free as a Student</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Everything a Student Needs</h2>
          <p>From your first search to your final submission, Noora guides you every step of the way.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">${icon('compass', 24)}</div>
            <h3>Guided Workflow</h3>
            <p>Step-by-step process from search to export. Never wonder what comes next in your review.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('users', 24)}</div>
            <h3>Free Collaboration</h3>
            <p>Invite up to 3 collaborators on the free tier — perfect for working with your advisor or study group.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('edit', 24)}</div>
            <h3>Notion-Like Editor</h3>
            <p>Write your review with a familiar, modern editor. Use /slash commands for headings, citations, and tables.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('bookmark', 24)}</div>
            <h3>Built-In Citations</h3>
            <p>Insert citations with /cite, auto-generate your bibliography, and switch between APA, Vancouver, and more.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('search', 24)}</div>
            <h3>Multi-Database Search</h3>
            <p>Search PubMed, Scopus, and more from a single interface. No more juggling between database websites.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('download', 24)}</div>
            <h3>Easy Export</h3>
            <p>Download your finished review as Word, PDF, or LaTeX — ready for thesis submission or journal publication.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <h2>Start Your Literature Review Today</h2>
          <p>Free to use, no credit card required. Perfect for thesis projects and coursework.</p>
          <a href="/register?role=student" data-link class="btn btn-lg">Create Free Account ${icon('arrowRight', 20)}</a>
        </div>
      </div>
    </section>
  `, 'students');
  bindMarketingEvents();
}

/* ── How It Works ── */
export function renderHowItWorks(app: HTMLElement): void {
  app.innerHTML = marketingShell(`
    <section class="mkt-hero">
      <div class="container">
        <div class="mkt-hero-badge">${icon('zap', 16)}<span>How It Works</span></div>
        <h1>From Question to<br/><span class="gradient-text">Publication in 5 Steps</span></h1>
        <p class="mkt-hero-sub">A streamlined, PRISMA-compliant workflow that guides you through every stage of your systematic review.</p>
      </div>
    </section>

    <section class="section hiw-section">
      <div class="container">
        <div class="hiw-steps">
          <div class="hiw-step">
            <div class="hiw-step-num">1</div>
            <div class="hiw-step-content">
              <h3>Search & Import</h3>
              <p>Query multiple databases simultaneously — PubMed, Scopus, Web of Science, IEEE Xplore, and more. Use Boolean operators and MeSH terms. Import results or upload RIS/BibTeX files from your existing reference manager.</p>
              <div class="hiw-features">
                <span class="badge badge-brand">Boolean Search</span>
                <span class="badge badge-brand">MeSH Terms</span>
                <span class="badge badge-brand">Auto De-duplication</span>
                <span class="badge badge-brand">RIS/BibTeX Import</span>
              </div>
            </div>
          </div>

          <div class="hiw-step">
            <div class="hiw-step-num">2</div>
            <div class="hiw-step-content">
              <h3>Title & Abstract Screening</h3>
              <p>Review references one at a time with clear Include/Exclude/Maybe actions. Keyboard shortcuts for power users. Dual-reviewer mode with automatic conflict detection ensures rigorous screening.</p>
              <div class="hiw-features">
                <span class="badge badge-brand">Keyboard Shortcuts</span>
                <span class="badge badge-brand">Dual Reviewer</span>
                <span class="badge badge-brand">Conflict Resolution</span>
                <span class="badge badge-brand">Exclusion Reasons</span>
              </div>
            </div>
          </div>

          <div class="hiw-step">
            <div class="hiw-step-num">3</div>
            <div class="hiw-step-content">
              <h3>Full-Text Screening</h3>
              <p>Review PDFs in a split-pane view with the screening form alongside. Upload PDFs, add notes and tags, and make final inclusion decisions with the full paper at your fingertips.</p>
              <div class="hiw-features">
                <span class="badge badge-brand">PDF Viewer</span>
                <span class="badge badge-brand">Split-Pane Layout</span>
                <span class="badge badge-brand">Notes & Tags</span>
                <span class="badge badge-brand">Open Access Lookup</span>
              </div>
            </div>
          </div>

          <div class="hiw-step">
            <div class="hiw-step-num">4</div>
            <div class="hiw-step-content">
              <h3>Data Extraction</h3>
              <p>Extract key data using customizable forms. View the PDF side-by-side while filling in population, intervention, outcomes, and results. Add custom fields to match your protocol.</p>
              <div class="hiw-features">
                <span class="badge badge-brand">Custom Fields</span>
                <span class="badge badge-brand">Table & Form Views</span>
                <span class="badge badge-brand">Auto-Save</span>
                <span class="badge badge-brand">PDF Side-by-Side</span>
              </div>
            </div>
          </div>

          <div class="hiw-step">
            <div class="hiw-step-num">5</div>
            <div class="hiw-step-content">
              <h3>Write & Export</h3>
              <p>Write your review in a collaborative Notion-like editor with /slash commands and inline citations. Export to Word, PDF, or LaTeX with a fully formatted bibliography and PRISMA flow diagram.</p>
              <div class="hiw-features">
                <span class="badge badge-brand">Rich Text Editor</span>
                <span class="badge badge-brand">Inline Citations</span>
                <span class="badge badge-brand">Word/PDF/LaTeX</span>
                <span class="badge badge-brand">PRISMA Diagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <h2>Ready to Streamline Your Review?</h2>
          <p>Start your first project in minutes. Free to use, no credit card required.</p>
          <a href="/register" data-link class="btn btn-lg">Get Started Free ${icon('arrowRight', 20)}</a>
        </div>
      </div>
    </section>
  `, 'how-it-works');
  bindMarketingEvents();
}

/* ── Pricing ── */
export function renderPricing(app: HTMLElement): void {
  app.innerHTML = marketingShell(`
    <section class="mkt-hero">
      <div class="container">
        <div class="mkt-hero-badge">${icon('creditCard', 16)}<span>Simple Pricing</span></div>
        <h1>Plans That Scale<br/><span class="gradient-text">With Your Research</span></h1>
        <p class="mkt-hero-sub">Start free, upgrade when you need more. No hidden fees, no surprises.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="pricing-grid">
          <!-- Free -->
          <div class="pricing-card">
            <div class="pricing-tier">Free</div>
            <div class="pricing-price"><span class="pricing-amount">$0</span><span class="pricing-period">/month</span></div>
            <p class="pricing-desc">Perfect for individual students and small projects.</p>
            <ul class="pricing-features">
              <li>${icon('check', 16)} 1 active project</li>
              <li>${icon('check', 16)} Up to 3 collaborators</li>
              <li>${icon('check', 16)} 500 references per project</li>
              <li>${icon('check', 16)} Basic search (PubMed, Scopus)</li>
              <li>${icon('check', 16)} Title/abstract screening</li>
              <li>${icon('check', 16)} Document editor with citations</li>
              <li>${icon('check', 16)} Export to Word & PDF</li>
            </ul>
            <a href="/register" data-link class="btn btn-secondary" style="width:100%">Get Started Free</a>
          </div>

          <!-- Pro -->
          <div class="pricing-card pricing-featured">
            <div class="pricing-popular">Most Popular</div>
            <div class="pricing-tier">Pro</div>
            <div class="pricing-price"><span class="pricing-amount">$19</span><span class="pricing-period">/month</span></div>
            <p class="pricing-desc">For grad students and active researchers running reviews.</p>
            <ul class="pricing-features">
              <li>${icon('check', 16)} 5 active projects</li>
              <li>${icon('check', 16)} Up to 10 collaborators</li>
              <li>${icon('check', 16)} Unlimited references</li>
              <li>${icon('check', 16)} All database integrations</li>
              <li>${icon('check', 16)} Full-text screening + PDF viewer</li>
              <li>${icon('check', 16)} Data extraction with custom fields</li>
              <li>${icon('check', 16)} LaTeX export + PRISMA diagrams</li>
              <li>${icon('check', 16)} Dual-reviewer screening</li>
            </ul>
            <a href="/register" data-link class="btn btn-primary" style="width:100%">Start 14-Day Free Trial</a>
          </div>

          <!-- Team -->
          <div class="pricing-card">
            <div class="pricing-tier">Team</div>
            <div class="pricing-price"><span class="pricing-amount">$49</span><span class="pricing-period">/month</span></div>
            <p class="pricing-desc">For labs, departments, and multi-PI research groups.</p>
            <ul class="pricing-features">
              <li>${icon('check', 16)} Unlimited projects</li>
              <li>${icon('check', 16)} Unlimited collaborators</li>
              <li>${icon('check', 16)} Unlimited references</li>
              <li>${icon('check', 16)} All Pro features included</li>
              <li>${icon('check', 16)} Granular role permissions</li>
              <li>${icon('check', 16)} Audit trail & activity log</li>
              <li>${icon('check', 16)} Priority support</li>
              <li>${icon('check', 16)} SSO / institutional login</li>
            </ul>
            <a href="/contact" data-link class="btn btn-secondary" style="width:100%">Contact Sales</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <h4>Can I switch plans later?</h4>
            <p>Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.</p>
          </div>
          <div class="faq-item">
            <h4>Is there a student discount?</h4>
            <p>Students with a valid .edu email get 50% off Pro plans. Contact us with your student ID for verification.</p>
          </div>
          <div class="faq-item">
            <h4>What happens to my data if I downgrade?</h4>
            <p>Your data is never deleted. If you exceed free-tier limits, projects become read-only until you upgrade or remove excess projects.</p>
          </div>
          <div class="faq-item">
            <h4>Do you offer institutional licensing?</h4>
            <p>Yes! We offer volume discounts for universities and research institutions. Contact our sales team to learn more.</p>
          </div>
        </div>
      </div>
    </section>
  `, 'pricing');
  bindMarketingEvents();
}

/* ── Contact ── */
export function renderContact(app: HTMLElement): void {
  app.innerHTML = marketingShell(`
    <section class="mkt-hero">
      <div class="container">
        <div class="mkt-hero-badge">${icon('send', 16)}<span>Get in Touch</span></div>
        <h1>We'd Love to<br/><span class="gradient-text">Hear From You</span></h1>
        <p class="mkt-hero-sub">Questions about Noora? Need help with your account? Want to discuss institutional licensing? Reach out anytime.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrap">
            <h3>Send Us a Message</h3>
            <form class="contact-form" id="contactForm">
              <div class="form-row">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-input" placeholder="Your name" required />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" class="form-input" placeholder="you@university.edu" required />
                </div>
              </div>
              <div class="form-group">
                <label>Subject</label>
                <select class="form-input">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Institutional Licensing</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                </select>
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea class="form-input" rows="5" placeholder="Tell us how we can help..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="width:100%">${icon('send', 18)} Send Message</button>
            </form>
          </div>
          <div class="contact-info">
            <div class="contact-info-item">
              <div class="contact-info-icon">${icon('mail', 24)}</div>
              <div>
                <h4>Email</h4>
                <p>support@noora.app</p>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-info-icon">${icon('helpCircle', 24)}</div>
              <div>
                <h4>Help Center</h4>
                <p>Browse our knowledge base for quick answers to common questions.</p>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-info-icon">${icon('clock', 24)}</div>
              <div>
                <h4>Response Time</h4>
                <p>We typically respond within 24 hours during business days.</p>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-info-icon">${icon('users', 24)}</div>
              <div>
                <h4>Sales & Partnerships</h4>
                <p>sales@noora.app</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `, '');

  bindMarketingEvents();

  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 18)} Message Sent!`;
    btn.disabled = true;
    btn.style.background = 'var(--color-success)';
    setTimeout(() => {
      btn.innerHTML = `${icon('send', 18)} Send Message`;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}
