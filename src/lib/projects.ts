/* ============================================
   Noora — Projects Service
   ============================================ */

import { supabase } from './supabase';
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
  const { error } = await supabase.from('projects').delete().eq('id', projectId);

  return error ? { success: false, error: error.message } : { success: true };
}
