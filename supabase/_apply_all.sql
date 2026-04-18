-- Migration 0001 — taxonomy: programs, courses, activities
-- Mindset multi-program: OpenSciedNEO, DeBlue, MakerKids-FPT, TechTour...

CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  provider TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

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

-- ===== 0002 =====
-- Migration 0002 — skills: skills, activity_skills, skill_progress
-- Skill-centric: goal = HS đạt skill nào qua programs/courses

CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  parent_skill_id UUID REFERENCES skills(id),
  framework_refs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE activity_skills (
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  weight INT DEFAULT 1,
  PRIMARY KEY (activity_id, skill_id)
);

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

-- ===== 0003 =====
-- Migration 0003 — event-sourced learning log + streaks + achievements

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

CREATE TABLE learning_streaks (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  activities_completed INT DEFAULT 0,
  PRIMARY KEY (user_id, date)
);
CREATE INDEX idx_streaks_user_date ON learning_streaks(user_id, date DESC);

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

-- ===== 0004 =====
-- Migration 0004 — profiles + cohorts + auto-profile trigger

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

-- Auto-create profile row khi user signup (OAuth or admin-created)
CREATE OR REPLACE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, username, auth_method)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE
      WHEN NEW.email LIKE '%@openstemneo.local' THEN split_part(NEW.email, '@', 1)
      ELSE NEW.raw_user_meta_data->>'username'
    END,
    CASE WHEN NEW.email LIKE '%@openstemneo.local' THEN 'admin_created' ELSE 'oauth' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_create_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_new_user();

-- ===== 0005 =====
-- Migration 0005 — mentor system (schoolhouse.world-style)
-- Schema-ready cho Phase 2.5+, UI build sau

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

-- ===== 0006 =====
-- Migration 0006 — AI Cụ (Gemma) profiling layer
-- Schema-ready cho Phase 3+, UI build sau

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

-- ===== 0007 =====
-- Migration 0007 — RLS policies + helper functions

