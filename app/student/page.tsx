import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getLessonsForUnit,
  getUnitById,
  getUnitsWithAvailability,
} from "@/lib/curriculum/loader";
import { UnitCard } from "@/components/curriculum/unit-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function StudentHome() {
  const allUnits = await getUnitsWithAvailability();
  const grade6Units = allUnits.filter((u) => u.gradeLevel === 6);
  const firstUnit = await getUnitById("6-1");
  const firstUnitLessons = firstUnit ? await getLessonsForUnit("6-1") : [];
  const continueLesson = firstUnitLessons.find((l) => l.available);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <section>
        <h1 className="text-2xl font-bold sm:text-3xl">Xin chào! 👋</h1>
        <p className="mt-1 text-muted-foreground">
          Hôm nay em muốn khám phá điều gì?
        </p>
      </section>

      {/* Featured unit — bài thí nghiệm của lớp em */}
      {firstUnit && (
        <section>
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
            <CardContent className="p-5">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-3xl shadow-sm dark:bg-slate-800">
                  {firstUnit.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Lớp {firstUnit.gradeLevel} · Đơn vị {firstUnit.id}
                  </p>
                  <h2 className="font-bold">{firstUnit.title}</h2>
                </div>
                <Button asChild size="sm" variant="secondary" className="shrink-0">
                  <Link href={`/student/units/${firstUnit.id}`}>
                    Xem đơn vị
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                🧪 Các bài thí nghiệm ({firstUnitLessons.filter((l) => l.available).length}/{firstUnitLessons.length} sẵn sàng):
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {firstUnitLessons.slice(0, 8).map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={
                      lesson.available
                        ? `/student/units/${firstUnit.id}/lessons/${lesson.id}`
                        : '#'
                    }
                    className={`flex items-center gap-2 rounded-lg border bg-white p-3 text-sm transition-colors dark:bg-slate-900 ${
                      lesson.available
                        ? 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {lesson.order}
                    </span>
                    <span className="truncate flex-1">{lesson.title}</span>
                    {lesson.available && (
                      <ArrowRight className="h-3 w-3 shrink-0 opacity-40" />
                    )}
                  </Link>
                ))}
              </div>
              {firstUnitLessons.length > 8 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  +{firstUnitLessons.length - 8} bài khác —{' '}
                  <Link href={`/student/units/${firstUnit.id}`} className="underline">
                    xem tất cả
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Units */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Đơn vị của em (Lớp 6)
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/student/units">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {grade6Units.slice(0, 4).map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              availableLessons={unit.availability.availableLessonFiles}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
