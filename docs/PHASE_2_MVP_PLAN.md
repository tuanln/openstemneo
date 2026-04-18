# Phase 2 MVP Implementation Plan — Auth + Progress + Evidence + Skills

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai Phase 2 MVP cho OpenSciedNEO — dual-auth (Google OAuth + admin-tạo user/pass), progress event-sourced, Evidence persist, streak/achievement, skill-centric taxonomy — trên stack Supabase + Next.js 16.

**Architecture:** Supabase PostgreSQL làm single source of truth (Auth + DB + RLS + triggers). Next.js 16 App Router với `@supabase/ssr` cho session cookie SSR. Mọi hành vi học tập là 1 `learning_events` row; streak, skill mastery, achievement derive từ events qua Postgres triggers. Schema multi-program từ đầu (programs → courses → activities → skills) để sẵn sàng cho DeBlue, MakerKids, TechTour.

**Tech Stack:** Next.js 16 · React 19 · Tailwind v4 · shadcn/ui · Supabase (Auth + PostgreSQL + Storage) · `@supabase/ssr` · Postgres triggers · TypeScript strict.

**Testing approach:** MVP không setup test suite mới (YAGNI — project hiện không có). Dùng TypeScript strict + manual QA checklist mỗi task + smoke test cuối Phase G. Test harness để Phase 3.

**Branching:** Direct-to-`main` workflow (matching Phase 0 NGSS bridge doc). Mỗi task commit + push riêng để user theo dõi tiến độ trên GitHub.

---

## File Structure

**Mới tạo:**
```
supabase/
├── migrations/
│   ├── 0001_taxonomy.sql           ← programs, courses, activities
│   ├── 0002_skills.sql             ← skills, activity_skills, skill_progress
│   ├── 0003_events.sql             ← learning_events, streaks, achievements
│   ├── 0004_profiles_cohorts.sql   ← profiles, cohorts, cohort_members
│   ├── 0005_mentor.sql             ← mentor_* tables (schema-ready)
│   ├── 0006_ai.sql                 ← ai_* tables (schema-ready)
│   ├── 0007_rls.sql                ← all RLS policies
│   └── 0008_triggers.sql           ← streak + skill triggers
├── seed/
│   ├── 01_programs_courses.sql     ← OpenSciedNEO + 9 courses K-8
│   ├── 02_skills_bootstrap.sql     ← 18 core skills (SEP + NL KHTN + CCC)
│   └── 03_activities_from_mdx.mjs  ← Node script migrate MDX → activities
└── config.toml                     ← supabase CLI config

lib/
├── supabase/
│   ├── client.ts                   ← browser client
│   ├── server.ts                   ← server client (cookies)
│   ├── middleware.ts               ← session refresh
│   └── admin.ts                    ← service role client
├── auth/
│   ├── get-session.ts              ← server helper
│   └── require-role.ts             ← redirect nếu sai role
└── db/
    ├── types.ts                    ← generated Supabase types
    ├── activities.ts               ← query helpers
    ├── events.ts                   ← insert event helpers
    └── profiles.ts                 ← profile helpers

app/
├── (auth)/
│   ├── login/
│   │   ├── page.tsx
│   │   └── login-form.tsx
│   └── auth/
│       ├── callback/route.ts
│       └── sign-out/route.ts
├── dashboard/
│   └── page.tsx                    ← student home
├── progress/
│   └── page.tsx
├── skills/
│   └── page.tsx
├── profile/
│   └── page.tsx
├── teacher/
│   ├── page.tsx
│   ├── cohort/[id]/page.tsx
│   └── student/[id]/page.tsx
├── admin/
│   ├── accounts/
│   │   ├── page.tsx
│   │   └── new/page.tsx
│   ├── cohorts/page.tsx
│   └── skills/page.tsx
└── middleware.ts                   ← new, not existing

actions/
├── auth.ts
├── progress.ts
├── evidence.ts
├── admin.ts
├── teacher.ts
└── skills.ts

components/phase2/
├── auth/
│   ├── auth-provider.tsx
│   └── login-form.tsx
├── student/
│   ├── activity-status-toggle.tsx
│   ├── progress-bar.tsx
│   ├── continue-learning.tsx
│   ├── streak-counter.tsx
│   ├── evidence-interactive.tsx
│   ├── skill-tree-view.tsx
│   └── achievement-toast.tsx
├── teacher/
│   ├── cohort-roster.tsx
│   ├── student-timeline.tsx
│   └── student-skill-radar.tsx
└── admin/
    ├── account-form.tsx
    └── cohort-manager.tsx
```

**Modify:**
- `package.json` — thêm Supabase deps
- `.env.local.example` — thêm SUPABASE env vars
- `.gitignore` — thêm `.env.local`, `supabase/.branches`, `supabase/.temp`
- `components/curriculum/evidence.tsx` — nếu tồn tại, thay bằng wrapper gọi `EvidenceInteractive` hoặc giữ server-rendered version + thêm client version
- `app/student/units/[id]/[lesson]/page.tsx` (hoặc tương đương) — inject `<ActivityStatusToggle>` cuối lesson

---

## Phase A — Foundation (infrastructure + schema)

### Task 1: Tạo Supabase project + lưu credentials

**Files:**
- Create: `.env.local` (gitignored)
- Modify: `.env.local.example`
- Modify: `.gitignore`

- [ ] **Step 1: User thao tác — tạo Supabase project**

Nhờ user:
1. Vào https://supabase.com/dashboard → New project.
2. Name: `openstemneo`, region: `Southeast Asia (Singapore)`, password: (lưu password mạnh).
3. Đợi ~2 phút khởi tạo xong.
4. Project Settings → API:
   - Copy **Project URL** (vd `https://abc123xyz.supabase.co`)
   - Copy **anon/public key**
   - Copy **service_role key** (⚠️ secret, không commit)
5. Authentication → Providers → Google:
   - Enable
   - Cần Client ID + Client Secret từ Google Cloud Console (tạo OAuth 2.0 credentials). Nếu user chưa có, hướng dẫn tạo.
   - Redirect URL ghi: `https://abc123xyz.supabase.co/auth/v1/callback`

Xác nhận user đã có 3 giá trị (URL, anon key, service_role key) + Google OAuth đã bật.

- [ ] **Step 2: Tạo `.env.local`**

Write `/Users/tuanln/Documents/Claude/Projects/OpenSciedNEO/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

User paste 3 giá trị thật vào. File này đã trong `.gitignore` (Next.js default).

- [ ] **Step 3: Tạo `.env.local.example`**

Write `.env.local.example`:

```bash
# Supabase — get these from https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

- [ ] **Step 4: Update `.gitignore` nếu cần**

Run: `grep -E "^\.env\.local$|^supabase/\.branches|^supabase/\.temp" .gitignore`
Expected: `.env.local` phải có. Nếu thiếu mục supabase thì append:

```
supabase/.branches
supabase/.temp
```

- [ ] **Step 5: Commit env example**

```bash
git add .env.local.example .gitignore
git commit -m "Add Supabase env vars example + gitignore local secrets

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 2: Install Supabase packages + CLI

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Cài runtime deps**

Run:
```bash
cd /Users/tuanln/Documents/Claude/Projects/OpenSciedNEO
npm install @supabase/supabase-js @supabase/ssr
```

Expected: 2 packages thêm vào `dependencies`, `package-lock.json` update.

- [ ] **Step 2: Cài Supabase CLI (dev dep)**

Run:
```bash
npm install --save-dev supabase
```

Expected: `supabase` trong `devDependencies`.

- [ ] **Step 3: Init Supabase CLI trong project**

Run:
```bash
npx supabase init
```

Chấp nhận mặc định. Tạo folder `supabase/` với `config.toml` + `migrations/` + `seed.sql` placeholder.

- [ ] **Step 4: Link CLI với Supabase project**

Run:
```bash
npx supabase login
# (browser login)
npx supabase link --project-ref YOUR-PROJECT-REF
# YOUR-PROJECT-REF = phần "abc123xyz" trong URL NEXT_PUBLIC_SUPABASE_URL
```

- [ ] **Step 5: Commit deps + supabase init**

```bash
git add package.json package-lock.json supabase/config.toml supabase/.gitignore
git commit -m "Install Supabase SDK + CLI, init supabase/ folder

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 3: Schema migration 0001 — taxonomy

**Files:**
- Create: `supabase/migrations/0001_taxonomy.sql`

- [ ] **Step 1: Viết migration**

Write `supabase/migrations/0001_taxonomy.sql`:

```sql
-- Programs (OpenSciedNEO, DeBlue, MakerKids-FPT, TechTour...)
CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  provider TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Courses (Lớp 6 KHTN, DeBlue World 3, Arduino Basics...)
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  grade_level INT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(program_id, slug)
);
CREATE INDEX idx_courses_program ON courses(program_id);

-- Activities (lesson, experiment, project, workshop session, field trip)
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (
    activity_type IN ('lesson','experiment','project','workshop','field_trip','quiz','reflection')
  ),
  source_ref TEXT,
  estimated_minutes INT,
  sequence_order INT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(course_id, slug)
);
CREATE INDEX idx_activities_course ON activities(course_id);
```

- [ ] **Step 2: Apply migration**

Run: `npx supabase db push`
Expected: output "Applied migration 0001_taxonomy.sql" hoặc tương đương. Không có error.

- [ ] **Step 3: Verify trong dashboard**

User mở Supabase dashboard → Table Editor → xác nhận 3 bảng `programs`, `courses`, `activities` có mặt với columns đúng.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/0001_taxonomy.sql
git commit -m "Schema 0001 — taxonomy: programs, courses, activities

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 4: Schema migration 0002 — skills

**Files:**
- Create: `supabase/migrations/0002_skills.sql`

- [ ] **Step 1: Viết migration**

Write `supabase/migrations/0002_skills.sql`:

