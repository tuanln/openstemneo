import { cn } from "@/lib/utils/cn";

interface DiagramProps {
  title?: string;
  children: React.ReactNode;
  caption?: string;
  className?: string;
}

/**
 * Wrapper for inline SVG diagrams or simple diagram content.
 * Use for hand-drawn/animated illustrations that don't need external images.
 */
export function Diagram({ title, children, caption, className }: DiagramProps) {
  return (
    <figure
      className={cn(
        "my-6 overflow-hidden rounded-xl border bg-gradient-to-b from-sky-50 to-white p-5 dark:from-sky-950/30 dark:to-background",
        className,
      )}
    >
      {title && (
        <div className="mb-3 text-center text-sm font-semibold text-sky-900 dark:text-sky-100">
          {title}
        </div>
      )}
      <div className="flex justify-center">{children}</div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
