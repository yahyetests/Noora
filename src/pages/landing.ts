/* ============================================
   Noora — Landing Page
   ============================================ */

import { icon } from '../icons';
import { themeManager } from '../theme';

export function renderLanding(app: HTMLElement): void {
  app.innerHTML = `
    <!-- Navigation -->
    <nav class="landing-nav" id="landingNav">
      <div class="container nav-inner">
        <a href="/" data-link class="nav-brand">
          ${icon('logo', 32)}
          <span>Noora</span>
        </a>
        <div class="nav-links">
          <a href="#academics">For Academics</a>
          <a href="#students">For Students</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>
        <div class="nav-actions">
          <button class="btn btn-icon btn-ghost" id="themeToggle" aria-label="Toggle theme">
            ${themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20)}
          </button>
          <a href="/login" data-link class="btn btn-ghost btn-sm">Log In</a>
          <a href="/register" data-link class="btn btn-primary btn-sm">Get Started Free</a>
          <button class="mobile-menu-btn btn btn-icon btn-ghost" id="mobileMenuBtn">
            ${icon('menu', 24)}
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-badge">
          ${icon('sparkle', 16)}
          <span>Now in Public Beta — Free to use</span>
        </div>
        <h1>
          Systematic Reviews,<br/>
          <span class="gradient-text">Brilliantly Simplified</span>
        </h1>
        <p class="hero-subtitle">
          The all-in-one platform for literature search, screening, data extraction, collaborative writing, and export. Built for researchers, by researchers.
        </p>
        <div class="hero-ctas">
          <a href="/register?role=academic" data-link class="btn btn-primary btn-lg">
            ${icon('award', 20)}
            Get Started as an Academic
          </a>
          <a href="/register?role=student" data-link class="btn btn-secondary btn-lg">
            ${icon('edit', 20)}
            Get Started as a Student
          </a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-value">12,400+</div>
            <div class="hero-stat-label">Researchers Onboard</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">340hrs</div>
            <div class="hero-stat-label">Avg. Saved Per Review</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">2,800+</div>
            <div class="hero-stat-label">Reviews Completed</div>
          </div>
        </div>

        <!-- App Preview -->
        <div class="hero-preview">
          <div class="preview-window">
            <div class="preview-titlebar">
              <span class="preview-dot"></span>
              <span class="preview-dot"></span>
              <span class="preview-dot"></span>
            </div>
            <div class="preview-content">
              <div class="preview-sidebar">
                <div class="preview-sidebar-item active">
                  ${icon('search', 16)} Search
                </div>
                <div class="preview-sidebar-item">
                  ${icon('import', 16)} Import
                </div>
                <div class="preview-sidebar-item">
                  ${icon('eye', 16)} Screening
                </div>
                <div class="preview-sidebar-item">
                  ${icon('table', 16)} Extraction
                </div>
                <div class="preview-sidebar-item">
                  ${icon('edit', 16)} Writing
                </div>
                <div class="preview-sidebar-item">
                  ${icon('download', 16)} Export
                </div>
              </div>
              <div class="preview-main">
                <div class="preview-card" style="display:flex;align-items:center;gap:var(--space-4)">
                  <div style="flex:1">
                    <div style="font-weight:600;margin-bottom:var(--space-2)">Project: Effects of CBT on Anxiety</div>
                    <div style="font-size:var(--text-label);color:var(--text-tertiary)">1,247 references imported · 892 screened · 156 included</div>
                  </div>
                  <span class="badge badge-brand">In Progress</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">
                  <div class="preview-card">
                    <div style="font-size:var(--text-label);color:var(--text-tertiary);margin-bottom:var(--space-2)">Abstract Screening</div>
                    <div style="font-weight:700;font-size:var(--text-section-heading);margin-bottom:var(--space-3)">71%</div>
                    <div class="preview-progress-bar">
                      <div class="preview-progress-fill" style="width:71%"></div>
                    </div>
                  </div>
                  <div class="preview-card">
                    <div style="font-size:var(--text-label);color:var(--text-tertiary);margin-bottom:var(--space-2)">Full-Text Review</div>
                    <div style="font-weight:700;font-size:var(--text-section-heading);margin-bottom:var(--space-3)">34%</div>
                    <div class="preview-progress-bar">
                      <div class="preview-progress-fill" style="width:34%"></div>
                    </div>
                  </div>
                  <div class="preview-card">
                    <div style="font-size:var(--text-label);color:var(--text-tertiary);margin-bottom:var(--space-2)">Data Extraction</div>
                    <div style="font-weight:700;font-size:var(--text-section-heading);margin-bottom:var(--space-3)">12%</div>
                    <div class="preview-progress-bar">
                      <div class="preview-progress-fill" style="width:12%"></div>
                    </div>
                  </div>
                </div>
                <div class="preview-card" style="flex:1">
                  <div style="font-weight:600;margin-bottom:var(--space-3)">Recent Activity</div>
                  <div style="display:flex;flex-direction:column;gap:var(--space-3)">
                    <div style="display:flex;align-items:center;gap:var(--space-3);font-size:var(--text-label);color:var(--text-secondary)">
                      <span style="width:8px;height:8px;border-radius:50%;background:var(--color-success);flex-shrink:0"></span>
                      Dr. Chen included 12 references in abstract screening
                    </div>
                    <div style="display:flex;align-items:center;gap:var(--space-3);font-size:var(--text-label);color:var(--text-secondary)">
                      <span style="width:8px;height:8px;border-radius:50%;background:var(--brand-purple);flex-shrink:0"></span>
                      Sarah uploaded 3 PDFs for full-text review
                    </div>
                    <div style="display:flex;align-items:center;gap:var(--space-3);font-size:var(--text-label);color:var(--text-secondary)">
                      <span style="width:8px;height:8px;border-radius:50%;background:var(--brand-blue);flex-shrink:0"></span>
                      2 screening conflicts need resolution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Audience Section -->
    <section class="section audience-section" id="academics">
      <div class="container">
        <div class="section-header">
          <div class="section-label">${icon('users', 16)} Built For Your Workflow</div>
          <h2>Whether you lead a lab or write a thesis</h2>
          <p>Tailored experiences for both senior academics managing teams and students navigating their first review.</p>
        </div>
        <div class="audience-grid">
          <!-- Academics Card -->
          <div class="audience-card" id="students">
            <div class="audience-icon">${icon('award', 28)}</div>
            <h3>For Academics & PIs</h3>
            <p>Oversee your team's systematic reviews with powerful project management, unlimited collaborators, and PRISMA-compliant workflows.</p>
            <div class="audience-features">
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Invite unlimited reviewers and collaborators</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Real-time oversight of screening progress</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Conflict resolution dashboard for dual screening</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Auto-generated PRISMA flow diagrams</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Export to Word, PDF, or LaTeX in one click</span>
              </div>
            </div>
            <a href="/register?role=academic" data-link class="btn btn-primary">
              Start as an Academic ${icon('arrowRight', 16)}
            </a>
          </div>
          <!-- Students Card -->
          <div class="audience-card">
            <div class="audience-icon">${icon('edit', 28)}</div>
            <h3>For Students & RAs</h3>
            <p>Navigate your literature review with confidence. Guided workflows, free-tier access, and easy collaboration with your advisor.</p>
            <div class="audience-features">
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Free tier with up to 3 collaborators</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Step-by-step guided review process</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Integrated Notion-like document editor</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Built-in citation management (/cite command)</span>
              </div>
              <div class="audience-feature">
                ${icon('check', 16)}
                <span>Perfect for thesis lit reviews & class projects</span>
              </div>
            </div>
            <a href="/register?role=student" data-link class="btn btn-primary">
              Start as a Student ${icon('arrowRight', 16)}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features-section" id="features">
      <div class="container">
        <div class="section-header">
          <div class="section-label">${icon('layers', 16)} Platform Features</div>
          <h2>Everything you need, nothing you don't</h2>
          <p>From search to publication, every step of your systematic review in one elegant workspace.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">${icon('search', 24)}</div>
            <h3>Multi-Database Search</h3>
            <p>Search PubMed, Scopus, Web of Science, IEEE Xplore, and more — all from a single query bar with Boolean & MeSH support.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('filter', 24)}</div>
            <h3>Smart Screening</h3>
            <p>Title/abstract and full-text screening with dual-reviewer mode, conflict detection, keyboard shortcuts, and real-time progress tracking.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('table', 24)}</div>
            <h3>Structured Extraction</h3>
            <p>Customizable data extraction forms with side-by-side PDF viewing. Define your own fields and templates per project.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('edit', 24)}</div>
            <h3>Collaborative Editor</h3>
            <p>A Notion-like rich text editor with /slash commands, real-time multi-user editing, inline citations, and auto-generated bibliographies.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('download', 24)}</div>
            <h3>Export Anywhere</h3>
            <p>One-click export to Word (.docx), PDF, and LaTeX (.tex + .bib). Plus CSV data exports and RIS/BibTeX reference files.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">${icon('users', 24)}</div>
            <h3>Team Collaboration</h3>
            <p>Role-based access (Admin, Reviewer, Collaborator) with granular permissions, audit trails, and real-time team presence indicators.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-label">${icon('zap', 16)} How It Works</div>
          <h2>From question to publication in 5 steps</h2>
          <p>A streamlined, PRISMA-compliant workflow that guides you through every stage of your systematic review.</p>
        </div>
        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-number">1</div>
            <h4>Search</h4>
            <p>Query multiple databases and import references automatically.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">2</div>
            <h4>Screen</h4>
            <p>Title/abstract then full-text screening with dual-reviewer support.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">3</div>
            <h4>Extract</h4>
            <p>Pull key data using customizable forms alongside full-text PDFs.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">4</div>
            <h4>Write</h4>
            <p>Collaboratively write your review with integrated citations.</p>
          </div>
          <div class="workflow-step">
            <div class="step-number">5</div>
            <h4>Export</h4>
            <p>Generate Word, PDF, or LaTeX outputs with PRISMA diagrams.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="section">
      <div class="container">

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-text">
              "Noora cut our systematic review timeline from 8 months to under 3. The dual-screening workflow and automatic conflict resolution saved our team countless hours of coordination."
            </div>
            <div class="testimonial-author">
              <div class="testimonial-avatar">AC</div>
              <div class="testimonial-info">
                <h4>Prof. Aisha Chen</h4>
                <p>Department of Public Health, Stanford University</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-text">
              "As a grad student, I was overwhelmed by the review process. Noora's guided workflow and citation manager made my thesis literature review actually manageable — and the free tier was perfect."
            </div>
            <div class="testimonial-author">
              <div class="testimonial-avatar">MR</div>
              <div class="testimonial-info">
                <h4>Marcus Rodriguez</h4>
                <p>PhD Candidate, Biomedical Engineering, MIT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <h2>Start Your Literature Review Today</h2>
          <p>Join thousands of researchers who've streamlined their systematic reviews with Noora.</p>
          <a href="/register" data-link class="btn btn-lg">
            Create Free Account ${icon('arrowRight', 20)}
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-brand">
              ${icon('logo', 28)}
              <span>Noora</span>
            </div>
            <p>The modern platform for systematic literature reviews and academic research collaboration.</p>
          </div>
          <div class="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="/how-it-works" data-link>How It Works</a>
            <a href="/pricing" data-link>Pricing</a>
            <a href="/contact" data-link>Contact</a>
          </div>
          <div class="footer-col">
            <h4>For Users</h4>
            <a href="/for-academics" data-link>For Academics</a>
            <a href="/for-students" data-link>For Students</a>
            <a href="/register" data-link>Sign Up</a>
            <a href="/login" data-link>Log In</a>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <a href="/privacy" data-link>Privacy Policy</a>
            <a href="/terms" data-link>Terms of Service</a>
            <a href="/contact" data-link>Contact Us</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Noora. All rights reserved.</span>
          <span>Built with care for the research community</span>
        </div>
      </div>
    </footer>
  `;

  // ── Scroll handler for navbar ──
  const nav = document.getElementById('landingNav');
  const handleScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ── Theme toggle ──
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    themeManager.toggle();
    if (themeBtn) themeBtn.innerHTML = themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20);
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ── Animate progress bars ──
  setTimeout(() => {
    document.querySelectorAll('.preview-progress-fill').forEach(el => {
      const width = (el as HTMLElement).style.width;
      (el as HTMLElement).style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          (el as HTMLElement).style.width = width;
        });
      });
    });
  }, 800);

  // ── Intersection Observer for scroll animations ──
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.audience-card, .feature-card, .workflow-step, .testimonial-card').forEach(el => {
    el.classList.add('animate-target');
    observer.observe(el);
  });
}