```sql
-- Skills (NGSS SEP, GDPT 2018 YCCĐ, Maker skills, ...)
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  parent_skill_id UUID REFERENCES skills(id),
  framework_refs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- M:N: activity dạy những skill nào
CREATE TABLE activity_skills (
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  weight INT DEFAULT 1,
  PRIMARY KEY (activity_id, skill_id)
);

-- Skill mastery per user
CREATE TABLE skill_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  evidence_count INT DEFAULT 0,
  mastery_level INT DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5),
  last_demonstrated_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, skill_id)
);
CREATE INDEX idx_skill_progress_user ON skill_progress(user_id);
```

- [ ] **Step 2: Apply + verify + commit**

```bash
npx supabase db push
```

Then commit:
```bash
git add supabase/migrations/0002_skills.sql
git commit -m "Schema 0002 — skills: skills, activity_skills, skill_progress

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 5: Schema migration 0003 — events + streaks + achievements

**Files:**
- Create: `supabase/migrations/0003_events.sql`

- [ ] **Step 1: Viết migration**

Write `supabase/migrations/0003_events.sql`:

```sql
-- Event-sourced learning log — mọi hành vi học tập
CREATE TABLE learning_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'started','completed','abandoned','revisited',
      'evidence_submitted','question_asked','reflection_written',
      'skill_demonstrated','mentor_feedback_received','ai_interaction'
    )
  ),
  payload JSONB DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_events_user_time ON learning_events(user_id, occurred_at DESC);
CREATE INDEX idx_events_activity ON learning_events(activity_id);
CREATE INDEX idx_events_type ON learning_events(event_type);

-- Daily streak (1 row/user/day)
CREATE TABLE learning_streaks (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  activities_completed INT DEFAULT 0,
  PRIMARY KEY (user_id, date)
);
CREATE INDEX idx_streaks_user_date ON learning_streaks(user_id, date DESC);

-- Achievements unlocked
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (
    type IN ('first_activity','course_complete','streak_7','streak_30','skill_expert')
  ),
  scope JSONB DEFAULT '{}'::jsonb,
  unlocked_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_achievements_user ON achievements(user_id);
```

- [ ] **Step 2: Apply + commit**

```bash
npx supabase db push
git add supabase/migrations/0003_events.sql
git commit -m "Schema 0003 — events: learning_events, learning_streaks, achievements

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 6: Schema migration 0004 — profiles + cohorts

**Files:**
- Create: `supabase/migrations/0004_profiles_cohorts.sql`

- [ ] **Step 1: Viết migration**

Write `supabase/migrations/0004_profiles_cohorts.sql`:

```sql
-- Profile extends auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student'
    CHECK (role IN ('student','teacher','mentor','admin')),
  grade_level INT,
  avatar_url TEXT,
  auth_method TEXT CHECK (auth_method IN ('oauth','admin_created')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_username ON profiles(username);

-- Cohorts (school class, workshop batch, mentor circle, field trip group)
CREATE TABLE cohorts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES programs(id),
  course_id UUID REFERENCES courses(id),
  name TEXT NOT NULL,
  cohort_type TEXT CHECK (cohort_type IN ('school_class','workshop_batch','mentor_circle','field_trip')),
  lead_user_id UUID REFERENCES auth.users(id),
  starts_at DATE,
  ends_at DATE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_cohorts_lead ON cohorts(lead_user_id);

CREATE TABLE cohort_members (
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_in_cohort TEXT DEFAULT 'learner' CHECK (role_in_cohort IN ('learner','co_lead','assistant')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (cohort_id, user_id)
);
CREATE INDEX idx_cohort_members_user ON cohort_members(user_id);

-- Auto-create profile row khi user signup
CREATE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, auth_method)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE WHEN NEW.email LIKE '%@openstemneo.local' THEN 'admin_created' ELSE 'oauth' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_create_profile AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_new_user();
```

- [ ] **Step 2: Apply + commit**

```bash
npx supabase db push
git add supabase/migrations/0004_profiles_cohorts.sql
git commit -m "Schema 0004 — profiles, cohorts, auto-create profile trigger

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 7: Schema migration 0005 + 0006 — mentor + AI (schema-ready)

**Files:**
- Create: `supabase/migrations/0005_mentor.sql`
- Create: `supabase/migrations/0006_ai.sql`

- [ ] **Step 1: Viết `0005_mentor.sql`**

```sql
CREATE TABLE mentor_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  expertise_areas TEXT[],
  languages TEXT[],
  availability JSONB DEFAULT '{}'::jsonb,
  verification_status TEXT DEFAULT 'pending'
    CHECK (verification_status IN ('pending','verified','rejected')),
  verified_by UUID REFERENCES auth.users(id),
  total_sessions INT DEFAULT 0,
  avg_rating NUMERIC(2,1),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE mentorships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','paused','completed')),
  started_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE mentoring_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES auth.users(id),
  topic TEXT,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INT,
  meeting_url TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE session_attendees (
  session_id UUID NOT NULL REFERENCES mentoring_sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attended BOOLEAN,
  PRIMARY KEY (session_id, student_id)
);

