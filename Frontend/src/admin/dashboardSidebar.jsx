// src/admin/dashboardSidebar.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from 'react-router-dom';

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
          <li><Link to="/admin/dashboard"><i className="far fa-chart-bar"></i> Dashboard</Link></li>
          <li>
            <ul>
              <li><Link to="/admin/user"><i className="fas fa-users"></i>User Details</Link></li>
              <li><Link to="/admin/new-user"><i className="fas fa-user-plus"></i> Add New user</Link></li>
            </ul>
          </li>
          <li>
            <ul>
              <li className="active-menu"><Link to="/admin/db-add-package"><i className="fas fa-hotel"></i>Add Package</Link></li>
              <li><Link to="/admin/db-package-active"><i className="fas fa-umbrella-beach"></i>Active Packages</Link></li>
              <li><Link to="/admin/db-package-pending"><i className="fas fa-spinner"></i>Pending Packages</Link></li>
              <li><Link to="/admin/db-package-expired"><i className="fas fa-ban"></i>Expired Packages</Link></li>
            </ul>
          </li>
          <li><Link to="/admin/blogs"><i className="fas fa-blog"></i>Blogs</Link></li>
          <li><Link to="/admin/add-blog"><i className="fas fa-plus"></i>Add Blog</Link></li>
          <li><Link to="/admin/db-booking"><i className="fas fa-ticket-alt"></i> Booking & Enquiry</Link></li>
          <li><Link to="/admin/db-comment"><i className="fas fa-comments"></i>Comments</Link></li>
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <span><i className="fas fa-sign-out-alt"></i> Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
