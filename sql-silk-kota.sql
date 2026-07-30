-- ===================================================
-- SILK KOTA — 4 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Silk Kota products (if any)
DELETE FROM public.products WHERE category = 'Silk Kota';

-- Insert Silk Kota products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-12', 'silk-kota-saree-01', 'Silk Kota Saree 01', 'Naini Hanvi Couture', 'Silk Kota', 4412, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-29-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-29-img1.webp","alt":"Silk Kota Saree 01 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-30-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-30-img1.webp","alt":"Silk Kota Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-13', 'silk-kota-saree-02', 'Silk Kota Saree 02', 'Naini Hanvi Couture', 'Silk Kota', 4481, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-32-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-32-img1.webp","alt":"Silk Kota Saree 02 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-33-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-33-img1.webp","alt":"Silk Kota Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-14', 'silk-kota-saree-03', 'Silk Kota Saree 03', 'Naini Hanvi Couture', 'Silk Kota', 2007, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-35-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-35-img1.webp","alt":"Silk Kota Saree 03 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-35-img2.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-35-img2.webp","alt":"Silk Kota Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-15', 'silk-kota-saree-04', 'Silk Kota Saree 04', 'Naini Hanvi Couture', 'Silk Kota', 2539, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-38-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-38-img1.webp","alt":"Silk Kota Saree 04 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-39-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-39-img1.webp","alt":"Silk Kota Saree 04 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