-- Helper: is current user admin?
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: is current user teacher/mentor lead của cohort này?
CREATE OR REPLACE FUNCTION is_teacher_of_cohort(p_cohort_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM cohorts
    WHERE id = p_cohort_id AND lead_user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: is current user teacher of this student (qua cohort)?
CREATE OR REPLACE FUNCTION is_teacher_of_student(p_student_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM cohort_members cm
    JOIN cohorts c ON c.id = cm.cohort_id
    WHERE cm.user_id = p_student_id AND c.lead_user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Teacher read cohort profiles" ON profiles FOR SELECT USING (is_teacher_of_student(id));
CREATE POLICY "Self update profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin manage profiles" ON profiles FOR ALL USING (is_admin());

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
CREATE POLICY "Admin read streaks" ON learning_streaks FOR SELECT USING (is_admin());

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

-- Public-read taxonomy (activities, programs, courses, skills, activity_skills)
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Admin write activities" ON activities FOR ALL USING (is_admin());

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

-- mentor_profiles: public read verified, self write, admin all
ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read verified mentors" ON mentor_profiles FOR SELECT
  USING (verification_status = 'verified' OR user_id = auth.uid() OR is_admin());
CREATE POLICY "Self write mentor profile" ON mentor_profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Self update mentor profile" ON mentor_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admin manage mentor profiles" ON mentor_profiles FOR ALL USING (is_admin());

-- Other mentor_* tables: default admin-only (UI sau)
ALTER TABLE mentorships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full mentorships" ON mentorships FOR ALL USING (is_admin());

ALTER TABLE mentoring_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full sessions" ON mentoring_sessions FOR ALL USING (is_admin());

ALTER TABLE session_attendees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full attendees" ON session_attendees FOR ALL USING (is_admin());

ALTER TABLE mentor_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full reviews" ON mentor_reviews FOR ALL USING (is_admin());

-- ai_* tables
ALTER TABLE ai_student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read ai profile" ON ai_student_profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admin read ai profile" ON ai_student_profiles FOR SELECT USING (is_admin());

ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self read ai interactions" ON ai_interactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Self insert ai interactions" ON ai_interactions FOR INSERT WITH CHECK (user_id = auth.uid());

-- ===== 0008 =====
-- Migration 0008 — Postgres triggers derive từ learning_events
-- Streak counter + skill mastery + first_activity achievement

-- Trigger 1: Update daily streak khi 'completed' event
CREATE OR REPLACE FUNCTION update_streak()
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

-- Trigger 2: Demonstrate skills khi 'completed' event
-- Mỗi activity gắn với 1+ skill qua activity_skills, weight → evidence_count
CREATE OR REPLACE FUNCTION demonstrate_skills()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'completed' THEN
    INSERT INTO skill_progress(user_id, skill_id, evidence_count, mastery_level, last_demonstrated_at, updated_at)
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
      NEW.occurred_at,
      now()
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

-- Trigger 3: Unlock 'first_activity' achievement
CREATE OR REPLACE FUNCTION check_first_activity()
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

-- ===== SEED 01 =====
-- Seed 01 — OpenSciedNEO program + 9 courses K-8

INSERT INTO programs (slug, name, provider, description)
VALUES (
  'openscienneo',
  'OpenSciedNEO',
  'OpenSciEd (Việt hoá)',
  'Khoa học tự nhiên K-8, phenomenon-based, Việt hoá từ OpenSciEd (Hoa Kỳ)'
)
ON CONFLICT (slug) DO NOTHING;

-- 9 courses (K, 1, 2, 3, 4, 5, 6, 7, 8)
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
WHERE p.slug = 'openscienneo'
ON CONFLICT (program_id, slug) DO NOTHING;

-- ===== SEED 02 =====
-- Seed 02 — 18 core skills: 8 SEP (NGSS) + 3 NL đặc thù KHTN (GDPT 2018) + 7 CCC (NGSS)

-- 8 SEP — science practices
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
    '{"ngss_sep": "SEP-8"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 3 thành phần NL đặc thù KHTN GDPT 2018
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('nl-nhan-thuc-khtn', 'Nhận thức khoa học tự nhiên', 'science-competency',
    '{"gdpt_2018": "NL-nhan-thuc-KHTN"}'::jsonb),
  ('nl-tim-hieu-tu-nhien', 'Tìm hiểu tự nhiên', 'science-competency',
    '{"gdpt_2018": "NL-tim-hieu-tu-nhien"}'::jsonb),
  ('nl-van-dung', 'Vận dụng kiến thức, kĩ năng đã học', 'science-competency',
    '{"gdpt_2018": "NL-van-dung"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 7 CCC — crosscutting concepts
INSERT INTO skills (slug, name, category, framework_refs) VALUES
  ('ccc-1-patterns', 'Mô thức/Quy luật', 'crosscutting', '{"ngss_ccc": "CCC-1"}'::jsonb),
  ('ccc-2-cause-effect', 'Nguyên nhân - Kết quả', 'crosscutting', '{"ngss_ccc": "CCC-2"}'::jsonb),
  ('ccc-3-scale', 'Tỉ lệ, quy mô, số lượng', 'crosscutting', '{"ngss_ccc": "CCC-3"}'::jsonb),
  ('ccc-4-systems', 'Hệ thống và mô hình hệ thống', 'crosscutting', '{"ngss_ccc": "CCC-4"}'::jsonb),
  ('ccc-5-energy-matter', 'Năng lượng và Vật chất', 'crosscutting', '{"ngss_ccc": "CCC-5"}'::jsonb),
  ('ccc-6-structure-function', 'Cấu trúc và Chức năng', 'crosscutting', '{"ngss_ccc": "CCC-6"}'::jsonb),
  ('ccc-7-stability-change', 'Cân bằng và Biến đổi', 'crosscutting', '{"ngss_ccc": "CCC-7"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;
