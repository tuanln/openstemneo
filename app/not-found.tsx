import Link from "next/link";
import { ArrowLeft, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Microscope className="h-8 w-8" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
        Không tìm thấy trang này
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Có thể trang em đang tìm chưa được xây dựng, hoặc đường dẫn đã thay
        đổi. Hãy quay về trang chủ để tiếp tục khám phá.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/student">Vào học</Link>
        </Button>
      </div>
    </div>
  );
}
