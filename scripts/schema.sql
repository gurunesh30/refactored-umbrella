


  -- 1. Upgrade Organizations for Stripe and Routing
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';

-- 2. Upgrade Profiles to link to the Organization "Umbrella"
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member'));

-- 3. Create an Invitations table (The "Growth" Engine)
-- This allows users to invite team members without them being in Auth yet.
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  inviter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
);

-- ============================================================
-- 4. RLS SETUP
-- ============================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. HELPER FUNCTIONS (SECURITY DEFINER = bypasses RLS)
-- ============================================================

-- Returns the current user's organization_id without triggering RLS
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM profiles WHERE id = auth.uid();
$$;

-- RPC function to create an org + assign the user as owner.
-- This runs as the DB owner so RLS cannot block it.
CREATE OR REPLACE FUNCTION create_organization(
  org_name TEXT,
  org_slug TEXT
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_org_id uuid;
BEGIN
  -- Create the organization
  INSERT INTO organizations (name, slug, plan_type, subscription_status)
  VALUES (org_name, org_slug, 'free', 'inactive')
  RETURNING id INTO new_org_id;

  -- Link the calling user to it as owner
  UPDATE profiles
  SET organization_id = new_org_id, role = 'owner'
  WHERE id = auth.uid();

  RETURN new_org_id;
END;
$$;

-- ============================================================
-- 6. DROP ALL OLD POLICIES (full cleanup)
-- ============================================================
-- Organizations
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view their organization" ON organizations;
DROP POLICY IF EXISTS "Owners can update their organization" ON organizations;
DROP POLICY IF EXISTS "Allow individual insert for authenticated users" ON organizations;
DROP POLICY IF EXISTS "Users can view their own organization" ON organizations;

-- Profiles
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Invitations
DROP POLICY IF EXISTS "Admins can create invitations" ON invitations;
DROP POLICY IF EXISTS "Users can view invitations for their organization" ON invitations;
DROP POLICY IF EXISTS "Admins can delete invitations" ON invitations;

-- ============================================================
-- 7. CREATE FRESH POLICIES
-- ============================================================

-- ORGANIZATIONS: users only need SELECT/UPDATE (INSERT handled by RPC)
CREATE POLICY "Users can view their organization" ON organizations
  FOR SELECT USING (id = get_user_org_id());

CREATE POLICY "Owners can update their organization" ON organizations
  FOR UPDATE USING (id = get_user_org_id());

-- PROFILES
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can view profiles in their organization" ON profiles
  FOR SELECT USING (organization_id = get_user_org_id());

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- INVITATIONS
CREATE POLICY "Admins can create invitations" ON invitations
  FOR INSERT WITH CHECK (organization_id = get_user_org_id());

CREATE POLICY "Users can view invitations for their organization" ON invitations
  FOR SELECT USING (organization_id = get_user_org_id());

CREATE POLICY "Admins can delete invitations" ON invitations
  FOR DELETE USING (organization_id = get_user_org_id());