/* ============================================
   Noora — Account Settings Page
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { themeManager } from '../theme';
import { renderAppShell } from './shell';

export function renderSettings(app: HTMLElement): void {
  const user = appState.get().user;
  if (!user) { router.navigate('/login'); return; }

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const savedTransparency = localStorage.getItem('sf-transparency') || 'standard';
  const savedReduceMotion = localStorage.getItem('sf-reduce-motion') === 'true';
  const savedHighContrast = localStorage.getItem('sf-high-contrast') === 'true';

  renderAppShell(app, 'settings', `
    <div class="settings-page">
      <div class="settings-sidebar">
        <nav class="settings-nav">
          <div class="settings-nav-label">Account</div>
          <button class="settings-nav-item active" data-section="profile">${icon('user', 18)} Profile</button>
          <button class="settings-nav-item" data-section="security">${icon('shield', 18)} Security</button>
          <button class="settings-nav-item" data-section="preferences">${icon('sliders', 18)} Preferences</button>
          <button class="settings-nav-item" data-section="notifications">${icon('bell', 18)} Notifications</button>
          <button class="settings-nav-item" data-section="billing">${icon('creditCard', 18)} Billing</button>
        </nav>
      </div>

      <div class="settings-content">
        <!-- Profile Section -->
        <div class="settings-section" id="section-profile">
          <h2>Profile</h2>
          <p class="settings-desc">Manage your personal information and account details.</p>

          <div class="settings-card">
            <div class="profile-header">
              <div class="profile-avatar-large">${initials}</div>
              <div>
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <span class="badge badge-brand">${user.role === 'academic' ? 'Academic / PI' : 'Student / RA'}</span>
              </div>
            </div>

            <form class="settings-form" id="profileForm">
              <div class="form-row">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" class="form-input" value="${user.name}" />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" class="form-input" value="${user.email}" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Institution</label>
                  <input type="text" class="form-input" placeholder="e.g., Stanford University" />
                </div>
                <div class="form-group">
                  <label>Department</label>
                  <input type="text" class="form-input" placeholder="e.g., Department of Psychology" />
                </div>
              </div>
              <div class="form-group">
                <label>ORCID ID (Optional)</label>
                <input type="text" class="form-input" placeholder="0000-0000-0000-0000" />
              </div>
              <button type="submit" class="btn btn-primary">${icon('check', 16)} Save Changes</button>
            </form>
          </div>
        </div>

        <!-- Security Section -->
        <div class="settings-section" id="section-security" style="display:none">
          <h2>Security</h2>
          <p class="settings-desc">Manage your password and two-factor authentication settings.</p>

          <div class="settings-card">
            <h3>Change Password</h3>
            <form class="settings-form" id="passwordForm">
              <div class="form-group">
                <label>Current Password</label>
                <input type="password" class="form-input" placeholder="Enter current password" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" class="form-input" placeholder="Enter new password" />
                </div>
                <div class="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" class="form-input" placeholder="Confirm new password" />
                </div>
              </div>
              <button type="submit" class="btn btn-primary">${icon('lock', 16)} Update Password</button>
            </form>
          </div>

          <div class="settings-card">
            <div class="settings-card-header">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account with 2FA.</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="mfaToggle" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="mfa-methods">
              <div class="mfa-method">
                ${icon('mail', 20)}
                <div>
                  <strong>Email Code</strong>
                  <p>Receive a one-time code via email when logging in.</p>
                </div>
                <span class="badge badge-success">Active</span>
              </div>
              <div class="mfa-method">
                ${icon('phone', 20)}
                <div>
                  <strong>Authenticator App</strong>
                  <p>Use Google Authenticator, Authy, or similar apps.</p>
                </div>
                <button class="btn btn-ghost btn-sm">Set Up</button>
              </div>
            </div>
          </div>

          <div class="settings-card">
            <h3>Active Sessions</h3>
            <div class="session-list">
              <div class="session-item">
                <div class="session-icon">${icon('globe', 20)}</div>
                <div class="session-info">
                  <strong>Chrome on macOS</strong>
                  <p>Current session · Last active now</p>
                </div>
                <span class="badge badge-success">Current</span>
              </div>
              <div class="session-item">
                <div class="session-icon">${icon('globe', 20)}</div>
                <div class="session-info">
                  <strong>Safari on iPhone</strong>
                  <p>Last active 2 hours ago</p>
                </div>
                <button class="btn btn-ghost btn-sm">Revoke</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="settings-section" id="section-preferences" style="display:none">
          <h2>Preferences</h2>
          <p class="settings-desc">Customize your visual experience and accessibility settings.</p>

          <div class="settings-card">
            <h3>Theme</h3>
            <p>Choose how Noora looks to you.</p>
            <div class="theme-options">
              <button class="theme-option ${themeManager.theme === 'light' ? 'selected' : ''}" data-theme="light">
                ${icon('sun', 20)}
                <span>Light</span>
              </button>
              <button class="theme-option ${themeManager.theme === 'dark' ? 'selected' : ''}" data-theme="dark">
                ${icon('moon', 20)}
                <span>Dark</span>
              </button>
              <button class="theme-option" data-theme="system">
                ${icon('settings', 20)}
                <span>System</span>
              </button>
            </div>
          </div>

          <div class="settings-card">
            <div class="settings-card-header">
              <div>
                <h3>Transparency</h3>
                <p>Control the glass effect intensity on chrome surfaces (navigation, toolbars).</p>
              </div>
            </div>
            <div class="transparency-options">
              <button class="transparency-option ${savedTransparency === 'standard' ? 'selected' : ''}" data-transparency="standard">
                <strong>Standard</strong>
                <p>Full Liquid Glass effect</p>
              </button>
              <button class="transparency-option ${savedTransparency === 'reduced' ? 'selected' : ''}" data-transparency="reduced">
                <strong>Reduced</strong>
                <p>More opaque, less blur</p>
              </button>
              <button class="transparency-option ${savedTransparency === 'custom' ? 'selected' : ''}" data-transparency="custom">
                <strong>Custom</strong>
                <p>Adjust manually</p>
              </button>
            </div>
            <div class="transparency-slider-wrap" id="transparencySlider" style="display:${savedTransparency === 'custom' ? 'block' : 'none'}">
              <label>Glass Opacity</label>
              <input type="range" min="50" max="100" value="80" class="range-slider" id="opacitySlider" />
              <div class="range-labels"><span>More transparent</span><span>More opaque</span></div>
            </div>
          </div>

          <div class="settings-card">
            <div class="settings-card-header">
              <div>
                <h3>Reduce Motion</h3>
                <p>Minimize animations and transitions for a more static experience.</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="reduceMotionToggle" ${savedReduceMotion ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="settings-card">
            <div class="settings-card-header">
              <div>
                <h3>Increase Contrast</h3>
                <p>Strengthen borders and text contrast for better readability on glass surfaces.</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="highContrastToggle" ${savedHighContrast ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Notifications Section -->
        <div class="settings-section" id="section-notifications" style="display:none">
          <h2>Notifications</h2>
          <p class="settings-desc">Choose what you want to be notified about.</p>

          <div class="settings-card">
            <h3>Email Notifications</h3>
            <div class="notification-options">
              <div class="notification-option">
                <div>
                  <strong>Screening conflicts</strong>
                  <p>When a reviewer conflict needs resolution</p>
                </div>
                <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="notification-option">
                <div>
                  <strong>Team member activity</strong>
                  <p>When collaborators complete tasks</p>
                </div>
                <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="notification-option">
                <div>
                  <strong>Project invitations</strong>
                  <p>When you're invited to a new project</p>
                </div>
                <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="notification-option">
                <div>
                  <strong>Document comments</strong>
                  <p>When someone comments on or @mentions you in the editor</p>
                </div>
                <label class="toggle-switch"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="notification-option">
                <div>
                  <strong>Product updates</strong>
                  <p>New features and platform announcements</p>
                </div>
                <label class="toggle-switch"><input type="checkbox" /><span class="toggle-slider"></span></label>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Section -->
        <div class="settings-section" id="section-billing" style="display:none">
          <h2>Billing</h2>
          <p class="settings-desc">Manage your subscription and payment methods.</p>

          <div class="settings-card">
            <div class="settings-card-header">
              <div>
                <h3>Current Plan</h3>
                <p>You're on the <strong>Free</strong> plan.</p>
              </div>
              <a href="/pricing" data-link class="btn btn-primary">${icon('arrowRight', 16)} Upgrade</a>
            </div>
            <div class="plan-limits">
              <div class="plan-limit">
                <div class="plan-limit-header">
                  <span>Projects</span>
                  <span>1 of 1 used</span>
                </div>
                <div class="plan-limit-bar"><div class="plan-limit-fill" style="width:100%"></div></div>
              </div>
              <div class="plan-limit">
                <div class="plan-limit-header">
                  <span>Collaborators</span>
                  <span>2 of 3 used</span>
                </div>
                <div class="plan-limit-bar"><div class="plan-limit-fill" style="width:66%"></div></div>
              </div>
              <div class="plan-limit">
                <div class="plan-limit-header">
                  <span>References</span>
                  <span>247 of 500</span>
                </div>
                <div class="plan-limit-bar"><div class="plan-limit-fill" style="width:49%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  // Settings navigation
  document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const section = item.getAttribute('data-section')!;
      document.querySelectorAll('.settings-section').forEach(s => {
        (s as HTMLElement).style.display = 'none';
      });
      const target = document.getElementById(`section-${section}`);
      if (target) target.style.display = 'block';
    });
  });

  // Theme options
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const theme = opt.getAttribute('data-theme');
      if (theme === 'system') {
        const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        themeManager.setTheme(sys as 'light' | 'dark');
      } else {
        themeManager.setTheme(theme as 'light' | 'dark');
      }
    });
  });

  // Transparency options
  document.querySelectorAll('.transparency-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.transparency-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const val = opt.getAttribute('data-transparency')!;
      localStorage.setItem('sf-transparency', val);
      const slider = document.getElementById('transparencySlider');
      if (slider) slider.style.display = val === 'custom' ? 'block' : 'none';
      document.documentElement.setAttribute('data-transparency', val);
    });
  });

  // Reduce motion toggle
  document.getElementById('reduceMotionToggle')?.addEventListener('change', (e) => {
    const checked = (e.target as HTMLInputElement).checked;
    localStorage.setItem('sf-reduce-motion', String(checked));
    document.documentElement.classList.toggle('reduce-motion', checked);
  });

  // High contrast toggle
  document.getElementById('highContrastToggle')?.addEventListener('change', (e) => {
    const checked = (e.target as HTMLInputElement).checked;
    localStorage.setItem('sf-high-contrast', String(checked));
    document.documentElement.classList.toggle('high-contrast', checked);
  });

  // Profile form
  document.getElementById('profileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 16)} Saved!`;
    setTimeout(() => { btn.innerHTML = `${icon('check', 16)} Save Changes`; }, 2000);
  });

  // Password form
  document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.innerHTML = `${icon('check', 16)} Password Updated`;
    setTimeout(() => { btn.innerHTML = `${icon('lock', 16)} Update Password`; }, 2000);
  });
}
