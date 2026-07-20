-- SQL Schema for Naini Hanvi Couture

-- ==========================================
-- 1. PRODUCTS SCHEMA
-- ==========================================

CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT 'Naini Hanvi Couture',
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    mrp NUMERIC,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    is_bestseller BOOLEAN NOT NULL DEFAULT false,
    badge TEXT, -- 'new' | 'bestseller' | null
    fabric TEXT,
    length_width TEXT,
    blouse_detail TEXT,
    description TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    variants JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Clean Up Old Policies for Products if they exist
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated admins full access to products" ON public.products;

-- Create Policies for Products
CREATE POLICY "Allow public read access to products" 
    ON public.products FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated admins full access to products" 
    ON public.products FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);


-- ==========================================
-- 2. ADMIN SECURITY SCHEMA
-- ==========================================

CREATE TABLE IF NOT EXISTS public.admin_security (
    email TEXT PRIMARY KEY,
    failed_password_attempts INT NOT NULL DEFAULT 0,
    failed_mfa_attempts INT NOT NULL DEFAULT 0,
    is_locked BOOLEAN NOT NULL DEFAULT false,
    locked_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Admin Security
ALTER TABLE public.admin_security ENABLE ROW LEVEL SECURITY;

-- Clean Up Old Policies for Admin Security if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read own security setting" ON public.admin_security;

-- Create Policy
CREATE POLICY "Allow authenticated users to read own security setting"
    ON public.admin_security FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'email' = email);


-- ==========================================
-- 3. ORDERS SCHEMA
-- ==========================================

CREATE TABLE IF NOT EXISTS public.orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    address TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    email TEXT,
    notes TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending' | 'Shipped' | 'Cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Clean Up Old Policies for Orders if they exist
DROP POLICY IF EXISTS "Allow anonymous users to insert orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated admins full access to orders" ON public.orders;

-- Create Policies for Orders
-- Storefront needs to insert orders (anon)
CREATE POLICY "Allow anonymous users to insert orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

-- Admins need full access to select/update/delete
CREATE POLICY "Allow authenticated admins full access to orders" 
    ON public.orders FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);


-- ==========================================
-- 4. DATABASE FUNCTIONS (SECURITY DEFINER)
-- ==========================================

CREATE OR REPLACE FUNCTION public.check_login_lock(admin_email TEXT)
RETURNS TABLE (is_locked BOOLEAN, failed_password_attempts INT, failed_mfa_attempts INT) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    -- Ensure entry exists
    INSERT INTO public.admin_security (email)
    VALUES (admin_email)
    ON CONFLICT (email) DO NOTHING;
    
    RETURN QUERY 
    SELECT s.is_locked, s.failed_password_attempts, s.failed_mfa_attempts 
    FROM public.admin_security s 
    WHERE s.email = admin_email;
END;
$$;

CREATE OR REPLACE FUNCTION public.record_login_attempt(
    admin_email TEXT, 
    is_success BOOLEAN, 
    is_mfa BOOLEAN
)
RETURNS TABLE (is_locked BOOLEAN, current_failed_pw INT, current_failed_mfa INT) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_failed_pw INT;
    v_failed_mfa INT;
    v_locked BOOLEAN;
BEGIN
    -- Ensure entry exists
    INSERT INTO public.admin_security (email)
    VALUES (admin_email)
    ON CONFLICT (email) DO NOTHING;

    SELECT s.failed_password_attempts, s.failed_mfa_attempts, s.is_locked
    INTO v_failed_pw, v_failed_mfa, v_locked
    FROM public.admin_security s
    WHERE s.email = admin_email;

    IF v_locked THEN
        RETURN QUERY SELECT true, v_failed_pw, v_failed_mfa;
        RETURN;
    END IF;

    IF is_success THEN
        -- Reset only the relevant stage
        IF is_mfa THEN
            UPDATE public.admin_security 
            SET failed_mfa_attempts = 0, updated_at = now()
            WHERE email = admin_email;
            v_failed_mfa := 0;
        ELSE
            UPDATE public.admin_security 
            SET failed_password_attempts = 0, updated_at = now()
            WHERE email = admin_email;
            v_failed_pw := 0;
        END IF;
    ELSE
        -- Increment the relevant failure counter
        IF is_mfa THEN
            v_failed_mfa := v_failed_mfa + 1;
            IF v_failed_mfa >= 3 THEN
                v_locked := true;
            END IF;
            
            UPDATE public.admin_security 
            SET failed_mfa_attempts = v_failed_mfa, 
                is_locked = v_locked,
                locked_at = CASE WHEN v_locked THEN now() ELSE locked_at END,
                updated_at = now()
            WHERE email = admin_email;
        ELSE
            v_failed_pw := v_failed_pw + 1;
            IF v_failed_pw >= 4 THEN
                v_locked := true;
            END IF;
            
            UPDATE public.admin_security 
            SET failed_password_attempts = v_failed_pw, 
                is_locked = v_locked,
                locked_at = CASE WHEN v_locked THEN now() ELSE locked_at END,
                updated_at = now()
            WHERE email = admin_email;
        END IF;
    END IF;

    RETURN QUERY SELECT v_locked, v_failed_pw, v_failed_mfa;
