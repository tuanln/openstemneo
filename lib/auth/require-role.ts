import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

type Role = 'student' | 'teacher' | 'mentor' | 'admin';

export async function requireRole(roles: Role[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, full_name, role, grade_level, avatar_url')
    .eq('id', user.id)
    .single();

  if (!profile || !roles.includes(profile.role as Role)) {
    redirect('/');
  }

  return { user, profile };
}
