-- Fix 500 Error caused by infinite recursion in RLS policies

-- 1. Drop the problematic recursive policy on users
drop policy if exists "Admins can view all profiles" on public.users;

-- 2. Create a new non-recursive policy that uses User Metadata (JWT) instead of table query
create policy "Admins can view all profiles" on public.users
  for select using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 3. Update other admin policies to use JWT for better performance and stability

-- Packages
drop policy if exists "Admins can insert packages" on public.packages;
create policy "Admins can insert packages" on public.packages
  for insert with check ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

drop policy if exists "Admins can update packages" on public.packages;
create policy "Admins can update packages" on public.packages
  for update using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

drop policy if exists "Admins can delete packages" on public.packages;
create policy "Admins can delete packages" on public.packages
  for delete using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

-- Bookings
drop policy if exists "Admins can view all bookings" on public.bookings;
create policy "Admins can view all bookings" on public.bookings
  for select using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

drop policy if exists "Admins can update bookings" on public.bookings;
create policy "Admins can update bookings" on public.bookings
  for update using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

-- Products
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products
  for all using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

-- Blogs
drop policy if exists "Admins can manage blogs" on public.blogs;
create policy "Admins can manage blogs" on public.blogs
  for all using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );

-- Transactions
drop policy if exists "Admins can view all transactions" on public.transactions;
create policy "Admins can view all transactions" on public.transactions
  for select using ( (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' );
