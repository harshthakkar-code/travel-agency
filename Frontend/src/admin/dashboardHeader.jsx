// src/components/admin/DashboardHeader.jsx
import React, { useEffect, useState } from "react";
import logoImg from '../admin/assets/images/logo.png';
import 'popper.js';
import userImg from '../admin/assets/images/comment.jpg';
import { useAuth } from "../contexts/AuthContext";



const DashboardHeader = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { logout } = useAuth();
  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Handle logout
 const handleLogout = async () => {
    try {
      await logout(); // CHANGED: Use Firebase logout instead of localStorage
      setShowUserDropdown(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);


  const userName = localStorage.getItem('user');

  return (
    <div className="dashboard-header sticky-header">
      <div className="content-left logo-section pull-left">
        <h1>
          <a href="/admin/dashboard">
            <img src={logoImg} alt="Logo" />
          </a>
        </h1>
      </div>

      <div className="heaer-content-right pull-right">
        {/* Search Field */}
        {/* <div className="search-field">
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search Now" />
              <a href="#">
                <span className="search_btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </form>
        </div> */}

        {/* Notifications Dropdown */}
        {/* <div className="dropdown">
          <a className="dropdown-toggle" id="notifyDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div className="dropdown-item">
              <i className="far fa-envelope"></i>
              <span className="notify">3</span>
            </div>
          </a>
          <div className="dropdown-menu notification-menu" aria-labelledby="notifyDropdown">
            <h4> 3 Notifications</h4>
            <ul>
              <li>
                <a href="#">
                  <div className="list-img">
                    <img src="/admin/assets/images/comment.jpg" alt="" />
                  </div>
                  <div className="notification-content">
                    <p>You have a notification.</p>
                    <small>2 hours ago</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="list-img">
                    <img src="/admin/assets/images/comment2.jpg" alt="" />
                  </div>
                  <div className="notification-content">
                    <p>You have a notification.</p>
                    <small>2 hours ago</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="list-img">
                    <img src="/admin/assets/images/comment3.jpg" alt="" />
                  </div>
                  <div className="notification-content">
                    <p>You have a notification.</p>
                    <small>2 hours ago</small>
                  </div>
                </a>
              </li>
            </ul>
            <a href="#" className="all-button">See all messages</a>
          </div>
        </div> */}

        {/* Messages Dropdown */}
        {/* <div className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown">
            <div className="dropdown-item">
              <i className="far fa-bell"></i>
              <span className="notify">3</span>
            </div>
          </a>
          <div className="dropdown-menu notification-menu">
            <h4> 3 Messages</h4>
            <ul>
              <li>
                <a href="#">
                  <div className="list-img">
                    <img src="/admin/assets/images/comment4.jpg" alt="" />
                  </div>
                  <div className="notification-content">
                    <p>You have a notification.</p>
                    <small>2 hours ago</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="list-img">
                    <img src="/admin/assets/images/comment5.jpg" alt="" />
                  </div>
                  <div className="notification-content">
                    <p>You have a notification.</p>
                    <small>2 hours ago</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="list-img">
                    <img src="/admin/assets/images/comment6.jpg" alt="" />
                  </div>
                  <div className="notification-content">
                    <p>You have a notification.</p>
                    <small>2 hours ago</small>
                  </div>
                </a>
              </li>
            </ul>
            <a href="#" className="all-button">See all messages</a>
          </div>
        </div> */}

        {/* Profile Dropdown */}
    <div className="dropdown user-dropdown" style={{ position: 'relative' }}>
      <div className="dropdown-toggle" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <div className="dropdown-item profile-sec" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userImg} alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
          <span>
            <span className="user-name">{userName}</span>
          </span>
          <i 
            className="fas fa-caret-down" 
            onClick={toggleUserDropdown}
            style={{ 
              marginLeft: '8px', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: showUserDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {showUserDropdown && (
        <div 
          className="dropdown-menu account-menu" 
          style={{ 
            display: 'block',
            position: 'absolute', 
            top: '100%', 
            right: '0', 
            background: '#fff', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
            borderRadius: '6px', 
            minWidth: '150px', 
            zIndex: 9999,
            marginTop: '5px',
            border: '1px solid #e9ecef'
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <button 
                onClick={handleLogout} 
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '10px 15px', 
                  background: 'none', 
                  border: 'none', 
                  color: '#dc3545', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <div style={{ padding: '10px 15px', borderBottom: '1px solid #f8f9fa', fontSize: '12px', color: '#6c757d' }}>
                  Signed in as <br />
                  <strong style={{ color: '#333' }}>{localStorage.getItem('userEmail')}</strong>
                </div>
                <i className="fas fa-sign-out-alt" style={{ marginRight: '8px', width: '15px' }}></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
