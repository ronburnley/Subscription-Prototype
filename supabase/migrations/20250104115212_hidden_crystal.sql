/*
  # Remove auth constraint from users table

  This migration removes the auth.uid() constraint from the users table
  since we're not using authentication in this version of the application.
*/

ALTER TABLE users 
  DROP CONSTRAINT users_auth_id_fkey,
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Remove RLS policies since we're not using authentication
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE family_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE communication_preferences DISABLE ROW LEVEL SECURITY;