CREATE TABLE mentor_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES mentoring_sessions(id),
  student_id UUID REFERENCES auth.users(id),
  mentor_id UUID REFERENCES auth.users(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

- [ ] **Step 2: Viết `0006_ai.sql`**

```sql
CREATE TABLE ai_student_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_synced_at TIMESTAMPTZ,
  synced_by_model TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id),
  model TEXT NOT NULL,
  prompt TEXT,
  response TEXT,
  feedback TEXT CHECK (feedback IN ('helpful','not_helpful') OR feedback IS NULL),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id, created_at DESC);
```

- [ ] **Step 3: Apply + commit**

```bash
npx supabase db push
git add supabase/migrations/0005_mentor.sql supabase/migrations/0006_ai.sql
git commit -m "Schema 0005+0006 — mentor + AI tables (schema-ready, UI sau)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 8: Schema migration 0007 — RLS policies

**Files:**
- Create: `supabase/migrations/0007_rls.sql`

- [ ] **Step 1: Viết RLS policies**

Write `supabase/migrations/0007_rls.sql`:

```sql
-- Helper: check nếu current user là admin
CREATE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: check nếu current user là teacher của cohort này
CREATE FUNCTION is_teacher_of_cohort(p_cohort_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM cohorts
    WHERE id = p_cohort_id AND lead_user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: check nếu current user là teacher của student này (qua cohort)
CREATE FUNCTION is_teacher_of_student(p_student_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM cohort_members cm
    JOIN cohorts c ON c.id = cm.cohort_id
    WHERE cm.user_id = p_student_id AND c.lead_user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin read all" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Teacher read own cohort" ON profiles FOR SELECT USING (is_teacher_of_student(id));
CREATE POLICY "Self update" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin write all" ON profiles FOR ALL USING (is_admin());

-- learning_events
ALTER TABLE learning_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read events" ON learning_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Self insert events" ON learning_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teacher read events" ON learning_events FOR SELECT USING (is_teacher_of_student(user_id));
CREATE POLICY "Admin read events" ON learning_events FOR SELECT USING (is_admin());

-- skill_progress
ALTER TABLE skill_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read skills" ON skill_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Teacher read skills" ON skill_progress FOR SELECT USING (is_teacher_of_student(user_id));
CREATE POLICY "Admin read skills" ON skill_progress FOR SELECT USING (is_admin());

-- learning_streaks
ALTER TABLE learning_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read streaks" ON learning_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Teacher read streaks" ON learning_streaks FOR SELECT USING (is_teacher_of_student(user_id));

-- achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read achievements" ON achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Teacher read achievements" ON achievements FOR SELECT USING (is_teacher_of_student(user_id));

-- cohorts
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teacher read own cohorts" ON cohorts FOR SELECT USING (lead_user_id = auth.uid());
CREATE POLICY "Member read own cohorts" ON cohorts FOR SELECT USING (
  EXISTS (SELECT 1 FROM cohort_members WHERE cohort_id = cohorts.id AND user_id = auth.uid())
);
CREATE POLICY "Admin manage cohorts" ON cohorts FOR ALL USING (is_admin());

-- cohort_members
ALTER TABLE cohort_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read memberships" ON cohort_members FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Teacher read cohort members" ON cohort_members FOR SELECT USING (is_teacher_of_cohort(cohort_id));
CREATE POLICY "Admin manage members" ON cohort_members FOR ALL USING (is_admin());

-- activities, programs, courses, skills, activity_skills — public read
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Admin write activities" ON activities FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update activities" ON activities FOR UPDATE USING (is_admin());

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Admin write programs" ON programs FOR ALL USING (is_admin());

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Admin write courses" ON courses FOR ALL USING (is_admin());

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin write skills" ON skills FOR ALL USING (is_admin());

ALTER TABLE activity_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read activity_skills" ON activity_skills FOR SELECT USING (true);
CREATE POLICY "Admin write activity_skills" ON activity_skills FOR ALL USING (is_admin());

-- mentor_profiles: public SELECT nếu verified, self write, admin write all
ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read verified mentors" ON mentor_profiles FOR SELECT
  USING (verification_status = 'verified' OR user_id = auth.uid() OR is_admin());
CREATE POLICY "Self write mentor profile" ON mentor_profiles FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Admin write mentor profile" ON mentor_profiles FOR ALL USING (is_admin());

-- Other mentor_* tables: default deny (schema-ready, policies thêm sau khi cần UI)
ALTER TABLE mentorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full mentorships" ON mentorships FOR ALL USING (is_admin());
CREATE POLICY "Admin full sessions" ON mentoring_sessions FOR ALL USING (is_admin());
CREATE POLICY "Admin full attendees" ON session_attendees FOR ALL USING (is_admin());
CREATE POLICY "Admin full reviews" ON mentor_reviews FOR ALL USING (is_admin());

-- ai_* tables
ALTER TABLE ai_student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read ai profile" ON ai_student_profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admin read ai profile" ON ai_student_profiles FOR SELECT USING (is_admin());

ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read ai interactions" ON ai_interactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Self insert ai interactions" ON ai_interactions FOR INSERT WITH CHECK (user_id = auth.uid());
```

- [ ] **Step 2: Apply + commit**

```bash
npx supabase db push
git add supabase/migrations/0007_rls.sql
git commit -m "Schema 0007 — RLS policies + helper functions

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 9: Schema migration 0008 — triggers (streak + skill mastery)

**Files:**
- Create: `supabase/migrations/0008_triggers.sql`

- [ ] **Step 1: Viết triggers**

Write `supabase/migrations/0008_triggers.sql`:

```sql
-- Trigger 1: Update streak khi activity completed
CREATE FUNCTION update_streak()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'completed' THEN
    INSERT INTO learning_streaks(user_id, date, activities_completed)
    VALUES (
      NEW.user_id,
      (NEW.occurred_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE,
      1
    )
    ON CONFLICT (user_id, date)
    DO UPDATE SET activities_completed = learning_streaks.activities_completed + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_update_streak
  AFTER INSERT ON learning_events
  FOR EACH ROW EXECUTE FUNCTION update_streak();

-- Trigger 2: Demonstrate skills khi activity completed
CREATE FUNCTION demonstrate_skills()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'completed' THEN
    INSERT INTO skill_progress(user_id, skill_id, evidence_count, mastery_level, last_demonstrated_at)
    SELECT
      NEW.user_id,
      asg.skill_id,
      asg.weight,
      CASE
        WHEN asg.weight >= 20 THEN 5
        WHEN asg.weight >= 11 THEN 4
        WHEN asg.weight >= 6  THEN 3
        WHEN asg.weight >= 3  THEN 2
        WHEN asg.weight >= 1  THEN 1
        ELSE 0
      END,
      NEW.occurred_at
    FROM activity_skills asg
    WHERE asg.activity_id = NEW.activity_id
    ON CONFLICT (user_id, skill_id)
    DO UPDATE SET
      evidence_count = skill_progress.evidence_count + EXCLUDED.evidence_count,
      last_demonstrated_at = EXCLUDED.last_demonstrated_at,
      mastery_level = CASE
        WHEN skill_progress.evidence_count + EXCLUDED.evidence_count >= 20 THEN 5
        WHEN skill_progress.evidence_count + EXCLUDED.evidence_count >= 11 THEN 4
        WHEN skill_progress.evidence_count + EXCLUDED.evidence_count >= 6  THEN 3
        WHEN skill_progress.evidence_count + EXCLUDED.evidence_count >= 3  THEN 2
        WHEN skill_progress.evidence_count + EXCLUDED.evidence_count >= 1  THEN 1
        ELSE 0
      END,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_demonstrate_skills
  AFTER INSERT ON learning_events
  FOR EACH ROW EXECUTE FUNCTION demonstrate_skills();

-- Trigger 3: Unlock first_activity achievement
CREATE FUNCTION check_first_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'completed' THEN
    INSERT INTO achievements(user_id, type, scope)
    SELECT NEW.user_id, 'first_activity', jsonb_build_object('activity_id', NEW.activity_id)
    WHERE NOT EXISTS (
      SELECT 1 FROM achievements WHERE user_id = NEW.user_id AND type = 'first_activity'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_check_first_activity
  AFTER INSERT ON learning_events
  FOR EACH ROW EXECUTE FUNCTION check_first_activity();
```

- [ ] **Step 2: Apply + commit**

```bash
npx supabase db push
git add supabase/migrations/0008_triggers.sql
git commit -m "Schema 0008 — triggers: streak + skill mastery + first_activity achievement

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 10: Seed data — programs + courses + skills bootstrap

**Files:**
- Create: `supabase/seed/01_programs_courses.sql`
- Create: `supabase/seed/02_skills_bootstrap.sql`

- [ ] **Step 1: Viết `01_programs_courses.sql`**

```sql
-- Program: OpenSciedNEO
INSERT INTO programs (slug, name, provider, description)
VALUES (
  'openscienneo',
  'OpenSciedNEO',
  'OpenSciEd (Việt hoá)',
  'Khoa học tự nhiên K-8, phenomenon-based, Việt hoá từ OpenSciEd (Hoa Kỳ)'
);

-- 9 courses tương ứng 9 grade
INSERT INTO courses (program_id, slug, name, grade_level)
SELECT p.id, c.slug, c.name, c.grade_level
FROM programs p, (VALUES
  ('grade-k', 'Mẫu giáo (K)', 0),
  ('grade-1', 'Lớp 1', 1),
  ('grade-2', 'Lớp 2', 2),
  ('grade-3', 'Lớp 3', 3),
  ('grade-4', 'Lớp 4', 4),
  ('grade-5', 'Lớp 5', 5),
  ('grade-6', 'Lớp 6', 6),
  ('grade-7', 'Lớp 7', 7),
  ('grade-8', 'Lớp 8', 8)
) AS c(slug, name, grade_level)
WHERE p.slug = 'openscienneo';
```

- [ ] **Step 2: Viết `02_skills_bootstrap.sql` — 18 skills core**

```sql
-- 8 SEP của NGSS (parent category: science-practice)
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('sep-1-asking-questions', 'Đặt câu hỏi và xác định vấn đề', 'science-practice',
    '{"ngss_sep": "SEP-1"}'::jsonb),
  ('sep-2-developing-models', 'Xây dựng và sử dụng mô hình', 'science-practice',
    '{"ngss_sep": "SEP-2"}'::jsonb),
  ('sep-3-investigations', 'Lập kế hoạch và tiến hành điều tra', 'science-practice',
    '{"ngss_sep": "SEP-3"}'::jsonb),
  ('sep-4-analyzing-data', 'Phân tích và diễn giải dữ liệu', 'science-practice',
    '{"ngss_sep": "SEP-4"}'::jsonb),
  ('sep-5-math-computational', 'Dùng toán học và tư duy tính toán', 'science-practice',
    '{"ngss_sep": "SEP-5"}'::jsonb),
  ('sep-6-constructing-explanations', 'Kiến tạo giải thích và thiết kế giải pháp', 'science-practice',
    '{"ngss_sep": "SEP-6"}'::jsonb),
  ('sep-7-argument', 'Tham gia lập luận từ bằng chứng', 'science-practice',
    '{"ngss_sep": "SEP-7"}'::jsonb),
  ('sep-8-communicating', 'Thu thập, đánh giá và truyền đạt thông tin', 'science-practice',
    '{"ngss_sep": "SEP-8"}'::jsonb);

-- 3 thành phần NL đặc thù KHTN GDPT 2018
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('nl-nhan-thuc-khtn', 'Nhận thức khoa học tự nhiên', 'science-competency',
    '{"gdpt_2018": "NL-nhan-thuc-KHTN"}'::jsonb),
  ('nl-tim-hieu-tu-nhien', 'Tìm hiểu tự nhiên', 'science-competency',
    '{"gdpt_2018": "NL-tim-hieu-tu-nhien"}'::jsonb),
  ('nl-van-dung', 'Vận dụng kiến thức, kĩ năng đã học', 'science-competency',
    '{"gdpt_2018": "NL-van-dung"}'::jsonb);

-- 7 CCC của NGSS
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('ccc-1-patterns', 'Mô thức/Quy luật', 'crosscutting', '{"ngss_ccc": "CCC-1"}'::jsonb),
  ('ccc-2-cause-effect', 'Nguyên nhân - Kết quả', 'crosscutting', '{"ngss_ccc": "CCC-2"}'::jsonb),
  ('ccc-3-scale', 'Tỉ lệ, quy mô, số lượng', 'crosscutting', '{"ngss_ccc": "CCC-3"}'::jsonb),
  ('ccc-4-systems', 'Hệ thống và mô hình hệ thống', 'crosscutting', '{"ngss_ccc": "CCC-4"}'::jsonb),
  ('ccc-5-energy-matter', 'Năng lượng và Vật chất', 'crosscutting', '{"ngss_ccc": "CCC-5"}'::jsonb),
  ('ccc-6-structure-function', 'Cấu trúc và Chức năng', 'crosscutting', '{"ngss_ccc": "CCC-6"}'::jsonb),
  ('ccc-7-stability-change', 'Cân bằng và Biến đổi', 'crosscutting', '{"ngss_ccc": "CCC-7"}'::jsonb);
```

- [ ] **Step 3: Apply seed via psql**

Seed SQL không qua migration system (vì nó là data, không phải schema). Run:

```bash
# Via Supabase dashboard SQL Editor hoặc psql
psql "$DATABASE_URL" < supabase/seed/01_programs_courses.sql
psql "$DATABASE_URL" < supabase/seed/02_skills_bootstrap.sql
```

Alternative: user paste vào Supabase SQL Editor và Run.

Verify: `SELECT count(*) FROM programs; SELECT count(*) FROM courses; SELECT count(*) FROM skills;`
Expected: 1, 9, 18.

- [ ] **Step 4: Commit seed files**

```bash
git add supabase/seed/
git commit -m "Seed 01+02 — OpenSciedNEO program + 9 courses K-8 + 18 core skills

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 11: Seed activities — migrate MDX → activities table

**Files:**
- Create: `supabase/seed/03_activities_from_mdx.mjs`

- [ ] **Step 1: Viết script**

Write `supabase/seed/03_activities_from_mdx.mjs`:

```js
#!/usr/bin/env node
// Migrate content/curriculum/grade-*/unit-*/lesson-*.mdx → activities rows
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import 'dotenv/config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const REPO = '/Users/tuanln/Documents/Claude/Projects/OpenSciedNEO';
const CURRICULUM = join(REPO, 'content/curriculum');

async function getCourseId(gradeSlug) {
  const { data } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', gradeSlug)
    .single();
  return data?.id;
}

async function migrate() {
  const grades = await readdir(CURRICULUM, { withFileTypes: true });
  let count = 0;

  for (const grade of grades) {
    if (!grade.isDirectory() || !grade.name.startsWith('grade-')) continue;

    const courseId = await getCourseId(grade.name);
    if (!courseId) {
      console.warn(`No course for ${grade.name}, skipping`);
      continue;
    }

    const units = await readdir(join(CURRICULUM, grade.name), { withFileTypes: true });
    for (const unit of units) {
      if (!unit.isDirectory() || !unit.name.startsWith('unit-')) continue;

      const lessons = await readdir(join(CURRICULUM, grade.name, unit.name));
      for (const file of lessons) {
        if (!file.match(/^lesson-\d+\.mdx$/)) continue;

        const fullPath = join(CURRICULUM, grade.name, unit.name, file);
        const content = await readFile(fullPath, 'utf-8');
        const { data: fm } = matter(content);

        const unitSlug = unit.name.replace('unit-', ''); // "6-1"
        const lessonNum = file.match(/lesson-(\d+)\.mdx/)[1];
        const slug = `${unitSlug}-L${parseInt(lessonNum, 10)}`;

        const { error } = await supabase.from('activities').upsert({
          course_id: courseId,
          slug,
          name: fm.title || `Lesson ${lessonNum}`,
          activity_type: 'lesson',
          source_ref: `content/curriculum/${grade.name}/${unit.name}/${file}`,
          estimated_minutes: fm.estimatedMinutes ?? 45,
          sequence_order: parseInt(lessonNum, 10),
          metadata: {
            unit_slug: unitSlug,
            unit_name: fm.unitName,
            driving_question: fm.drivingQuestion,
          },
        }, { onConflict: 'course_id,slug' });

        if (error) {
          console.error(`Error ${slug}:`, error.message);
        } else {
          count++;
          if (count % 50 === 0) console.log(`Migrated ${count}...`);
        }
      }
    }
  }
  console.log(`Done. Total: ${count} activities.`);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Run script**

Run:
```bash
cd /Users/tuanln/Documents/Claude/Projects/OpenSciedNEO
node --env-file=.env.local supabase/seed/03_activities_from_mdx.mjs
```

Expected output: `Migrated 50... 100... ... Done. Total: ~518 activities.`

Verify: trong Supabase SQL Editor `SELECT count(*) FROM activities;` → ~518.

- [ ] **Step 3: Commit script**

```bash
git add supabase/seed/03_activities_from_mdx.mjs
git commit -m "Seed 03 — migrate ~518 lessons from MDX to activities table

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Phase B — Auth (Supabase client + middleware + login)

### Task 12: Supabase client utilities

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Create: `lib/supabase/middleware.ts`

- [ ] **Step 1: Browser client**

Write `lib/supabase/client.ts`:

```ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 2: Server client**

Write `lib/supabase/server.ts`:

```ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component — safe to ignore
          }
        },
      },
    }
  );
}
```

- [ ] **Step 3: Admin client (service role)**

Write `lib/supabase/admin.ts`:

```ts
import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Dùng khi cần bypass RLS (vd admin tạo user). KHÔNG DÙNG từ client.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
```

- [ ] **Step 4: Middleware helper**

Write `lib/supabase/middleware.ts`:

```ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  return { supabaseResponse, user };
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/supabase/
git commit -m "Add Supabase client utilities (browser + server + admin + middleware)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 13: Middleware — auth redirect + role gate

