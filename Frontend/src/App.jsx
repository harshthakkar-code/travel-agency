import { Routes, Route } from 'react-router-dom';
import About from './about.jsx';
import Contact from './contact.jsx';
import Service from './service.jsx';
import FAQ from './faq.jsx';
import Destination from './destination.jsx';
import TourPackages from './tour-packages.jsx';
import PackageDetail from './package-detail.jsx';
import Booking from './booking.jsx';
import Gallery from './gallery.jsx';
import Page404 from './404.jsx';
import Blogarchive from './blog-archive.jsx';
import BlogArchiveLeft from './BlogArchiveLeft.jsx';
import Blog_single from './blog-single.jsx';
import BlogArchiveBoth from './blog-archive-both.jsx';
import TourCart from './tour-cart.jsx';
import TourGuide from './tour-guide.jsx';
import SearchPage from './search-page.jsx';
import CareerDetails from './career-detail.jsx';
import Career from './career.jsx';
import CommingSoon from './comming-soon.jsx';
import Confirmation from './confirmation.jsx';
import Single_page from './single-page.jsx';
import Testimonial_page from './testimonial-page.jsx';
import Wishlist_page from './wishlist-page.jsx';
import ProductCheckout from './product-checkout.jsx';
import ProductDetail from './product-detail.jsx';
import ProductCart from './product-cart.jsx';
import ProductRight from './product-right.jsx';
import Popup from './popup.jsx';
import PackageOffer from './package-offer.jsx';
import Index_v2 from './index-v2.jsx';
// Admin imports
import DbPackagePending from './admin/db-package-pending.jsx';
import DbPackage from './admin/db-package.jsx';
import DbWishlist from './admin/db-wishlist.jsx';
import Forgot from './admin/forgot.jsx';
import Login from './admin/login.jsx';
import NewUser from './admin/new-user.jsx';
import UserEdit from './admin/user-edit.jsx';
import User from './admin/user.jsx';
import DbAddPackage from './admin/db-add-package.jsx';
import Dashboard from './admin/dashboard.jsx';
import DbBooking from './admin/db-booking.jsx';
import DbPackageExpired from './admin/db-package-expired.jsx';
import DbComment from './admin/db-comment.jsx';
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
      <Route path='/blog-archive-left' element={<BlogArchiveLeft />} />
      <Route path='/blog-single/:id' element={<Blog_single />} />
      <Route path="/booking" element={<Booking />} />
      <Route path='/blog-archive-both' element={<BlogArchiveBoth />} />
      <Route path='/tour-cart' element={<TourCart />} />
      <Route path='/index-v2' element={<Index_v2 />} />
      <Route path='/tour-guide' element={<TourGuide />} />
      <Route path='/search-page' element={<SearchPage />} />
      <Route path='/career-details' element={<CareerDetails />} />
      <Route path='/career' element={<Career />} />
      <Route path='/coming-soon' element={<CommingSoon />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/popup" element={<Popup />} />
      <Route path="/product-checkout" element={<ProductCheckout />} />
      <Route path="/product-detail" element={<ProductDetail />} />
      <Route path="/product-cart" element={<ProductCart />} />
      <Route path="/product-right" element={<ProductRight />} />
      <Route path="/tour-packages" element={<TourPackages />} />
      <Route path="/package-offer" element={<PackageOffer />} />
      <Route path="/package-detail/:id" element={<PackageDetail />} />
      <Route path="/service" element={<Service />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/destination" element={<Destination />} />
      <Route path="/single-page" element={<Single_page />} />
      <Route path="/testimonial-page" element={<Testimonial_page />} />

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
      <Route path="/admin/db-package" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbPackage />
        </RequireAuth>
      } />
      <Route path="/admin/db-wishlist" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbWishlist />
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
      <Route path="/admin/db-booking" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbBooking />
        </RequireAuth>
      } />
      <Route path="/admin/db-package-expired" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbPackageExpired />
        </RequireAuth>
      } />
      <Route path="/admin/db-comment" element={
        <RequireAuth allowedRoles={["admin"]}>
          <DbComment />
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
