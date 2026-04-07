/* ============================================
   Noora — Projects Service
   ============================================ */

import { supabase, isSupabaseConfigured } from './supabase';
import type { Project } from './database.types';

export interface ProjectWithStats extends Project {
  references_count: number;
  screened_count: number;
  included_count: number;
  extracted_count: number;
  members_count: number;
  progress: number;
}

/**
 * Get all projects for the current user
 */
export async function getUserProjects(userId: string): Promise<ProjectWithStats[]> {
  if (!isSupabaseConfigured()) {
    return getMockProjects();
  }

  // Get projects where user is owner
  const { data: ownedProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('owner_id', userId)
    .order('updated_at', { ascending: false });

  // Get projects where user is a member
  const { data: memberEntries } = await supabase
    .from('project_members')
    .select('project_id')
    .eq('user_id', userId);

  const memberProjectIds = (memberEntries as Array<{ project_id: string }> || []).map(m => m.project_id);

  let sharedProjects: Project[] = [];
  if (memberProjectIds.length > 0) {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .in('id', memberProjectIds)
      .neq('owner_id', userId);
    sharedProjects = (data as Project[]) || [];
  }

  const allProjects = [...((ownedProjects as Project[]) || []), ...sharedProjects];

  // Get stats for each project
  const projectsWithStats: ProjectWithStats[] = await Promise.all(
    allProjects.map(async (project) => {
      const [refCount, screenedCount, includedCount, membersCount] = await Promise.all([
        supabase.from('references').select('id', { count: 'exact', head: true }).eq('project_id', project.id),
        supabase.from('references').select('id', { count: 'exact', head: true }).eq('project_id', project.id).neq('status', 'pending'),
        supabase.from('references').select('id', { count: 'exact', head: true }).eq('project_id', project.id).eq('status', 'included'),
        supabase.from('project_members').select('id', { count: 'exact', head: true }).eq('project_id', project.id),
      ]);

      const refs = refCount.count || 0;
      const screened = screenedCount.count || 0;
      const included = includedCount.count || 0;
      const progress = refs > 0 ? Math.round((screened / refs) * 100) : 0;

      return {
        ...project,
        references_count: refs,
        screened_count: screened,
        included_count: included,
        extracted_count: 0,
        members_count: (membersCount.count || 0) + 1,
        progress,
      };
    })
  );

  return projectsWithStats;
}

/**
 * Create a new project
 */
export async function createProject(
  userId: string,
  data: {
    title: string;
    description?: string;
    research_question?: string;
    review_type?: string;
  }
): Promise<{ success: boolean; project?: Project; error?: string }> {
  if (!isSupabaseConfigured()) {
    const mockProject: Project = {
      id: 'mock-' + Date.now(),
      title: data.title,
      description: data.description || null,
      research_question: data.research_question || null,
      review_type: data.review_type || 'Systematic Review',
      citation_style: 'APA 7th Edition',
      status: 'active',
      owner_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return { success: true, project: mockProject };
  }

  const insertData = {
    title: data.title,
    description: data.description || null,
    research_question: data.research_question || null,
    review_type: data.review_type || 'Systematic Review',
    owner_id: userId,
  };

  const { data: project, error } = await supabase
    .from('projects')
    .insert(insertData as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  const proj = project as Project | null;

  // Add owner as admin member
  if (proj) {
    await supabase.from('project_members').insert({
      project_id: proj.id,
      user_id: userId,
      role: 'admin',
      stages_access: ['search', 'import', 'screen-abstract', 'screen-fulltext', 'extraction', 'writing', 'export'],
    } as Record<string, unknown>);

    // Log activity
    await supabase.from('activity_log').insert({
      project_id: proj.id,
      user_id: userId,
      action: 'created',
      target: `project "${data.title}"`,
    } as Record<string, unknown>);
  }

  return { success: true, project: proj || undefined };
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: true };

  const { error } = await supabase.from('projects').delete().eq('id', projectId);

  return error ? { success: false, error: error.message } : { success: true };
}

// ── Mock data ──

function getMockProjects(): ProjectWithStats[] {
  return [
    {
      id: 'cbt-anxiety',
      title: 'Effects of CBT on Anxiety Disorders',
      description: 'Systematic review and meta-analysis of randomized controlled trials examining cognitive behavioral therapy for generalized anxiety disorder in adults.',
      research_question: null,
      review_type: 'Systematic Review',
      citation_style: 'APA 7th Edition',
      status: 'active',
      owner_id: 'mock',
      created_at: new Date().toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      references_count: 1247,
      screened_count: 892,
      included_count: 156,
      extracted_count: 42,
      members_count: 5,
      progress: 58,
    },
    {
      id: 'ai-education',
      title: 'AI in Higher Education: A Scoping Review',
      description: 'Mapping the landscape of artificial intelligence applications in university-level teaching and learning environments across STEM disciplines.',
      research_question: null,
      review_type: 'Scoping Review',
      citation_style: 'APA 7th Edition',
      status: 'active',
      owner_id: 'mock',
      created_at: new Date().toISOString(),
      updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      references_count: 2340,
      screened_count: 1180,
      included_count: 210,
      extracted_count: 0,
      members_count: 2,
      progress: 32,
    },
    {
      id: 'nutrition-aging',
      title: 'Nutritional Interventions for Healthy Aging',
      description: 'Review of dietary and supplementation strategies for cognitive decline prevention in adults aged 60+.',
      research_question: null,
      review_type: 'Systematic Review',
      citation_style: 'Vancouver',
      status: 'active',
      owner_id: 'mock',
      created_at: new Date().toISOString(),
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      references_count: 780,
      screened_count: 780,
      included_count: 89,
      extracted_count: 67,
      members_count: 3,
      progress: 78,
    },
  ];
}
