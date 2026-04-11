import Link from "next/link";
import { Microscope } from "lucide-react";
import { StudentNav } from "@/components/layout/student-nav";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Mobile header */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Microscope className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold">OpenStemNeo</span>
          </Link>
        </div>
      </header>

      {/* Desktop header with inline nav */}
      <div className="hidden md:block">
        <header className="border-b bg-background">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Microscope className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                OpenStemNeo
              </span>
            </Link>
          </div>
        </header>
        <StudentNav />
      </div>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-8">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 md:py-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <StudentNav />
      </div>
    </div>
  );
}
