import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@openstemneo.local',
  password: 'Admin@OpenStemNeo2026',
});

if (error) {
  console.log('✗ Login fail:', error.message);
  process.exit(1);
}

console.log('✓ Login OK');
console.log('  user.id:', data.user.id);
console.log('  user.email:', data.user.email);
console.log('  session.expires_at:', new Date(data.session.expires_at * 1000).toISOString());

// Check profile
const { data: profile, error: pErr } = await supabase
  .from('profiles')
  .select('username, role, full_name')
  .eq('id', data.user.id)
  .single();

if (pErr) console.log('✗ Profile read:', pErr.message);
else console.log('✓ Profile:', profile);
