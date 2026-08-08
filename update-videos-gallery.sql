-- ==========================================
-- SQL to update products gallery with videos
-- Run this in your Supabase SQL Editor
-- ==========================================

UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-01-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-img1.webp","alt":"Malai Cottons Saree 01 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-01-img2.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-img2.webp","alt":"Malai Cottons Saree 01 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-01-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-01-poster.webp","alt":"Malai Cottons Saree 01 - Video"}]'::jsonb 
WHERE slug = 'malai-cottons-saree-01';

UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-06-img1.webp","alt":"Malai Cottons Saree 02 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-07-img1.webp","alt":"Malai Cottons Saree 02 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-03-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-03-poster.webp","alt":"Malai Cottons Saree 02 - Video"}]'::jsonb 
WHERE slug = 'malai-cottons-saree-02';

UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-10-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-10-img1.webp","alt":"Malai Cottons Saree 04 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-11-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-11-img1.webp","alt":"Malai Cottons Saree 04 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-04-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-04-poster.webp","alt":"Malai Cottons Saree 04 - Video"}]'::jsonb 
WHERE slug = 'malai-cottons-saree-04';

UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-12-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-12-img1.webp","alt":"Malai Cottons Saree 05 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-13-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-13-img1.webp","alt":"Malai Cottons Saree 05 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-05-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-05-poster.webp","alt":"Malai Cottons Saree 05 - Video"}]'::jsonb 
WHERE slug = 'malai-cottons-saree-05';

