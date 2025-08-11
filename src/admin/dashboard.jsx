import React from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

const Dashboard = () => {
  return (
    <>
      {/* <!-- start Container Wrapper --> */}
      <div id="container-wrapper">
        {/* <!-- Dashboard --> */}
        <div className="dashboard-container" id="dashboard">
          {/* 🔹 HEADER */}
          <DashboardHeader />
          {/* 🔹 SIDEBAR */}
          <DashboardSidebar />
          <div className="db-info-wrap">
            <div className="row">
              {/* <!-- Item --> */}
              <div className="col-xl-3 col-sm-6">
                <div className="db-info-list">
                  <div className="dashboard-stat-icon bg-blue">
                    <i className="far fa-chart-bar"></i>
                  </div>
                  <div className="dashboard-stat-content">
                    <h4>Today Views</h4>
                    <h5>22,520</h5>
                  </div>
                </div>
              </div>
              {/* <!-- Item --> */}
              <div className="col-xl-3 col-sm-6">
                <div className="db-info-list">
                  <div className="dashboard-stat-icon bg-green">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="dashboard-stat-content">
                    <h4>Earnings</h4>
                    <h5>16,520</h5>
                  </div>
                </div>
              </div>
              {/* <!-- Item --> */}
              <div className="col-xl-3 col-sm-6">
                <div className="db-info-list">
                  <div className="dashboard-stat-icon bg-purple">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="dashboard-stat-content">
                    <h4>Users</h4>
                    <h5>18,520</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="db-info-list">
                  <div className="dashboard-stat-icon bg-red">
                    <i className="far fa-envelope-open"></i>
                  </div>
                  <div className="dashboard-stat-content">
                    <h4>Enquiry</h4>
                    <h5>19,520</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="dashboard-box table-opp-color-box">
                  <h4>Recent Booking</h4>
                  <p>
                    Airtport Hotels The Right Way To Start A Short Break Holiday
                  </p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>User</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>City</th>
                          <th>Enquiry</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input checked="checked" type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input checked="checked" type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment2.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input checked="checked" type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment3.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input checked="checked" type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment4.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input checked="checked" type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment5.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dashboard-box table-opp-color-box">
                  <h4>Package Enquiry</h4>
                  <p>
                    Airtport Hotels The Right Way To Start A Short Break Holiday
                  </p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>User</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>City</th>
                          <th>Enquiry</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment2.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment3.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment4.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-input">
                              <input type="checkbox" />
                              <span className="custom-input-field"></span>
                            </label>
                          </td>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment5.jpg" />
                            </span>
                          </td>
                          <td>
                            <span className="list-enq-name">John Doe</span>
                          </td>
                          <td>12 may</td>
                          <td>Japan</td>
                          <td>
                            <span className="badge badge-success">15</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="dashboard-box">
                  <h4>User Details</h4>
                  <p>
                    Airtport Hotels The Right Way To Start A Short Break Holiday
                  </p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Country</th>
                          <th>Listings</th>
                          <th>Enquiry</th>
                          <th>Bookings</th>
                          <th>Reviews</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment.jpg" />
                            </span>
                          </td>
                          <td>
                            <a href="#">
                              <span className="list-name">Kathy Brown</span>
                              <span className="list-enq-city">
                                United States
                              </span>
                            </a>
                          </td>
                          <td>+01 3214 6522</td>
                          <td>
                            <a
                              className="__cf_email__"
                              data-cfemail="d6b5beb7b2b3b8b1bab396b2a3bbbbaff8b5b9bb"
                              href="https://demo.bosathemes.com/cdn-cgi/l/email-protection"
                            >
                              [email protected]
                            </a>
                          </td>
                          <td>Australia</td>
                          <td>
                            <span className="badge badge-primary">02</span>
                          </td>
                          <td>
                            <span className="badge badge-danger">12</span>
                          </td>
                          <td>
                            <span className="badge badge-success">24</span>
                          </td>
                          <td>
                            <span className="badge badge-dark">36</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment2.jpg" />
                            </span>
                          </td>
                          <td>
                            <a href="#">
                              <span className="list-name">Kathy Brown</span>
                              <span className="list-enq-city">
                                United States
                              </span>
                            </a>
                          </td>
                          <td>+01 3214 6522</td>
                          <td>
                            <a
                              className="__cf_email__"
                              data-cfemail="294a41484d4c474e454c694d5c444450074a4644"
                              href="https://demo.bosathemes.com/cdn-cgi/l/email-protection"
                            >
                              [email protected]
                            </a>
                          </td>
                          <td>Australia</td>
                          <td>
                            <span className="badge badge-primary">02</span>
                          </td>
                          <td>
                            <span className="badge badge-danger">12</span>
                          </td>
                          <td>
                            <span className="badge badge-success">24</span>
                          </td>
                          <td>
                            <span className="badge badge-dark">36</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment3.jpg" />
                            </span>
                          </td>
                          <td>
                            <a href="#">
                              <span className="list-name">Kathy Brown</span>
                              <span className="list-enq-city">
                                United States
                              </span>
                            </a>
                          </td>
                          <td>+01 3214 6522</td>
                          <td>
                            <a
                              className="__cf_email__"
                              data-cfemail="23404b4247464d444f466347564e4e5a0d404c4e"
                              href="https://demo.bosathemes.com/cdn-cgi/l/email-protection"
                            >
                              [emai protected]
                            </a>
                          </td>
                          <td>Australia</td>
                          <td>
                            <span className="badge badge-primary">02</span>
                          </td>
                          <td>
                            <span className="badge badge-danger">12</span>
                          </td>
                          <td>
                            <span className="badge badge-success">24</span>
                          </td>
                          <td>
                            <span className="badge badge-dark">36</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="list-img">
                              <img alt="" src="assets/images/comment4.jpg" />
                            </span>
                          </td>
                          <td>
                            <a href="#">
                              <span className="list-name">Kathy Brown</span>
                              <span className="list-enq-city">
                                United States
                              </span>
                            </a>
                          </td>
                          <td>+01 3214 6522</td>
                          <td>
                            <a
                              className="__cf_email__"
                              data-cfemail="197a71787d7c777e757c597d6c747460377a7674"
                              href="https://demo.bosathemes.com/cdn-cgi/l/email-protection"
                            >
                              [email protected]
                            </a>
                          </td>
                          <td>Australia</td>
                          <td>
                            <span className="badge badge-primary">02</span>
                          </td>
                          <td>
                            <span className="badge badge-danger">12</span>
                          </td>
                          <td>
                            <span className="badge badge-success">24</span>
                          </td>
                          <td>
                            <span className="badge badge-dark">36</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <!-- Recent Activity --> */}
              <div className="col-lg-7 col-12">
                <div className="dashboard-box activities-box">
                  <h4>Recent Activities</h4>
                  <ul>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <small>5 mins ago</small>
                      <h5>Jane has sent a request for access</h5>
                      <a className="close-icon" href="#">
                        <i className="fas fa-times"></i>
                      </a>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <small>5 mins ago</small>
                      <h5>Williams has just joined Project X</h5>
                      <a className="close-icon" href="#">
                        <i className="fas fa-times"></i>
                      </a>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <small>5 mins ago</small>
                      <h5>Williams has just joined Project X</h5>
                      <a className="close-icon" href="#">
                        <i className="fas fa-times"></i>
                      </a>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <small>25 mins ago</small>
                      <h5>Kathy Brown left a review on Hotel</h5>
                      <a className="close-icon" href="#">
                        <i className="fas fa-times"></i>
                      </a>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <small>25 mins ago</small>
                      <h5>Kathy Brown left a review on Hotel</h5>
                      <a className="close-icon" href="#">
                        <i className="fas fa-times"></i>
                      </a>
                    </li>
                    <li>
                      <i className="far fa-calendar-alt"></i>
                      <small>5 mins ago</small>
                      <h5>Williams has just joined Project X</h5>
                      <a className="close-icon" href="#">
                        <i className="fas fa-times"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-xs-12">
                <div className="dashboard-box report-list">
                  <h4>Reports</h4>
                  <div className="report-list-content">
                    <div className="date">
                      <h5>Auguest 12</h5>
                    </div>
                    <div className="total-amt">
                      <strong>$1250000</strong>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2356</td>
                          <td>dummy text </td>
                          <td>6,200.00</td>
                        </tr>
                        <tr>
                          <td>4589</td>
                          <td>Lorem Ipsum</td>
                          <td>6,500.00</td>
                        </tr>
                        <tr>
                          <td>3269</td>
                          <td>specimen book</td>
                          <td>6,800.00</td>
                        </tr>
                        <tr>
                          <td>5126</td>
                          <td>Letraset sheets</td>
                          <td>7,200.00</td>
                        </tr>
                        <tr>
                          <td>7425</td>
                          <td>PageMaker</td>
                          <td>5,900.00</td>
                        </tr>
                        <tr>
                          <td>7425</td>
                          <td>PageMaker</td>
                          <td>5,900.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <!-- site traffic --> */}
              <div className="col-lg-4">
                <div className="dashboard-box chart-box">
                  <h4>Site Traffic</h4>
                  <div
                    id="chartContainer"
                    style={{ height: "250px", width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="dashboard-box chart-box">
                  <h4>Bar Chart</h4>
                  <div
                    id="barchart"
                    style={{ height: "250px", width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="col-lg-4 chart-box">
                <div className="dashboard-box">
                  <h4>Search Engine</h4>
                  <div
                    id="piechart"
                    style={{ height: "250px", width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Content / End -->
<!-- Copyrights --> */}
          <div className="copyrights">
            Copyright © 2021 Travele. All rights reserveds.
          </div>
        </div>
        {/* <!-- Dashboard / End --> */}
      </div>
      {/* <!-- end Container Wrapper -->
<!-- *Scripts* --> */}
    </>
  );
};

export default Dashboard;
