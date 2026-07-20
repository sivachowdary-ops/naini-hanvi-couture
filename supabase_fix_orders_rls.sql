-- ==========================================
-- FIX: Orders Table RLS Policies & Grants
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Drop existing orders policies
DROP POLICY IF EXISTS "Allow anonymous users to insert orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated admins full access to orders" ON public.orders;

-- 2. Grant table-level permissions explicitly
-- The anon role (used by the storefront/checkout page) needs INSERT permission
GRANT INSERT ON public.orders TO anon;

-- The authenticated role (admin dashboard) needs full access
GRANT ALL ON public.orders TO authenticated;

-- Grant sequence usage so auto-increment ID works for anon inserts
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 3. Recreate RLS policies with explicit role targeting

-- Anon users (storefront checkout) can INSERT orders
CREATE POLICY "Allow anon to insert orders"
    ON public.orders
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Authenticated users (admin) get full read/write/update/delete
CREATE POLICY "Allow authenticated full access to orders"
    ON public.orders
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Verify: Check that RLS is enabled (should already be)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
