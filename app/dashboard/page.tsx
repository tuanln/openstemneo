import Link from 'next/link';
import { Award, BookOpen, GraduationCap, User, ArrowRight } from 'lucide-react';
import { requireRole } from '@/lib/auth/require-role';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContinueLearning } from '@/components/phase2/student/continue-learning';
import { StreakCounter } from '@/components/phase2/student/streak-counter';
import { CourseProgressBar } from '@/components/phase2/student/progress-bar';
import { getUnitsWithAvailability, getLessonsForUnit } from '@/lib/curriculum/loader';

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

  // Featured units cho grade của HS — lấy từ curriculum loader
  const allUnits = await getUnitsWithAvailability();
  const gradeUnits = profile.grade_level != null
    ? allUnits.filter((u) => u.gradeLevel === profile.grade_level)
    : allUnits.slice(0, 3);
  const firstUnit = gradeUnits[0];
  const firstUnitLessons = firstUnit ? await getLessonsForUnit(firstUnit.id) : [];

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

      {/* Featured unit — bài học của lớp em */}
      {firstUnit && firstUnitLessons.length > 0 && (
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
          <CardContent className="p-5">
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-3xl shadow-sm dark:bg-slate-800">
                {firstUnit.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Lớp {firstUnit.gradeLevel} · Đơn vị {firstUnit.id}
                </p>
                <h2 className="font-bold">{firstUnit.title}</h2>
              </div>
              <Button asChild size="sm" variant="secondary">
                <Link href={`/student/units/${firstUnit.id}`}>
                  Xem đơn vị
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              📚 Các bài học ({firstUnitLessons.filter((l) => l.available).length}/{firstUnitLessons.length} sẵn sàng):
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {firstUnitLessons.slice(0, 6).map((lesson) => (
                <Link
                  key={lesson.id}
                  href={
                    lesson.available
                      ? `/student/units/${firstUnit.id}/lessons/${lesson.id}`
                      : '#'
                  }
                  className={`flex items-center gap-2 rounded-lg border bg-white p-3 text-sm transition-colors dark:bg-slate-900 ${
                    lesson.available ? 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {lesson.order}
                  </span>
                  <span className="truncate">{lesson.title}</span>
                  {lesson.available && <ArrowRight className="h-3 w-3 shrink-0 opacity-40" />}
                </Link>
              ))}
            </div>
            {firstUnitLessons.length > 6 && (
              <p className="mt-2 text-xs text-muted-foreground">
                +{firstUnitLessons.length - 6} bài khác —{' '}
                <Link href={`/student/units/${firstUnit.id}`} className="underline">
                  xem tất cả
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      )}

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
