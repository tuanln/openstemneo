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
