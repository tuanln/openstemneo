# Design Spec — Phase 2 MVP: Auth + Progress + Evidence + Skills

> Ngày tạo: 2026-04-18 · Trạng thái: Chờ review
>
> **Liên quan:** [PHASE_2_3_RESEARCH.md](./PHASE_2_3_RESEARCH.md) (nghiên cứu ban đầu) · [PHASE_1_FINAL_REPORT.md](./PHASE_1_FINAL_REPORT.md)

---

## 1. Mục tiêu

Xây Phase 2 MVP cho OpenSciedNEO với **mindset chung quản trị tiến trình học sinh**, thiết kế schema **linh hoạt cho nhiều chương trình** (OpenSciedNEO, DeBlue, MakerKids-FPTShop, TechTour, …).

**Mục tiêu trọng tâm**: theo dõi **skills** (kĩ năng/năng lực) HS đạt được thông qua các **programs / courses / activities** khác nhau. Đây là đơn vị quản trị chính, không phải lesson riêng lẻ.

**Feature MVP lần này:**
1. **Auth dual-path**: Google OAuth (HS có Gmail) + admin-created user/pass (HS vùng cao không có Gmail).
2. **Progress tracking**: event-sourced — mọi hành vi học tập là 1 event; derive ra tiến độ, streak, skill mastery.
3. **Evidence text**: HS viết câu trả lời vào `<Evidence>` component, lưu DB, xem lại được.
4. **Streak + Achievement**: đếm ngày liên tục 🔥, unlock huy hiệu cơ bản.
5. **Roles**: student + teacher (view-only) + admin. Schema sẵn cho mentor (schoolhouse.world-style) + AI Cụ (Gemma) nhưng UI build sau.

**KHÔNG làm trong MVP này:**
- Quiz / multiple choice
- Personalized learning path
- Phụ huynh consent form
- Teacher tạo account (chỉ admin)
- Offline / PWA
- Mentor UI (bio, sessions, reviews) — schema sẵn, UI Phase 2.5+
- AI Cụ conversation UI — schema sẵn, UI Phase 3+

## 2. Stack & scope

| Thành phần | Chọn |
|---|---|
| Auth | Supabase Auth (Google OAuth + email/password) |
| Database | Supabase PostgreSQL (free tier) |
| Storage | Supabase Storage (cho avatar, later) |
| Framework | Next.js 16 App Router + Server Actions |
| SSR session | `@supabase/ssr` |
| Styling | Tailwind v4 (đã có) |
| Mobile | Responsive, online-required (chưa offline) |
| Deployment | Vercel (đã có) |

**Ngôn ngữ UI:** Tiếng Việt.

**Ước tính timeline:** 3-4 tuần full-time equivalent.

## 3. Schema (multi-program, event-sourced, skill-centric)

### 3.1 Taxonomy chương trình

```sql
CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  provider TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  grade_level INT,
  metadata JSONB DEFAULT '{}',
  UNIQUE(program_id, slug)
);

CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  activity_type TEXT NOT NULL
    CHECK (activity_type IN ('lesson','experiment','project','workshop','field_trip','quiz','reflection')),
  source_ref TEXT,
  estimated_minutes INT,
  sequence_order INT,
  metadata JSONB DEFAULT '{}',
  UNIQUE(course_id, slug)
);
```

### 3.2 Skill taxonomy (xương sống của mục tiêu)

```sql
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  parent_skill_id UUID REFERENCES skills(id),
  framework_refs JSONB DEFAULT '{}'
);

CREATE TABLE activity_skills (
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  weight INT DEFAULT 1,
  PRIMARY KEY (activity_id, skill_id)
);

CREATE TABLE skill_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  evidence_count INT DEFAULT 0,
  mastery_level INT DEFAULT 0,
  last_demonstrated_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, skill_id)
);
```

**Mastery levels:**
- 0 — chưa chạm
- 1 — novice (1-2 evidence)
- 2 — emerging (3-5)
- 3 — proficient (6-10)
- 4 — advanced (11-20)
- 5 — expert (20+)

### 3.3 Event-sourced learning log

```sql
CREATE TABLE learning_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  occurred_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_events_user_time ON learning_events(user_id, occurred_at DESC);
CREATE INDEX idx_events_activity ON learning_events(activity_id);

CREATE TABLE learning_streaks (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  activities_completed INT DEFAULT 0,
  PRIMARY KEY (user_id, date)
);

CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  scope JSONB DEFAULT '{}',
  unlocked_at TIMESTAMPTZ DEFAULT now()
);
```

**Event types (MVP):**
- `started`, `completed`, `abandoned`, `revisited`
- `evidence_submitted` (payload: `{question_id, text}`)
- `question_asked` (payload: `{text, context}`)
- `reflection_written` (payload: `{text}`)
- `skill_demonstrated` (derived, auto-generated by trigger; payload: `{skill_id, weight}`)

**Event types (schema-ready, UI sau):**
- `mentor_feedback_received`, `ai_interaction`

### 3.4 Profiles + Cohorts

