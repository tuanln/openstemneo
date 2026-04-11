"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, NotebookPen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/student", label: "Trang chủ", icon: Home },
  { href: "/student/units", label: "Đơn vị", icon: BookOpen },
  { href: "/student/notebook", label: "Vở", icon: NotebookPen },
  { href: "/student/progress", label: "Tiến độ", icon: TrendingUp },
];

export function StudentNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng học sinh"
      className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur md:static md:border-t-0 md:border-b"
    >
      <ul className="mx-auto flex max-w-6xl items-center justify-around px-2 md:justify-start md:gap-1 md:px-6 md:py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/student"
              ? pathname === "/student"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1 md:flex-none">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors md:flex-row md:gap-2 md:px-4 md:text-sm",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 md:h-4 md:w-4",
                    isActive && "text-primary",
                  )}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