**Files:**
- Create: `middleware.ts` (root level)
- Create: `lib/auth/require-role.ts`

- [ ] **Step 1: Root middleware**

Write `middleware.ts`:

```ts
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Public paths
  const publicPaths = ['/', '/login', '/auth/callback'];
  const isPublic = publicPaths.includes(pathname) ||
    pathname.startsWith('/curriculum') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/public') ||
    pathname.match(/\.(png|jpg|svg|ico|webp)$/);

  if (isPublic) return supabaseResponse;

  // Protected paths — redirect to /login if not authenticated
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

- [ ] **Step 2: Role helper**

Write `lib/auth/require-role.ts`:

```ts
import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function requireRole(roles: Array<'student' | 'teacher' | 'mentor' | 'admin'>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !roles.includes(profile.role as typeof roles[number])) {
    redirect('/');
  }

  return { user, profile };
}
```

- [ ] **Step 3: Commit**

```bash
git add middleware.ts lib/auth/require-role.ts
git commit -m "Add root middleware + requireRole helper for role-based access

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 14: Login page — dual tab (Gmail / Username)

**Files:**
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/login/login-form.tsx`
- Create: `app/auth/callback/route.ts`
- Create: `actions/auth.ts`

- [ ] **Step 1: Login page**

Write `app/(auth)/login/page.tsx`:

```tsx
import { LoginForm } from './login-form';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Đăng nhập OpenSciedNEO</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Chọn cách đăng nhập phù hợp với em
        </p>
        <LoginForm nextParamPromise={searchParams} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Login form (client)**

Write `app/(auth)/login/login-form.tsx`:

```tsx
'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  nextParamPromise,
}: {
  nextParamPromise: Promise<{ next?: string }>;
}) {
  const { next } = use(nextParamPromise);
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${next || '/dashboard'}`,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function signInWithUsername(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const email = `${username.trim().toLowerCase()}@openstemneo.local`;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      setLoading(false);
    } else {
      router.push(next || '/dashboard');
      router.refresh();
    }
  }

  return (
    <Tabs defaultValue="gmail" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="gmail">Gmail</TabsTrigger>
        <TabsTrigger value="username">Tên đăng nhập</TabsTrigger>
      </TabsList>

      <TabsContent value="gmail" className="space-y-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Nếu em có tài khoản Gmail, bấm nút dưới để đăng nhập nhanh.
        </p>
        <Button onClick={signInWithGoogle} disabled={loading} className="w-full">
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập bằng Google'}
        </Button>
      </TabsContent>

      <TabsContent value="username" className="space-y-4 pt-4">
        <form onSubmit={signInWithUsername} className="space-y-3">
          <div>
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              placeholder="hs-tan-a"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Tên đăng nhập do thầy/cô cấp cho em.
        </p>
      </TabsContent>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
    </Tabs>
  );
}
```

- [ ] **Step 3: Auth callback route**

Write `app/auth/callback/route.ts`:

```ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
```

- [ ] **Step 4: Sign-out action**

Write `actions/auth.ts`:

```ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
```

- [ ] **Step 5: Add shadcn Tabs component if missing**

Run: `ls components/ui/tabs.tsx 2>/dev/null || npx shadcn@latest add tabs`

- [ ] **Step 6: Commit**

```bash
git add app/\(auth\)/login/ app/auth/callback/ actions/auth.ts components/ui/tabs.tsx 2>/dev/null
git add app/\(auth\) app/auth actions/auth.ts
git commit -m "Add login page (Gmail + username tabs) + OAuth callback + signOut action

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 15: Test auth end-to-end (manual)

**Files:** (none — manual test)

- [ ] **Step 1: Tạo 1 user admin thủ công**

Vào Supabase Dashboard → Authentication → Users → "Add user":
- Email: `admin@openstemneo.local`
- Password: (đặt password mạnh)
- Auto Confirm User: ✓

Sau đó SQL Editor:
```sql
UPDATE profiles SET role = 'admin', username = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@openstemneo.local');
```

- [ ] **Step 2: Local dev server**

Run: `npm run dev`
Expected: khởi động ở `http://localhost:3000`.

- [ ] **Step 3: Test login bằng username**

Browser → `http://localhost:3000/login` → tab "Tên đăng nhập" → `admin` + password.
Expected: redirect `/dashboard` (sẽ 404 nếu chưa build page — OK cho giờ, chỉ cần confirm không bị bounce về `/login`).

- [ ] **Step 4: Test login bằng Google**

Tab "Gmail" → Đăng nhập bằng Google → chọn tài khoản Gmail.
Expected: redirect callback → redirect `/dashboard`. Check `profiles` table → có row mới với `auth_method='oauth'`.

- [ ] **Step 5: Report kết quả**

Task này không commit code, chỉ verify. Nếu có bug, tạo task fix (sửa trong middleware hoặc callback), commit sửa.

---

## Phase C — Progress tracking + Evidence

### Task 16: Server actions — progress + events

**Files:**
- Create: `actions/progress.ts`
- Create: `lib/db/events.ts`

- [ ] **Step 1: DB helper cho events**

Write `lib/db/events.ts`:

```ts
import 'server-only';
import { createClient } from '@/lib/supabase/server';

type EventType =
  | 'started' | 'completed' | 'abandoned' | 'revisited'
  | 'evidence_submitted' | 'question_asked' | 'reflection_written';

export async function logEvent(
  activityId: string,
  eventType: EventType,
  payload: Record<string, unknown> = {}
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('learning_events').insert({
    user_id: user.id,
    activity_id: activityId,
    event_type: eventType,
    payload,
  });
  if (error) throw error;
}

export async function getLatestEvent(activityId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('learning_events')
    .select('event_type, occurred_at')
    .eq('user_id', user.id)
    .eq('activity_id', activityId)
    .order('occurred_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}
```

- [ ] **Step 2: Server actions**

Write `actions/progress.ts`:

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { logEvent } from '@/lib/db/events';

export async function markActivityStarted(activityId: string, sourceRef: string) {
  await logEvent(activityId, 'started', { source_ref: sourceRef });
}

export async function markActivityCompleted(activityId: string, sourceRef: string) {
  await logEvent(activityId, 'completed', { source_ref: sourceRef });
  revalidatePath('/dashboard');
  revalidatePath('/progress');
  revalidatePath('/skills');
}

export async function markActivityRevisited(activityId: string) {
  await logEvent(activityId, 'revisited');
}
```

- [ ] **Step 3: Commit**

```bash
git add actions/progress.ts lib/db/events.ts
git commit -m "Add progress server actions + event logging helper

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 17: ActivityStatusToggle component

**Files:**
- Create: `components/phase2/student/activity-status-toggle.tsx`

- [ ] **Step 1: Component**

Write `components/phase2/student/activity-status-toggle.tsx`:

