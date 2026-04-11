"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Inbox,
  LayoutDashboard,
  Microscope,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/mentor", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/mentor/classes", label: "Lớp học", icon: Users },
  { href: "/mentor/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/mentor/submissions", label: "Bài nộp", icon: Inbox },
];

export function MentorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Microscope className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold">OpenStemNeo</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Mentor
            </span>
          </div>
        </Link>
      </div>
      <nav aria-label="Điều hướng mentor" className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/mentor"
              ? pathname === "/mentor"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
