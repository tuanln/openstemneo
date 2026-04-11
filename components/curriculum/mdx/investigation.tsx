import { Microscope } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface InvestigationProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Investigation({
  title,
  children,
  className,
}: InvestigationProps) {
  return (
    <section
      className={cn(
        "my-6 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/60 dark:bg-sky-950/30",
        className,
      )}
    >
      <header className="mb-3 flex items-center gap-2 text-sky-900 dark:text-sky-200">
        <Microscope className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          {title ?? "Điều tra"}
        </span>
      </header>
      <div className="space-y-3 text-sky-950 dark:text-sky-100">{children}</div>
    </section>
  );
}