```tsx
'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { markActivityCompleted } from '@/actions/progress';
import { Button } from '@/components/ui/button';

export function ActivityStatusToggle({
  activityId,
  sourceRef,
  initialCompleted,
}: {
  activityId: string;
  sourceRef: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (completed) return; // no un-complete for now
    startTransition(async () => {
      try {
        await markActivityCompleted(activityId, sourceRef);
        setCompleted(true);
      } catch (e) {
        console.error(e);
      }
    });
  }

  return (
    <div className="mt-8 flex justify-center">
      <Button
        onClick={handleClick}
        disabled={pending || completed}
        size="lg"
        variant={completed ? 'secondary' : 'default'}
        className="gap-2"
      >
        {completed ? (
          <><CheckCircle2 className="h-5 w-5" /> Đã học xong bài này</>
        ) : (
          <><Circle className="h-5 w-5" /> {pending ? 'Đang lưu...' : 'Đánh dấu đã học xong'}</>
        )}
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/phase2/student/activity-status-toggle.tsx
git commit -m "Add ActivityStatusToggle — mark lesson completed button

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 18: Integrate ActivityStatusToggle into lesson page

**Files:**
- Modify: `app/(student)/student/units/[unitId]/lessons/[lessonId]/page.tsx` (check exact path với Glob)

- [ ] **Step 1: Find existing lesson page**

Run: `find app -name "page.tsx" -path "*lessons*" -o -name "page.tsx" -path "*lesson*" | head -5`

Expected: path như `app/student/units/[unitId]/lessons/[lessonId]/page.tsx` hoặc tương tự.

- [ ] **Step 2: Lấy activity_id từ DB**

Inject đoạn sau vào cuối lesson render (sau MDX content), với `lessonSlug` = `"6-1-L3"` format:

```tsx
import { createClient } from '@/lib/supabase/server';
import { ActivityStatusToggle } from '@/components/phase2/student/activity-status-toggle';
import { getLatestEvent } from '@/lib/db/events';

// ... trong component server:
const supabase = await createClient();
const { data: activity } = await supabase
  .from('activities')
  .select('id, source_ref')
  .eq('slug', lessonSlug)
  .maybeSingle();

const latestEvent = activity ? await getLatestEvent(activity.id) : null;
const completed = latestEvent?.event_type === 'completed';

// ... render:
{activity && (
  <ActivityStatusToggle
    activityId={activity.id}
    sourceRef={activity.source_ref ?? ''}
    initialCompleted={completed}
  />
)}
```

Adapt đoạn trên vào shape thực tế của page. Giữ MDX rendering hiện có không đổi.

- [ ] **Step 3: Manual test**

Start dev: `npm run dev` → login as admin → mở 1 lesson → click "Đánh dấu đã học" → button đổi sang "Đã học xong".
Verify trong Supabase: `SELECT * FROM learning_events WHERE user_id = '...' ORDER BY occurred_at DESC LIMIT 5;` → thấy 1 row `event_type='completed'`.

Verify streak trigger: `SELECT * FROM learning_streaks WHERE user_id = '...';` → thấy row cho hôm nay với `activities_completed=1`.

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "Integrate ActivityStatusToggle into lesson page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 19: Evidence component — persist to DB

**Files:**
- Create: `components/phase2/student/evidence-interactive.tsx`
- Create: `actions/evidence.ts`
- Modify: existing `Evidence` component wrapper nếu có

- [ ] **Step 1: Server action**

Write `actions/evidence.ts`:

```ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { logEvent } from '@/lib/db/events';

export async function saveEvidenceResponse(
  activityId: string,
  questionId: string,
  text: string
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  await logEvent(activityId, 'evidence_submitted', {
    question_id: questionId,
    text,
  });
}

export async function getMyEvidenceForActivity(activityId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // Get latest evidence per question_id
  const { data } = await supabase
    .from('learning_events')
    .select('payload, occurred_at')
    .eq('user_id', user.id)
    .eq('activity_id', activityId)
    .eq('event_type', 'evidence_submitted')
    .order('occurred_at', { ascending: false });

  // Dedupe by question_id (keep latest)
  const byQuestion = new Map<string, { text: string; at: string }>();
  for (const row of data ?? []) {
    const qid = (row.payload as { question_id?: string })?.question_id;
    const text = (row.payload as { text?: string })?.text;
    if (qid && text && !byQuestion.has(qid)) {
      byQuestion.set(qid, { text, at: row.occurred_at });
    }
  }
  return Object.fromEntries(
    Array.from(byQuestion.entries()).map(([q, v]) => [q, v])
  );
}
```

- [ ] **Step 2: Client component**

Write `components/phase2/student/evidence-interactive.tsx`:

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { saveEvidenceResponse } from '@/actions/evidence';

export function EvidenceInteractive({
  activityId,
  questionId,
  prompt,
  initialText = '',
}: {
  activityId: string;
  questionId: string;
  prompt: string;
  initialText?: string;
}) {
  const [text, setText] = useState(initialText);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (text === initialText) return;
    setStatus('saving');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        await saveEvidenceResponse(activityId, questionId, text);
        setStatus('saved');
      } catch {
        setStatus('error');
      }
    }, 800);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, initialText, activityId, questionId]);

  return (
    <div className="my-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
      <p className="font-medium text-blue-900 mb-2">📝 Em hãy viết câu trả lời:</p>
      <p className="text-sm text-blue-800 mb-3">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded border border-blue-300 bg-white p-2 text-sm"
        placeholder="Viết suy nghĩ của em ở đây..."
      />
      <p className="mt-1 text-xs text-blue-700">
        {status === 'idle' && ' '}
        {status === 'saving' && '💾 Đang lưu...'}
        {status === 'saved' && '✅ Đã lưu'}
        {status === 'error' && '❌ Lỗi khi lưu — kiểm tra mạng'}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Wrap legacy `Evidence` MDX component**

Tìm file: `find components -name "evidence*" -o -name "Evidence*" | head -5`

Nếu có (vd `components/curriculum/evidence.tsx`): giữ server version cho guest (public view), tạo wrapper nhận prop `activityId` và render `EvidenceInteractive` nếu có, không thì render legacy.

Nếu không có: skip — `EvidenceInteractive` đứng riêng và MDX tác giả phải dùng thủ công.

- [ ] **Step 4: Commit**

```bash
git add actions/evidence.ts components/phase2/student/evidence-interactive.tsx
git commit -m "Add EvidenceInteractive — textarea auto-save to learning_events

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 20: Dashboard — continue learning + streak + achievements

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `components/phase2/student/continue-learning.tsx`
- Create: `components/phase2/student/streak-counter.tsx`
- Create: `components/phase2/student/progress-bar.tsx`

- [ ] **Step 1: ContinueLearning component**

Write `components/phase2/student/continue-learning.tsx`:

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';

export async function ContinueLearning() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Find most recent 'started' or 'revisited' event where activity not yet 'completed'
  const { data: lastEvent } = await supabase
    .from('learning_events')
    .select('activity_id, occurred_at, activities(slug, name, source_ref, courses(name))')
    .eq('user_id', user.id)
    .in('event_type', ['started', 'revisited'])
    .order('occurred_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!lastEvent?.activities) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Em chưa bắt đầu bài học nào. Hãy khám phá!
          </p>
        </CardContent>
      </Card>
    );
  }

  // activities may be array — grab first
  const activity = Array.isArray(lastEvent.activities) ? lastEvent.activities[0] : lastEvent.activities;
  const lessonPath = activity.source_ref?.replace('content/curriculum/', '/student/units/') ?? '#';

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-blue-700">Tiếp tục học</p>
        <h3 className="mt-1 text-lg font-bold">{activity.name}</h3>
        <p className="text-sm text-muted-foreground">{activity.courses?.name}</p>
        <Link href={lessonPath} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
          Vào học <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: StreakCounter**

Write `components/phase2/student/streak-counter.tsx`:

```tsx
import { Flame } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export async function StreakCounter() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: streaks } = await supabase
    .from('learning_streaks')
    .select('date, activities_completed')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(60);

  if (!streaks || streaks.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-center">
        <Flame className="mx-auto h-6 w-6 text-gray-300" />
        <p className="mt-1 text-sm text-muted-foreground">Chưa có chuỗi nào</p>
      </div>
    );
  }

  // Count consecutive days from today backwards
  const today = new Date().toISOString().slice(0, 10);
  const datesSet = new Set(streaks.map(s => s.date));
  let count = 0;
  const d = new Date();
  while (datesSet.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }

  return (
    <div className="rounded-lg border bg-orange-50 p-4 text-center">
      <Flame className="mx-auto h-6 w-6 text-orange-500" />
      <p className="mt-1 text-2xl font-bold text-orange-700">{count}</p>
      <p className="text-sm text-orange-700">ngày liên tục</p>
    </div>
  );
}
```

- [ ] **Step 3: ProgressBar (per course)**

Write `components/phase2/student/progress-bar.tsx`:

