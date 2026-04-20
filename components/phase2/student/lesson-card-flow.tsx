'use client';

import { Children, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface StepMeta {
  title: string;
  emoji: string;
  heroImage?: string;
  heroAlt?: string;
}

export function LessonCardFlow({
  steps,
  lessonTitle,
  lessonSummary,
  children,
  onReachEnd,
  fallbackHero,
}: {
  steps: StepMeta[];
  lessonTitle: string;
  lessonSummary?: string;
  children: ReactNode;
  onReachEnd?: ReactNode;
  fallbackHero?: string;
}) {
  const cards = Children.toArray(children);
  const [step, setStep] = useState(0);
  const total = cards.length;
  const isLast = step === total - 1;
  const isFirst = step === 0;
  const current = steps[step];
  const heroSrc = current.heroImage ?? fallbackHero;

  function goNext() {
    if (!isLast) setStep(step + 1);
  }
  function goPrev() {
    if (!isFirst) setStep(step - 1);
  }

  return (
    <div className="space-y-4">
      {/* Progress bar sticky */}
      <div className="sticky top-16 z-20 -mx-4 bg-white/95 px-4 py-3 backdrop-blur dark:bg-slate-950/95 sm:-mx-0 sm:px-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{current.emoji}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {current.title}
              </span>
              <span className="text-muted-foreground">
                Bước {step + 1}/{total}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero image + step header card */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
        {heroSrc ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <Image
              src={heroSrc}
              alt={current.heroAlt ?? current.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority={step === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl drop-shadow">{current.emoji}</span>
                <h2 className="text-lg font-bold drop-shadow-lg sm:text-2xl">
                  {current.title}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950/40 dark:to-purple-950/40">
            <div className="text-center">
              <div className="text-7xl drop-shadow-sm sm:text-8xl">{current.emoji}</div>
              <h2 className="mt-3 px-6 text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
                {current.title}
              </h2>
            </div>
          </div>
        )}

        {/* Step 1 extra: lesson title + summary overlay below hero */}
        {step === 0 && (
          <div className="border-b bg-blue-50 p-4 dark:bg-blue-950/40">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Câu hỏi lớn của bài
            </div>
            <h1 className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100 sm:text-xl">
              {lessonTitle}
            </h1>
            {lessonSummary && (
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                {lessonSummary}
              </p>
            )}
          </div>
        )}

        {/* Body — MDX content */}
        <div className="prose prose-slate max-w-none p-5 dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-2 prose-h2:hidden prose-h3:text-lg prose-h3:text-blue-700 dark:prose-h3:text-blue-300 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-primary prose-img:rounded-xl prose-strong:text-foreground">
          {cards[step]}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={isFirst}
          className="gap-1 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Quay lại</span>
        </Button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                  : i < step
                    ? 'w-2 bg-blue-400'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Đi đến bước ${i + 1}`}
            />
          ))}
        </div>

        {isLast ? (
          <div className="w-16 shrink-0 sm:w-28" />
        ) : (
          <Button
            size="lg"
            onClick={goNext}
            className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
          >
            <span className="hidden sm:inline">Tiếp theo</span>
            <span className="sm:hidden">Tiếp</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Bottom: ActivityStatusToggle when reached last */}
      {isLast && onReachEnd && <div className="pt-2">{onReachEnd}</div>}
    </div>
  );
}
