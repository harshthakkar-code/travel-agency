-- 1. Create Wishlist Table
create table if not exists public.wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  package_id uuid references public.packages(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, package_id)
);

-- Enable RLS
alter table public.wishlist enable row level security;

-- Policies
create policy "Users can view their own wishlist" on public.wishlist
  for select using (auth.uid() = user_id);

create policy "Users can manage their own wishlist" on public.wishlist
  for all using (auth.uid() = user_id);

-- 2. Update User Creation Trigger to include Mobile, City, Country
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name, mobile, city, country, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'firstName', 
    new.raw_user_meta_data->>'lastName',
    new.raw_user_meta_data->>'mobile',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'country',
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;
