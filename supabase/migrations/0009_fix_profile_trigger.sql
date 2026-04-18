-- Migration 0009 — Fix auto-profile trigger (search_path, exception, service_role policy)
-- Lý do: trigger fail 500 "Database error creating new user". Suspect search_path
-- hoặc RLS block INSERT. Sửa cả 2.

DROP TRIGGER IF EXISTS trg_create_profile ON auth.users;

CREATE OR REPLACE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, auth_method)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE
      WHEN NEW.email LIKE '%@openstemneo.local' THEN split_part(NEW.email, '@', 1)
      ELSE NEW.raw_user_meta_data->>'username'
    END,
    CASE WHEN NEW.email LIKE '%@openstemneo.local' THEN 'admin_created' ELSE 'oauth' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log warning nhưng không chặn auth.users insert
  RAISE WARNING 'Profile auto-create failed for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_create_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_new_user();

-- Add INSERT policy cho service_role (admin client bypass RLS qua JWT)
CREATE POLICY "Service role insert profiles" ON profiles FOR INSERT
  WITH CHECK (
    (auth.jwt() ->> 'role'::text) = 'service_role'::text
    OR auth.uid() = id
  );
