import { Brain, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type CalloutVariant = "think" | "note" | "tip" | "warning";

const styles: Record<
  CalloutVariant,
  { wrap: string; icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  think: {
    wrap: "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-900/60 dark:bg-violet-950/30 dark:text-violet-100",
    icon: Brain,
    label: "Suy nghĩ",
  },
  note: {
    wrap: "border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100",
    icon: Info,
    label: "Ghi nhớ",
  },
  tip: {
    wrap: "border-green-200 bg-green-50 text-green-950 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-100",
    icon: Lightbulb,
    label: "Mẹo",
  },
  warning: {
    wrap: "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100",
    icon: TriangleAlert,
    label: "Lưu ý",
  },
};

interface CalloutProps {
  type?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  type = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const style = styles[type];
  const Icon = style.icon;
  return (
    <aside
      className={cn(
        "my-5 flex gap-3 rounded-xl border p-4",
        style.wrap,
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="text-sm font-semibold uppercase tracking-wide">
          {title ?? style.label}
        </div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </aside>
  );
}
