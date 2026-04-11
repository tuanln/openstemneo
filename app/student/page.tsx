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

      {/* Continue */}
      {firstUnit && continueLesson && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Bắt đầu học
          </h2>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-3xl"
                aria-hidden="true"
              >
                {firstUnit.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Lớp {firstUnit.gradeLevel} · Đơn vị {firstUnit.id}
                </p>
                <p className="truncate font-semibold">{firstUnit.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  Bài {continueLesson.order}: {continueLesson.title}
                </p>
              </div>
              <Button asChild size="sm" className="shrink-0">
                <Link
                  href={`/student/units/${firstUnit.id}/lessons/${continueLesson.id}`}
                >
                  Vào học
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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
