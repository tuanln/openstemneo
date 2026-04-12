"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const options = [
  { value: "all", label: "Tất cả" },
  { value: "0", label: "Mẫu giáo" },
  { value: "3", label: "Lớp 3" },
  { value: "6", label: "Lớp 6" },
  { value: "7", label: "Lớp 7" },
  { value: "8", label: "Lớp 8" },
];

export function GradeFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("grade") ?? "all";

  return (
    <div
      role="tablist"
      aria-label="Lọc theo lớp"
      className="inline-flex gap-1 rounded-full border bg-background p-1"
    >
      {options.map((opt) => {
        const href =
          opt.value === "all" ? "/student/units" : `/student/units?grade=${opt.value}`;
        const isActive = current === opt.value;
        return (
          <Link
            key={opt.value}
            href={href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
