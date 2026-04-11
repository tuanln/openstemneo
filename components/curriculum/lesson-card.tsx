import Link from "next/link";
import { ArrowRight, CircleCheck, CircleDashed, Lock } from "lucide-react";
import type { Lesson, LessonType } from "@/lib/curriculum/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

const typeLabel: Record<LessonType, string> = {
  phenomenon: "Hiện tượng",
  investigation: "Điều tra",
  analysis: "Phân tích",
  "making-meaning": "Xây dựng ý nghĩa",
  application: "Áp dụng",
  assessment: "Đánh giá",
};

const typeStyle: Record<LessonType, string> = {
  phenomenon: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  investigation: "bg-sky-100 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200",
  analysis: "bg-violet-100 text-violet-900 dark:bg-violet-950/40 dark:text-violet-200",
  "making-meaning": "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  application: "bg-indigo-100 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200",
  assessment: "bg-rose-100 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
};

interface LessonCardProps {
  lesson: Lesson;
  unitId: string;
  status?: "not-started" | "in-progress" | "completed";
}

export function LessonCard({
  lesson,
  unitId,
  status = "not-started",
}: LessonCardProps) {
  const href = lesson.available
    ? `/student/units/${unitId}/lessons/${lesson.id}`
    : `/student/units/${unitId}/lessons/${lesson.id}`;

  const StatusIcon =
    status === "completed"
      ? CircleCheck
      : !lesson.available
        ? Lock
        : CircleDashed;

  const Inner = (
    <Card
      className={cn(
        "transition-shadow",
        lesson.available ? "hover:shadow-md" : "opacity-70",
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold">
          {lesson.order}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={cn("text-[10px]", typeStyle[lesson.type])}>
              {typeLabel[lesson.type]}
            </Badge>
            {lesson.duration && (
              <span className="text-xs text-muted-foreground">
                {lesson.duration}
              </span>
            )}
            {!lesson.available && (
              <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                Đang chuẩn bị
              </span>
            )}
          </div>
          <h3 className="mt-1 text-sm font-semibold leading-snug">
            {lesson.title}
          </h3>
          {lesson.summary && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {lesson.summary}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <StatusIcon className="h-4 w-4" />
          {lesson.available && <ArrowRight className="h-4 w-4" />}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Link
      href={href}
      aria-label={`Bài ${lesson.order}: ${lesson.title}`}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {Inner}
    </Link>
  );
}
