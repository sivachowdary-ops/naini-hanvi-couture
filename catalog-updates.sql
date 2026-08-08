-- =========================================================================
-- NAINI HANVI COUTURE - CUSTOM CATALOG UPDATES (SQL Migrations)
-- Run this in your Supabase SQL Editor to apply these specific updates.
-- =========================================================================

-- ─── 1. REMOVE DUPLICATE MALAI COTTON SAREE 08 ───────────────────────────
DELETE FROM public.products WHERE slug = 'malai-cottons-saree-08';

-- ─── 2. FIX MALAI COTTON SAREE VIDEOS ────────────────────────────────────
-- Update Malai Cottons Saree 02 video to the correct one (malai-cottons-saree-02-video.mp4)
UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","alt":"Malai Cottons Saree 02 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","alt":"Malai Cottons Saree 02 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-02-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-02-poster.webp","alt":"Malai Cottons Saree 02 - Video"}]'::jsonb
WHERE slug = 'malai-cottons-saree-02';

-- Remove incorrect video from Malai Cottons Saree 06 (keeping only images)
UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","alt":"Malai Cottons Saree 06 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","alt":"Malai Cottons Saree 06 - View 2"}]'::jsonb
WHERE slug = 'malai-cottons-saree-06';

-- ─── 3. ADD NEW CATEGORIES (MATKA SILK & POCKET SEQUINS MULBERRY) ────────
-- Clean up existing records of these specific new slugs first if any exist
DELETE FROM public.products WHERE slug IN (
  'matka-silk-saree-01',
  'matka-silk-saree-02',
  'pocket-sequins-mulberry-saree-01',
  'pocket-sequins-mulberry-saree-02'
);

INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
(
  'prod-50', 'matka-silk-saree-01', 'Matka Silk Saree 01', 'Naini Hanvi Couture', 'Matka Silk', 3250, NULL, true, false,
  NULL, 'Matka Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A premium Matka Silk saree featuring rich woven texture with traditional motifs and a contrasting border. Exquisite handloom quality from Naini Hanvi Couture.', '[{"type":"image","src":"/catalog/matka-silk/matka-silk-saree-01-img1.webp","thumbnail":"/catalog/matka-silk/matka-silk-saree-01-img1.webp","alt":"Matka Silk Saree 01 - View 1"},{"type":"image","src":"/catalog/matka-silk/matka-silk-saree-01-img2.webp","thumbnail":"/catalog/matka-silk/matka-silk-saree-01-img2.webp","alt":"Matka Silk Saree 01 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-51', 'matka-silk-saree-02', 'Matka Silk Saree 02', 'Naini Hanvi Couture', 'Matka Silk', 3450, NULL, true, false,
  NULL, 'Matka Silk', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'An elegant Matka Silk saree featuring a beautifully textured body and intricate borders. Lightweight, comfortable, and perfect for ethnic occasions.', '[{"type":"image","src":"/catalog/matka-silk/matka-silk-saree-02-img1.webp","thumbnail":"/catalog/matka-silk/matka-silk-saree-02-img1.webp","alt":"Matka Silk Saree 02 - View 1"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-52', 'pocket-sequins-mulberry-saree-01', 'Pocket Sequins Mulberry Saree 01', 'Naini Hanvi Couture', 'Pocket Sequins Mulberry', 4250, NULL, true, false,
  NULL, 'Pocket Sequins Mulberry', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'A stunning yellow Pocket Sequins Mulberry saree with delicate sequin embellishments. Offers a beautiful drape and contemporary appeal.', '[{"type":"image","src":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-01-img1.webp","thumbnail":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-01-img1.webp","alt":"Pocket Sequins Mulberry Saree 01 - View 1"},{"type":"image","src":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-01-img2.webp","thumbnail":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-01-img2.webp","alt":"Pocket Sequins Mulberry Saree 01 - View 2"},{"type":"image","src":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-01-img3.webp","thumbnail":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-01-img3.webp","alt":"Pocket Sequins Mulberry Saree 01 - View 3"}]'::jsonb, '[]'::jsonb, '{}'::text[]
),
(
  'prod-53', 'pocket-sequins-mulberry-saree-02', 'Pocket Sequins Mulberry Saree 02', 'Naini Hanvi Couture', 'Pocket Sequins Mulberry', 4500, NULL, true, false,
  NULL, 'Pocket Sequins Mulberry', '5.5 meters, 1.1 meters width', 'Unstitched blouse piece included (0.8m)', 'An attractive green Pocket Sequins Mulberry saree adorned with shimmering sequins in neat lines. Ideal for evening wear and special celebrations.', '[{"type":"image","src":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-02-img1.webp","thumbnail":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-02-img1.webp","alt":"Pocket Sequins Mulberry Saree 02 - View 1"},{"type":"image","src":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-02-img2.webp","thumbnail":"/catalog/pocket-sequins-mulberry/pocket-sequins-mulberry-saree-02-img2.webp","alt":"Pocket Sequins Mulberry Saree 02 - View 2"}]'::jsonb, '[]'::jsonb, '{}'::text[]
);
