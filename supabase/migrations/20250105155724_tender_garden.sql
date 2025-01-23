/*
  # Re-enable RLS and update policies

  1. Changes
    - Drop existing policies to avoid conflicts
    - Re-enable RLS on all tables
    - Add policies for authenticated users
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Users policies
  DROP POLICY IF EXISTS "Users can view own data" ON users;
  DROP POLICY IF EXISTS "Users can update own data" ON users;
  DROP POLICY IF EXISTS "Users can insert own data" ON users;

  -- Family members policies
  DROP POLICY IF EXISTS "Users can view own family members" ON family_members;
  DROP POLICY IF EXISTS "Users can insert own family members" ON family_members;
  DROP POLICY IF EXISTS "Users can update own family members" ON family_members;
  DROP POLICY IF EXISTS "Users can delete own family members" ON family_members;

  -- Communication preferences policies
  DROP POLICY IF EXISTS "Users can view own preferences" ON communication_preferences;
  DROP POLICY IF EXISTS "Users can insert own preferences" ON communication_preferences;
  DROP POLICY IF EXISTS "Users can update own preferences" ON communication_preferences;
END $$;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_preferences ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Family members policies
CREATE POLICY "Users can view own family members"
  ON family_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own family members"
  ON family_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own family members"
  ON family_members FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own family members"
  ON family_members FOR DELETE
  USING (auth.uid() = user_id);

-- Communication preferences policies
CREATE POLICY "Users can view own preferences"
  ON communication_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON communication_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON communication_preferences FOR UPDATE
  USING (auth.uid() = user_id);