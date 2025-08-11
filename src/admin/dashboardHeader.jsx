// src/components/admin/DashboardHeader.jsx
import React from "react";
import logoImg from '../admin/assets/images/logo.png';
import 'popper.js';
import userImg from '../admin/assets/images/comment.jpg';

const DashboardHeader = () => {
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
        <div className="search-field">
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
        </div>

        {/* Notifications Dropdown */}
        <div className="dropdown">
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
        </div>

        {/* Messages Dropdown */}
        <div className="dropdown">
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
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown">
            <div className="dropdown-item profile-sec">
              <img src={userImg} alt="" />
              <span>My Account </span>
              <i className="fas fa-caret-down"></i>
            </div>
          </a>
          <div className="dropdown-menu account-menu">
            <ul>
              <li><a href="#"><i className="fas fa-cog"></i>Settings</a></li>
              <li><a href="#"><i className="fas fa-user-tie"></i>Profile</a></li>
              <li><a href="#"><i className="fas fa-key"></i>Password</a></li>
              <li><a href="#"><i className="fas fa-sign-out-alt"></i>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
