import { Flame } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export async function StreakCounter() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: streaks } = await supabase
    .from('learning_streaks')
    .select('date, activities_completed')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(60);

  if (!streaks || streaks.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-center">
        <Flame className="mx-auto h-6 w-6 text-gray-300" />
        <p className="mt-1 text-sm text-muted-foreground">Chưa có chuỗi nào</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Hoàn thành 1 bài để bắt đầu 🔥
        </p>
      </div>
    );
  }

  // Count consecutive days from today backwards
  const today = new Date();
  const isoToday = today.toISOString().slice(0, 10);
  const datesSet = new Set(streaks.map((s) => s.date));
  let count = 0;
  const d = new Date(today);
  // Nếu hôm nay có streak → đếm từ hôm nay; nếu không → đếm từ hôm qua
  if (!datesSet.has(isoToday)) d.setDate(d.getDate() - 1);
  while (datesSet.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }

  const todayCount = streaks.find((s) => s.date === isoToday)?.activities_completed ?? 0;

  return (
    <div className="rounded-lg border bg-orange-50 p-4 text-center dark:bg-orange-950/40">
      <Flame className="mx-auto h-6 w-6 text-orange-500" />
      <p className="mt-1 text-2xl font-bold text-orange-700 dark:text-orange-300">
        {count}
      </p>
      <p className="text-sm text-orange-700 dark:text-orange-300">ngày liên tục</p>
      {todayCount > 0 && (
        <p className="mt-1 text-xs text-orange-600">
          Hôm nay: {todayCount} bài
        </p>
      )}
    </div>
  );
}
