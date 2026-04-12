import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function Figure({
  src,
  alt,
  caption,
  credit = "OpenSciEd (CC BY 4.0)",
  width = 800,
  height = 500,
  priority = false,
  className,
}: FigureProps) {
  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-hidden rounded-xl border bg-muted shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption && <span className="font-medium">{caption}</span>}
          {caption && credit && <span> · </span>}
          {credit && <span className="italic">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
