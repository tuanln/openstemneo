import { Suspense } from "react";
import { getUnitsWithAvailability } from "@/lib/curriculum/loader";
import type { GradeLevel } from "@/lib/curriculum/types";
import { UnitCard } from "@/components/curriculum/unit-card";
import { GradeFilter } from "@/components/curriculum/grade-filter";

export const metadata = {
  title: "Tất cả đơn vị học",
  description:
    "Duyệt tất cả 18 đơn vị học khoa học THCS theo mô hình phenomenon-based, việt hóa từ OpenSciEd.",
};

interface PageProps {
  searchParams: Promise<{ grade?: string }>;
}

export default async function UnitsPage({ searchParams }: PageProps) {
  const { grade: gradeParam } = await searchParams;

  const grade =
    gradeParam === "0" ||
    gradeParam === "3" ||
    gradeParam === "6" ||
    gradeParam === "7" ||
    gradeParam === "8"
      ? (Number(gradeParam) as GradeLevel)
      : undefined;

  const allUnits = await getUnitsWithAvailability();
  const units = grade !== undefined
    ? allUnits.filter((u) => u.gradeLevel === grade)
    : allUnits;
  const grouped: Record<number, typeof units> = { 0: [], 3: [], 6: [], 7: [], 8: [] };
  for (const u of units) grouped[u.gradeLevel]?.push(u);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Đơn vị học</h1>
        <p className="mt-2 text-muted-foreground">
          {grade
            ? `${units.length} đơn vị dành cho Lớp ${grade}.`
            : `${units.length} đơn vị học khoa học THCS theo chương trình phenomenon-based.`}
        </p>
      </header>

      <Suspense fallback={null}>
        <GradeFilter />
      </Suspense>

      {grade ? (
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                availableLessons={unit.availability.availableLessonFiles}
              />
            ))}
          </div>
        </section>
      ) : (
        ([0, 3, 6, 7, 8] as const).map((g) => {
          const unitsInGrade = grouped[g] ?? [];
          if (unitsInGrade.length === 0) return null;
          const readyCount = unitsInGrade.filter(
            (u) => u.availability.hasAnyAvailable,
          ).length;
          return (
            <section key={g}>
              <h2 className="mb-4 flex flex-wrap items-baseline gap-3 text-lg font-semibold">
                <span>{g === 0 ? "Mẫu giáo" : `Lớp ${g}`}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {readyCount}/{unitsInGrade.length} đơn vị có nội dung
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unitsInGrade.map((unit) => (
                  <UnitCard
                    key={unit.id}
                    unit={unit}
                    availableLessons={unit.availability.availableLessonFiles}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
