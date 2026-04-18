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
