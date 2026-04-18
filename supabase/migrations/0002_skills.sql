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
