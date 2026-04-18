import { LoginForm } from './login-form';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Đăng nhập OpenSciedNEO</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Chọn cách đăng nhập phù hợp với em
        </p>
        <LoginForm searchParamsPromise={searchParams} />
      </div>
    </div>
  );
}
