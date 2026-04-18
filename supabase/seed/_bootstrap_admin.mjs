#!/usr/bin/env node
// Bootstrap: tạo admin user đầu tiên
// Usage: ADMIN_USERNAME=admin ADMIN_PASSWORD=... node --env-file=.env.local supabase/seed/_bootstrap_admin.mjs

import { createClient } from '@supabase/supabase-js';

const USERNAME = process.env.ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const FULL_NAME = process.env.ADMIN_FULL_NAME || 'Administrator';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const email = `${USERNAME}@openstemneo.local`;

// Check nếu đã tồn tại
const { data: existing } = await supabase
  .from('profiles')
  .select('id, username, role')
  .eq('username', USERNAME)
  .maybeSingle();

if (existing) {
  console.log(`⚠ User "${USERNAME}" already exists (role=${existing.role}). Skipping.`);
  process.exit(0);
}

// Tạo auth user
const { data: created, error: authError } = await supabase.auth.admin.createUser({
  email,
  password: PASSWORD,
  email_confirm: true,
  user_metadata: { full_name: FULL_NAME, username: USERNAME },
});

if (authError) {
  console.error('✗ Auth error:', authError.message);
  process.exit(1);
}

const userId = created.user.id;
console.log(`✓ Created auth user ${email} (id: ${userId})`);

// Update profile → role=admin (profile row đã được trigger auto-create)
const { error: profileError } = await supabase
  .from('profiles')
  .update({ role: 'admin', username: USERNAME, full_name: FULL_NAME })
  .eq('id', userId);

if (profileError) {
  console.error('✗ Profile update error:', profileError.message);
  process.exit(1);
}

console.log(`✓ Set role=admin for ${USERNAME}`);
console.log(`\nLogin: username=${USERNAME} password=${PASSWORD}`);
