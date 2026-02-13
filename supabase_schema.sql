-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
-- This table extends auth.users with application-specific data
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  first_name text,
  last_name text,
  mobile text,
  country text,
  city text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Turn on RLS
alter table public.users enable row level security;

-- Policies for Users
create policy "Users can view their own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

create policy "Admins can view all profiles" on public.users
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Trigger to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'firstName', 
    new.raw_user_meta_data->>'lastName',
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. PACKAGES (TOURS) TABLE
create table public.packages (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  dates_and_prices text,
  group_size int,
  trip_duration text,
  category text,
  adult_price numeric,
  child_price numeric,
  couple_price numeric,
  sale_price numeric,
  regular_price numeric,
  discount numeric,
  gallery text[],
  location text,
  map_url text,
  destination text,
  status text default 'Pending' check (status in ('Active', 'Pending', 'Expired')),
  program jsonb,
  is_popular boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.packages enable row level security;

-- Policies for Packages
create policy "Packages are viewable by everyone" on public.packages
  for select using (true);

create policy "Admins can insert packages" on public.packages
  for insert with check (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update packages" on public.packages
  for update using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete packages" on public.packages
  for delete using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );


-- 3. BOOKINGS TABLE
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  package_id uuid references public.packages(id), -- Nullable if package deleted
  package_title text, -- Snapshot
  package_destination text, -- Snapshot
  billing_address jsonb,
  pricing jsonb,
  add_ons jsonb,
  status text default 'Pending' check (status in ('Pending', 'Confirmed', 'Cancelled')),
  payment_intent_id text,
  session_id text,
  receipt_url text,
  booking_date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.bookings enable row level security;

-- Policies for Bookings
create policy "Users can view their own bookings" on public.bookings
  for select using (auth.uid() = user_id);

create policy "Users can create their own bookings" on public.bookings
  for insert with check (auth.uid() = user_id);

create policy "Admins can view all bookings" on public.bookings
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update bookings" on public.bookings
  for update using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );


-- 4. REVIEWS TABLE
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  package_id uuid references public.packages(id),
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reviews enable row level security;

-- Policies for Reviews
create policy "Reviews are viewable by everyone" on public.reviews
  for select using (true);

create policy "Authenticated users can create reviews" on public.reviews
  for insert with check (auth.role() = 'authenticated');


-- 5. PRODUCTS (STORE) TABLE
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric not null,
  sale_price numeric,
  image text,
  stock int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.products enable row level security;

-- Policies for Products
create policy "Products are viewable by everyone" on public.products
  for select using (true);

create policy "Admins can manage products" on public.products
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );


-- 6. BLOGS TABLE
create table public.blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  author text,
  content text,
  image text,
  tags text[],
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.blogs enable row level security;

-- Policies for Blogs
create policy "Blogs are viewable by everyone" on public.blogs
  for select using (true);

create policy "Admins can manage blogs" on public.blogs
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );


-- 7. TRANSACTIONS TABLE
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  booking_id uuid references public.bookings(id),
  session_id text,
  payment_intent_id text,
  amount numeric,
  currency text default 'usd',
  status text default 'pending',
  receipt_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.transactions enable row level security;

-- Policies for Transactions
create policy "Users can view own transactions" on public.transactions
  for select using (auth.uid() = user_id);

create policy "Admins can view all transactions" on public.transactions
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );
