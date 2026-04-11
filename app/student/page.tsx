import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type UnitPreview = {
  id: string;
  icon: string;
  title: string;
  lessons: number;
  completed: number;
  accent: string;
};

const continueLearning = {
  unitId: "6-1",
  unitTitle: "Ánh sáng & Vật chất",
  lessonNumber: 2,
  lessonTitle: "Ánh sáng di chuyển như thế nào?",
  icon: "💡",
};

const units: UnitPreview[] = [
  {
    id: "6-1",
    icon: "💡",
    title: "Ánh sáng & Vật chất",
    lessons: 12,
    completed: 1,
    accent: "from-yellow-100 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/10",
  },
  {
    id: "6-2",
    icon: "🌡️",
    title: "Nhiệt năng",
    lessons: 10,
    completed: 0,
    accent: "from-orange-100 to-rose-50 dark:from-orange-950/30 dark:to-rose-950/10",
  },
  {
    id: "6-3",
    icon: "🌧️",
    title: "Thời tiết, Khí hậu & Nước",
    lessons: 14,
    completed: 0,
    accent: "from-blue-100 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/10",
  },
  {
    id: "6-4",
    icon: "🌋",
    title: "Kiến tạo mảng & Vòng tuần hoàn đá",
    lessons: 11,
    completed: 0,
    accent: "from-stone-100 to-neutral-50 dark:from-stone-900/40 dark:to-neutral-900/20",
  },
];

export default function StudentHome() {
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
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Tiếp tục học
        </h2>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-3xl">
              {continueLearning.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Lớp 6 · Đơn vị {continueLearning.unitId}
              </p>
              <p className="truncate font-semibold">
                {continueLearning.unitTitle}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                Bài {continueLearning.lessonNumber}:{" "}
                {continueLearning.lessonTitle}
              </p>
            </div>
            <Button asChild size="sm" className="shrink-0">
              <Link href={`/student/units/${continueLearning.unitId}`}>
                Tiếp tục
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

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
          {units.map((unit) => {
            const progress = Math.round((unit.completed / unit.lessons) * 100);
            return (
              <Link key={unit.id} href={`/student/units/${unit.id}`}>
                <Card
                  className={`overflow-hidden border-0 bg-gradient-to-br ${unit.accent} transition-shadow hover:shadow-md`}
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <span className="text-3xl" aria-hidden="true">
                        {unit.icon}
                      </span>
                      <Badge variant="outline" className="bg-background/60">
                        {unit.id}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-semibold leading-snug">
                      {unit.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {unit.completed}/{unit.lessons} bài học
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/60">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
