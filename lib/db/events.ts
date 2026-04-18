import 'server-only';
import { createClient } from '@/lib/supabase/server';

export type EventType =
  | 'started'
  | 'completed'
  | 'abandoned'
  | 'revisited'
  | 'evidence_submitted'
  | 'question_asked'
  | 'reflection_written';

export async function logEvent(
  activityId: string,
  eventType: EventType,
  payload: Record<string, unknown> = {}
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('learning_events').insert({
    user_id: user.id,
    activity_id: activityId,
    event_type: eventType,
    payload,
  });
  if (error) throw error;
}

export async function getLatestEvent(activityId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('learning_events')
    .select('event_type, occurred_at, payload')
    .eq('user_id', user.id)
    .eq('activity_id', activityId)
    .order('occurred_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function isActivityCompleted(activityId: string): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { count } = await supabase
    .from('learning_events')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('activity_id', activityId)
    .eq('event_type', 'completed');
  return (count ?? 0) > 0;
}

export async function getActivityBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('activities')
    .select('id, slug, name, source_ref, course_id')
    .eq('slug', slug)
    .maybeSingle();
  return data;
}
