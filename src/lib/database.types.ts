/* ============================================
   Noora — Supabase Database Types
   ============================================ */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'academic' | 'student';
          institution: string | null;
          department: string | null;
          orcid_id: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'academic' | 'student';
          institution?: string | null;
          department?: string | null;
          orcid_id?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          full_name?: string;
          role?: 'academic' | 'student';
          institution?: string | null;
          department?: string | null;
          orcid_id?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          research_question: string | null;
          review_type: string;
          citation_style: string;
          status: 'active' | 'archived' | 'completed';
          owner_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          research_question?: string | null;
          review_type?: string;
          citation_style?: string;
          status?: 'active' | 'archived' | 'completed';
          owner_id: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          research_question?: string | null;
          review_type?: string;
          citation_style?: string;
          status?: 'active' | 'archived' | 'completed';
          updated_at?: string;
        };
      };
      project_members: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: 'admin' | 'reviewer' | 'collaborator';
          stages_access: string[];
          created_at: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          role?: 'admin' | 'reviewer' | 'collaborator';
          stages_access?: string[];
        };
        Update: {
          role?: 'admin' | 'reviewer' | 'collaborator';
          stages_access?: string[];
        };
      };
      references: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          authors: string | null;
          journal: string | null;
          year: number | null;
          doi: string | null;
          abstract: string | null;
          source: string | null;
          status: 'pending' | 'included' | 'excluded' | 'duplicate';
          exclusion_reason: string | null;
          created_at: string;
        };
        Insert: {
          project_id: string;
          title: string;
          authors?: string | null;
          journal?: string | null;
          year?: number | null;
          doi?: string | null;
          abstract?: string | null;
          source?: string | null;
          status?: 'pending' | 'included' | 'excluded' | 'duplicate';
        };
        Update: {
          title?: string;
          authors?: string | null;
          status?: 'pending' | 'included' | 'excluded' | 'duplicate';
          exclusion_reason?: string | null;
        };
      };
      activity_log: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          action: string;
          target: string | null;
          created_at: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          action: string;
          target?: string | null;
        };
        Update: Record<string, never>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectMember = Database['public']['Tables']['project_members']['Row'];
export type Reference = Database['public']['Tables']['references']['Row'];
export type ActivityLog = Database['public']['Tables']['activity_log']['Row'];
