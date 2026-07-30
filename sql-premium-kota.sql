-- ===================================================
-- PREMIUM KOTA — 7 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Premium Kota products (if any)
DELETE FROM public.products WHERE category = 'Premium Kota';

-- Insert Premium Kota products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-31', 'premium-kota-saree-01', 'Premium Kota Saree 01', 'Naini Hanvi Couture', 'Premium Kota', 2804, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-01-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-01-img1.webp","alt":"Premium Kota Saree 01 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-02-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-02-img1.webp","alt":"Premium Kota Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-32', 'premium-kota-saree-02', 'Premium Kota Saree 02', 'Naini Hanvi Couture', 'Premium Kota', 4638, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-03-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-03-img1.webp","alt":"Premium Kota Saree 02 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-04-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-04-img1.webp","alt":"Premium Kota Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-33', 'premium-kota-saree-03', 'Premium Kota Saree 03', 'Naini Hanvi Couture', 'Premium Kota', 4188, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-05-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-05-img1.webp","alt":"Premium Kota Saree 03 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-06-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-06-img1.webp","alt":"Premium Kota Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-34', 'premium-kota-saree-04', 'Premium Kota Saree 04', 'Naini Hanvi Couture', 'Premium Kota', 3963, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-07-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-07-img1.webp","alt":"Premium Kota Saree 04 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-08-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-08-img1.webp","alt":"Premium Kota Saree 04 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-35', 'premium-kota-saree-05', 'Premium Kota Saree 05', 'Naini Hanvi Couture', 'Premium Kota', 4308, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-10-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-10-img1.webp","alt":"Premium Kota Saree 05 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-10-img2.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-10-img2.webp","alt":"Premium Kota Saree 05 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-36', 'premium-kota-saree-06', 'Premium Kota Saree 06', 'Naini Hanvi Couture', 'Premium Kota', 4778, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-12-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-12-img1.webp","alt":"Premium Kota Saree 06 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-13-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-13-img1.webp","alt":"Premium Kota Saree 06 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-37', 'premium-kota-saree-07', 'Premium Kota Saree 07', 'Naini Hanvi Couture', 'Premium Kota', 3026, NULL, true, false,
  NULL, 'Premium Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Premium Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-15-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-15-img1.webp","alt":"Premium Kota Saree 07 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-16-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-16-img1.webp","alt":"Premium Kota Saree 07 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
