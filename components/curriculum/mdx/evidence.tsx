import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface EvidenceProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Evidence({ title, children, className }: EvidenceProps) {
  return (
    <section
      className={cn(
        "my-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20",
        className,
      )}
    >
      <header className="mb-3 flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
        <ClipboardList className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          {title ?? "Ghi bằng chứng"}
        </span>
      </header>
      <div className="space-y-3 text-emerald-950 dark:text-emerald-100">
        {children}
      </div>
      <div className="mt-4 min-h-[120px] rounded-lg border border-dashed border-emerald-300/80 bg-background/60 p-3 text-xs italic text-muted-foreground dark:border-emerald-800/60">
        Khi có vở điều tra cá nhân, em sẽ có thể ghi ý kiến tại đây. (Tính năng
        đang chuẩn bị.)
      </div>
    </section>
  );
}