END;
$$;

CREATE OR REPLACE FUNCTION public.reset_admin_lock(admin_email TEXT)
RETURNS VOID 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE public.admin_security
    SET failed_password_attempts = 0,
        failed_mfa_attempts = 0,
        is_locked = false,
        locked_at = NULL,
        updated_at = now()
    WHERE email = admin_email;
END;
$$;


-- ==========================================
-- 5. SEED DATA
-- ==========================================

INSERT INTO public.products (id, slug, name, brand, category, price, mrp, in_stock, is_bestseller, badge, fabric, length_width, blouse_detail, description, gallery, variants, tags)
VALUES 
(
    'prod-1', 
    'elegant-maroon-saree', 
    'Elegant Maroon Saree', 
    'Naini Hanvi Couture', 
    'New Arrivals', 
    4500, 
    5500, 
    true, 
    true, 
    'new', 
    'Silk Blend', 
    '5.5 meters, 1.1 meters width', 
    'Unstitched blouse piece included (0.8m)', 
    'A beautiful elegant maroon saree perfect for weddings and festive occasions. The fabric is lightweight and has a rich drape.',
    '[{"type": "image", "src": "/assets/saree-1.webp", "thumbnail": "/assets/saree-1.webp", "alt": "Elegant Maroon Saree Front"}, {"type": "image", "src": "/assets/saree-1-img2.webp", "thumbnail": "/assets/saree-1-img2.webp", "alt": "Elegant Maroon Saree Detail"}, {"type": "video", "src": "/assets/saree1-video.mp4", "thumbnail": "/assets/saree1-video-thumb.webp", "alt": "Elegant Maroon Saree Video Demo"}]'::jsonb,
    '[]'::jsonb,
    '{"new", "bestseller"}'
)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, price = EXCLUDED.price, mrp = EXCLUDED.mrp, gallery = EXCLUDED.gallery;

INSERT INTO public.products (id, slug, name, brand, category, price, mrp, in_stock, is_bestseller, badge, fabric, length_width, blouse_detail, description, gallery, variants, tags)
VALUES 
(
    'prod-2', 
    'classic-gold-saree', 
    'Classic Gold Saree', 
    'Naini Hanvi Couture', 
    'Party Wear', 
    6200, 
    NULL, 
    true, 
    false, 
    NULL, 
    'Kanchipuram Silk', 
    '5.5 meters, 1.1 meters width', 
    'Unstitched blouse piece included (0.8m)', 
    'Shine in this classic gold saree, perfect for evening parties and special celebrations. Features intricate golden zari work throughout.',
    '[{"type": "image", "src": "/assets/saree-2.webp", "thumbnail": "/assets/saree-2.webp", "alt": "Classic Gold Saree"}, {"type": "image", "src": "/assets/saree-2-img2.webp", "thumbnail": "/assets/saree-2-img2.webp", "alt": "Classic Gold Saree Draped"}, {"type": "video", "src": "/assets/saree2-vid.mp4", "thumbnail": "/assets/saree2-vid-thumb.webp", "alt": "Classic Gold Saree Video"}]'::jsonb,
    '[]'::jsonb,
    '{}'
)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, price = EXCLUDED.price, mrp = EXCLUDED.mrp, gallery = EXCLUDED.gallery;
