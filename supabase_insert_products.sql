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
),
(
  'prod-9', 'muslin-sequence-saree-01', 'Muslin Sequence Saree 01', 'Naini Hanvi Couture', 'Muslin Sequence', 2283, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp","alt":"Muslin Sequence Saree 01 - View 1"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp","alt":"Muslin Sequence Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-10', 'muslin-sequence-saree-02', 'Muslin Sequence Saree 02', 'Naini Hanvi Couture', 'Muslin Sequence', 3814, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp","alt":"Muslin Sequence Saree 02 - View 1"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp","alt":"Muslin Sequence Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-11', 'muslin-sequence-saree-03', 'Muslin Sequence Saree 03', 'Naini Hanvi Couture', 'Muslin Sequence', 2140, NULL, true, false,
  NULL, 'Muslin Sequence', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A beautiful Muslin Sequence saree from Naini Hanvi Couture''s curated collection. Perfect for both casual and festive occasions.', '[{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp","alt":"Muslin Sequence Saree 03 - View 1"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp","alt":"Muslin Sequence Saree 03 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
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
),
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
),
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
),
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
),
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
