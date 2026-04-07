-- ============================================
-- Noora — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ── Profiles ──
-- Extends Supabase auth.users with app-specific data
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text not null,
  role text not null default 'student' check (role in ('academic', 'student')),
  institution text,
  department text,
  orcid_id text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Projects ──
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  research_question text,
  review_type text not null default 'Systematic Review',
  citation_style text not null default 'APA 7th Edition',
  status text not null default 'active' check (status in ('active', 'archived', 'completed')),
  owner_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Owner can do anything
create policy "Owners can manage own projects"
  on public.projects for all
  using (auth.uid() = owner_id);

-- Members can view projects they belong to
create policy "Members can view projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.project_members
      where project_id = projects.id and user_id = auth.uid()
    )
  );

-- ── Project Members ──
create table public.project_members (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null default 'collaborator' check (role in ('admin', 'reviewer', 'collaborator')),
  stages_access text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique(project_id, user_id)
);

alter table public.project_members enable row level security;

create policy "Project admins can manage members"
  on public.project_members for all
  using (
    exists (
      select 1 from public.projects
      where id = project_members.project_id and owner_id = auth.uid()
    )
    or
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_members.project_id
        and pm.user_id = auth.uid()
        and pm.role = 'admin'
    )
  );

create policy "Members can view project members"
  on public.project_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.project_members pm
      where pm.project_id = project_members.project_id and pm.user_id = auth.uid()
    )
  );

-- ── References ──
create table public.references (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  authors text,
  journal text,
  year integer,
  doi text,
  abstract text,
  source text,
  status text not null default 'pending' check (status in ('pending', 'included', 'excluded', 'duplicate')),
  exclusion_reason text,
  created_at timestamptz not null default now()
);

alter table public.references enable row level security;

create policy "Project members can manage references"
  on public.references for all
  using (
    exists (
      select 1 from public.projects
      where id = references.project_id and owner_id = auth.uid()
    )
    or exists (
      select 1 from public.project_members
      where project_id = references.project_id and user_id = auth.uid()
    )
  );

-- ── Activity Log ──
create table public.activity_log (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  action text not null,
  target text,
  created_at timestamptz not null default now()
);

alter table public.activity_log enable row level security;

create policy "Project members can view activity"
  on public.activity_log for select
  using (
    exists (
      select 1 from public.projects
      where id = activity_log.project_id and owner_id = auth.uid()
    )
    or exists (
      select 1 from public.project_members
      where project_id = activity_log.project_id and user_id = auth.uid()
    )
  );

create policy "Authenticated users can log activity"
  on public.activity_log for insert
  with check (auth.uid() = user_id);

-- ── Indexes ──
create index idx_projects_owner on public.projects(owner_id);
create index idx_project_members_project on public.project_members(project_id);
create index idx_project_members_user on public.project_members(user_id);
create index idx_references_project on public.references(project_id);
create index idx_references_status on public.references(status);
create index idx_activity_project on public.activity_log(project_id);
create index idx_activity_created on public.activity_log(created_at desc);

-- ── Updated_at trigger ──
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();
