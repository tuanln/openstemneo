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
