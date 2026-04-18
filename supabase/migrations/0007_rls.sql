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
