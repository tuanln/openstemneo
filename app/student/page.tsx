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
import { ExperimentCard } from "@/components/phase2/student/experiment-card";

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

      {/* Featured unit + experiment cards visual */}
      {firstUnit && firstUnitLessons.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Lớp {firstUnit.gradeLevel} · Đơn vị {firstUnit.id}
              </p>
              <h2 className="text-xl font-bold">{firstUnit.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                🧪 {firstUnitLessons.filter((l) => l.available).length} bài thí nghiệm để em khám phá
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="shrink-0">
              <Link href={`/student/units/${firstUnit.id}`}>
                Chi tiết đơn vị
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {firstUnitLessons.map((lesson) => (
              <ExperimentCard
                key={lesson.id}
                lesson={lesson}
                unitId={firstUnit.id}
                coverImage={`/curriculum/grade-${firstUnit.gradeLevel}/${firstUnit.id}-cover.jpg`}
              />
            ))}
          </div>
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