```tsx
import { createClient } from '@/lib/supabase/server';

export async function CourseProgressBar({ courseId, courseName }: { courseId: string; courseName: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Total activities trong course
  const { count: total } = await supabase
    .from('activities')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', courseId);

  // Completed (distinct activities có 'completed' event)
  const { data: completedRows } = await supabase
    .from('learning_events')
    .select('activity_id, activities!inner(course_id)')
    .eq('user_id', user.id)
    .eq('event_type', 'completed')
    .eq('activities.course_id', courseId);

  const completed = new Set((completedRows ?? []).map(r => r.activity_id)).size;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{courseName}</span>
        <span className="text-muted-foreground">{completed}/{total ?? 0}</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Dashboard page**

Write `app/dashboard/page.tsx`:

```tsx
import { requireRole } from '@/lib/auth/require-role';
import { ContinueLearning } from '@/components/phase2/student/continue-learning';
import { StreakCounter } from '@/components/phase2/student/streak-counter';
import { CourseProgressBar } from '@/components/phase2/student/progress-bar';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function DashboardPage() {
  const { profile } = await requireRole(['student', 'teacher', 'admin']);
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('id, name, grade_level')
    .order('grade_level');

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 space-y-6">
      <section>
        <h1 className="text-2xl font-bold">Xin chào{profile.full_name ? `, ${profile.full_name}` : ''}! 👋</h1>
        <p className="text-muted-foreground">Hôm nay em muốn khám phá gì?</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <ContinueLearning />
        <StreakCounter />
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold">Tiến độ học</h2>
          {(courses ?? []).map(c => (
            <CourseProgressBar key={c.id} courseId={c.id} courseName={c.name} />
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2 flex-wrap">
        <Link href="/skills" className="text-sm text-blue-600 hover:underline">Xem skills của em →</Link>
        <Link href="/profile" className="text-sm text-blue-600 hover:underline">Xem profile →</Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/dashboard/ components/phase2/student/continue-learning.tsx components/phase2/student/streak-counter.tsx components/phase2/student/progress-bar.tsx
git commit -m "Add student dashboard — continue learning + streak + course progress

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Phase D — Skills UI

### Task 21: Skills page — skill tree + mastery

**Files:**
- Create: `app/skills/page.tsx`
- Create: `components/phase2/student/skill-tree-view.tsx`
- Create: `actions/skills.ts`

- [ ] **Step 1: Server action**

Write `actions/skills.ts`:

```ts
'use server';

import { createClient } from '@/lib/supabase/server';

export async function getMySkillProgress() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('skills')
    .select(`
      id, slug, name, category, framework_refs,
      skill_progress!left (
        evidence_count, mastery_level, last_demonstrated_at
      )
    `)
    .order('category')
    .order('slug');

  // Map skill_progress (filter only mine)
  return (data ?? []).map(s => ({
    ...s,
    progress: (s.skill_progress ?? []).find(
      (p: { evidence_count: number; mastery_level: number }) => true
    ) ?? { evidence_count: 0, mastery_level: 0, last_demonstrated_at: null },
  }));
}
```

Note: RLS đã lọc `skill_progress` về chỉ của current user.

- [ ] **Step 2: SkillTreeView component**

Write `components/phase2/student/skill-tree-view.tsx`:

```tsx
const MASTERY_LABEL = ['Chưa bắt đầu', 'Mới làm quen', 'Đang rèn luyện', 'Thành thạo', 'Nâng cao', 'Xuất sắc'];
const MASTERY_COLOR = ['bg-gray-200', 'bg-green-200', 'bg-green-400', 'bg-blue-400', 'bg-purple-500', 'bg-yellow-500'];

export function SkillTreeView({
  skills,
}: {
  skills: Array<{
    slug: string;
    name: string;
    category: string | null;
    framework_refs: Record<string, string>;
    progress: { evidence_count: number; mastery_level: number };
  }>;
}) {
  const byCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = s.category ?? 'other';
    (acc[cat] ??= []).push(s);
    return acc;
  }, {});

  const CATEGORY_LABEL: Record<string, string> = {
    'science-practice': '8 SEP — Hoạt động khoa học (NGSS)',
    'science-competency': '3 Năng lực đặc thù KHTN (GDPT 2018)',
    'crosscutting': '7 CCC — Lăng kính tư duy (NGSS)',
  };

  return (
    <div className="space-y-6">
      {Object.entries(byCategory).map(([cat, list]) => (
        <section key={cat}>
          <h2 className="text-lg font-bold mb-3">{CATEGORY_LABEL[cat] ?? cat}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {list.map(s => (
              <div key={s.slug} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{s.name}</span>
                  <span className={`text-xs rounded px-2 py-0.5 ${MASTERY_COLOR[s.progress.mastery_level]}`}>
                    {MASTERY_LABEL[s.progress.mastery_level]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.progress.evidence_count} lần vận dụng
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Skills page**

Write `app/skills/page.tsx`:

```tsx
import { requireRole } from '@/lib/auth/require-role';
import { getMySkillProgress } from '@/actions/skills';
import { SkillTreeView } from '@/components/phase2/student/skill-tree-view';

export default async function SkillsPage() {
  await requireRole(['student', 'teacher', 'admin']);
  const skills = await getMySkillProgress();

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-2">Skills của em 🎯</h1>
      <p className="text-muted-foreground mb-6">
        Mỗi bài học em hoàn thành sẽ mở khóa hoặc nâng cấp kĩ năng. Có 18 skills cốt lõi xuyên suốt chương trình.
      </p>
      <SkillTreeView skills={skills as never} />
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/skills/ components/phase2/student/skill-tree-view.tsx actions/skills.ts
git commit -m "Add skills page — 18 core skills + mastery level per student

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 22: Profile page — evidence history

**Files:**
- Create: `app/profile/page.tsx`

- [ ] **Step 1: Page**

Write `app/profile/page.tsx`:

```tsx
import { requireRole } from '@/lib/auth/require-role';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/actions/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function ProfilePage() {
  const { profile } = await requireRole(['student', 'teacher', 'admin']);
  const supabase = await createClient();

  const { data: evidences } = await supabase
    .from('learning_events')
    .select('payload, occurred_at, activities(name, courses(name))')
    .eq('event_type', 'evidence_submitted')
    .order('occurred_at', { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 space-y-6">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold">{profile.full_name}</h1>
          <p className="text-muted-foreground">@{profile.username ?? '(chưa có username)'}</p>
          <p className="mt-2 text-sm">Role: {profile.role}</p>
          {profile.grade_level != null && <p className="text-sm">Lớp: {profile.grade_level}</p>}
          <form action={signOut} className="mt-4">
            <Button type="submit" variant="outline">Đăng xuất</Button>
          </form>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-bold mb-3">Câu trả lời gần đây ✍️</h2>
        {(evidences ?? []).length === 0 ? (
          <p className="text-muted-foreground">Chưa có câu trả lời nào.</p>
        ) : (
          <ul className="space-y-3">
            {(evidences ?? []).map((e, i) => {
              const p = e.payload as { question_id?: string; text?: string };
              const a = Array.isArray(e.activities) ? e.activities[0] : e.activities;
              return (
                <li key={i} className="rounded-lg border p-3 text-sm">
                  <p className="text-xs text-muted-foreground">
                    {a?.courses?.name} · {a?.name} · {new Date(e.occurred_at).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="mt-1 italic text-muted-foreground">Câu: {p.question_id}</p>
                  <p className="mt-2 whitespace-pre-wrap">{p.text}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/profile/
git commit -m "Add profile page — evidence history + sign out

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Phase E — Admin UI

### Task 23: Admin account creation

**Files:**
- Create: `app/admin/accounts/new/page.tsx`
- Create: `app/admin/accounts/page.tsx`
- Create: `actions/admin.ts`
- Create: `components/phase2/admin/account-form.tsx`

- [ ] **Step 1: Server action**

Write `actions/admin.ts`:

```ts
'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { requireRole } from '@/lib/auth/require-role';
import { revalidatePath } from 'next/cache';

export async function createUserAccount(formData: FormData) {
  const { user: admin } = await requireRole(['admin']);

  const username = String(formData.get('username')).trim().toLowerCase();
  const fullName = String(formData.get('fullName'));
  const password = String(formData.get('password'));
  const role = String(formData.get('role')) as 'student' | 'teacher' | 'mentor';
  const gradeLevel = formData.get('gradeLevel') ? parseInt(String(formData.get('gradeLevel')), 10) : null;
  const cohortId = formData.get('cohortId') ? String(formData.get('cohortId')) : null;

  if (!username.match(/^[a-z0-9-]{3,30}$/)) {
    return { error: 'Username phải 3-30 kí tự, chỉ a-z, 0-9, dấu gạch ngang' };
  }
  if (password.length < 6) {
    return { error: 'Mật khẩu ≥ 6 kí tự' };
  }

  const email = `${username}@openstemneo.local`;
  const admin_client = createAdminClient();

  const { data: created, error: authError } = await admin_client.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, username },
  });
  if (authError) return { error: authError.message };

  const userId = created.user!.id;

  // Update profile (row already created by trigger)
  const { error: profileError } = await admin_client.from('profiles').update({
    username,
    full_name: fullName,
    role,
    grade_level: gradeLevel,
    auth_method: 'admin_created',
    created_by: admin.id,
  }).eq('id', userId);
  if (profileError) return { error: profileError.message };

  if (cohortId) {
    await admin_client.from('cohort_members').insert({
      cohort_id: cohortId,
      user_id: userId,
    });
  }

  revalidatePath('/admin/accounts');
  return { ok: true, userId };
}

export async function createCohort(formData: FormData) {
  await requireRole(['admin']);
  const admin_client = createAdminClient();

  const name = String(formData.get('name'));
  const cohortType = String(formData.get('cohortType'));
  const leadUserId = formData.get('leadUserId') ? String(formData.get('leadUserId')) : null;
  const courseId = formData.get('courseId') ? String(formData.get('courseId')) : null;

  const { error } = await admin_client.from('cohorts').insert({
    name,
    cohort_type: cohortType,
    lead_user_id: leadUserId,
    course_id: courseId,
  });
  if (error) return { error: error.message };

  revalidatePath('/admin/cohorts');
  return { ok: true };
}
```

- [ ] **Step 2: Account form component**

Write `components/phase2/admin/account-form.tsx`:

```tsx
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { createUserAccount } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Đang tạo...' : 'Tạo tài khoản'}</Button>;
}

export function AccountForm({ cohorts }: { cohorts: Array<{ id: string; name: string }> }) {
  const [state, action] = useActionState(
    async (_prev: { error?: string; ok?: boolean } | null, formData: FormData) => createUserAccount(formData),
    null
  );

  return (
    <form action={action} className="space-y-4 max-w-lg">
      <div>
        <Label htmlFor="role">Role</Label>
        <select id="role" name="role" className="w-full rounded border p-2" required>
          <option value="student">Học sinh</option>
          <option value="teacher">Giáo viên</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      <div>
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input id="username" name="username" required placeholder="hs-tan-a" />
        <p className="text-xs text-muted-foreground mt-1">
          Sẽ tạo email nội bộ: <code>username@openstemneo.local</code>
        </p>
      </div>
      <div>
        <Label htmlFor="fullName">Họ và tên</Label>
        <Input id="fullName" name="fullName" required placeholder="Nguyễn Tấn A" />
      </div>
      <div>
        <Label htmlFor="password">Mật khẩu (tạm)</Label>
        <Input id="password" name="password" type="text" required minLength={6} />
        <p className="text-xs text-muted-foreground mt-1">HS sẽ được nhắc đổi mật khẩu lần đầu đăng nhập (feature sau).</p>
      </div>
      <div>
        <Label htmlFor="gradeLevel">Lớp</Label>
        <Input id="gradeLevel" name="gradeLevel" type="number" min="0" max="12" />
      </div>
      <div>
        <Label htmlFor="cohortId">Cohort</Label>
        <select id="cohortId" name="cohortId" className="w-full rounded border p-2">
          <option value="">(không gán)</option>
          {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <SubmitButton />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="text-sm text-green-600">✅ Đã tạo tài khoản</p>}
    </form>
  );
}
```

- [ ] **Step 3: Accounts list + new pages**

Write `app/admin/accounts/new/page.tsx`:

```tsx
import { requireRole } from '@/lib/auth/require-role';
import { createClient } from '@/lib/supabase/server';
import { AccountForm } from '@/components/phase2/admin/account-form';

export default async function NewAccountPage() {
  await requireRole(['admin']);
  const supabase = await createClient();
  const { data: cohorts } = await supabase.from('cohorts').select('id, name').order('name');

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Tạo tài khoản mới</h1>
      <AccountForm cohorts={cohorts ?? []} />
    </div>
  );
}
```

Write `app/admin/accounts/page.tsx`:

```tsx
import Link from 'next/link';
import { requireRole } from '@/lib/auth/require-role';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

