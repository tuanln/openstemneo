'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error: urlError } = use(searchParamsPromise);
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError === 'auth_failed' ? 'Đăng nhập thất bại, thử lại' : null
  );

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next || '/dashboard')}`,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function signInWithUsername(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const email = `${username.trim().toLowerCase()}@openstemneo.local`;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      setLoading(false);
    } else {
      router.push(next || '/dashboard');
      router.refresh();
    }
  }

  return (
    <Tabs defaultValue="username" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="username">Tên đăng nhập</TabsTrigger>
        <TabsTrigger value="gmail">Gmail</TabsTrigger>
      </TabsList>

      <TabsContent value="username" className="space-y-4 pt-4">
        <form onSubmit={signInWithUsername} className="space-y-3">
          <div>
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              placeholder="hs-tan-a"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Tên đăng nhập do thầy/cô cấp cho em. Nếu em có Gmail, bấm tab &quot;Gmail&quot; bên cạnh.
        </p>
      </TabsContent>

      <TabsContent value="gmail" className="space-y-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Nếu em có tài khoản Gmail, bấm nút dưới để đăng nhập nhanh.
        </p>
        <Button onClick={signInWithGoogle} disabled={loading} className="w-full">
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập bằng Google'}
        </Button>
        <p className="text-xs text-muted-foreground">
          (Nếu Gmail chưa khả dụng, thầy/cô có thể cấp tên đăng nhập cho em — xem tab bên cạnh.)
        </p>
      </TabsContent>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </Tabs>
  );
}
