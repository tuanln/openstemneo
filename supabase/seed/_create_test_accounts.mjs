#!/usr/bin/env node
// Tạo các account test cho Phase 2 QA
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const accounts = [
  { username: 'hs-test', password: 'Test@OpenStemNeo', full_name: 'Nguyễn Học Sinh', role: 'student', grade_level: 6 },
  { username: 'gv-test', password: 'Test@OpenStemNeo', full_name: 'Trần Giáo Viên', role: 'teacher', grade_level: 6 },
  { username: 'mentor-test', password: 'Test@OpenStemNeo', full_name: 'Lê Mentor', role: 'mentor', grade_level: null },
];

for (const acc of accounts) {
  const email = `${acc.username}@openstemneo.local`;
  const { data: existing } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('username', acc.username)
    .maybeSingle();

  if (existing) {
    console.log(`⚠ ${acc.username} đã tồn tại (role=${existing.role}). Skip.`);
    continue;
  }

  const { data: created, error: authErr } = await supabase.auth.admin.createUser({
    email,
    password: acc.password,
    email_confirm: true,
    user_metadata: { full_name: acc.full_name, username: acc.username },
  });

  if (authErr) {
    console.log(`✗ ${acc.username}: ${authErr.message}`);
    continue;
  }

  const userId = created.user.id;
  const { error: profErr } = await supabase.from('profiles').update({
    username: acc.username,
    full_name: acc.full_name,
    role: acc.role,
    grade_level: acc.grade_level,
  }).eq('id', userId);

  if (profErr) {
    console.log(`✗ ${acc.username} profile: ${profErr.message}`);
    continue;
  }

  console.log(`✓ ${acc.username} (${acc.role}) — pwd: ${acc.password}`);
}

console.log('\nDone. Tất cả accounts dùng password: Test@OpenStemNeo');
