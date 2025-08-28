import { Routes, Route } from 'react-router-dom';
import About from './about.jsx';
import Contact from './contact.jsx';
// import Destination from './destination.jsx';
import TourPackages from './tour-packages.jsx';
import PackageDetail from './package-detail.jsx';
import Booking from './booking.jsx';
import Gallery from './gallery.jsx';
import Page404 from './404.jsx';
import Blogarchive from './blog-archive.jsx';
import Blog_single from './blog-single.jsx';
import Confirmation from './confirmation.jsx';
import Single_page from './single-page.jsx';
import Wishlist_page from './wishlist-page.jsx';
import PackageOffer from './package-offer.jsx';
// Admin imports
import DbPackagePending from './admin/db-package-pending.jsx';
import Forgot from './admin/forgot.jsx';
import Login from './admin/login.jsx';
import NewUser from './admin/new-user.jsx';
import UserEdit from './admin/user-edit.jsx';
import User from './admin/user.jsx';
import DbAddPackage from './admin/db-add-package.jsx';
import Dashboard from './admin/dashboard.jsx';
import DbPackageExpired from './admin/db-package-expired.jsx';
import DbPackageActive from './admin/db-package-active.jsx';
import DbEditPackage from './admin/DbEditPackage.jsx';
import Register from './admin/register.jsx';
import Bookings from './bookings.jsx';
import BlogList from './admin/blogList.jsx';
import DbAddBlog from './admin/addBlog.jsx';
import DbEditBlog from './admin/editBlog.jsx';
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<TourPackages />} />
      <Route path="/about" element={<About />} />
      <Route path='/blog-archive' element={<Blogarchive />} />
      <Route path='/blog-single/:id' element={<Blog_single />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/tour-packages" element={<TourPackages />} />
      <Route path="/package-offer" element={<PackageOffer />} />
      <Route path="/package-detail/:id" element={<PackageDetail />} />
      {/* <Route path="/destination" element={<Destination />} /> */}
      <Route path="/single-page" element={<Single_page />} />

      {/* -------- User & Admin Accessible Routes -------- */}
      <Route path="/wishlist-page" element={
        <RequireAuth allowedRoles={["user", "admin"]}>
          <Wishlist_page />
        </RequireAuth>
      } />
      <Route path="/wishlist" element={
        <RequireAuth allowedRoles={["user", "admin"]}>
          <Wishlist_page />
        </RequireAuth>
      } />
      <Route path="/bookings" element={
        <RequireAuth allowedRoles={["user", "admin"]}>
          <Bookings />
        </RequireAuth>
      } />

      {/* -------- Admin ONLY Routes -------- */}
      <Route path="/admin/dashboard" element={
        <RequireAuth allowedRoles={["admin"]}>
          <Dashboard />
        </RequireAuth>
      } />
      <Route path="/admin/db-package-pending" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbPackagePending />
        </RequireAuth>
      } />
      <Route path="/admin/new-user" element={
        <RequireAuth allowedRoles={["admin"]}>
          <NewUser />
        </RequireAuth>
      } />
      <Route path="/admin/user-edit/:id" element={
        <RequireAuth allowedRoles={["admin"]}>
          <UserEdit />
        </RequireAuth>
      } />
      <Route path="/admin/user" element={
        <RequireAuth allowedRoles={["admin"]}>
          <User />
        </RequireAuth>
      } />
      <Route path="/admin/db-add-package" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbAddPackage />
        </RequireAuth>
      } />
      <Route path="/admin/db-package-expired" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbPackageExpired />
        </RequireAuth>
      } />
      <Route path="/admin/db-package-active" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbPackageActive />
        </RequireAuth>
      } />
      <Route path="/admin/edit-package/:id" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbEditPackage />
        </RequireAuth>
      } />
      <Route path="/admin/blogs" element={
        <RequireAuth allowedRoles={["admin"]}>
          <BlogList />
        </RequireAuth>
      } />
      <Route path="/admin/add-blog" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbAddBlog />
        </RequireAuth>
      } />
      <Route path="/admin/edit-blog/:id" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbEditBlog />
        </RequireAuth>
      } />

      {/* ------ Open/auth pages ------ */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/admin/forgot" element={<Forgot />} />

      {/* 404 fallback */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
