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
