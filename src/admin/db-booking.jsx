import React from "react";

const DbBooking = () => (
  <div id="container-wrapper">
    {/* Dashboard */}
    <div id="dashboard" className="dashboard-container">
      <div className="dashboard-header sticky-header">
        <div className="content-left logo-section pull-left">
          <h1>
            <a href="../index.html">
              <img src="assets/images/logo.png" alt="" />
            </a>
          </h1>
        </div>
        <div className="heaer-content-right pull-right">
          <div className="search-field">
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="search" placeholder="Search Now" />
                <a href="#">
                  <span className="search_btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </form>
          </div>
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
                      <img src="assets/images/comment.jpg" alt="" />
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
                      <img src="assets/images/comment2.jpg" alt="" />
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
                      <img src="assets/images/comment3.jpg" alt="" />
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
                      <img src="assets/images/comment4.jpg" alt="" />
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
                      <img src="assets/images/comment5.jpg" alt="" />
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
                      <img src="assets/images/comment6.jpg" alt="" />
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
          <div className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown">
              <div className="dropdown-item profile-sec">
                <img src="assets/images/comment.jpg" alt="" />
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
      <div className="dashboard-navigation">
        {/* Responsive Navigation Trigger */}
        <div id="dashboard-Navigation" className="slick-nav"></div>
        <div id="navigation" className="navigation-container">
          <ul>
            <li><a href="dashboard.html"><i className="far fa-chart-bar"></i> Dashboard</a></li>
            <li>
              <a><i className="fas fa-user"></i>Users</a>
              <ul>
                <li><a href="user.html">User</a></li>
                <li><a href="user-edit.html">User edit</a></li>
                <li><a href="new-user.html">New user</a></li>
              </ul>
            </li>
            <li><a href="db-add-package.html"><i className="fas fa-umbrella-beach"></i>Add Package</a></li>
            <li>
              <a><i className="fas fa-hotel"></i>packages</a>
              <ul>
                <li><a href="db-package-active.html">Active</a></li>
                <li><a href="db-package-pending.html">Pending</a></li>
                <li><a href="db-package-expired.html">Expired</a></li>
              </ul>
            </li>
            <li className="active-menu"><a href="db-booking.html"><i className="fas fa-ticket-alt"></i> Booking & Enquiry</a></li>
            <li><a href="db-wishlist.html"><i className="far fa-heart"></i>Wishlist</a></li>
            <li><a href="db-comment.html"><i className="fas fa-comments"></i>Comments</a></li>
            <li><a href="login.html"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      </div>
      <div className="db-info-wrap db-booking">
        <div className="dashboard-box table-opp-color-box">
          <h4>Recent Booking</h4>
          <p>Airtport Hotels The Right Way To Start A Short Break Holiday</p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date</th>
                  <th>Destination</th>
                  <th>Id</th>
                  <th>status</th>
                  <th>Enquiry</th>
                  <th>People</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="list-img"><img src="assets/images/comment.jpg" alt="" /></span>
                    <span className="list-enq-name">John Doe</span>
                  </td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td>755</td>
                  <td><span className="badge badge-success">Approve</span></td>
                  <td><span className="badge badge-success">15</span></td>
                  <td><span className="badge badge-success">9</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="list-img"><img src="assets/images/comment2.jpg" alt="" /></span>
                    <span className="list-enq-name">John Doe</span>
                  </td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td>755</td>
                  <td><span className="badge badge-primary">Pending</span></td>
                  <td><span className="badge badge-success">15</span></td>
                  <td><span className="badge badge-success">9</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="list-img"><img src="assets/images/comment3.jpg" alt="" /></span>
                    <span className="list-enq-name">John Doe</span>
                  </td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td>755</td>
                  <td><span className="badge badge-danger">Reject</span></td>
                  <td><span className="badge badge-success">15</span></td>
                  <td><span className="badge badge-success">9</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="list-img"><img src="assets/images/comment4.jpg" alt="" /></span>
                    <span className="list-enq-name">John Doe</span>
                  </td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td>755</td>
                  <td><span className="badge badge-primary">Pendding</span></td>
                  <td><span className="badge badge-success">15</span></td>
                  <td><span className="badge badge-success">9</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="list-img"><img src="assets/images/comment5.jpg" alt="" /></span>
                    <span className="list-enq-name">John Doe</span>
                  </td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td>755</td>
                  <td><span className="badge badge-danger">Reject</span></td>
                  <td><span className="badge badge-success">15</span></td>
                  <td><span className="badge badge-success">9</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="list-img"><img src="assets/images/comment6.jpg" alt="" /></span>
                    <span className="list-enq-name">John Doe</span>
                  </td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td>755</td>
                  <td><span className="badge badge-success">approve</span></td>
                  <td><span className="badge badge-success">15</span></td>
                  <td><span className="badge badge-success">9</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Copyrights */}
      <div className="copyrights">
        Copyright © 2021 Travele. All rights reserveds.
      </div>
    </div>
    {/* Dashboard / End */}
  </div>
);

export default DbBooking;
