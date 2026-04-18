import Link from 'next/link';
import { Award, BookOpen, GraduationCap, User } from 'lucide-react';
import { requireRole } from '@/lib/auth/require-role';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { ContinueLearning } from '@/components/phase2/student/continue-learning';
import { StreakCounter } from '@/components/phase2/student/streak-counter';
import { CourseProgressBar } from '@/components/phase2/student/progress-bar';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { profile } = await requireRole(['student', 'teacher', 'mentor', 'admin']);
  const supabase = await createClient();

  // Courses + achievements counts
  const [{ data: courses }, { count: achievementCount }] = await Promise.all([
    supabase.from('courses').select('id, name, grade_level').order('grade_level'),
    supabase
      .from('achievements')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', profile.id),
  ]);

  // Chỉ hiển thị course có grade match profile, hoặc all nếu grade chưa set
  const relevantCourses = profile.grade_level != null
    ? (courses ?? []).filter((c) => c.grade_level === profile.grade_level || c.grade_level === profile.grade_level + 1)
    : (courses ?? []);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <section>
        <h1 className="text-2xl font-bold">
          Xin chào{profile.full_name ? `, ${profile.full_name}` : ''}! 👋
        </h1>
        <p className="text-muted-foreground">Hôm nay em muốn khám phá gì?</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <ContinueLearning />
        </div>
        <StreakCounter />
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Tiến độ học</h2>
            {achievementCount != null && achievementCount > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-yellow-500" />
                {achievementCount} huy hiệu
              </div>
            )}
          </div>
          {(relevantCourses.length > 0 ? relevantCourses : courses ?? []).map((c) => (
            <CourseProgressBar key={c.id} courseId={c.id} courseName={c.name} />
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Link
          href="/skills"
          className="flex items-center gap-2 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          <GraduationCap className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Skills của em</span>
        </Link>
        <Link
          href="/student"
          className="flex items-center gap-2 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Curriculum đầy đủ</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Hồ sơ</span>
        </Link>
      </div>
    </div>
  );
}
