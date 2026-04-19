'use client';

import { Children, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LessonCardFlow({
  titles,
  children,
  onReachEnd,
}: {
  titles: string[];
  children: ReactNode;
  onReachEnd?: ReactNode; // ActivityStatusToggle passed in
}) {
  const cards = Children.toArray(children);
  const [step, setStep] = useState(0);
  const total = cards.length;
  const isLast = step === total - 1;
  const isFirst = step === 0;

  function goNext() {
    if (!isLast) setStep(step + 1);
  }
  function goPrev() {
    if (!isFirst) setStep(step - 1);
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="sticky top-16 z-20 -mx-4 bg-white/95 px-4 py-3 backdrop-blur dark:bg-slate-950/95 sm:-mx-0 sm:px-0">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {titles[step]}
              </span>
              <span>
                {step + 1}/{total}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current card content */}
      <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-2 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-primary prose-strong:text-foreground">
        {cards[step]}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={isFirst}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-8 bg-blue-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Đi đến bước ${i + 1}`}
            />
          ))}
        </div>

        {isLast ? (
          <div className="flex items-center gap-2">{/* ActivityStatusToggle slot inline with Next */}</div>
        ) : (
          <Button size="lg" onClick={goNext} className="gap-2">
            Tiếp theo
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Bottom: show complete-toggle when reached last step */}
      {isLast && onReachEnd && <div className="pt-4">{onReachEnd}</div>}
    </div>
  );
}
