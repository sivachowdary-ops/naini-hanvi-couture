-- ===================================================
-- AJARAKH MODAL SILK — 9 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Ajarakh Modal Silk products (if any)
DELETE FROM public.products WHERE category = 'Ajarakh Modal Silk';

-- Insert Ajarakh Modal Silk products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-16', 'ajarakh-modal-silk-saree-01', 'Ajarakh Modal Silk Saree 01', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 3301, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-01-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-01-img1.webp","alt":"Ajarakh Modal Silk Saree 01 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-02-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-02-img1.webp","alt":"Ajarakh Modal Silk Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-17', 'ajarakh-modal-silk-saree-02', 'Ajarakh Modal Silk Saree 02', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 2736, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-04-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-04-img1.webp","alt":"Ajarakh Modal Silk Saree 02 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-05-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-05-img1.webp","alt":"Ajarakh Modal Silk Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-18', 'ajarakh-modal-silk-saree-03', 'Ajarakh Modal Silk Saree 03', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 4592, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-07-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-07-img1.webp","alt":"Ajarakh Modal Silk Saree 03 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-08-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-08-img1.webp","alt":"Ajarakh Modal Silk Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-19', 'ajarakh-modal-silk-saree-04', 'Ajarakh Modal Silk Saree 04', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 2045, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-09-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-09-img1.webp","alt":"Ajarakh Modal Silk Saree 04 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-10-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-10-img1.webp","alt":"Ajarakh Modal Silk Saree 04 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-20', 'ajarakh-modal-silk-saree-05', 'Ajarakh Modal Silk Saree 05', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 3648, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-12-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-12-img1.webp","alt":"Ajarakh Modal Silk Saree 05 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-13-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-13-img1.webp","alt":"Ajarakh Modal Silk Saree 05 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-21', 'ajarakh-modal-silk-saree-06', 'Ajarakh Modal Silk Saree 06', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 2871, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-15-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-15-img1.webp","alt":"Ajarakh Modal Silk Saree 06 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-16-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-16-img1.webp","alt":"Ajarakh Modal Silk Saree 06 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-22', 'ajarakh-modal-silk-saree-07', 'Ajarakh Modal Silk Saree 07', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 3481, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-18-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-18-img1.webp","alt":"Ajarakh Modal Silk Saree 07 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-19-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-19-img1.webp","alt":"Ajarakh Modal Silk Saree 07 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-23', 'ajarakh-modal-silk-saree-08', 'Ajarakh Modal Silk Saree 08', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 3539, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-20-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-20-img1.webp","alt":"Ajarakh Modal Silk Saree 08 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-21-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-21-img1.webp","alt":"Ajarakh Modal Silk Saree 08 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-24', 'ajarakh-modal-silk-saree-09', 'Ajarakh Modal Silk Saree 09', 'Naini Hanvi Couture', 'Ajarakh Modal Silk', 2000, NULL, true, false,
  NULL, 'Ajarakh Modal Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Ajarakh Modal Silk saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-22-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-22-img1.webp","alt":"Ajarakh Modal Silk Saree 09 - View 1"},{"type":"image","src":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-23-img1.webp","thumbnail":"/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-23-img1.webp","alt":"Ajarakh Modal Silk Saree 09 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
