-- ===================================================
-- MALAI COTTONS — 8 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Malai Cottons products (if any)
DELETE FROM public.products WHERE category = 'Malai Cottons';

-- Insert Malai Cottons products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-1', 'malai-cottons-saree-01', 'Malai Cottons Saree 01', 'Naini Hanvi Couture', 'Malai Cottons', 3185, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-01-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-img1.webp","alt":"Malai Cottons Saree 01 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-01-img2.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-img2.webp","alt":"Malai Cottons Saree 01 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-01-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-poster.webp","alt":"Malai Cottons Saree 01 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-2', 'malai-cottons-saree-02', 'Malai Cottons Saree 02', 'Naini Hanvi Couture', 'Malai Cottons', 2416, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","alt":"Malai Cottons Saree 02 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","alt":"Malai Cottons Saree 02 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-03-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-03-poster.webp","alt":"Malai Cottons Saree 02 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-3', 'malai-cottons-saree-03', 'Malai Cottons Saree 03', 'Naini Hanvi Couture', 'Malai Cottons', 4653, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-08-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-08-img1.webp","alt":"Malai Cottons Saree 03 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-09-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-09-img1.webp","alt":"Malai Cottons Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-4', 'malai-cottons-saree-04', 'Malai Cottons Saree 04', 'Naini Hanvi Couture', 'Malai Cottons', 2776, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-10-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-10-img1.webp","alt":"Malai Cottons Saree 04 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-11-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-11-img1.webp","alt":"Malai Cottons Saree 04 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-04-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-04-poster.webp","alt":"Malai Cottons Saree 04 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-5', 'malai-cottons-saree-05', 'Malai Cottons Saree 05', 'Naini Hanvi Couture', 'Malai Cottons', 3204, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-12-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-12-img1.webp","alt":"Malai Cottons Saree 05 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-13-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-13-img1.webp","alt":"Malai Cottons Saree 05 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-05-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-05-poster.webp","alt":"Malai Cottons Saree 05 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-6', 'malai-cottons-saree-06', 'Malai Cottons Saree 06', 'Naini Hanvi Couture', 'Malai Cottons', 2488, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","alt":"Malai Cottons Saree 06 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","alt":"Malai Cottons Saree 06 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-02-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-02-poster.webp","alt":"Malai Cottons Saree 06 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-7', 'malai-cottons-saree-07', 'Malai Cottons Saree 07', 'Naini Hanvi Couture', 'Malai Cottons', 2027, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-16-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-16-img1.webp","alt":"Malai Cottons Saree 07 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-17-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-17-img1.webp","alt":"Malai Cottons Saree 07 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-8', 'malai-cottons-saree-08', 'Malai Cottons Saree 08', 'Naini Hanvi Couture', 'Malai Cottons', 3659, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-18-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-18-img1.webp","alt":"Malai Cottons Saree 08 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
