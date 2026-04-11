import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "3", label: "Lớp học" },
  { value: "47", label: "Học sinh" },
  { value: "12", label: "Bài nộp chờ" },
  { value: "78%", label: "Tỉ lệ hoàn thành" },
];

const classes = [
  {
    id: "c1",
    name: "Khoa học 6A",
    students: 18,
    unit: "6.1 Ánh sáng & Vật chất",
    progress: 65,
  },
  {
    id: "c2",
    name: "Khoa học 6B",
    students: 16,
    unit: "6.1 Ánh sáng & Vật chất",
    progress: 40,
  },
  {
    id: "c3",
    name: "Khoa học 7A",
    students: 13,
    unit: "7.1 Phản ứng hóa học",
    progress: 20,
  },
];

const pendingSubmissions = [
  {
    id: "s1",
    student: "Nguyễn Minh A.",
    lesson: "Bài 2 · Đơn vị 6.1",
    time: "2 giờ trước",
  },
  {
    id: "s2",
    student: "Trần Thị B.",
    lesson: "Bài 3 · Đơn vị 6.1",
    time: "4 giờ trước",
  },
  {
    id: "s3",
    student: "Lê Văn C.",
    lesson: "Bài 1 · Đơn vị 6.2",
    time: "Hôm qua",
  },
];

export default function MentorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Bảng điều khiển Mentor
          </h1>
          <p className="mt-1 text-muted-foreground">
            Theo dõi tiến độ và phản hồi bài nộp của học sinh.
          </p>
        </div>
        <Button asChild>
          <Link href="/mentor/classes/new">
            <Plus className="h-4 w-4" />
            Tạo lớp mới
          </Link>
        </Button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Classes */}
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Lớp học của tôi
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/mentor/classes">
                Tất cả
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {classes.map((cls) => (
              <Link
                key={cls.id}
                href={`/mentor/classes/${cls.id}`}
                className="block"
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-xl">
                      🏫
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {cls.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {cls.students} học sinh · {cls.unit}
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${cls.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-bold">
                      {cls.progress}%
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Pending submissions */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Cần phản hồi
            </h2>
            <Badge variant="secondary">{pendingSubmissions.length}</Badge>
          </div>
          <div className="space-y-3">
            {pendingSubmissions.map((s) => (
              <Card
                key={s.id}
                className="border-amber-200/60 dark:border-amber-900/40"
              >
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{s.student}</p>
                  <p className="text-xs text-muted-foreground">{s.lesson}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {s.time}
                    </span>
                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      className="h-7 text-xs"
                    >
                      <Link href={`/mentor/submissions/${s.id}`}>Xem</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
