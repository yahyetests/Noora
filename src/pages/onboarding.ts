/* ============================================
   Noora — Onboarding Flow
   ============================================ */

import { icon } from '../icons';
import { appState } from '../state';
import { router } from '../router';
import { createProject } from '../lib/projects';

export function renderOnboarding(app: HTMLElement): void {
  const user = appState.get().user;
  const role = user?.role || 'student';
  let step = 1;

  function renderStep() {
    app.innerHTML = `
      <div class="onboarding-page">
        <div class="onboarding-container">
          <div class="onboarding-progress">
            <div class="onboarding-progress-bar" style="width:${(step / 3) * 100}%"></div>
          </div>
          <div class="onboarding-header">
            <a href="/" data-link class="auth-brand">${icon('logo', 36)}<span>Noora</span></a>
            <div class="onboarding-steps-label">Step ${step} of 3</div>
          </div>
          <div class="onboarding-content" id="onboardingContent">
            ${step === 1 ? renderWelcome() : ''}
            ${step === 2 ? (role === 'academic' ? renderInviteTeam() : renderSampleProject()) : ''}
            ${step === 3 ? renderCreateProject() : ''}
          </div>
        </div>
      </div>
    `;
    bindStepEvents();
  }

  function renderWelcome(): string {
    return `
      <div class="onboarding-welcome">
        <div class="onboarding-icon">${icon('sparkle', 48)}</div>
        <h1>Welcome to Noora${user ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
        <p>Let's get your workspace set up in just a few steps. This will only take a minute.</p>

        <div class="onboarding-role-confirm">
          <div class="onboarding-role-card ${role === 'academic' ? 'selected' : ''}" data-role="academic">
            <div class="onboarding-role-icon">${icon('award', 28)}</div>
            <h3>Academic / PI</h3>
            <p>I lead research teams and manage systematic reviews.</p>
          </div>
          <div class="onboarding-role-card ${role === 'student' ? 'selected' : ''}" data-role="student">
            <div class="onboarding-role-icon">${icon('edit', 28)}</div>
            <h3>Student / RA</h3>
            <p>I'm working on a thesis, coursework, or assisting a PI.</p>
          </div>
        </div>

        <button class="btn btn-primary btn-lg" id="nextBtn" style="width:100%">
          Continue ${icon('arrowRight', 18)}
        </button>
      </div>
    `;
  }

  function renderInviteTeam(): string {
    return `
      <div class="onboarding-invite">
        <div class="onboarding-icon">${icon('userPlus', 48)}</div>
        <h1>Invite Your Team</h1>
        <p>Add collaborators to work with you. You can always invite more people later from project settings.</p>

        <div class="invite-form">
          <div class="invite-row" id="inviteRows">
            <div class="invite-input-row">
              <input type="email" class="form-input" placeholder="colleague@university.edu" />
              <select class="form-input" style="width:auto;min-width:140px">
                <option>Reviewer</option>
                <option>Collaborator</option>
              </select>
            </div>
            <div class="invite-input-row">
              <input type="email" class="form-input" placeholder="student@university.edu" />
              <select class="form-input" style="width:auto;min-width:140px">
                <option>Reviewer</option>
                <option>Collaborator</option>
              </select>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" id="addInviteBtn">${icon('plus', 16)} Add Another</button>
        </div>

        <div class="onboarding-btns">
          <button class="btn btn-ghost" id="skipBtn">Skip for Now</button>
          <button class="btn btn-primary btn-lg" id="nextBtn" style="flex:1">
            Send Invites & Continue ${icon('arrowRight', 18)}
          </button>
        </div>
      </div>
    `;
  }

  function renderSampleProject(): string {
    return `
      <div class="onboarding-sample">
        <div class="onboarding-icon">${icon('compass', 48)}</div>
        <h1>Explore a Sample Project</h1>
        <p>Want to see how Noora works before starting your own project? Try our interactive demo.</p>

        <div class="sample-options">
          <div class="sample-card" data-sample="yes">
            <div class="sample-card-icon">${icon('play', 24)}</div>
            <h3>Try the Demo</h3>
            <p>Explore a pre-loaded systematic review with sample data across all stages.</p>
          </div>
          <div class="sample-card selected" data-sample="no">
            <div class="sample-card-icon">${icon('arrowRight', 24)}</div>
            <h3>Skip to My Project</h3>
            <p>I know what I'm doing — let me create my own project right away.</p>
          </div>
        </div>

        <button class="btn btn-primary btn-lg" id="nextBtn" style="width:100%">
          Continue ${icon('arrowRight', 18)}
        </button>
      </div>
    `;
  }

  function renderCreateProject(): string {
    return `
      <div class="onboarding-create">
        <div class="onboarding-icon">${icon('folder', 48)}</div>
        <h1>Create Your First Project</h1>
        <p>Give your systematic review a name and description. You can change these anytime.</p>

        <form class="project-form" id="createProjectForm">
          <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="form-input" id="projectTitle" placeholder="e.g., Effects of CBT on Anxiety in Adolescents" required />
          </div>
          <div class="form-group">
            <label>Research Question (Optional)</label>
            <textarea class="form-input" rows="3" placeholder="e.g., What is the effectiveness of cognitive behavioral therapy on anxiety symptoms in adolescents aged 12-18?"></textarea>
          </div>
          <div class="form-group">
            <label>Review Type</label>
            <select class="form-input">
              <option>Systematic Review</option>
              <option>Scoping Review</option>
              <option>Meta-Analysis</option>
              <option>Rapid Review</option>
              <option>Literature Review</option>
            </select>
          </div>

          <div class="onboarding-btns">
            <button type="button" class="btn btn-ghost" id="backBtn">${icon('chevronDown', 16)} Back</button>
            <button type="submit" class="btn btn-primary btn-lg" style="flex:1">
              Create Project & Start ${icon('arrowRight', 18)}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  function bindStepEvents() {
    // Role selection cards
    document.querySelectorAll('.onboarding-role-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.onboarding-role-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Sample cards
    document.querySelectorAll('.sample-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.sample-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Next button
    document.getElementById('nextBtn')?.addEventListener('click', () => {
      step++;
      if (step > 3) {
        router.navigate('/dashboard');
      } else {
        renderStep();
      }
    });

    // Skip button
    document.getElementById('skipBtn')?.addEventListener('click', () => {
      step++;
      renderStep();
    });

    // Back button
    document.getElementById('backBtn')?.addEventListener('click', () => {
      step--;
      renderStep();
    });

    // Add invite row
    document.getElementById('addInviteBtn')?.addEventListener('click', () => {
      const rows = document.getElementById('inviteRows');
      if (rows) {
        const div = document.createElement('div');
        div.className = 'invite-input-row';
        div.innerHTML = `
          <input type="email" class="form-input" placeholder="collaborator@university.edu" />
          <select class="form-input" style="width:auto;min-width:140px">
            <option>Reviewer</option>
            <option>Collaborator</option>
          </select>
        `;
        rows.appendChild(div);
      }
    });

    // Create project form — persist to Supabase
    document.getElementById('createProjectForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = (document.getElementById('projectTitle') as HTMLInputElement)?.value;
      if (!title) return;

      const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
      btn.innerHTML = '<span class="btn-spinner"></span> Creating...';
      btn.disabled = true;

      const user = appState.get().user;
      const result = await createProject(user?.id || 'mock', {
        title,
        research_question: ((e.target as HTMLFormElement).querySelector('textarea') as HTMLTextAreaElement)?.value || undefined,
        review_type: ((e.target as HTMLFormElement).querySelector('select') as HTMLSelectElement)?.value,
      });

      if (result.success && result.project) {
        appState.set({ currentProject: result.project.id });
      }
      router.navigate('/dashboard');
    });
  }

  renderStep();
}
