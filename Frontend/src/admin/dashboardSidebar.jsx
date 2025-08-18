// src/components/admin/DashboardSidebar.jsx
import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="dashboard-navigation">
      <div id="dashboard-Navigation" className="slick-nav"></div>

      <div id="navigation" className="navigation-container">
        <ul>
          <li><a href="/admin/dashboard"><i className="far fa-chart-bar"></i> Dashboard</a></li>
          <li>
            <a><i className="fas fa-user"></i>Users</a>
            <ul>
              <li><a href="/admin/user">User</a></li>
              {/* <li><a href="/admin/user-edit">User edit</a></li> */}
              <li><a href="/admin/new-user">New user</a></li>
            </ul>
          </li>
          <li className="active-menu"><a href="/admin/db-add-package"><i className="fas fa-umbrella-beach"></i>Add Package</a></li>
          <li>
            <a><i className="fas fa-hotel"></i>Packages</a>
            <ul>
              <li><a href="/admin/db-package-active">Active</a></li>
              <li><a href="/admin/db-package-pending">Pending</a></li>
              <li><a href="/admin/db-package-expired">Expired</a></li>
            </ul>
          </li>
          <li><a href="/admin/db-booking"><i className="fas fa-ticket-alt"></i> Booking & Enquiry</a></li>
          <li><a href="/admin/db-wishlist"><i className="far fa-heart"></i>Wishlist</a></li>
          <li><a href="/admin/db-comment"><i className="fas fa-comments"></i>Comments</a></li>
          <li><a href="/admin/login"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
