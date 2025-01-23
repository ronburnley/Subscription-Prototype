/*
  # Account Management Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to Supabase auth user id
      - `email` (text) - User's email address
      - `phone` (text) - Phone number
      - `mfa_enabled` (boolean) - MFA status
      - `street` (text) - Street address
      - `city` (text) - City
      - `state` (text) - State
      - `zip_code` (text) - ZIP code
      - `rideshare_company` (text) - Selected rideshare company
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `family_members`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Reference to users table
      - `first_name` (text)
      - `last_name` (text)
      - `relationship` (text)
      - `created_at` (timestamp)
    
    - `communication_preferences`
      - `user_id` (uuid, primary key) - Reference to users table
      - `email` (boolean)
      - `sms` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text NOT NULL,
  phone text,
  mfa_enabled boolean DEFAULT false,
  street text,
  city text,
  state text,
  zip_code text,
  rideshare_company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT users_auth_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Family members table
CREATE TABLE family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  relationship text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Communication preferences table
CREATE TABLE communication_preferences (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email boolean DEFAULT true,
  sms boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Policies for family members
CREATE POLICY "Users can view own family members" ON family_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own family members" ON family_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own family members" ON family_members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own family members" ON family_members
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for communication preferences
CREATE POLICY "Users can view own preferences" ON communication_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own preferences" ON communication_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON communication_preferences
  FOR UPDATE USING (auth.uid() = user_id);