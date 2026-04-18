import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const tables = ['programs', 'courses', 'activities', 'skills', 'activity_skills',
  'skill_progress', 'learning_events', 'learning_streaks', 'achievements',
  'profiles', 'cohorts', 'cohort_members', 'mentor_profiles', 'mentorships',
  'mentoring_sessions', 'session_attendees', 'mentor_reviews',
  'ai_student_profiles', 'ai_interactions'];

for (const t of tables) {
  const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
  if (error) console.log(`✗ ${t}: ${error.message}`);
  else console.log(`✓ ${t}: ${count} rows`);
}
