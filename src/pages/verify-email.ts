/* ============================================
   Noora — Email Verification Page
   ============================================ */

import { icon } from '../icons';
import { router } from '../router';

export function renderVerifyEmail(app: HTMLElement): void {
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <a href="/" data-link class="auth-brand">${icon('logo', 36)}<span>Noora</span></a>

          <div class="verify-email-content" id="verifyContent">
            <div class="verify-icon">${icon('mail', 48)}</div>
            <h2>Check Your Email</h2>
            <p class="verify-desc">
              We've sent a verification link to your email address. Click the link to activate your account and get started.
            </p>

            <div class="verify-email-box" id="emailDisplay">
              <span class="verify-email-label">Sent to:</span>
              <span class="verify-email-addr">user@university.edu</span>
            </div>

            <div class="verify-actions">
              <button class="btn btn-primary btn-lg" id="verifyBtn" style="width:100%">
                ${icon('check', 18)} I've Verified My Email
              </button>
              <button class="btn btn-ghost" id="resendBtn">
                ${icon('refreshCw', 16)} Resend Verification Email
              </button>
            </div>

            <div class="verify-help">
              <p>Didn't receive the email? Check your spam folder or try a different email address.</p>
              <a href="/register" data-link>Use a different email &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('verifyBtn')?.addEventListener('click', () => {
    const content = document.getElementById('verifyContent');
    if (content) {
      content.innerHTML = `
        <div class="verify-icon verify-success">${icon('checkCircle', 48)}</div>
        <h2>Email Verified!</h2>
        <p class="verify-desc">Your account has been activated. Let's set up your workspace.</p>
        <button class="btn btn-primary btn-lg" id="continueBtn" style="width:100%">
          Continue to Onboarding ${icon('arrowRight', 18)}
        </button>
      `;
      document.getElementById('continueBtn')?.addEventListener('click', () => {
        router.navigate('/onboarding');
      });
    }
  });

  document.getElementById('resendBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('resendBtn') as HTMLButtonElement;
    if (btn) {
      btn.innerHTML = `${icon('check', 16)} Email Resent!`;
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = `${icon('refreshCw', 16)} Resend Verification Email`;
        btn.disabled = false;
      }, 3000);
    }
  });
}
