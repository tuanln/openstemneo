'use server';

import { revalidatePath } from 'next/cache';
import { logEvent } from '@/lib/db/events';

export async function markActivityStarted(activityId: string, sourceRef?: string) {
  await logEvent(activityId, 'started', sourceRef ? { source_ref: sourceRef } : {});
}

export async function markActivityCompleted(activityId: string, sourceRef?: string) {
  await logEvent(activityId, 'completed', sourceRef ? { source_ref: sourceRef } : {});
  revalidatePath('/dashboard');
  revalidatePath('/progress');
  revalidatePath('/skills');
}

export async function markActivityRevisited(activityId: string) {
  await logEvent(activityId, 'revisited');
}
