-- ===================================================
-- SQL HELPERS: Temporary Seeding Perms / RLS Toggles
-- Run these commands in your Supabase SQL Editor
-- ===================================================

-- OPTION A: Temporarily Disable RLS (EASIEST)
-- Run this BEFORE running the seeding script:
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Run this AFTER running the seeding script:
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;


-- ---------------------------------------------------

-- OPTION B: Create Temporary Anon Write Policy
-- Run this to allow seeding with the Anon key:
CREATE POLICY "Temp seeding access" ON public.products
    FOR ALL TO anon USING (true) WITH CHECK (true);

-- Run this to remove the policy after seeding is done:
DROP POLICY IF EXISTS "Temp seeding access" ON public.products;
