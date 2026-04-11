import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { CurriculumUnit } from "@/lib/curriculum/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { unitAccent, unitGradient } from "./unit-colors";

interface UnitCardProps {
  unit: CurriculumUnit;
  progressPercent?: number;
  completedLessons?: number;
  /**
   * Số bài học đã có nội dung sẵn sàng đọc. Nếu 0, card sẽ hiện trạng thái
   * "Đang chuẩn bị nội dung" (dim + badge) nhưng vẫn click được vào unit detail.
   */
  availableLessons?: number;
}

export function UnitCard({
  unit,
  progressPercent = 0,
  completedLessons = 0,
  availableLessons,
}: UnitCardProps) {
  const hasContent = availableLessons === undefined || availableLessons > 0;
  const cardLabel = hasContent
    ? `Đơn vị ${unit.id}: ${unit.title}`
    : `Đơn vị ${unit.id}: ${unit.title} — đang chuẩn bị nội dung`;

  return (
    <Link
      href={`/student/units/${unit.id}`}
      aria-label={cardLabel}
      className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden border-0 bg-gradient-to-br transition-all",
          unitGradient[unit.color],
          hasContent
            ? "hover:shadow-md group-hover:-translate-y-0.5"
            : "opacity-75 hover:opacity-95",
        )}
      >
        {!hasContent && (
          <div className="absolute right-3 top-3 z-10">
            <Badge
              variant="secondary"
              className="gap-1 bg-background/95 text-[10px] font-semibold uppercase tracking-wider shadow-sm backdrop-blur"
            >
              <Sparkles className="h-2.5 w-2.5" />
              Đang chuẩn bị
            </Badge>
          </div>
        )}
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className="text-4xl" aria-hidden="true">
              {unit.icon}
            </span>
            {hasContent && (
              <Badge variant="outline" className="bg-background/60 shrink-0">
                {unit.id}
              </Badge>
            )}
          </div>
          <h3 className="text-base font-bold leading-[1.3]">{unit.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{unit.titleEn}</p>
          <p className="mt-3 text-sm leading-snug text-foreground/80 line-clamp-2">
            {unit.drivingQuestion}
          </p>

          <div className="mt-auto pt-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className={cn("font-semibold", unitAccent[unit.color])}>
                {hasContent
                  ? `${availableLessons ?? completedLessons}/${unit.totalLessons} bài · ~${unit.estimatedWeeks} tuần`
                  : `${unit.totalLessons} bài · ~${unit.estimatedWeeks} tuần`}
              </span>
              {progressPercent > 0 && hasContent && (
                <span>{progressPercent}%</span>
              )}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-background/60">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  hasContent ? "bg-primary" : "bg-muted-foreground/30",
                )}
                style={{
                  width: hasContent
                    ? `${progressPercent}%`
                    : "100%",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
