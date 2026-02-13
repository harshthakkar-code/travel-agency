-- FIX RLS & CREATE STORAGE BUCKET

-- 1. Create a Secure Function to Check Admin Status
-- This function bypasses RLS recursion by using SECURITY DEFINER
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1
    from public.users
    where id = auth.uid()
    and role = 'admin'
  );
end;
$$;

-- 2. Update Policies to use the new is_admin() function
-- This is much safer and more reliable than metadata checks

-- Users Table
drop policy if exists "Admins can view all profiles" on public.users;
create policy "Admins can view all profiles" on public.users
  for select using (public.is_admin());

-- Packages
drop policy if exists "Admins can insert packages" on public.packages;
create policy "Admins can insert packages" on public.packages
  for insert with check (public.is_admin());

drop policy if exists "Admins can update packages" on public.packages;
create policy "Admins can update packages" on public.packages
  for update using (public.is_admin());

drop policy if exists "Admins can delete packages" on public.packages;
create policy "Admins can delete packages" on public.packages
  for delete using (public.is_admin());

-- Bookings
drop policy if exists "Admins can view all bookings" on public.bookings;
create policy "Admins can view all bookings" on public.bookings
  for select using (public.is_admin());

drop policy if exists "Admins can update bookings" on public.bookings;
create policy "Admins can update bookings" on public.bookings
  for update using (public.is_admin());

-- Products
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products
  for all using (public.is_admin());

-- Blogs
drop policy if exists "Admins can manage blogs" on public.blogs;
create policy "Admins can manage blogs" on public.blogs
  for all using (public.is_admin());

-- Transactions
drop policy if exists "Admins can view all transactions" on public.transactions;
create policy "Admins can view all transactions" on public.transactions
  for select using (public.is_admin());


-- 3. STORAGE BUCKET CREATION

-- Create 'images' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Storage Policies for 'images' bucket

-- Public Access (View)
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Admin Upload Access
-- Allow admins to insert/upload images
create policy "Admin Upload Access"
on storage.objects for insert
with check (
  bucket_id = 'images' AND
  public.is_admin()
);

-- Admin Update Access
create policy "Admin Update Access"
on storage.objects for update
using (
  bucket_id = 'images' AND
  public.is_admin()
);

-- Admin Delete Access
create policy "Admin Delete Access"
on storage.objects for delete
using (
  bucket_id = 'images' AND
  public.is_admin()
);
