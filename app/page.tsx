import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Microscope,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredPhenomena = [
  {
    icon: "💡",
    gradeLabel: "Lớp 6",
    title: "Gương một chiều hoạt động như thế nào?",
    description:
      "Một mặt trông như gương phản chiếu, mặt kia như cửa sổ trong suốt. Học sinh xây dựng mô hình để tìm câu trả lời.",
    color: "from-yellow-100 to-amber-50 dark:from-yellow-950/40 dark:to-amber-950/20",
    accent: "text-amber-900 dark:text-amber-200",
  },
  {
    icon: "🌧️",
    gradeLabel: "Lớp 6",
    title: "Tại sao mưa đá rơi vào ngày ấm?",
    description:
      "Học sinh điều tra dự báo bão tuyết và khám phá hành trình của nước trong khí quyển.",
    color: "from-blue-100 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/20",
    accent: "text-sky-900 dark:text-sky-200",
  },
  {
    icon: "🧲",
    gradeLabel: "Lớp 8",
    title: "Điều gì làm màng loa rung lên?",
    description:
      "Học sinh tự chế loa từ ly nhựa, dây đồng và nam châm — và kinh ngạc khi nghe được âm thanh phát ra.",
    color: "from-indigo-100 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/20",
    accent: "text-indigo-900 dark:text-indigo-200",
  },
];

const grades = [
  { level: "Lớp 6", units: 6, subject: "Khoa học tự nhiên" },
  { level: "Lớp 7", units: 6, subject: "Khoa học tự nhiên" },
  { level: "Lớp 8", units: 6, subject: "Khoa học tự nhiên" },
  { level: "THPT", units: 16, subject: "Sinh · Hóa · Lý", badge: "Sắp có" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Microscope className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              OpenStemNeo
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/mentor">Cho giáo viên</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/student">
                Vào học
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.97_0.04_260)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.25_0.08_260)_0%,transparent_60%)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Mở · Miễn phí · Tiếng Việt
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Đi lại con đường của nhà khoa học{" "}
                <span className="text-primary">theo cách của mình</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                OpenStemNeo Việt hóa curriculum OpenSciEd — mỗi bài học bắt đầu
                từ một hiện tượng có thật, học sinh tự đặt câu hỏi, điều tra và
                xây dựng hiểu biết.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/student">
                    <GraduationCap className="h-5 w-5" />
                    Tôi là học sinh
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/mentor">
                    <Users className="h-5 w-5" />
                    Tôi là giáo viên
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Chưa cần đăng ký — vào học ngay.
              </p>
            </div>
          </div>
        </section>

        {/* Featured phenomena */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Bắt đầu từ những hiện tượng thật
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mỗi đơn vị học là một câu chuyện khoa học được mở ra từ một câu
              hỏi học sinh có thể tự hỏi.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPhenomena.map((p) => (
              <Card
                key={p.title}
                className={`overflow-hidden border-0 bg-gradient-to-br ${p.color}`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-4xl" aria-hidden="true">
                      {p.icon}
                    </span>
                    <Badge variant="outline" className={p.accent}>
                      {p.gradeLabel}
                    </Badge>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-[1.4]">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Phenomenon-based intro */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Học qua hiện tượng — không học thuộc công thức
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Trong OpenStemNeo, mỗi đơn vị học kéo dài 3–5 tuần, xoay quanh
                  một hiện tượng có thật. Học sinh quan sát, đặt câu hỏi, thiết
                  kế thí nghiệm, thu thập bằng chứng, và tự xây dựng mô hình
                  giải thích — giống hệt các nhà khoa học thực sự làm việc.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "Hiện tượng thật → câu hỏi thật → điều tra thật",
                    "Vở điều tra cá nhân cho mỗi học sinh",
                    "Mentor theo dõi tiến độ và phản hồi từng bài",
                    "Nội dung mở (OER) — dùng, sửa, chia sẻ tự do",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {grades.map((g) => (
                  <Card key={g.level} className="relative">
                    <CardContent className="p-5">
                      {g.badge && (
                        <Badge
                          variant="secondary"
                          className="absolute right-3 top-3"
                        >
                          {g.badge}
                        </Badge>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {g.subject}
                      </div>
                      <div className="mt-1 text-xl font-bold">{g.level}</div>
                      <div className="mt-3 text-sm">
                        <span className="font-semibold text-primary">
                          {g.units}
                        </span>{" "}
                        đơn vị học
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/10 p-10 text-center sm:p-16">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Sẵn sàng để bắt đầu?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Vào ngay, chọn đơn vị học yêu thích và bắt đầu cuộc điều tra khoa
              học đầu tiên của em.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/student">
                  Khám phá đơn vị học
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} OpenStemNeo. Việt hóa từ{" "}
            <a
              href="https://openscied.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              OpenSciEd.org
            </a>{" "}
            (OER).
          </p>
          <p>Nội dung: CC BY 4.0 · Mã nguồn: MIT</p>
        </div>
      </footer>
    </div>
  );
}
