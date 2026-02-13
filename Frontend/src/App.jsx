import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './about.jsx';
import Home from './Home.jsx';
import Contact from './contact.jsx';
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
import Success from './Success.jsx';
import Cancel from './Cancel.jsx';

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
import DbBooking from './admin/db-booking.jsx';
import DbComment from './admin/db-comment.jsx';

import RequireAuth from "./RequireAuth";

// Fixed Activity Tracker Component - Prevents Duplicates
class ActivityTracker extends Component {
  state = {
    prevPathname: ''
  };

  componentDidMount() {
    const currentPath = window.location.pathname;
    this.trackPageVisit();
    this.setState({ prevPathname: currentPath });
    this.setupEventListeners();
  }

  componentDidUpdate() {
    const currentPath = window.location.pathname;
    // Only track if pathname actually changed
    if (currentPath !== this.state.prevPathname) {
      this.trackPageVisit();
      this.setState({ prevPathname: currentPath });
    }
  }

  trackPageVisit = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.log('No token or userId found, skipping activity tracking');
      return;
    }

    const currentPath = window.location.pathname;
    const pageName = this.getPageName(currentPath);

    console.log(`Tracking page visit: ${pageName} - ${currentPath}`);

    this.sendActivity('page_visit', {
      pageName,
      pageUrl: currentPath,
      timestamp: new Date().toISOString()
    });
  };

  setupEventListeners = () => {
    // Track clicks on important elements
    document.addEventListener('click', (event) => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const target = event.target;

      // Track wishlist actions
      if (target.classList.contains('wishlist-btn') ||
        target.closest('.wishlist-btn') ||
        target.classList.contains('add-to-wishlist') ||
        target.closest('[data-action="wishlist"]')) {

        const btn = target.classList.contains('wishlist-btn') ? target : target.closest('.wishlist-btn');
        const packageId = btn?.dataset.packageId || btn?.getAttribute('data-package-id') || 'unknown';
        const packageTitle = btn?.dataset.packageTitle || btn?.getAttribute('data-package-title') || 'unknown_package';

        this.sendActivity('package_wishlist_add', {
          packageId,
          packageTitle,
          action: 'add_to_wishlist'
        });
      }

      // Track booking actions
      if (target.classList.contains('booking-btn') ||
        target.closest('.booking-btn') ||
        target.classList.contains('book-now') ||
        target.closest('[data-action="booking"]')) {

        const btn = target.classList.contains('booking-btn') ? target : target.closest('.booking-btn');
        const packageId = btn?.dataset.packageId || btn?.getAttribute('data-package-id') || 'unknown';
        const packageTitle = btn?.dataset.packageTitle || btn?.getAttribute('data-package-title') || 'unknown_package';

        this.sendActivity('package_booking_intent', {
          packageId,
          packageTitle,
          action: 'booking_intent'
        });
      }

      // Track contact form submissions
      if (target.type === 'submit' && (target.form?.id === 'contact-form' || target.closest('form'))) {
        this.sendActivity('contact_form', {
          formType: 'inquiry',
          action: 'form_submit'
        });
      }
    });
  };

  sendActivity = async (activityType, activityDetails) => {
    // Legacy activity tracking disabled for Supabase migration
    // TODO: Implement Supabase-based tracking if needed
    console.log(`[Activity Tracker] ${activityType}`, activityDetails);

    /* 
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/activities/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          activityType,
          activityDetails,
          sessionId: this.getSessionId()
        })
      });

      if (!response.ok) {
        console.error('Failed to track activity:', response.status);
      } else {
        console.log(`Activity tracked successfully: ${activityType}`);
      }
    } catch (error) {
      console.error('Activity tracking error:', error);
    }
    */
  };

  getPageName = (pathname) => {
    const pathMap = {
      '/': 'Home',
      '/about': 'About',
      '/contact': 'Contact',
      '/tour-packages': 'Tour Packages',
      '/wishlist-page': 'Wishlist',
      '/wishlist': 'Wishlist',
      '/gallery': 'Gallery',
      '/blog-archive': 'Blog Archive',
      '/booking': 'Booking',
      '/confirmation': 'Confirmation',
      '/package-offer': 'Package Offers',
      '/admin/dashboard': 'Admin Dashboard',
      '/admin/user': 'Admin Users',
      '/admin/new-user': 'Admin New User',
      '/admin/db-add-package': 'Admin Add Package',
      '/admin/blogs': 'Admin Blogs'
    };

    // Dynamic routes
    if (pathname.includes('/package-detail/')) return 'Package Detail';
    if (pathname.includes('/blog-single/')) return 'Blog Post';
    if (pathname.includes('/admin/user-edit/')) return 'Admin User Edit';
    if (pathname.includes('/admin/edit-package/')) return 'Admin Edit Package';
    if (pathname.includes('/admin/edit-blog/')) return 'Admin Edit Blog';

    return pathMap[pathname] || pathname;
  };

  getSessionId = () => {
    let sessionId = sessionStorage.getItem('userSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('userSessionId', sessionId);
    }
    return sessionId;
  };

  render() {
    return null; // This component doesn't render anything visible
  }
}

function App() {
  return (
    <>
      {/* Activity Tracker Component */}
      <ActivityTracker />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
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
        <Route path="/single-page" element={<Single_page />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

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
        <Route path="/admin/db-booking" element={
          <RequireAuth allowedRoles={["admin"]}>
            <DbBooking />
          </RequireAuth>
        } />
        <Route path="/admin/db-comment" element={
          <RequireAuth allowedRoles={["admin"]}>
            <DbComment />
          </RequireAuth>
        } />

        {/* ------ Open/auth pages ------ */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/admin/forgot" element={<Forgot />} />

        {/* 404 fallback */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
