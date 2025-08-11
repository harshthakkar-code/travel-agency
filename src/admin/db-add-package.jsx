import React from "react";

const DbAddPackage = () => (
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
            <li className="active-menu"><a href="db-add-package.html"><i className="fas fa-umbrella-beach"></i>Add Package</a></li>
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
            <li><a href="db-comment.html"><i className="fas fa-comments"></i>Comments</a></li>
            <li><a href="login.html"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      </div>
      <div className="db-info-wrap db-add-tour-wrap">
        <div className="row">
          {/* Listings */}
          <div className="col-lg-8 col-xl-9">
            <div className="dashboard-box">
              <div className="custom-field-wrap">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" name="name" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea></textarea>
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <div className="custom-field-wrap">
                <h4>Dates and Prices</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Group Size</label>
                      <input type="number" name="size" placeholder="No of Pax" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Trip Duration</label>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <input type="number" placeholder="Days" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <input type="number" placeholder="Nights" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>Category</label>
                      <select>
                        <option>Adult</option>
                        <option>Child</option>
                        <option>Couple</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input type="text" name="name" />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Regular Price</label>
                      <input type="text" name="name" />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group">
                      <label>Discount</label>
                      <input type="text" name="name" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <h4>Gallery</h4>
              <div className="custom-field-wrap">
                <div className="dragable-field">
                  <div className="dragable-field-inner">
                    <p className="drag-drop-info">Drop Files To Upload</p>
                    <p>or</p>
                    <div className="upload-input">
                      <div className="form-group">
                        <span className="upload-btn">Upload a image</span>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <h4>Location</h4>
              <div className="custom-field-wrap">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Select Map</label>
                      <select>
                        <option>Google Map</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>API key</label>
                      <input type="text" name="apikey" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xl-3">
            <div className="dashboard-box">
              <div className="custom-field-wrap">
                <h4>Publish</h4>
                <div className="publish-btn">
                  <div className="form-group">
                    <input type="submit" name="draft" value="Save Draft" />
                  </div>
                  <div className="form-group">
                    <input type="submit" name="preview" value="Preview" />
                  </div>
                </div>
                <div className="publish-status">
                  <span>
                    <strong>Status:</strong>
                    Draft
                  </span>
                  <a href="#">Edit</a>
                </div>
                <div className="publish-status">
                  <span>
                    <strong>Visibility:</strong>
                    Poblic
                  </span>
                  <a href="#">Edit</a>
                </div>
                <div className="publish-status">
                  <span>
                    <strong>Visibility:</strong>
                    Poblic
                  </span>
                  <a href="#">Edit</a>
                </div>
                <div className="publish-action">
                  <input type="submit" name="publish" value="Publish" />
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <div className="custom-field-wrap db-pop-field-wrap">
                <h4>Popular</h4>
                <div className="form-group">
                  <label className="custom-input">
                    <input type="checkbox" />
                    <span className="custom-input-field"></span>
                    Use Polpular
                  </label>
                </div>
              </div>
              <div className="custom-field-wrap db-pop-field-wrap">
                <h4>Keywords</h4>
                <div className="form-group">
                  <input type="text" name="keyword" placeholder="Keywords" />
                </div>
              </div>
              <div className="custom-field-wrap db-cat-field-wrap">
                <h4>Category</h4>
                <div className="form-group">
                  <label className="custom-input">
                    <input type="checkbox" />
                    <span className="custom-input-field"></span>
                    Hotel
                  </label>
                </div>
                <div className="form-group">
                  <label className="custom-input">
                    <input type="checkbox" defaultChecked />
                    <span className="custom-input-field"></span>
                    Walking
                  </label>
                </div>
                <div className="add-btn">
                  <a href="#">Add category</a>
                </div>
              </div>
              <div className="custom-field-wrap db-media-field-wrap">
                <h4>Add image</h4>
                <div className="upload-input">
                  <div className="form-group">
                    <span className="upload-btn">Upload a image</span>
                    <input type="file" name="myfile" />
                  </div>
                </div>
              </div>
            </div>
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

export default DbAddPackage;
