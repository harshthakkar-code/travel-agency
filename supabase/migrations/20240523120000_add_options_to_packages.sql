alter table public.packages
add column if not exists options jsonb default '[]'::jsonb;

-- Example structure for options:
-- [
--   { "name": "tourGuide", "label": "Tour Guide", "price": 34 },
--   { "name": "mealsIncluded", "label": "Meals Included", "price": 25 }
-- ]
