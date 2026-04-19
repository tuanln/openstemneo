#!/usr/bin/env node
// Tạo 2 HS pilot để anh Tuấn test với em nhỏ thực tế
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const students = [
  { username: 'em-a', password: 'pilot-a-2026', full_name: 'Em A (pilot)', grade_level: 6 },
  { username: 'em-b', password: 'pilot-b-2026', full_name: 'Em B (pilot)', grade_level: 6 },
];

for (const s of students) {
  const email = `${s.username}@openstemneo.local`;
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', s.username)
    .maybeSingle();

  if (existing) {
    console.log(`⚠ ${s.username} đã có. Skip.`);
    continue;
  }

  const { data: created, error: aErr } = await supabase.auth.admin.createUser({
    email,
    password: s.password,
    email_confirm: true,
    user_metadata: { full_name: s.full_name, username: s.username },
  });
  if (aErr) { console.log(`✗ ${s.username}: ${aErr.message}`); continue; }

  await supabase.from('profiles').update({
    username: s.username,
    full_name: s.full_name,
    role: 'student',
    grade_level: s.grade_level,
  }).eq('id', created.user.id);

  console.log(`✓ ${s.username} / ${s.password}  (${s.full_name}, lớp ${s.grade_level})`);
}
