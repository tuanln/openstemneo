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
