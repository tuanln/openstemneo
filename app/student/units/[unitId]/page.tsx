import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getAllUnits,
  getLessonsForUnit,
  getUnitById,
} from "@/lib/curriculum/loader";
import { PhenomenonBanner } from "@/components/curriculum/phenomenon-banner";
import { LessonCard } from "@/components/curriculum/lesson-card";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ unitId: string }>;
}

export async function generateStaticParams() {
  const units = await getAllUnits();
  return units.map((u) => ({ unitId: u.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { unitId } = await params;
  const unit = await getUnitById(unitId);
  if (!unit) return { title: "Không tìm thấy đơn vị học" };
  return {
    title: unit.title,
    description: unit.phenomenon.slice(0, 160),
  };
}

export default async function UnitDetailPage({ params }: PageProps) {
  const { unitId } = await params;
  const unit = await getUnitById(unitId);
  if (!unit) notFound();

  const lessons = await getLessonsForUnit(unitId);
  const available = lessons.filter((l) => l.available);

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link href="/student/units">
            <ArrowLeft className="h-4 w-4" />
            Tất cả đơn vị
          </Link>
        </Button>
      </div>

      <PhenomenonBanner unit={unit} variant="hero" />

      {lessons.length < unit.totalLessons && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
          <p className="font-semibold">🚧 Đang phát triển</p>
          <p className="mt-1 text-amber-800 dark:text-amber-200">
            Đơn vị này hiện có <strong>{lessons.length}/{unit.totalLessons}</strong> bài học.
            Các bài còn lại đang được biên soạn — hãy quay lại sau nhé!
          </p>
        </div>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Các bài học</h2>
          <span className="text-sm text-muted-foreground">
            {available.length}/{unit.totalLessons} bài đã sẵn sàng
          </span>
        </div>
        {lessons.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            🚧 Các bài học của đơn vị này đang được biên soạn. Hãy quay lại sau nhé!
          </p>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} unitId={unit.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
