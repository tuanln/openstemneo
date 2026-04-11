import Link from "next/link";
import { Microscope } from "lucide-react";
import { MentorSidebar } from "@/components/layout/mentor-sidebar";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <MentorSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile/tablet header (sidebar hidden below lg) */}
        <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur lg:hidden">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Microscope className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold">OpenStemNeo · Mentor</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