UPDATE public.products 
SET gallery = '[{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-14-img1.webp","alt":"Malai Cottons Saree 06 - View 1"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-15-img1.webp","alt":"Malai Cottons Saree 06 - View 2"},{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-02-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-02-poster.webp","alt":"Malai Cottons Saree 06 - Video"}]'::jsonb 
WHERE slug = 'malai-cottons-saree-06';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/malai-cottons/malai-cottons-saree-04-video.mp4","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-04-poster.webp","alt":"Malai Cottons Saree 08 - Video"},{"type":"image","src":"/catalog/malai-cottons/malai-cottons-saree-18-img1.webp","thumbnail":"/catalog/malai-cottons/malai-cottons-saree-18-img1.webp","alt":"Malai Cottons Saree 08 - View 1"}]'::jsonb 
WHERE slug = 'malai-cottons-saree-08';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/muslin-sequence/muslin-sequence-saree-01-video.mp4","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-01-poster.webp","alt":"Muslin Sequence Saree 01 - Video"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp","alt":"Muslin Sequence Saree 01 - View 1"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-21-img1.webp","alt":"Muslin Sequence Saree 01 - View 2"}]'::jsonb 
WHERE slug = 'muslin-sequence-saree-01';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/muslin-sequence/muslin-sequence-saree-02-video.mp4","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-02-poster.webp","alt":"Muslin Sequence Saree 02 - Video"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-23-img1.webp","alt":"Muslin Sequence Saree 02 - View 1"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-24-img1.webp","alt":"Muslin Sequence Saree 02 - View 2"}]'::jsonb 
WHERE slug = 'muslin-sequence-saree-02';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/muslin-sequence/muslin-sequence-saree-03-video.mp4","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-03-poster.webp","alt":"Muslin Sequence Saree 03 - Video"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-26-img1.webp","alt":"Muslin Sequence Saree 03 - View 1"},{"type":"image","src":"/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp","thumbnail":"/catalog/muslin-sequence/muslin-sequence-saree-27-img1.webp","alt":"Muslin Sequence Saree 03 - View 2"}]'::jsonb 
WHERE slug = 'muslin-sequence-saree-03';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/silk-kota/silk-kota-saree-01-video.mp4","thumbnail":"/catalog/silk-kota/silk-kota-saree-01-poster.webp","alt":"Silk Kota Saree 01 - Video"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-29-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-29-img1.webp","alt":"Silk Kota Saree 01 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-30-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-30-img1.webp","alt":"Silk Kota Saree 01 - View 2"}]'::jsonb 
WHERE slug = 'silk-kota-saree-01';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/silk-kota/silk-kota-saree-02-video.mp4","thumbnail":"/catalog/silk-kota/silk-kota-saree-02-poster.webp","alt":"Silk Kota Saree 02 - Video"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-32-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-32-img1.webp","alt":"Silk Kota Saree 02 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-33-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-33-img1.webp","alt":"Silk Kota Saree 02 - View 2"}]'::jsonb 
WHERE slug = 'silk-kota-saree-02';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/silk-kota/silk-kota-saree-03-video.mp4","thumbnail":"/catalog/silk-kota/silk-kota-saree-03-poster.webp","alt":"Silk Kota Saree 03 - Video"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-35-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-35-img1.webp","alt":"Silk Kota Saree 03 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-35-img2.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-35-img2.webp","alt":"Silk Kota Saree 03 - View 2"}]'::jsonb 
WHERE slug = 'silk-kota-saree-03';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/silk-kota/silk-kota-saree-04-video.mp4","thumbnail":"/catalog/silk-kota/silk-kota-saree-04-poster.webp","alt":"Silk Kota Saree 04 - Video"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-38-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-38-img1.webp","alt":"Silk Kota Saree 04 - View 1"},{"type":"image","src":"/catalog/silk-kota/silk-kota-saree-39-img1.webp","thumbnail":"/catalog/silk-kota/silk-kota-saree-39-img1.webp","alt":"Silk Kota Saree 04 - View 2"}]'::jsonb 
WHERE slug = 'silk-kota-saree-04';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/jamdani/jamdani-saree-05-video.mp4","thumbnail":"/catalog/jamdani/jamdani-saree-05-poster.webp","alt":"Jamdani Saree 05 - Video"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-11-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-11-img1.webp","alt":"Jamdani Saree 05 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-11-img2.webp","thumbnail":"/catalog/jamdani/jamdani-saree-11-img2.webp","alt":"Jamdani Saree 05 - View 2"}]'::jsonb 
WHERE slug = 'jamdani-saree-05';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/jamdani/jamdani-saree-06-video.mp4","thumbnail":"/catalog/jamdani/jamdani-saree-06-poster.webp","alt":"Jamdani Saree 06 - Video"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-12-img1.webp","thumbnail":"/catalog/jamdani/jamdani-saree-12-img1.webp","alt":"Jamdani Saree 06 - View 1"},{"type":"image","src":"/catalog/jamdani/jamdani-saree-12-img2.webp","thumbnail":"/catalog/jamdani/jamdani-saree-12-img2.webp","alt":"Jamdani Saree 06 - View 2"}]'::jsonb 
WHERE slug = 'jamdani-saree-06';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/premium-kota/premium-kota-saree-01-video.mp4","thumbnail":"/catalog/premium-kota/premium-kota-saree-01-poster.webp","alt":"Premium Kota Saree 01 - Video"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-01-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-01-img1.webp","alt":"Premium Kota Saree 01 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-02-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-02-img1.webp","alt":"Premium Kota Saree 01 - View 2"}]'::jsonb 
WHERE slug = 'premium-kota-saree-01';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/premium-kota/premium-kota-saree-02-video.mp4","thumbnail":"/catalog/premium-kota/premium-kota-saree-02-poster.webp","alt":"Premium Kota Saree 02 - Video"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-03-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-03-img1.webp","alt":"Premium Kota Saree 02 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-04-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-04-img1.webp","alt":"Premium Kota Saree 02 - View 2"}]'::jsonb 
WHERE slug = 'premium-kota-saree-02';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/premium-kota/premium-kota-saree-04-video.mp4","thumbnail":"/catalog/premium-kota/premium-kota-saree-04-poster.webp","alt":"Premium Kota Saree 04 - Video"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-07-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-07-img1.webp","alt":"Premium Kota Saree 04 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-08-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-08-img1.webp","alt":"Premium Kota Saree 04 - View 2"}]'::jsonb 
WHERE slug = 'premium-kota-saree-04';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/premium-kota/premium-kota-saree-05-video.mp4","thumbnail":"/catalog/premium-kota/premium-kota-saree-05-poster.webp","alt":"Premium Kota Saree 05 - Video"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-10-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-10-img1.webp","alt":"Premium Kota Saree 05 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-10-img2.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-10-img2.webp","alt":"Premium Kota Saree 05 - View 2"}]'::jsonb 
WHERE slug = 'premium-kota-saree-05';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/premium-kota/premium-kota-saree-06-video.mp4","thumbnail":"/catalog/premium-kota/premium-kota-saree-06-poster.webp","alt":"Premium Kota Saree 06 - Video"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-12-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-12-img1.webp","alt":"Premium Kota Saree 06 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-13-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-13-img1.webp","alt":"Premium Kota Saree 06 - View 2"}]'::jsonb 
WHERE slug = 'premium-kota-saree-06';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/premium-kota/premium-kota-saree-07-video.mp4","thumbnail":"/catalog/premium-kota/premium-kota-saree-07-poster.webp","alt":"Premium Kota Saree 07 - Video"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-15-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-15-img1.webp","alt":"Premium Kota Saree 07 - View 1"},{"type":"image","src":"/catalog/premium-kota/premium-kota-saree-16-img1.webp","thumbnail":"/catalog/premium-kota/premium-kota-saree-16-img1.webp","alt":"Premium Kota Saree 07 - View 2"}]'::jsonb 
WHERE slug = 'premium-kota-saree-07';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/swan-jamdani/swan-jamdani-saree-01-video.mp4","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-01-poster.webp","alt":"Swan Jamdani Saree 01 - Video"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-01-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-01-img1.webp","alt":"Swan Jamdani Saree 01 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-02-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-02-img1.webp","alt":"Swan Jamdani Saree 01 - View 2"}]'::jsonb 
WHERE slug = 'swan-jamdani-saree-01';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/swan-jamdani/swan-jamdani-saree-02-video.mp4","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-02-poster.webp","alt":"Swan Jamdani Saree 02 - Video"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-04-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-04-img1.webp","alt":"Swan Jamdani Saree 02 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-05-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-05-img1.webp","alt":"Swan Jamdani Saree 02 - View 2"}]'::jsonb 
WHERE slug = 'swan-jamdani-saree-02';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/swan-jamdani/swan-jamdani-saree-03-video.mp4","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-03-poster.webp","alt":"Swan Jamdani Saree 03 - Video"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-06-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-06-img1.webp","alt":"Swan Jamdani Saree 03 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-07-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-07-img1.webp","alt":"Swan Jamdani Saree 03 - View 2"}]'::jsonb 
WHERE slug = 'swan-jamdani-saree-03';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/swan-jamdani/swan-jamdani-saree-04-video.mp4","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-04-poster.webp","alt":"Swan Jamdani Saree 04 - Video"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-10-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-10-img1.webp","alt":"Swan Jamdani Saree 04 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-11-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-11-img1.webp","alt":"Swan Jamdani Saree 04 - View 2"}]'::jsonb 
WHERE slug = 'swan-jamdani-saree-04';

UPDATE public.products 
SET gallery = '[{"type":"video","src":"/catalog/swan-jamdani/swan-jamdani-saree-05-video.mp4","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-05-poster.webp","alt":"Swan Jamdani Saree 05 - Video"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-12-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-12-img1.webp","alt":"Swan Jamdani Saree 05 - View 1"},{"type":"image","src":"/catalog/swan-jamdani/swan-jamdani-saree-13-img1.webp","thumbnail":"/catalog/swan-jamdani/swan-jamdani-saree-13-img1.webp","alt":"Swan Jamdani Saree 05 - View 2"}]'::jsonb 
WHERE slug = 'swan-jamdani-saree-05';

