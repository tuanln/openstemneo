import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import type { Lesson, LessonType } from '@/lib/curriculum/types';
import { cn } from '@/lib/utils/cn';

const typeEmoji: Record<LessonType, string> = {
  phenomenon: '🔍',
  investigation: '🔬',
  analysis: '📊',
  'making-meaning': '💡',
  application: '🛠️',
  assessment: '✅',
};

const typeLabel: Record<LessonType, string> = {
  phenomenon: 'Quan sát',
  investigation: 'Thí nghiệm',
  analysis: 'Phân tích',
  'making-meaning': 'Hiểu ý nghĩa',
  application: 'Vận dụng',
  assessment: 'Kiểm tra',
};

const typeBg: Record<LessonType, string> = {
  phenomenon: 'from-amber-400 to-orange-500',
  investigation: 'from-sky-400 to-blue-600',
  analysis: 'from-violet-400 to-purple-600',
  'making-meaning': 'from-emerald-400 to-green-600',
  application: 'from-indigo-400 to-blue-700',
  assessment: 'from-rose-400 to-pink-600',
};

interface ExperimentCardProps {
  lesson: Lesson;
  unitId: string;
  coverImage?: string;
}

export function ExperimentCard({ lesson, unitId, coverImage }: ExperimentCardProps) {
  const emoji = typeEmoji[lesson.type];
  const label = typeLabel[lesson.type];
  const bgGradient = typeBg[lesson.type];
  const href = `/student/units/${unitId}/lessons/${lesson.id}`;

  if (!lesson.available) {
    return (
      <div className="relative overflow-hidden rounded-2xl border bg-slate-50 opacity-60 dark:bg-slate-900">
        <div className={cn('relative h-28 bg-gradient-to-br', bgGradient, 'opacity-40')}>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {emoji}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 font-bold dark:bg-slate-700">
              {lesson.order}
            </span>
            <span className="font-medium">Đang chuẩn bị</span>
          </div>
          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold">{lesson.title}</h3>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border bg-white transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg dark:bg-slate-900"
      aria-label={`Thí nghiệm ${lesson.order}: ${lesson.title}`}
    >
      {/* Hero image/gradient */}
      <div className={cn('relative h-28 bg-gradient-to-br', bgGradient)}>
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover mix-blend-overlay opacity-70"
          />
        )}
        {/* Emoji badge big */}
        <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg">
          {emoji}
        </div>
        {/* Number badge top-left */}
        <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-slate-900 shadow-sm">
          {lesson.order}
        </div>
        {/* Type label top-right */}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-900 shadow-sm">
          {label}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {lesson.title}
        </h3>
        {lesson.summary && (
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
            {lesson.summary}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs">
          {lesson.duration ? (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {lesson.duration}
            </span>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-0.5 font-semibold text-blue-600 dark:text-blue-400">
            Bắt đầu
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
