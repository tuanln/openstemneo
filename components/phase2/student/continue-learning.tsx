import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';

type ActivityRow = {
  slug: string;
  name: string;
  source_ref: string | null;
  metadata: { unit_slug?: string } | null;
  courses: { slug: string; name: string } | null | Array<{ slug: string; name: string }>;
};

function pickActivity(a: unknown): ActivityRow | null {
  if (!a || typeof a !== 'object') return null;
  return a as ActivityRow;
}

function activityToPath(a: ActivityRow): string {
  // activity.slug format "6-1-L3" → /student/units/6-1/lessons/03
  const match = a.slug.match(/^(.+)-L(\d+)$/);
  if (!match) return '#';
  const [, unitSlug, lessonNum] = match;
  return `/student/units/${unitSlug}/lessons/${lessonNum.padStart(2, '0')}`;
}

export async function ContinueLearning() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Find most recent 'started' or 'revisited' event
  const { data: lastEvent } = await supabase
    .from('learning_events')
    .select(
      'activity_id, occurred_at, activities(slug, name, source_ref, metadata, courses(slug, name))'
    )
    .eq('user_id', user.id)
    .in('event_type', ['started', 'revisited'])
    .order('occurred_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const activity = pickActivity(
    Array.isArray(lastEvent?.activities) ? lastEvent?.activities[0] : lastEvent?.activities
  );

  if (!activity) {
    return (
      <Card>
        <CardContent className="p-6">
          <BookOpen className="mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-sm font-medium">Em chưa bắt đầu bài học nào</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Khám phá curriculum và bấm vào bài bất kỳ để bắt đầu.
          </p>
          <Link
            href="/student"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            Duyệt curriculum <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    );
  }

  const course = Array.isArray(activity.courses) ? activity.courses[0] : activity.courses;

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/40">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Tiếp tục học
        </p>
        <h3 className="mt-1 text-lg font-bold">{activity.name}</h3>
        {course?.name && (
          <p className="text-sm text-muted-foreground">{course.name}</p>
        )}
        <Link
          href={activityToPath(activity)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          Vào học <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
