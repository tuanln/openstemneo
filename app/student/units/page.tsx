import { Suspense } from "react";
import { getAllUnits, getUnitsByGrade } from "@/lib/curriculum/loader";
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
    gradeParam === "6" || gradeParam === "7" || gradeParam === "8"
      ? (Number(gradeParam) as GradeLevel)
      : undefined;

  const units = grade ? await getUnitsByGrade(grade) : await getAllUnits();
  const grouped: Record<number, typeof units> = { 6: [], 7: [], 8: [] };
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
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </section>
      ) : (
        ([6, 7, 8] as const).map((g) => {
          const unitsInGrade = grouped[g] ?? [];
          if (unitsInGrade.length === 0) return null;
          return (
            <section key={g}>
              <h2 className="mb-4 text-lg font-semibold">
                Lớp {g}{" "}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {unitsInGrade.length} đơn vị
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unitsInGrade.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