```sql
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

CREATE TABLE cohorts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES programs(id),
  course_id UUID REFERENCES courses(id),
  name TEXT NOT NULL,
  cohort_type TEXT,
  lead_user_id UUID REFERENCES auth.users(id),
  starts_at DATE,
  ends_at DATE,
  metadata JSONB DEFAULT '{}'
);

CREATE TABLE cohort_members (
  cohort_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_in_cohort TEXT DEFAULT 'learner',
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (cohort_id, user_id)
);
```

### 3.5 Mentor system (schema-ready, UI Phase 2.5+)

```sql
CREATE TABLE mentor_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  expertise_areas TEXT[],
  languages TEXT[],
  availability JSONB,
  verification_status TEXT DEFAULT 'pending',
  verified_by UUID REFERENCES auth.users(id),
  total_sessions INT DEFAULT 0,
  avg_rating NUMERIC(2,1),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE mentorships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id),
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE mentoring_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES auth.users(id),
  topic TEXT,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INT,
  meeting_url TEXT,
  status TEXT DEFAULT 'scheduled',
  notes TEXT
);

CREATE TABLE session_attendees (
  session_id UUID REFERENCES mentoring_sessions(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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

### 3.6 AI Cụ (Gemma) layer — schema-ready

```sql
CREATE TABLE ai_student_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_json JSONB NOT NULL DEFAULT '{}',
  last_synced_at TIMESTAMPTZ,
  synced_by_model TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id),
  model TEXT NOT NULL,
  prompt TEXT,
  response TEXT,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.7 RLS policies (highlight)

- `profiles`: SELECT own; admin SELECT all; teacher SELECT members of cohorts where lead_user_id=me.
- `learning_events`, `skill_progress`, `learning_streaks`, `achievements`: SELECT/INSERT own; teacher SELECT for own-cohort members; admin SELECT all.
- `cohorts`: teacher SELECT where lead_user_id=me; admin ALL.
- `activities`, `skills`, `programs`, `courses`: public SELECT; admin write.
- `mentor_profiles`: public SELECT if verification_status='verified'; self write; admin write all.

### 3.8 Postgres triggers

**Trigger 1 — Streak counter:**
```sql
CREATE FUNCTION update_streak() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'completed' THEN
    INSERT INTO learning_streaks(user_id, date, activities_completed)
    VALUES (NEW.user_id, (NEW.occurred_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE, 1)
    ON CONFLICT (user_id, date)
    DO UPDATE SET activities_completed = learning_streaks.activities_completed + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_update_streak AFTER INSERT ON learning_events
  FOR EACH ROW EXECUTE FUNCTION update_streak();
```

**Trigger 2 — Skill demonstrations:**
```sql
CREATE FUNCTION demonstrate_skills() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'completed' THEN
    INSERT INTO skill_progress(user_id, skill_id, evidence_count, last_demonstrated_at)
    SELECT NEW.user_id, asg.skill_id, asg.weight, NEW.occurred_at
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
      END;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_demonstrate_skills AFTER INSERT ON learning_events
  FOR EACH ROW EXECUTE FUNCTION demonstrate_skills();
```

## 4. Auth flow

**Google OAuth:**
1. User click "Đăng nhập bằng Google" at `/login`.
2. Supabase redirect to Google, callback `/auth/callback?code=...`.
3. Server action exchange code → session cookie.
4. If first time: insert `profiles` (role='student', auth_method='oauth', full_name from Google).
5. Redirect `/dashboard`.

**Username + Password:**
1. User nhập tên đăng nhập (vd `hs-tan-a`) + mật khẩu at `/login`.
2. Client ghép email synthetic: `hs-tan-a@openstemneo.local`.
3. `supabase.auth.signInWithPassword({ email, password })`.
4. Redirect `/dashboard`.

**Admin tạo account:**
1. Admin vào `/admin/accounts/new`, nhập username, full_name, password, role, grade_level, cohort_id.
2. Server action (dùng Service Role key):
   ```ts
   await supabase.auth.admin.createUser({
     email: `${username}@openstemneo.local`,
     password,
     email_confirm: true,
   })
   ```
3. Insert `profiles` (auth_method='admin_created', created_by=admin.id).
4. Insert `cohort_members` nếu có cohort.

## 5. Routes (App Router)

```
app/
├── (public)/...                      ← existing marketing + lesson pages
├── (auth)/login/page.tsx             ← 2-tab: Gmail / Username
├── auth/callback/route.ts            ← OAuth callback
├── (student)/
│   ├── dashboard/page.tsx            ← continue learning + streak + achievements
│   ├── progress/page.tsx             ← per-course progress detail
│   ├── skills/page.tsx               ← skill tree + mastery
│   └── profile/page.tsx              ← evidence history
├── (teacher)/teacher/
│   ├── page.tsx                      ← list cohorts I lead
│   ├── cohort/[id]/page.tsx          ← roster + progress
│   └── student/[id]/page.tsx         ← drill-in
├── (admin)/admin/
│   ├── accounts/new/page.tsx         ← create student/teacher/mentor
│   ├── accounts/page.tsx             ← list + search
│   ├── cohorts/page.tsx              ← create cohort, assign lead
│   ├── programs/page.tsx             ← seed/view programs
│   └── skills/page.tsx               ← view skill taxonomy
└── middleware.ts                      ← auth + role-based redirects
```

