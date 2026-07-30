-- ===================================================
-- SWAN JAMDANI — 5 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Swan Jamdani products (if any)
DELETE FROM public.products WHERE category = 'Swan Jamdani';

-- Insert Swan Jamdani products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-38', 'swan-jamdani-saree-01', 'Swan Jamdani Saree 01', 'Naini Hanvi Couture', 'Swan Jamdani', 4514, NULL, true, false,
  NULL, 'Swan Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Swan Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-01-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-01-img1.webp","alt":"Swan Jamdani Saree 01 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-02-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-02-img1.webp","alt":"Swan Jamdani Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-39', 'swan-jamdani-saree-02', 'Swan Jamdani Saree 02', 'Naini Hanvi Couture', 'Swan Jamdani', 4543, NULL, true, false,
  NULL, 'Swan Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Swan Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-04-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-04-img1.webp","alt":"Swan Jamdani Saree 02 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-05-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-05-img1.webp","alt":"Swan Jamdani Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-40', 'swan-jamdani-saree-03', 'Swan Jamdani Saree 03', 'Naini Hanvi Couture', 'Swan Jamdani', 3859, NULL, true, false,
  NULL, 'Swan Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Swan Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-06-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-06-img1.webp","alt":"Swan Jamdani Saree 03 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-07-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-07-img1.webp","alt":"Swan Jamdani Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-41', 'swan-jamdani-saree-04', 'Swan Jamdani Saree 04', 'Naini Hanvi Couture', 'Swan Jamdani', 4639, NULL, true, false,
  NULL, 'Swan Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Swan Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-10-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-10-img1.webp","alt":"Swan Jamdani Saree 04 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-11-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-11-img1.webp","alt":"Swan Jamdani Saree 04 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-42', 'swan-jamdani-saree-05', 'Swan Jamdani Saree 05', 'Naini Hanvi Couture', 'Swan Jamdani', 4851, NULL, true, false,
  NULL, 'Swan Jamdani', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Swan Jamdani saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-12-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-12-img1.webp","alt":"Swan Jamdani Saree 05 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-13-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-13-img1.webp","alt":"Swan Jamdani Saree 05 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
