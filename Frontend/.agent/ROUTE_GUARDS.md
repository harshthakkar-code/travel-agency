# Route Guards & Authentication Documentation

## Overview
This application uses role-based route protection to secure different parts of the application based on user authentication and authorization levels.

## Authentication System
- **Auth Provider**: Supabase Authentication
- **Auth Context**: `./contexts/AuthContext`
- **Route Guard Component**: `RequireAuth.jsx`

## Route Protection Levels

### 🌍 **Public Routes (No Login Required)**
Only these pages can be accessed without authentication:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/tour-packages` | Tour Packages | Browse all packages |
| `/admin/login` | Admin/User Login | Login page |
| `/user/register` | User Registration | Registration page |
| `/admin/forgot` | Forgot Password | Password recovery |

**Note**: All other pages require user authentication!

### 👤 **User & Admin Routes (Login Required)**
Both regular users and admins can access these pages after logging in:

#### General Pages
| Route | Page | Description |
|-------|------|-------------|
| `/about` | About Us | Company information |
| `/contact` | Contact | Contact form |
| `/gallery` | Gallery | Photo gallery |
| `/single-page` | Single Page | Generic single page |

#### Blog Pages
| Route | Page | Description |
|-------|------|-------------|
| `/blog-archive` | Blog Archive | All blog posts |
| `/blog-single/:id` | Blog Post | Individual blog post |

#### Package Pages
| Route | Page | Description |
|-------|------|-------------|
| `/package-offer` | Package Offers | Special offers |
| `/package-detail/:id` | Package Detail | View package details |

#### Booking & Payment
| Route | Page | Description |
|-------|------|-------------|
| `/booking` | Booking Form | Create new booking |
| `/confirmation` | Booking Confirmation | Booking success page |
| `/success` | Payment Success | Payment successful |
| `/cancel` | Payment Cancelled | Payment cancelled |

#### User Features

| Route | Page | Description |
|-------|------|-------------|
| `/wishlist` | Wishlist | User's saved packages |
| `/wishlist-page` | Wishlist (alt) | Alternative wishlist route |
| `/bookings` | My Bookings | User's booking history |
| `/booking` | Booking Form | Create new booking |
| `/confirmation` | Booking Confirmation | Booking success page |
| `/success` | Payment Success | Payment successful |
| `/cancel` | Payment Cancelled | Payment cancelled |

**Allowed Roles**: `["user", "admin"]`

### 🔐 **Admin-Only Routes (Admin Access Required)**
Only users with admin role can access:

#### Dashboard & Analytics
| Route | Page | Description |
|-------|------|-------------|
| `/admin/dashboard` | Admin Dashboard | Main admin panel |

#### Package Management
| Route | Page | Description |
|-------|------|-------------|
| `/admin/db-add-package` | Add Package | Create new package |
| `/admin/edit-package/:id` | Edit Package | Modify existing package |
| `/admin/db-package-active` | Active Packages | View active packages |
| `/admin/db-package-pending` | Pending Packages | Packages awaiting approval |
| `/admin/db-package-expired` | Expired Packages | View expired packages |

#### User Management
| Route | Page | Description |
|-------|------|-------------|
| `/admin/user` | User List | All registered users |
| `/admin/new-user` | Add User | Create new user |
| `/admin/user-edit/:id` | Edit User | Modify user details |

#### Blog Management
| Route | Page | Description |
|-------|------|-------------|
| `/admin/blogs` | Blog List | All blog posts |
| `/admin/add-blog` | Add Blog | Create new blog post |
| `/admin/edit-blog/:id` | Edit Blog | Modify blog post |

#### Booking & Comment Management
| Route | Page | Description |
|-------|------|-------------|
| `/admin/db-booking` | Booking Management | View all bookings |
| `/admin/db-comment` | Comment Management | Moderate comments |

**Allowed Roles**: `["admin"]`

## How Route Guards Work

### RequireAuth Component
```javascript
<RequireAuth allowedRoles={["user", "admin"]}>
  <YourComponent />
</RequireAuth>
```

### Protection Logic
1. **Loading State**: Shows loading indicator while checking auth
2. **Not Authenticated**: Redirects to `/admin/login` with return URL
3. **Wrong Role**: Redirects based on user's actual role:
   - Admin → `/admin/dashboard`
   - User → `/`
4. **Authorized**: Renders the protected component

### Role Storage
- User role is stored in `localStorage` as `userRole`
- Possible values: `"user"` or `"admin"`
- Set during login process

## Security Features

✅ **Authentication Check**: Verifies user is logged in via Supabase  
✅ **Role-Based Authorization**: Checks user role against allowed roles  
✅ **Redirect on Unauthorized**: Sends users to appropriate pages  
✅ **Return URL Preservation**: Remembers where user tried to go  
✅ **Loading States**: Prevents flash of wrong content  

## Testing Route Guards

### Test as Guest (Not Logged In)
- ✅ Can access: **Home, Tour Packages, Login, Register only**
- ❌ Cannot access: About, Contact, Package Details, Gallery, Blog, Bookings, Wishlist, Admin pages
- 🔄 Redirects to: `/admin/login`

### Test as User
- ✅ Can access: Home, Tour Packages + All user pages (About, Contact, Package Details, Gallery, Blog, Bookings, Wishlist)
- ❌ Cannot access: Admin pages
- 🔄 Redirects to: `/` (home)

### Test as Admin
- ✅ Can access: All pages (public, user, and admin)
- ❌ Cannot access: Nothing (full access)
- 🔄 Redirects to: N/A

## Common Scenarios

### Scenario 1: Guest tries to view package details
1. Clicks on a package from tour packages page
2. Redirected to `/admin/login`
3. After login, redirected back to package detail page

### Scenario 2: Guest tries to access About page
1. Navigates to `/about` (e.g., from footer link)
2. Immediately redirected to `/admin/login`
3. After login, redirected to About page

### Scenario 3: User tries to access admin dashboard
1. Navigates to `/admin/dashboard`
2. RequireAuth checks role
3. User role doesn't match `["admin"]`
4. Redirected to `/` (home page)

### Scenario 4: Admin accesses user features
1. Admin can access all user features
2. Admin role is included in `["user", "admin"]` routes
3. Full access granted

## Maintenance Notes

### Adding New Protected Routes
```javascript
<Route path="/new-protected-route" element={
  <RequireAuth allowedRoles={["user", "admin"]}>
    <NewComponent />
  </RequireAuth>
} />
```

### Making Public Route Protected
Move the route from public section to appropriate protected section and wrap with `RequireAuth`.

### Adding New Roles
1. Update `RequireAuth.jsx` to handle new role
2. Add role to `allowedRoles` array in routes
3. Update role assignment in login logic

## Last Updated
2026-02-16 - **MAJOR UPDATE**: Restricted access to only Home, Tour Packages, and auth pages as public. All other pages now require login.
