// src/admin/dashboardSidebar.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear(); // Clear all localStorage data
      await logout(); // Call Firebase logout
      navigate('/admin/login'); // Redirect to login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dashboard-navigation">
      <div id="dashboard-Navigation" className="slick-nav"></div>

      <div id="navigation" className="navigation-container">
        <ul>
          <li><a href="/admin/dashboard"><i className="far fa-chart-bar"></i> Dashboard</a></li>
          <li>
            <ul>
              <li><a href="/admin/user"><i className="fas fa-users"></i>User Details</a></li>
              <li><a href="/admin/new-user"><i className="fas fa-user-plus"></i> Add New user</a></li>
            </ul>
          </li>
          <li>
            <ul>
              <li className="active-menu"><a href="/admin/db-add-package"><i className="fas fa-hotel"></i>Add Package</a></li>
              <li><a href="/admin/db-package-active"><i className="fas fa-umbrella-beach"></i>Active Packages</a></li>
              <li><a href="/admin/db-package-pending"><i className="fas fa-spinner"></i>Pending Packages</a></li>
              <li><a href="/admin/db-package-expired"><i className="fas fa-ban"></i>Expired Packages</a></li>
            </ul>
          </li>
          <li><a href="/admin/blogs"><i className="fas fa-blog"></i>Blogs</a></li>
          <li><a href="/admin/add-blog"><i className="fas fa-plus"></i>Add Blog</a></li>
          <li><a href="/admin/db-booking"><i className="fas fa-ticket-alt"></i> Booking & Enquiry</a></li>
          <li><a href="/admin/db-comment"><i className="fas fa-comments"></i>Comments</a></li>
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <a><i className="fas fa-sign-out-alt"></i> Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
