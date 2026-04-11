import type { UnitColor } from "@/lib/curriculum/types";

export const unitGradient: Record<UnitColor, string> = {
  amber: "from-amber-100 via-yellow-50 to-orange-50 dark:from-amber-950/40 dark:via-yellow-950/20 dark:to-orange-950/20",
  orange: "from-orange-100 via-rose-50 to-amber-50 dark:from-orange-950/40 dark:via-rose-950/20 dark:to-amber-950/20",
  sky: "from-sky-100 via-blue-50 to-cyan-50 dark:from-sky-950/40 dark:via-blue-950/20 dark:to-cyan-950/20",
  stone: "from-stone-100 via-neutral-50 to-zinc-50 dark:from-stone-900/50 dark:via-neutral-900/30 dark:to-zinc-900/30",
  red: "from-red-100 via-rose-50 to-orange-50 dark:from-red-950/40 dark:via-rose-950/20 dark:to-orange-950/20",
  green: "from-green-100 via-emerald-50 to-lime-50 dark:from-green-950/40 dark:via-emerald-950/20 dark:to-lime-950/20",
  purple: "from-purple-100 via-fuchsia-50 to-pink-50 dark:from-purple-950/40 dark:via-fuchsia-950/20 dark:to-pink-950/20",
  cyan: "from-cyan-100 via-sky-50 to-teal-50 dark:from-cyan-950/40 dark:via-sky-950/20 dark:to-teal-950/20",
  lime: "from-lime-100 via-green-50 to-yellow-50 dark:from-lime-950/40 dark:via-green-950/20 dark:to-yellow-950/20",
  emerald: "from-emerald-100 via-green-50 to-teal-50 dark:from-emerald-950/40 dark:via-green-950/20 dark:to-teal-950/20",
  teal: "from-teal-100 via-cyan-50 to-emerald-50 dark:from-teal-950/40 dark:via-cyan-950/20 dark:to-emerald-950/20",
  slate: "from-slate-100 via-gray-50 to-zinc-50 dark:from-slate-900/50 dark:via-gray-900/30 dark:to-zinc-900/30",
  violet: "from-violet-100 via-purple-50 to-indigo-50 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-indigo-950/20",
  indigo: "from-indigo-100 via-blue-50 to-violet-50 dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-violet-950/20",
  rose: "from-rose-100 via-pink-50 to-red-50 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-red-950/20",
  zinc: "from-zinc-100 via-slate-50 to-stone-50 dark:from-zinc-900/50 dark:via-slate-900/30 dark:to-stone-900/30",
};

export const unitAccent: Record<UnitColor, string> = {
  amber: "text-amber-900 dark:text-amber-200",
  orange: "text-orange-900 dark:text-orange-200",
  sky: "text-sky-900 dark:text-sky-200",
  stone: "text-stone-900 dark:text-stone-200",
  red: "text-red-900 dark:text-red-200",
  green: "text-green-900 dark:text-green-200",
  purple: "text-purple-900 dark:text-purple-200",
  cyan: "text-cyan-900 dark:text-cyan-200",
  lime: "text-lime-900 dark:text-lime-200",
  emerald: "text-emerald-900 dark:text-emerald-200",
  teal: "text-teal-900 dark:text-teal-200",
  slate: "text-slate-900 dark:text-slate-200",
  violet: "text-violet-900 dark:text-violet-200",
  indigo: "text-indigo-900 dark:text-indigo-200",
  rose: "text-rose-900 dark:text-rose-200",
  zinc: "text-zinc-900 dark:text-zinc-200",
};
