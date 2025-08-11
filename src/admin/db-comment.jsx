import React from "react";

const DbComment = () => (
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
            <li><a href="db-booking.html"><i className="fas fa-ticket-alt"></i> Booking & Enquiry</a></li>
            <li><a href="db-wishlist.html"><i className="far fa-heart"></i>Wishlist</a></li>
            <li className="active-menu"><a href="db-comment.html"><i className="fas fa-comments"></i>Comments</a></li>
            <li><a href="login.html"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      </div>
      <div className="db-info-wrap db-comment-wrap">
        <h4>Comments List</h4>
        <p>Nonummy hac atque adipisicing donec placeat pariatur quia ornare nisl.</p>
        <div className="dashboard-box">
          {/* post comment html */}
          <div className="comment-area">
            <div className="comment-area-inner">
              <ol>
                <li>
                  <figure className="comment-thumb">
                    <img src="assets/images/testi-img1-150x150.jpg" alt="" />
                  </figure>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h4 className="author-name">Tom Sawyer</h4>
                      <span className="post-on">Jana 10 2020</span>
                    </div>
                    <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                    <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                    <div className="comment-detail">
                      <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                      <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                      <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                    </div>
                  </div>
                </li>
                <ol>
                  <li>
                    <figure className="comment-thumb">
                      <img src="assets/images/testi-img2-150x150.jpg" alt="" />
                    </figure>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="author-name">Tom Sawyer</h4>
                        <span className="post-on">Jana 10 2020</span>
                      </div>
                      <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                      <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                      <div className="comment-detail">
                        <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                        <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                        <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                      </div>
                    </div>
                  </li>
                </ol>
              </ol>
            </div>
          </div>
        </div>
        <div className="dashboard-box">
          {/* post comment html */}
          <div className="comment-area">
            <div className="comment-area-inner">
              <ol>
                <li>
                  <figure className="comment-thumb">
                    <img src="assets/images/testi-img3-150x150.jpg" alt="" />
                  </figure>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h4 className="author-name">Tom Sawyer</h4>
                      <span className="post-on">Jana 10 2020</span>
                    </div>
                    <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                    <div className="rating-wrap">
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span></span>
                      </div>
                    </div>
                    <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                    <div className="comment-detail">
                      <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                      <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                      <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                    </div>
                  </div>
                </li>
                <ol>
                  <li>
                    <figure className="comment-thumb">
                      <img src="assets/images/testi-img1-150x150.jpg" alt="" />
                    </figure>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="author-name">Tom Sawyer</h4>
                        <span className="post-on">Jana 10 2020</span>
                      </div>
                      <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                      <div className="rating-wrap">
                        <div className="rating-start" title="Rated 5 out of 5">
                          <span></span>
                        </div>
                      </div>
                      <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                      <div className="comment-detail">
                        <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                        <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                        <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                      </div>
                    </div>
                  </li>
                </ol>
              </ol>
            </div>
          </div>
        </div>
        {/* pagination html */}
        <div className="pagination-wrap">
          <nav className="pagination-inner">
            <ul className="pagination disabled">
              <li className="page-item"><span className="page-link"><i className="fas fa-chevron-left"></i></span></li>
              <li className="page-item"><a href="#" className="page-link active">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a></li>
            </ul>
          </nav>
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

export default DbComment;
