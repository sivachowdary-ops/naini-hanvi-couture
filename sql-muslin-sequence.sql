-- ===================================================
-- MUSLIN SEQUENCE — 3 PRODUCTS
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Remove existing Muslin Sequence products (if any)
DELETE FROM public.products WHERE category = 'Muslin Sequence';

-- Insert Muslin Sequence products
INSERT INTO public.products (
  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,
  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags
) VALUES 
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
);
