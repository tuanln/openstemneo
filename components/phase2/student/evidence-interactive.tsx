'use client';

import { useState, useEffect, useRef } from 'react';
import { PenLine, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { saveEvidenceResponse } from '@/actions/evidence';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function EvidenceInteractive({
  activityId,
  questionId,
  prompt,
  initialText = '',
}: {
  activityId: string;
  questionId: string;
  prompt: string;
  initialText?: string;
}) {
  const [text, setText] = useState(initialText);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef<string>(initialText);

  useEffect(() => {
    if (text === lastSaved.current) return;
    if (text.trim().length === 0) {
      setStatus('idle');
      return;
    }

    setStatus('saving');
    setErrorMsg(null);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await saveEvidenceResponse(activityId, questionId, text);
        if (res.ok) {
          setStatus('saved');
          lastSaved.current = text;
        } else {
          setStatus('error');
          setErrorMsg(res.error ?? 'Lưu thất bại');
        }
      } catch (e) {
        setStatus('error');
        setErrorMsg(e instanceof Error ? e.message : 'Lưu thất bại');
      }
    }, 800);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [text, activityId, questionId]);

  return (
    <div className="my-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/40">
      <div className="flex items-center gap-2 font-medium text-blue-900 dark:text-blue-200">
        <PenLine className="h-4 w-4" />
        Em hãy viết câu trả lời:
      </div>
      <p className="mt-1 text-sm text-blue-800 dark:text-blue-300">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-3 w-full rounded border border-blue-300 bg-white p-2 text-sm dark:border-blue-700 dark:bg-slate-900"
        placeholder="Viết suy nghĩ của em ở đây..."
      />
      <p className="mt-1 flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400">
        {status === 'saving' && (<><Loader2 className="h-3 w-3 animate-spin" /> Đang lưu...</>)}
        {status === 'saved' && (<><CheckCircle2 className="h-3 w-3 text-green-600" /> Đã lưu</>)}
        {status === 'error' && (<><AlertCircle className="h-3 w-3 text-red-600" /> {errorMsg ?? 'Lỗi'}</>)}
        {status === 'idle' && <span className="opacity-50">Em có thể viết khi suy nghĩ xong</span>}
      </p>
    </div>
  );
}