## 6. Server Actions (src/actions/)

- `auth.ts`: `signInUsernamePassword(username, password)`, `signOut()`
- `progress.ts`: `markActivityStarted(activityId)`, `markActivityCompleted(activityId)`, `trackScrollPosition(activityId, pos)`
- `evidence.ts`: `saveEvidenceResponse(activityId, questionId, text)`, `getMyEvidence(activityId)`
- `admin.ts`: `createUserAccount(role, username, fullName, password, grade, cohortId?)`, `createCohort(...)`, `assignLead(cohortId, userId)`
- `teacher.ts`: `listCohortStudents(cohortId)`, `getStudentOverview(studentId)`
- `skills.ts`: `getMySkillProgress()` (student), `getStudentSkillProgress(studentId)` (teacher)

## 7. Components (src/components/phase2/)

**Auth:**
- `AuthProvider` (client) — expose session via React context
- `LoginForm` — 2 tabs: Google button / Username-Password form

**Student:**
- `ActivityStatusToggle` — nút "Đánh dấu đã học" cuối mỗi activity (lesson page)
- `ProgressBar` — thanh progress theo course/unit
- `ContinueLearning` — card "Tiếp tục từ bài em dừng" trên dashboard
- `StreakCounter` 🔥 — đếm ngày liên tục
- `EvidenceInteractive` — thay `<Evidence>` hiện tại. Auto-save debounced 800ms vào DB.
- `SkillTreeView` — hiển thị skills HS đã đạt + mastery level
- `AchievementToast` — popup khi unlock huy hiệu

**Admin:**
- `AdminAccountForm`, `CohortManager`, `ProgramTable`, `SkillTaxonomyView`

**Teacher:**
- `CohortRoster`, `StudentTimeline`, `StudentSkillRadar`

## 8. Seed data (MVP)

**programs:**
- `openscienneo` — "OpenSciedNEO (Khoa học tự nhiên K-8)"

**courses:** 9 courses tương ứng 9 grade (K, 1, 2, 3, 4, 5, 6, 7, 8).

**activities:** ~518 rows migrate từ MDX hiện có.
- `slug` = lesson slug hiện có (vd `6-1-L3`)
- `source_ref` = path MDX (vd `content/curriculum/grade-6/unit-6-1/lesson-03.mdx`)

**skills (bootstrap):** 8 SEP NGSS + 3 thành phần NL đặc thù KHTN GDPT 2018 + 7 CCC = 18 skills chính. Parent-child tree ghi rõ trong `framework_refs`.

**activity_skills:** migrate từ metadata MDX (field `practices` / `ccc` nếu có; hoặc populate dần).

## 9. Assumptions & rủi ro

- **AS-1** Supabase free tier (500MB DB, 50K MAU) đủ cho thí điểm 2-3 lớp (<200 HS) năm đầu.
- **AS-2** Synthetic email `@openstemneo.local` không conflict với domain thật (ok, `.local` là reserved TLD).
- **AS-3** Postgres triggers chạy ổn với RLS — cần test kĩ khi trigger INSERT từ context user.
- **AS-4** Migration MDX → `activities` table có thể tạo duplicate slug → cần check unique trong script seed.
- **AS-5** `@supabase/ssr` còn beta trong vài release — chấp nhận rủi ro, rollback sang `@supabase/auth-helpers` nếu cần.

## 10. Timeline dự kiến (3-4 tuần)

| Tuần | Công việc |
|---|---|
| W1 | Supabase project setup, schema + RLS + triggers, seed programs/courses/activities/skills |
| W2 | Auth flow (Google + username/pass), middleware, `/login`, `/auth/callback`, profile creation |
| W3 | Progress tracking UI (ActivityStatusToggle, ProgressBar, ContinueLearning, StreakCounter), Evidence save, Dashboard |
| W4 | Admin UI (accounts, cohorts), Teacher UI (cohort roster, student detail), Skill tree view |

## 11. Quyết định đã chốt

- **D-1** Scope MVP: Auth + Progress + Evidence + Streak + Achievement + Skill mastery. Không quiz, không personalized path, không offline.
- **D-2** Stack: Supabase + Next.js 16 Server Actions + `@supabase/ssr`.
- **D-3** Dual auth: Google OAuth + admin-created username/password.
- **D-4** 3 role UI: student + teacher (view-only) + admin. Mentor role schema-ready, UI sau.
- **D-5** Schema multi-program từ đầu (tránh migration đau).
- **D-6** Event-sourced learning log — mọi hành vi là 1 event.
- **D-7** Skill-centric — mục tiêu = HS đạt skill nào qua programs/courses.
- **D-8** AI Cụ (Gemma) layer schema-ready, UI Phase 3+.

---

## Kết cấu kiểm tra (checklist trước khi viết plan)

- [ ] User review spec này
- [ ] Chốt có thiếu gì không
- [ ] Viết implementation plan (writing-plans)
