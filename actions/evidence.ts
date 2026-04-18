'use server';

import { createClient } from '@/lib/supabase/server';
import { logEvent } from '@/lib/db/events';

export async function saveEvidenceResponse(
  activityId: string,
  questionId: string,
  text: string
) {
  const trimmed = text.trim();
  if (trimmed.length === 0) return { ok: false, error: 'Text trống' };
  if (trimmed.length > 10000) return { ok: false, error: 'Text quá dài (>10,000)' };

  await logEvent(activityId, 'evidence_submitted', {
    question_id: questionId,
    text: trimmed,
  });
  return { ok: true };
}

export async function getMyEvidenceForActivity(activityId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from('learning_events')
    .select('payload, occurred_at')
    .eq('user_id', user.id)
    .eq('activity_id', activityId)
    .eq('event_type', 'evidence_submitted')
    .order('occurred_at', { ascending: false });

  // Latest per question_id
  const byQuestion: Record<string, { text: string; at: string }> = {};
  for (const row of data ?? []) {
    const p = row.payload as { question_id?: string; text?: string };
    if (p.question_id && p.text && !byQuestion[p.question_id]) {
      byQuestion[p.question_id] = { text: p.text, at: row.occurred_at };
    }
  }
  return byQuestion;
}
