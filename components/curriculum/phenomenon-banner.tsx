import type { CurriculumUnit } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils/cn";
import { unitAccent, unitGradient } from "./unit-colors";
import { Badge } from "@/components/ui/badge";

interface PhenomenonBannerProps {
  unit: CurriculumUnit;
  variant?: "hero" | "compact";
  className?: string;
}

export function PhenomenonBanner({
  unit,
  variant = "hero",
  className,
}: PhenomenonBannerProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "rounded-xl bg-gradient-to-br p-5",
          unitGradient[unit.color],
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl" aria-hidden="true">
            {unit.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className={cn("text-xs font-semibold uppercase tracking-wider", unitAccent[unit.color])}>
              Lớp {unit.gradeLevel} · Đơn vị {unit.id}
            </p>
            <h3 className="mt-1 font-bold leading-tight">{unit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {unit.drivingQuestion}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 sm:p-10",
        unitGradient[unit.color],
        className,
      )}
    >
      <div className="relative max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-6xl" aria-hidden="true">
            {unit.icon}
          </span>
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-wider", unitAccent[unit.color])}>
              {unit.subjectArea} · Lớp {unit.gradeLevel}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Đơn vị {unit.id} · {unit.titleEn}
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {unit.title}
        </h1>

        <div className="mt-6 rounded-xl bg-background/70 p-5 backdrop-blur">
          <p className={cn("text-xs font-semibold uppercase tracking-wider", unitAccent[unit.color])}>
            Câu hỏi chủ đạo
          </p>
          <p className="mt-2 text-xl font-semibold leading-snug">
            {unit.drivingQuestion}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <p className={cn("text-xs font-semibold uppercase tracking-wider", unitAccent[unit.color])}>
            Hiện tượng neo
          </p>
          <p className="text-base leading-relaxed text-foreground/90">
            {unit.phenomenon}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-background/70">
            {unit.totalLessons} bài học
          </Badge>
          <Badge variant="secondary" className="bg-background/70">
            ~{unit.estimatedWeeks} tuần
          </Badge>
          {unit.standards.slice(0, 3).map((s) => (
            <Badge key={s} variant="outline" className="bg-background/50">
              {s}
            </Badge>
          ))}
          {unit.standards.length > 3 && (
            <Badge variant="outline" className="bg-background/50">
              +{unit.standards.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
}
