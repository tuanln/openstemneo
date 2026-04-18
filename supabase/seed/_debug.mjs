import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Test 1: Try raw INSERT vào profiles
const TEST_ID = '00000000-0000-0000-0000-000000000001';
const { error: insertErr } = await supabase
  .from('profiles')
  .insert({ id: TEST_ID, username: 'test-direct', full_name: 'Test', role: 'student', auth_method: 'admin_created' });
console.log('Direct profile insert:', insertErr ? '✗ ' + insertErr.message : '✓ OK');

// Cleanup
await supabase.from('profiles').delete().eq('id', TEST_ID);

// Test 2: Try auth.admin.createUser WITHOUT metadata
const { error: err2, data: d2 } = await supabase.auth.admin.createUser({
  email: 'test-bare@openstemneo.local',
  password: 'Test123456789!',
  email_confirm: true,
});
console.log('Bare createUser:', err2 ? '✗ ' + JSON.stringify(err2) : '✓ id=' + d2.user.id);
if (d2?.user?.id) await supabase.auth.admin.deleteUser(d2.user.id);
