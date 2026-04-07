/* ============================================
   Noora — Main Entry Point
   ============================================ */

// Styles
import './styles/global.css';
import './styles/landing.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/workflow.css';
import './styles/animations.css';
import './styles/marketing.css';

// Modules
import { router } from './router';
import './theme'; // initialize theme
import { appState } from './state';

// Pages
import { renderLanding } from './pages/landing';
import { renderLogin, renderRegister, renderMFA } from './pages/auth';
import { renderAuthCallback } from './pages/callback';
import { renderDashboard } from './pages/dashboard';
import { renderSearch } from './pages/search';
import { renderAbstractScreening, renderFullTextScreening } from './pages/screening';
import { renderExtraction } from './pages/extraction';
import { renderWriting } from './pages/writing';
import { renderExport } from './pages/export';
import { renderForAcademics, renderForStudents, renderHowItWorks, renderPricing, renderContact } from './pages/marketing';
import { renderPrivacy, renderTerms } from './pages/legal';
import { renderVerifyEmail } from './pages/verify-email';
import { renderOnboarding } from './pages/onboarding';
import { renderImport } from './pages/import';
import { renderSettings } from './pages/settings';
import { renderTeam } from './pages/team';
import { renderProjectSettings } from './pages/project-settings';
import { renderActivity } from './pages/activity';

const app = document.getElementById('app')!;

// Register routes
router.addRoute('/', () => {
  if (appState.get().isLoggedIn) {
    router.navigate('/dashboard');
  } else {
    renderLanding(app);
  }
});

// Auth routes
router.addRoute('/login', () => renderLogin(app));
router.addRoute('/register', () => renderRegister(app));
router.addRoute('/mfa', () => renderMFA(app));
router.addRoute('/verify-email', () => renderVerifyEmail(app));
router.addRoute('/onboarding', () => renderOnboarding(app));
router.addRoute('/auth/callback', () => renderAuthCallback(app));

// Marketing routes
router.addRoute('/for-academics', () => renderForAcademics(app));
router.addRoute('/for-students', () => renderForStudents(app));
router.addRoute('/how-it-works', () => renderHowItWorks(app));
router.addRoute('/pricing', () => renderPricing(app));
router.addRoute('/contact', () => renderContact(app));

// Legal routes
router.addRoute('/privacy', () => renderPrivacy(app));
router.addRoute('/terms', () => renderTerms(app));

// Dashboard
router.addRoute('/dashboard', () => renderDashboard(app));

// Account settings
router.addRoute('/settings', () => renderSettings(app));

// Project workflow routes
router.addRoute('/project/search', () => renderSearch(app));
router.addRoute('/project/import', () => renderImport(app));
router.addRoute('/project/screen-abstract', () => renderAbstractScreening(app));
router.addRoute('/project/screen-fulltext', () => renderFullTextScreening(app));
router.addRoute('/project/extraction', () => renderExtraction(app));
router.addRoute('/project/writing', () => renderWriting(app));
router.addRoute('/project/export', () => renderExport(app));

// Project management routes
router.addRoute('/project/team', () => renderTeam(app));
router.addRoute('/project/settings', () => renderProjectSettings(app));
router.addRoute('/project/activity', () => renderActivity(app));

// 404 fallback
router.setNotFound(() => {
  app.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem">
      <h1 style="font-size:6rem;font-weight:800;background:var(--brand-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem">404</h1>
      <p style="color:var(--text-secondary);margin-bottom:2rem;font-size:1.25rem">Page not found</p>
      <a href="/" data-link class="btn btn-primary">Return Home</a>
    </div>
  `;
});

// Initialize: restore session then start router
async function init() {
  // Show loading state
  app.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh">
      <div style="text-align:center">
        <div style="width:40px;height:40px;margin:0 auto 16px;border:3px solid var(--border-subtle);border-top-color:var(--brand-purple);border-radius:50%;animation:spin 0.8s linear infinite"></div>
        <p style="color:var(--text-tertiary);font-size:14px">Loading...</p>
      </div>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
  `;

  await appState.restore();
  router.init();
}

init();
