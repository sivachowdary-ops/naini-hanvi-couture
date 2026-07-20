-- ===================================================
-- NAINI HANVI COUTURE - CATALOG INSERT STATEMENTS
-- Copy and run this script in your Supabase SQL Editor
-- ===================================================

-- Clean up old products first
DELETE FROM public.products;

-- Insert new products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-1', 'malai-cottons-saree-01', 'Malai Cottons Saree 01', 'Naini Hanvi Couture', 'Malai Cottons', 3185, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-01-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-img1.webp","alt":"Malai Cottons Saree 01 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-01-img2.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-img2.webp","alt":"Malai Cottons Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-2', 'malai-cottons-saree-02', 'Malai Cottons Saree 02', 'Naini Hanvi Couture', 'Malai Cottons', 2043, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-02-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-02-img1.webp","alt":"Malai Cottons Saree 02 - View 1"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-02-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-02-poster.webp","alt":"Malai Cottons Saree 02 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-3', 'malai-cottons-saree-03', 'Malai Cottons Saree 03', 'Naini Hanvi Couture', 'Malai Cottons', 3781, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-03-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-03-img1.webp","alt":"Malai Cottons Saree 03 - View 1"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-03-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-03-poster.webp","alt":"Malai Cottons Saree 03 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-4', 'malai-cottons-saree-04', 'Malai Cottons Saree 04', 'Naini Hanvi Couture', 'Malai Cottons', 2074, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-04-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-04-img1.webp","alt":"Malai Cottons Saree 04 - View 1"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-04-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-04-poster.webp","alt":"Malai Cottons Saree 04 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-5', 'malai-cottons-saree-05', 'Malai Cottons Saree 05', 'Naini Hanvi Couture', 'Malai Cottons', 4526, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-05-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-05-img1.webp","alt":"Malai Cottons Saree 05 - View 1"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-05-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-05-poster.webp","alt":"Malai Cottons Saree 05 - Video"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-6', 'malai-cottons-saree-06', 'Malai Cottons Saree 06', 'Naini Hanvi Couture', 'Malai Cottons', 2416, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","alt":"Malai Cottons Saree 06 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-7', 'malai-cottons-saree-07', 'Malai Cottons Saree 07', 'Naini Hanvi Couture', 'Malai Cottons', 2122, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","alt":"Malai Cottons Saree 07 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-8', 'malai-cottons-saree-08', 'Malai Cottons Saree 08', 'Naini Hanvi Couture', 'Malai Cottons', 4653, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-08-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-08-img1.webp","alt":"Malai Cottons Saree 08 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-9', 'malai-cottons-saree-09', 'Malai Cottons Saree 09', 'Naini Hanvi Couture', 'Malai Cottons', 3974, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-09-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-09-img1.webp","alt":"Malai Cottons Saree 09 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-10', 'malai-cottons-saree-10', 'Malai Cottons Saree 10', 'Naini Hanvi Couture', 'Malai Cottons', 2776, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-10-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-10-img1.webp","alt":"Malai Cottons Saree 10 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-11', 'malai-cottons-saree-11', 'Malai Cottons Saree 11', 'Naini Hanvi Couture', 'Malai Cottons', 4115, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-11-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-11-img1.webp","alt":"Malai Cottons Saree 11 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-12', 'malai-cottons-saree-12', 'Malai Cottons Saree 12', 'Naini Hanvi Couture', 'Malai Cottons', 3204, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-12-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-12-img1.webp","alt":"Malai Cottons Saree 12 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-13', 'malai-cottons-saree-13', 'Malai Cottons Saree 13', 'Naini Hanvi Couture', 'Malai Cottons', 3640, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-13-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-13-img1.webp","alt":"Malai Cottons Saree 13 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-14', 'malai-cottons-saree-14', 'Malai Cottons Saree 14', 'Naini Hanvi Couture', 'Malai Cottons', 2488, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","alt":"Malai Cottons Saree 14 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-15', 'malai-cottons-saree-15', 'Malai Cottons Saree 15', 'Naini Hanvi Couture', 'Malai Cottons', 2626, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","alt":"Malai Cottons Saree 15 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-16', 'malai-cottons-saree-16', 'Malai Cottons Saree 16', 'Naini Hanvi Couture', 'Malai Cottons', 2027, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-16-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-16-img1.webp","alt":"Malai Cottons Saree 16 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-17', 'malai-cottons-saree-17', 'Malai Cottons Saree 17', 'Naini Hanvi Couture', 'Malai Cottons', 4256, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-17-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-17-img1.webp","alt":"Malai Cottons Saree 17 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-18', 'malai-cottons-saree-18', 'Malai Cottons Saree 18', 'Naini Hanvi Couture', 'Malai Cottons', 3659, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-18-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-18-img1.webp","alt":"Malai Cottons Saree 18 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-19', 'malai-cottons-saree-19', 'Malai Cottons Saree 19', 'Naini Hanvi Couture', 'Malai Cottons', 4531, NULL, true, false,
  NULL, 'Malai Cottons', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Malai Cottons saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-19-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-19-img1.webp","alt":"Malai Cottons Saree 19 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-20', 'muslin-sequence-saree-20', 'Muslin Sequence Saree 20', 'Naini Hanvi Couture', 'Muslin Sequence', 2283, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp","alt":"Muslin Sequence Saree 20 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-21', 'muslin-sequence-saree-21', 'Muslin Sequence Saree 21', 'Naini Hanvi Couture', 'Muslin Sequence', 3572, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp","alt":"Muslin Sequence Saree 21 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-22', 'muslin-sequence-saree-22', 'Muslin Sequence Saree 22', 'Naini Hanvi Couture', 'Muslin Sequence', 4710, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-22-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-22-img1.webp","alt":"Muslin Sequence Saree 22 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-23', 'muslin-sequence-saree-23', 'Muslin Sequence Saree 23', 'Naini Hanvi Couture', 'Muslin Sequence', 3814, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp","alt":"Muslin Sequence Saree 23 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-24', 'muslin-sequence-saree-24', 'Muslin Sequence Saree 24', 'Naini Hanvi Couture', 'Muslin Sequence', 4813, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp","alt":"Muslin Sequence Saree 24 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-25', 'muslin-sequence-saree-25', 'Muslin Sequence Saree 25', 'Naini Hanvi Couture', 'Muslin Sequence', 4514, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-25-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-25-img1.webp","alt":"Muslin Sequence Saree 25 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-26', 'muslin-sequence-saree-26', 'Muslin Sequence Saree 26', 'Naini Hanvi Couture', 'Muslin Sequence', 2140, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp","alt":"Muslin Sequence Saree 26 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-27', 'muslin-sequence-saree-27', 'Muslin Sequence Saree 27', 'Naini Hanvi Couture', 'Muslin Sequence', 2344, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp","alt":"Muslin Sequence Saree 27 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-28', 'muslin-sequence-saree-28', 'Muslin Sequence Saree 28', 'Naini Hanvi Couture', 'Muslin Sequence', 4159, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-28-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-28-img1.webp","alt":"Muslin Sequence Saree 28 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-29', 'silk-kota-saree-29', 'Silk Kota Saree 29', 'Naini Hanvi Couture', 'Silk Kota', 4412, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-29-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-29-img1.webp","alt":"Silk Kota Saree 29 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-30', 'silk-kota-saree-30', 'Silk Kota Saree 30', 'Naini Hanvi Couture', 'Silk Kota', 4106, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-30-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-30-img1.webp","alt":"Silk Kota Saree 30 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-31', 'silk-kota-saree-31', 'Silk Kota Saree 31', 'Naini Hanvi Couture', 'Silk Kota', 4833, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-31-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-31-img1.webp","alt":"Silk Kota Saree 31 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-32', 'silk-kota-saree-32', 'Silk Kota Saree 32', 'Naini Hanvi Couture', 'Silk Kota', 4481, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-32-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-32-img1.webp","alt":"Silk Kota Saree 32 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-33', 'silk-kota-saree-33', 'Silk Kota Saree 33', 'Naini Hanvi Couture', 'Silk Kota', 3293, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-33-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-33-img1.webp","alt":"Silk Kota Saree 33 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-34', 'silk-kota-saree-34', 'Silk Kota Saree 34', 'Naini Hanvi Couture', 'Silk Kota', 4995, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-34-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-34-img1.webp","alt":"Silk Kota Saree 34 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-35', 'silk-kota-saree-35', 'Silk Kota Saree 35', 'Naini Hanvi Couture', 'Silk Kota', 2007, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-35-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-35-img1.webp","alt":"Silk Kota Saree 35 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-35-img2.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-35-img2.webp","alt":"Silk Kota Saree 35 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-36', 'silk-kota-saree-36', 'Silk Kota Saree 36', 'Naini Hanvi Couture', 'Silk Kota', 2802, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-36-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-36-img1.webp","alt":"Silk Kota Saree 36 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-37', 'silk-kota-saree-37', 'Silk Kota Saree 37', 'Naini Hanvi Couture', 'Silk Kota', 2173, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-37-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-37-img1.webp","alt":"Silk Kota Saree 37 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-38', 'silk-kota-saree-38', 'Silk Kota Saree 38', 'Naini Hanvi Couture', 'Silk Kota', 2539, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-38-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-38-img1.webp","alt":"Silk Kota Saree 38 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-39', 'silk-kota-saree-39', 'Silk Kota Saree 39', 'Naini Hanvi Couture', 'Silk Kota', 3074, NULL, true, false,
  NULL, 'Silk Kota', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Silk Kota saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-39-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-39-img1.webp","alt":"Silk Kota Saree 39 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
