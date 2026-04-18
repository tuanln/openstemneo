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
