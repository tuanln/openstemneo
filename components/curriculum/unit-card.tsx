import Link from "next/link";
import type { CurriculumUnit } from "@/lib/curriculum/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { unitAccent, unitGradient } from "./unit-colors";

interface UnitCardProps {
  unit: CurriculumUnit;
  progressPercent?: number;
  completedLessons?: number;
}

export function UnitCard({
  unit,
  progressPercent = 0,
  completedLessons = 0,
}: UnitCardProps) {
  return (
    <Link
      href={`/student/units/${unit.id}`}
      aria-label={`Đơn vị ${unit.id}: ${unit.title}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
    >
      <Card
        className={cn(
          "h-full overflow-hidden border-0 bg-gradient-to-br transition-shadow hover:shadow-md",
          unitGradient[unit.color],
        )}
      >
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className="text-4xl" aria-hidden="true">
              {unit.icon}
            </span>
            <Badge variant="outline" className="bg-background/60 shrink-0">
              {unit.id}
            </Badge>
          </div>
          <h3 className="text-base font-bold leading-[1.3]">{unit.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{unit.titleEn}</p>
          <p className="mt-3 text-sm leading-snug text-foreground/80 line-clamp-2">
            {unit.drivingQuestion}
          </p>

          <div className="mt-auto pt-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className={cn("font-semibold", unitAccent[unit.color])}>
                {completedLessons}/{unit.totalLessons} bài · ~{unit.estimatedWeeks} tuần
              </span>
              {progressPercent > 0 && <span>{progressPercent}%</span>}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-background/60">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
