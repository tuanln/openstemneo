import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, ExternalLink, LogIn } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllLessonParams,
  getLessonContent,
  getLessonsForUnit,
  getUnitById,
} from "@/lib/curriculum/loader";
import { mdxComponents } from "@/components/curriculum/mdx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { unitAccent } from "@/components/curriculum/unit-colors";
import { createClient } from "@/lib/supabase/server";
import { getActivityBySlug, isActivityCompleted } from "@/lib/db/events";
import { ActivityStatusToggle } from "@/components/phase2/student/activity-status-toggle";
import { LessonCardFlow } from "@/components/phase2/student/lesson-card-flow";
import { splitBySections } from "@/lib/curriculum/split-sections";

interface PageProps {
  params: Promise<{ unitId: string; lessonId: string }>;
}

// Dynamic rendering — trang đọc cookies cho progress tracking
// (Trước đây SSG qua generateStaticParams, tạm bỏ để thêm auth-aware UI)
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return await getAllLessonParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { unitId, lessonId } = await params;
  const lesson = await getLessonContent(unitId, lessonId);
  const unit = await getUnitById(unitId);
  if (!lesson || !unit) return { title: "Bài học không tồn tại" };
  return {
    title: `${lesson.frontmatter.title} · ${unit.title}`,
    description: lesson.frontmatter.summary,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { unitId, lessonId } = await params;
  const unit = await getUnitById(unitId);
  if (!unit) notFound();

  const lessonContent = await getLessonContent(unitId, lessonId);
  if (!lessonContent) notFound();

  const { frontmatter, source } = lessonContent;
  const allLessons = await getLessonsForUnit(unitId);
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? allLessons[idx - 1] : null;
  const next = idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
  const available = frontmatter.available ?? true;

  // Phase 2 — progress tracking (chỉ active khi user logged in)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // lessonId đã là full slug ("6-1-L1") — khớp activity.slug trực tiếp
  const activity = await getActivityBySlug(lessonId);
  const completed = user && activity ? await isActivityCompleted(activity.id) : false;

  // Load role để decide view
  let userRole: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    userRole = profile?.role ?? null;
  }
  // MVP: Mọi user (kể cả anonymous, admin, teacher) đều thấy card flow visual mới.
  // Teacher/admin có thể toggle "Xem full text" sau. Test với em nhỏ không cần login.
  const sections = splitBySections(source);
  const useCardFlow = sections.length > 1;

  return (
    <article className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Button asChild variant="ghost" size="sm" className="-ml-3 h-auto py-1">
          <Link href={`/student/units/${unit.id}`}>
            <ArrowLeft className="h-3.5 w-3.5" />
            {unit.title}
          </Link>
        </Button>
      </div>

      {/* Header — ẩn khi render card flow (đã có overlay trong card 1) */}
      {!useCardFlow && (
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("text-xs font-semibold uppercase tracking-wider", unitAccent[unit.color])}>
              Bài {frontmatter.order}
            </span>
            {frontmatter.duration && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {frontmatter.duration}
              </Badge>
            )}
            {frontmatter.standards?.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {frontmatter.title}
          </h1>
          {frontmatter.summary && (
            <p className="text-lg text-muted-foreground">{frontmatter.summary}</p>
          )}
        </header>
      )}

      {/* Body — card flow visual cho tất cả user (fallback full MDX khi lesson không có H2 sections) */}
      {useCardFlow ? (
        <LessonCardFlow
          steps={sections.map((s) => ({
            title: s.title,
            emoji: s.emoji,
            heroImage: s.heroImage,
            heroAlt: s.heroAlt,
          }))}
          lessonTitle={frontmatter.title}
          lessonSummary={frontmatter.summary}
          fallbackHero={`/curriculum/grade-${unit.gradeLevel}/${unit.id}-cover.jpg`}
          onReachEnd={
            activity ? (
              <ActivityStatusToggle
                activityId={activity.id}
                sourceRef={activity.source_ref ?? undefined}
                initialCompleted={completed}
              />
            ) : null
          }
        >
          {sections.map((s, i) => (
            <MDXRemote
              key={i}
              source={s.source}
              components={mdxComponents}
              options={{
                parseFrontmatter: false,
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          ))}
        </LessonCardFlow>
      ) : (
        <>
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-primary prose-strong:text-foreground">
            <MDXRemote
              source={source}
              components={mdxComponents}
              options={{
                parseFrontmatter: false,
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          </div>

          {/* Progress tracking (Phase 2) — cho teacher/anon */}
          {user && activity ? (
            <ActivityStatusToggle
              activityId={activity.id}
              sourceRef={activity.source_ref ?? undefined}
              initialCompleted={completed}
            />
          ) : !user && activity ? (
            <div className="mt-8 flex flex-col items-center gap-3 border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Đăng nhập để lưu tiến độ + rèn skill qua từng bài.
              </p>
              <Button asChild size="sm" variant="outline">
                <Link href={`/login?next=/student/units/${unitId}/lessons/${lessonId}`}>
                  <LogIn className="h-4 w-4" />
                  Đăng nhập
                </Link>
              </Button>
            </div>
          ) : null}
        </>
      )}

      {/* Source attribution */}
      {available && frontmatter.sourceHandoutUrl && (
        <div className="rounded-lg border border-dashed p-4 text-xs text-muted-foreground">
          <p>
            Nội dung được việt hóa và thích ứng từ tài liệu học sinh (student
            handout) của OpenSciEd — Bài{" "}
            <span className="font-semibold">{frontmatter.order}</span>, đơn vị{" "}
            <span className="font-semibold">{unit.titleEn}</span>.{" "}
            <a
              href={frontmatter.sourceHandoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              Xem bản gốc tiếng Anh <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          <p className="mt-1">
            Phát hành theo giấy phép{" "}
            <span className="font-semibold">CC BY 4.0</span>. Nguồn gốc:{" "}
            <a
              href={unit.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              openscied.org
            </a>
            .
          </p>
        </div>
      )}

      {/* Prev / Next nav */}
      <nav className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-between">
        {prev ? (
          <Button asChild variant="outline" className="justify-start">
            <Link href={`/student/units/${unit.id}/lessons/${prev.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="text-left">
                <span className="block text-xs text-muted-foreground">
                  Bài trước
                </span>
                <span className="block truncate">{prev.title}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <div />
        )}
        {next ? (
          <Button asChild className="justify-end">
            <Link href={`/student/units/${unit.id}/lessons/${next.id}`}>
              <span className="text-right">
                <span className="block text-xs opacity-80">Bài tiếp theo</span>
                <span className="block truncate">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={`/student/units/${unit.id}`}>
              Quay lại đơn vị
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
