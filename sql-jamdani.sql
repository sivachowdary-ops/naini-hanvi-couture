-- ===================================================
-- JAMDANI — 6 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Jamdani products (if any)
DELETE FROM public.products WHERE category = 'Jamdani';

-- Insert Jamdani products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-25', 'jamdani-saree-01', 'Jamdani Saree 01', 'Naini Hanvi Couture', 'Jamdani', 2795, NULL, true, false,
  NULL, 'Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/jamdani/jamdani-saree-01-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-01-img1.webp","alt":"Jamdani Saree 01 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-02-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-02-img1.webp","alt":"Jamdani Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-26', 'jamdani-saree-02', 'Jamdani Saree 02', 'Naini Hanvi Couture', 'Jamdani', 4446, NULL, true, false,
  NULL, 'Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/jamdani/jamdani-saree-04-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-04-img1.webp","alt":"Jamdani Saree 02 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-05-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-05-img1.webp","alt":"Jamdani Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-27', 'jamdani-saree-03', 'Jamdani Saree 03', 'Naini Hanvi Couture', 'Jamdani', 4373, NULL, true, false,
  NULL, 'Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/jamdani/jamdani-saree-07-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-07-img1.webp","alt":"Jamdani Saree 03 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-08-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-08-img1.webp","alt":"Jamdani Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-28', 'jamdani-saree-04', 'Jamdani Saree 04', 'Naini Hanvi Couture', 'Jamdani', 4751, NULL, true, false,
  NULL, 'Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/jamdani/jamdani-saree-09-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-09-img1.webp","alt":"Jamdani Saree 04 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-10-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-10-img1.webp","alt":"Jamdani Saree 04 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-29', 'jamdani-saree-05', 'Jamdani Saree 05', 'Naini Hanvi Couture', 'Jamdani', 3833, NULL, true, false,
  NULL, 'Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/jamdani/jamdani-saree-11-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-11-img1.webp","alt":"Jamdani Saree 05 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-11-img2.webp","thumbnail":"/catalog/jamdani/jamdani-saree-11-img2.webp","alt":"Jamdani Saree 05 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-30', 'jamdani-saree-06', 'Jamdani Saree 06', 'Naini Hanvi Couture', 'Jamdani', 2548, NULL, true, false,
  NULL, 'Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/jamdani/jamdani-saree-12-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-12-img1.webp","alt":"Jamdani Saree 06 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-12-img2.webp","thumbnail":"/catalog/jamdani/jamdani-saree-12-img2.webp","alt":"Jamdani Saree 06 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
