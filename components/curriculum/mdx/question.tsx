import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface QuestionProps {
  children: React.ReactNode;
  className?: string;
}

export function Question({ children, className }: QuestionProps) {
  return (
    <div
      className={cn(
        "my-5 flex gap-3 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 dark:border-amber-500 dark:bg-amber-950/30",
        className,
      )}
    >
      <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
      <div className="font-semibold text-amber-950 dark:text-amber-100">
        {children}
      </div>
    </div>
  );
}