export default async function AccountsListPage() {
  await requireRole(['admin']);
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, full_name, role, grade_level, auth_method, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tài khoản ({profiles?.length ?? 0})</h1>
        <Link href="/admin/accounts/new"><Button>+ Tạo mới</Button></Link>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-2">Username</th>
            <th className="text-left p-2">Họ tên</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Lớp</th>
            <th className="text-left p-2">Loại</th>
            <th className="text-left p-2">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {(profiles ?? []).map(p => (
            <tr key={p.id} className="border-b">
              <td className="p-2 font-mono text-xs">{p.username ?? '—'}</td>
              <td className="p-2">{p.full_name ?? '—'}</td>
              <td className="p-2">{p.role}</td>
              <td className="p-2">{p.grade_level ?? '—'}</td>
              <td className="p-2">{p.auth_method}</td>
              <td className="p-2">{new Date(p.created_at).toLocaleDateString('vi-VN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/accounts/ actions/admin.ts components/phase2/admin/account-form.tsx
git commit -m "Add admin UI — create/list accounts (student/teacher/mentor)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 24: Admin cohort management

**Files:**
- Create: `app/admin/cohorts/page.tsx`
- Create: `components/phase2/admin/cohort-manager.tsx`

- [ ] **Step 1: Cohort manager component**

Write `components/phase2/admin/cohort-manager.tsx`:

```tsx
'use client';

import { useActionState } from 'react';
import { createCohort } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CohortCreateForm({
  courses,
  teachers,
}: {
  courses: Array<{ id: string; name: string }>;
  teachers: Array<{ id: string; full_name: string | null; username: string | null }>;
}) {
  const [state, action] = useActionState(
    async (_prev: { error?: string; ok?: boolean } | null, formData: FormData) => createCohort(formData),
    null
  );

  return (
    <form action={action} className="space-y-3 max-w-lg rounded-lg border p-4">
      <h3 className="font-bold">Tạo cohort mới</h3>
      <div>
        <Label htmlFor="name">Tên cohort</Label>
        <Input id="name" name="name" required placeholder="6A1-THCS-Trần-Phú-2026" />
      </div>
      <div>
        <Label htmlFor="cohortType">Loại</Label>
        <select id="cohortType" name="cohortType" className="w-full rounded border p-2">
          <option value="school_class">Lớp học trường</option>
          <option value="workshop_batch">Workshop batch</option>
          <option value="mentor_circle">Mentor circle</option>
          <option value="field_trip">Field trip</option>
        </select>
      </div>
      <div>
        <Label htmlFor="courseId">Khóa học</Label>
        <select id="courseId" name="courseId" className="w-full rounded border p-2">
          <option value="">(tùy chọn)</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="leadUserId">Lead (teacher/mentor)</Label>
        <select id="leadUserId" name="leadUserId" className="w-full rounded border p-2">
          <option value="">(chưa gán)</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.full_name ?? t.username}</option>
          ))}
        </select>
      </div>
      <Button type="submit">Tạo cohort</Button>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="text-sm text-green-600">✅ Đã tạo</p>}
    </form>
  );
}
```

- [ ] **Step 2: Cohorts page**

Write `app/admin/cohorts/page.tsx`:

```tsx
import { requireRole } from '@/lib/auth/require-role';
import { createClient } from '@/lib/supabase/server';
import { CohortCreateForm } from '@/components/phase2/admin/cohort-manager';

export default async function CohortsPage() {
  await requireRole(['admin']);
  const supabase = await createClient();

  const [{ data: cohorts }, { data: courses }, { data: teachers }] = await Promise.all([
    supabase.from('cohorts').select('id, name, cohort_type, lead_user_id, course_id, created_at').order('created_at', { ascending: false }),
    supabase.from('courses').select('id, name').order('grade_level'),
    supabase.from('profiles').select('id, full_name, username').in('role', ['teacher', 'mentor']).order('full_name'),
  ]);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý cohorts</h1>
      <CohortCreateForm courses={courses ?? []} teachers={teachers ?? []} />

      <div>
        <h2 className="text-lg font-bold mb-3">Danh sách ({cohorts?.length ?? 0})</h2>
        <ul className="space-y-2">
          {(cohorts ?? []).map(c => (
            <li key={c.id} className="rounded-lg border p-3">
              <div className="flex justify-between">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.cohort_type}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/cohorts/ components/phase2/admin/cohort-manager.tsx
git commit -m "Add admin cohorts page — create + list

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Phase F — Teacher UI

### Task 25: Teacher dashboard — list cohorts + roster

**Files:**
- Create: `app/teacher/page.tsx`
- Create: `app/teacher/cohort/[id]/page.tsx`
- Create: `actions/teacher.ts`

- [ ] **Step 1: Teacher actions**

Write `actions/teacher.ts`:

```ts
'use server';

import { createClient } from '@/lib/supabase/server';

export async function listMyCohorts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // RLS tự filter ra cohorts lead_user_id = me
  const { data } = await supabase
    .from('cohorts')
    .select('id, name, cohort_type, course_id, courses(name)')
    .eq('lead_user_id', user.id)
    .order('created_at', { ascending: false });
  return data ?? [];
}

export async function getCohortRoster(cohortId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('cohort_members')
    .select('user_id, profiles(username, full_name, grade_level)')
    .eq('cohort_id', cohortId);
  return data ?? [];
}

export async function getStudentOverview(studentId: string) {
  const supabase = await createClient();

  // Profile
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', studentId).single();

  // Last 20 events
  const { data: events } = await supabase
    .from('learning_events')
    .select('event_type, occurred_at, payload, activities(name, courses(name))')
    .eq('user_id', studentId)
    .order('occurred_at', { ascending: false })
    .limit(20);

  // Skills
  const { data: skills } = await supabase
    .from('skill_progress')
    .select('skill_id, mastery_level, evidence_count, skills(name, category)')
    .eq('user_id', studentId)
    .order('mastery_level', { ascending: false });

  return { profile, events: events ?? [], skills: skills ?? [] };
}
```

- [ ] **Step 2: Teacher home page**

Write `app/teacher/page.tsx`:

```tsx
import Link from 'next/link';
import { requireRole } from '@/lib/auth/require-role';
import { listMyCohorts } from '@/actions/teacher';

export default async function TeacherHome() {
  await requireRole(['teacher', 'mentor', 'admin']);
  const cohorts = await listMyCohorts();

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Lớp của thầy/cô</h1>
      {cohorts.length === 0 ? (
        <p className="text-muted-foreground">Chưa được gán lớp nào. Hãy liên hệ admin.</p>
      ) : (
        <ul className="space-y-2">
          {cohorts.map(c => {
            const courseName = Array.isArray(c.courses) ? c.courses[0]?.name : c.courses?.name;
            return (
              <li key={c.id}>
                <Link href={`/teacher/cohort/${c.id}`} className="block rounded-lg border p-4 hover:bg-slate-50">
                  <div className="font-bold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{courseName} · {c.cohort_type}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Cohort detail page**

Write `app/teacher/cohort/[id]/page.tsx`:

```tsx
import Link from 'next/link';
import { requireRole } from '@/lib/auth/require-role';
import { getCohortRoster } from '@/actions/teacher';

export default async function CohortRosterPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(['teacher', 'mentor', 'admin']);
  const { id } = await params;
  const members = await getCohortRoster(id);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <Link href="/teacher" className="text-sm text-blue-600">← Quay lại</Link>
      <h1 className="text-2xl font-bold my-4">Học sinh trong lớp ({members.length})</h1>
      <ul className="space-y-2">
        {members.map(m => {
          const p = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles;
          return (
            <li key={m.user_id}>
              <Link href={`/teacher/student/${m.user_id}`} className="block rounded-lg border p-3 hover:bg-slate-50">
                <span className="font-medium">{p?.full_name ?? p?.username}</span>
                <span className="text-xs text-muted-foreground ml-2">Lớp {p?.grade_level}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/teacher/ actions/teacher.ts
git commit -m "Add teacher home + cohort roster pages (view-only)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 26: Teacher student detail

**Files:**
- Create: `app/teacher/student/[id]/page.tsx`

- [ ] **Step 1: Page**

Write `app/teacher/student/[id]/page.tsx`:

```tsx
import Link from 'next/link';
import { requireRole } from '@/lib/auth/require-role';
import { getStudentOverview } from '@/actions/teacher';
import { Card, CardContent } from '@/components/ui/card';

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(['teacher', 'mentor', 'admin']);
  const { id } = await params;
  const { profile, events, skills } = await getStudentOverview(id);

  if (!profile) return <p className="p-6">Không tìm thấy HS.</p>;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
      <Link href="/teacher" className="text-sm text-blue-600">← Quay lại</Link>
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold">{profile.full_name ?? profile.username}</h1>
          <p className="text-sm text-muted-foreground">Lớp {profile.grade_level} · {profile.role}</p>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-bold mb-3">Skills ({skills.length} đã chạm)</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {skills.map(s => {
            const sk = Array.isArray(s.skills) ? s.skills[0] : s.skills;
            return (
              <div key={s.skill_id} className="rounded-lg border p-3 text-sm">
                <div className="font-medium">{sk?.name}</div>
                <div className="text-xs text-muted-foreground">
                  Mastery {s.mastery_level}/5 · {s.evidence_count} evidence
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Hoạt động gần đây</h2>
        <ul className="space-y-2">
          {events.map((e, i) => {
            const a = Array.isArray(e.activities) ? e.activities[0] : e.activities;
            const courseName = Array.isArray(a?.courses) ? a?.courses[0]?.name : a?.courses?.name;
            return (
              <li key={i} className="rounded border p-2 text-sm">
                <span className="font-mono text-xs bg-slate-100 px-1 rounded">{e.event_type}</span>
                <span className="ml-2">{a?.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{courseName}</span>
                <span className="ml-2 text-xs text-muted-foreground">{new Date(e.occurred_at).toLocaleString('vi-VN')}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/teacher/student/
git commit -m "Add teacher student detail page — skills + recent events

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Phase G — Navigation + QA + Deploy

### Task 27: Add top nav with auth state

**Files:**
- Modify: `app/layout.tsx` (root) hoặc create `components/phase2/site-nav.tsx`

- [ ] **Step 1: Site nav component**

Write `components/phase2/site-nav.tsx`:

```tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export async function SiteNav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let role: string | null = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    role = data?.role ?? null;
  }

  return (
    <nav className="border-b bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-3">
        <Link href="/" className="font-bold">OpenSciedNEO</Link>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link href="/dashboard">Home</Link>
              <Link href="/skills">Skills</Link>
              {(role === 'teacher' || role === 'mentor') && <Link href="/teacher">Lớp tôi</Link>}
              {role === 'admin' && (
                <>
                  <Link href="/admin/accounts">Tài khoản</Link>
                  <Link href="/admin/cohorts">Cohorts</Link>
                </>
              )}
              <Link href="/profile">Hồ sơ</Link>
            </>
          ) : (
            <Link href="/login" className="rounded bg-blue-600 text-white px-3 py-1">Đăng nhập</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Inject nav into root layout**

Read current `app/layout.tsx` → thêm `<SiteNav />` bên trên `{children}`.

```tsx
import { SiteNav } from '@/components/phase2/site-nav';

// ... trong RootLayout:
<body ...>
  <SiteNav />
  {children}
</body>
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx components/phase2/site-nav.tsx
git commit -m "Add site nav with auth-aware links (role-based)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 28: End-to-end smoke test

**Files:** (none — manual QA)

- [ ] **Step 1: Dev server**

`npm run dev` → http://localhost:3000

- [ ] **Step 2: Luồng admin**

1. Login as admin user (đã tạo ở Task 15).
2. Vào `/admin/cohorts` → tạo cohort "TEST-6A1" type `school_class`.
3. Vào `/admin/accounts/new` → tạo teacher `gv-phuong` + student `hs-minh`, gán student vào cohort "TEST-6A1".
4. Vào `/admin/accounts` → thấy 3 users.

- [ ] **Step 3: Luồng teacher**

1. Logout → Login as `gv-phuong`.
2. Vào `/teacher` → chưa thấy cohort (vì lead_user_id chưa gán). Logout → vào admin → edit cohort gán `gv-phuong` làm lead (TODO: chưa có UI edit cohort — dùng SQL trực tiếp:
   `UPDATE cohorts SET lead_user_id = (SELECT id FROM profiles WHERE username='gv-phuong') WHERE name='TEST-6A1';`).
3. Login lại `gv-phuong` → `/teacher` → thấy cohort → click → thấy `hs-minh` trong roster.

- [ ] **Step 4: Luồng student**

1. Logout → Login as `hs-minh`.
2. Vào lesson bất kỳ (vd `/student/units/6-1/lessons/01`).
3. Scroll đến cuối → click "Đánh dấu đã học xong".
4. Vào `/dashboard` → thấy "Tiếp tục học" (bài vừa học), streak 🔥 "1 ngày liên tục".
5. Vào `/skills` → thấy skills liên quan có "1 lần vận dụng" (nếu activity_skills đã seed cho lesson này; nếu chưa, tạm skip).
6. Vào `/profile` → thấy profile + signout button.

- [ ] **Step 5: Luồng teacher view student**

1. Logout HS → Login lại `gv-phuong`.
2. `/teacher` → vào cohort → click `hs-minh` → thấy skills + recent events.

- [ ] **Step 6: Report & fix**

Nếu có bug ở bất kỳ bước nào: note lại, tạo task fix riêng, commit. Nếu OK: task này pass.

---

### Task 29: Deploy env vars + Vercel settings

**Files:** (none — Vercel console)

- [ ] **Step 1: Set env trên Vercel**

User vào https://vercel.com/dashboard → project `openstemneo` → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` = https://YOUR-PROJECT.supabase.co (Production, Preview, Development)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = ... (all environments)
- `SUPABASE_SERVICE_ROLE_KEY` = ... (**Production only** để hạn chế leak)

- [ ] **Step 2: Cập nhật Google OAuth redirect**

Vào Google Cloud Console → OAuth credentials → thêm:
- `https://openstemneo.vercel.app/auth/callback`
- `https://YOUR-PROJECT.supabase.co/auth/v1/callback` (đã có)

Vào Supabase dashboard → Authentication → URL Configuration → Site URL = `https://openstemneo.vercel.app`, Additional Redirect URLs = `http://localhost:3000/**`.

- [ ] **Step 3: Redeploy**

Vercel auto-deploy với push gần nhất. Verify production:
- `https://openstemneo.vercel.app/login` render OK
- Đăng nhập bằng Gmail → redirect thành công
- `/dashboard` render

- [ ] **Step 4: Không commit — chỉ cần confirm**

---

### Task 30: Update memory + write final report

**Files:**
- Modify: `/Users/tuanln/.claude/projects/-Users-tuanln/memory/project_openstemneo_status.md`
- Create: `docs/PHASE_2_MVP_REPORT.md`

- [ ] **Step 1: Write final report**

Write `docs/PHASE_2_MVP_REPORT.md`:

```markdown
# Phase 2 MVP — Completion Report

**Ngày hoàn tất**: (điền ngày thật)
**Phiên bản**: v0.2.0

## Deliverables
- 16 Supabase tables + RLS + 3 triggers
- ~518 activities seeded từ MDX
- 18 core skills bootstrap
- Auth: Google OAuth + admin-created user/pass
- Student UI: dashboard, skills, profile, lesson progress, evidence
- Admin UI: accounts, cohorts
- Teacher UI: cohort roster, student detail

## Known limitations
- Không offline
- Không có UI edit cohort/account (chỉ tạo)
- Mentor UI chưa build (schema ready)
- AI Cụ chưa build (schema ready)
- Không có unit/integration test suite

## Next (Phase 2.5 candidates)
- Edit cohort/account forms
- Password reset flow
- Mentor profile + session booking
- AI Cụ conversation (Gemma 3)
- Export progress CSV cho teacher
- Phụ huynh consent form
```

- [ ] **Step 2: Update memory**

Append to `/Users/tuanln/.claude/projects/-Users-tuanln/memory/project_openstemneo_status.md`:

```markdown
### Update (18/04/2026) — Phase 2 MVP hoàn tất

- Supabase linked (project REF lưu trong .env.local)
- 16 tables đã migration + seed: programs, courses, activities (~518), skills (18), ...
- Auth dual: Google OAuth + admin user/pass (@openstemneo.local)
- 3 role UI: student / teacher (view) / admin
- Skill-centric: mastery tự động từ learning_events qua triggers
- Mentor/AI schema-ready, UI để Phase 2.5+
```

- [ ] **Step 3: Commit**

```bash
git add docs/PHASE_2_MVP_REPORT.md
git commit -m "Phase 2 MVP completion report

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

Tag release:
```bash
git tag v0.2.0-phase2-mvp
git push origin v0.2.0-phase2-mvp
```

---

## Post-plan notes

- **Dependency trên user manual action**: Tasks 1, 10, 15, 29 yêu cầu user click trong Supabase/Google/Vercel dashboards. Các subagent không làm được bước này — controller phải prompt user thật.
- **Không có formal test suite**: mỗi task có Step "Manual QA" thay cho unit test. Kế hoạch setup Vitest + Playwright để Phase 3.
- **Triggers chạy SECURITY DEFINER**: cho phép bypass RLS khi insert. Verify kĩ trong Task 18 (streak + skill update phải thấy trong bảng sau khi insert event).
- **Synthetic email `.local`**: là reserved TLD (RFC 6762), không conflict domain thật. Google OAuth users sẽ có email thật.
- **Shadcn components cần**: `tabs` (Task 14). Check và install nếu thiếu ở các task liên quan.
- **Rate limits Supabase free**: 500 req/s đủ cho pilot <200 HS.
