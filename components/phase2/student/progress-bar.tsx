import { createClient } from '@/lib/supabase/server';

export async function CourseProgressBar({
  courseId,
  courseName,
}: {
  courseId: string;
  courseName: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { count: total } = await supabase
    .from('activities')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', courseId);

  // Completed activities trong course này
  const { data: completedRows } = await supabase
    .from('learning_events')
    .select('activity_id, activities!inner(course_id)')
    .eq('user_id', user.id)
    .eq('event_type', 'completed')
    .eq('activities.course_id', courseId);

  const completed = new Set((completedRows ?? []).map((r) => r.activity_id)).size;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{courseName}</span>
        <span className="text-muted-foreground">
          {completed}/{total ?? 0} ({pct}%)
        </span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
