'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { markActivityCompleted } from '@/actions/progress';
import { Button } from '@/components/ui/button';

export function ActivityStatusToggle({
  activityId,
  sourceRef,
  initialCompleted,
}: {
  activityId: string;
  sourceRef?: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (completed || pending) return;
    startTransition(async () => {
      try {
        await markActivityCompleted(activityId, sourceRef);
        setCompleted(true);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Lỗi khi lưu');
      }
    });
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-2 border-t pt-6">
      <Button
        onClick={handleClick}
        disabled={pending || completed}
        size="lg"
        variant={completed ? 'secondary' : 'default'}
        className="gap-2"
      >
        {pending ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Đang lưu...</>
        ) : completed ? (
          <><CheckCircle2 className="h-5 w-5" /> Đã học xong bài này</>
        ) : (
          <><Circle className="h-5 w-5" /> Đánh dấu đã học xong</>
        )}
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {completed && (
        <p className="text-xs text-muted-foreground">
          Streak + skill mastery đã được cập nhật tự động.
        </p>
      )}
    </div>
  );
}
