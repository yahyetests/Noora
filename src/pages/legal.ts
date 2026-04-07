/* ============================================
   Noora — Legal Pages (Privacy & Terms)
   ============================================ */

import { icon } from '../icons';
import { themeManager } from '../theme';

function legalShell(title: string, content: string): string {
  return `
    <nav class="landing-nav scrolled" id="landingNav">
      <div class="container nav-inner">
        <a href="/" data-link class="nav-brand">${icon('logo', 32)}<span>Noora</span></a>
        <div class="nav-actions">
          <button class="btn btn-icon btn-ghost" id="themeToggle" aria-label="Toggle theme">
            ${themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20)}
          </button>
          <a href="/login" data-link class="btn btn-ghost btn-sm">Log In</a>
          <a href="/register" data-link class="btn btn-primary btn-sm">Get Started Free</a>
        </div>
      </div>
    </nav>
    <section class="legal-page">
      <div class="container" style="max-width:800px">
        <h1>${title}</h1>
        <p class="legal-updated">Last updated: April 1, 2026</p>
        ${content}
      </div>
    </section>
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-bottom">
          <span>&copy; 2026 Noora. All rights reserved.</span>
          <span><a href="/privacy" data-link>Privacy</a> · <a href="/terms" data-link>Terms</a></span>
        </div>
      </div>
    </footer>
  `;
}

function bindLegalEvents(): void {
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    themeManager.toggle();
    if (themeBtn) themeBtn.innerHTML = themeManager.theme === 'dark' ? icon('sun', 20) : icon('moon', 20);
  });
}

export function renderPrivacy(app: HTMLElement): void {
  app.innerHTML = legalShell('Privacy Policy', `
    <h2>1. Introduction</h2>
    <p>Noora ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>

    <h2>2. Information We Collect</h2>
    <h3>Personal Information</h3>
    <p>When you create an account, we collect your name, email address, institutional affiliation, and role (academic or student). If you use social login (Google, ORCID), we receive basic profile information from those providers.</p>
    <h3>Usage Data</h3>
    <p>We automatically collect information about how you interact with our platform, including pages visited, features used, search queries executed, and time spent on different stages of your review workflow.</p>
    <h3>Research Data</h3>
    <p>We store the references, extracted data, documents, and other project content you create on our platform. This data belongs to you and your team.</p>

    <h2>3. How We Use Your Information</h2>
    <ul>
      <li>To provide and maintain our platform services</li>
      <li>To manage your account and project access</li>
      <li>To facilitate collaboration between team members</li>
      <li>To improve our platform through usage analytics</li>
      <li>To communicate with you about your account, updates, and support</li>
      <li>To ensure security and prevent unauthorized access</li>
    </ul>

    <h2>4. Data Sharing</h2>
    <p>We do not sell your personal information. We may share data with:</p>
    <ul>
      <li>Team members you invite to your projects (they see project content only)</li>
      <li>Service providers who help us operate the platform (hosting, analytics)</li>
      <li>Law enforcement when required by law</li>
    </ul>

    <h2>5. Data Security</h2>
    <p>We implement industry-standard security measures including encryption in transit (HTTPS/TLS), encryption at rest, secure password hashing, and two-factor authentication options. We conduct regular security audits.</p>

    <h2>6. Data Retention</h2>
    <p>Your account data is retained as long as your account is active. Project data is retained for 12 months after project completion. You can request data deletion at any time through your account settings or by contacting us.</p>

    <h2>7. Your Rights</h2>
    <p>You have the right to access, correct, export, and delete your personal data. You can manage most of these through your account settings. For data export, use our built-in export features (Word, PDF, CSV, RIS).</p>

    <h2>8. Cookies</h2>
    <p>We use essential cookies for authentication and session management. We use analytics cookies to understand platform usage. You can control cookie preferences through your browser settings.</p>

    <h2>9. Contact Us</h2>
    <p>For privacy-related questions, contact us at <strong>privacy@noora.app</strong> or visit our <a href="/contact" data-link>contact page</a>.</p>
  `);
  bindLegalEvents();
}

export function renderTerms(app: HTMLElement): void {
  app.innerHTML = legalShell('Terms of Service', `
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using Noora, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>

    <h2>2. Description of Service</h2>
    <p>Noora is a web-based platform for conducting systematic literature reviews and academic research collaboration. We provide tools for literature search, reference management, screening, data extraction, collaborative writing, and export.</p>

    <h2>3. Account Registration</h2>
    <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your credentials and for all activities under your account. You must be at least 16 years old to use the platform.</p>

    <h2>4. User Content</h2>
    <p>You retain ownership of all content you create on the platform, including references, extracted data, documents, and project configurations. By using our platform, you grant us a limited license to store, process, and display your content as necessary to provide our services.</p>

    <h2>5. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the platform for any unlawful purpose</li>
      <li>Share your account credentials with others</li>
      <li>Attempt to access other users' data without authorization</li>
      <li>Interfere with or disrupt the platform's infrastructure</li>
      <li>Use automated tools to scrape or extract data from the platform beyond normal API usage</li>
      <li>Upload malicious content or files</li>
    </ul>

    <h2>6. Collaboration & Roles</h2>
    <p>Project administrators are responsible for managing team access. When you invite collaborators, you grant them access to project content according to their assigned role. Removing a collaborator revokes their access.</p>

    <h2>7. Subscription & Billing</h2>
    <p>Free accounts are subject to usage limits. Paid subscriptions are billed monthly or annually. You can cancel at any time; access continues until the end of the billing period. Refunds are handled on a case-by-case basis.</p>

    <h2>8. Intellectual Property</h2>
    <p>The Noora platform, including its design, code, and branding, is owned by us and protected by intellectual property laws. Your use of the platform does not grant you any ownership rights in our intellectual property.</p>

    <h2>9. Limitation of Liability</h2>
    <p>Noora is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount you paid us in the 12 months preceding the claim.</p>

    <h2>10. Changes to Terms</h2>
    <p>We may update these terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.</p>

    <h2>11. Contact</h2>
    <p>For questions about these terms, contact us at <strong>legal@noora.app</strong> or visit our <a href="/contact" data-link>contact page</a>.</p>
  `);
  bindLegalEvents();
}
