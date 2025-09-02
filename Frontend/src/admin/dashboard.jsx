import React, { useEffect, useState } from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import api from "../utils/api";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const [errorBookings, setErrorBookings] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorTransactions, setErrorTransactions] = useState(null);

    useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Adjust the API URL and query params as per your backend implementation
        const res = await api.get("/bookings?limit=5&sort=desc");
        // setBookings(res.data || []);
        setBookings((res.data || []).slice(0, 5));
      } catch (err) {
        setErrorBookings("Failed to load bookings");
        setBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

const fetchUsers = async () => {
  try {
    // Fetch all users from backend
    const res = await api.get("/admin/firebase-users");
    
    // Filter to get only users with role 'user' (exclude admins)
    const userRoleOnly = (res.data.users || []).filter(user => user.role === 'user');
    
    // Set users to display (limit to first 7 users)
    setUsers(userRoleOnly.slice(0, 7));
    
    // Set total count to total number of users with role 'user'
    setTotalUsers(userRoleOnly.length);
  } catch (err) {
    setErrorUsers("Failed to load users");
    setUsers([]);
  } finally {
    setLoadingUsers(false);
  }
};



    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions");
        setTransactions((res.data.transactions || []).slice(0, 6));
        setTotalEarnings(res.data.totalAmount);

      } catch (err) {
        setErrorTransactions("Failed to load transactions");
        setTransactions([]);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchBookings();
    fetchUsers();
    fetchTransactions();
  }, []);

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
                    <h5>{totalEarnings || 0}</h5>
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
                    <h5>{totalUsers || 0}</h5>
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
                 <div className="dashboard-box">
                  <h4>Recent Bookings</h4>
                  <p>Airtport Hotels The Right Way To Start a Short Break Holiday</p>
                  {loadingBookings && <p>Loading bookings...</p>}
                  {errorBookings && <p>{errorBookings}</p>}
                  {!loadingBookings && !errorBookings && bookings.length === 0 && (
                    <p>No bookings found.</p>
                  )}
                  {!loadingBookings && !errorBookings && bookings.length > 0 && (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr style={{ backgroundColor: "white" }}>
                            {/* <th>Select</th> */}
                            <th>User</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>City</th>
                            {/* <th>Enquiry</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking._id}>
                              {/* <td>
                                <label className="custom-input">
                                  <input type="checkbox" />
                                  <span className="custom-input-field"></span>
                                </label>
                              </td> */}
                              <td>{booking.user?.firstName} {booking.user?.lastName}</td>
                              <td>{booking.package?.packageTitle}</td>
                              <td>{new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}</td>
                              <td>{booking.package?.destination}</td>
                              {/* <td><span className="badge badge-primary">{booking.enquiry_count || booking.enquiry || 0}</span></td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                        <tr style={{ backgroundColor: "white" }}>
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
                  <h4>User List</h4>
                  <p>List of registered users.</p>
                  {loadingUsers && <p>Loading users...</p>}
                  {errorUsers && <p>{errorUsers}</p>}
                  {!loadingUsers && !errorUsers && users.length === 0 && (
                    <p>No users found.</p>
                  )}
                  {!loadingUsers && !errorUsers && users.length > 0 && (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr style={{ backgroundColor: "white" }}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Country</th>
                            <th>City</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id}>
                              <td>{user.firstName} {user.lastName}</td>
                              <td>{user.email}</td>
                              <td>{user.mobile || user.phone || "-"}</td>
                              <td>{user.country || "-"}</td>
                              <td>{user.city || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                <div className="dashboard-box">
                  <h4>Earnings</h4>
                  {/* <p>Latest transactions data.</p> */}
                  {loadingTransactions && <p>Loading transactions...</p>}
                  {errorTransactions && <p>{errorTransactions}</p>}
                  {!loadingTransactions && !errorTransactions && transactions.length === 0 && (
                    <p>No transactions found.</p>
                  )}
                  {!loadingTransactions && !errorTransactions && transactions.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead >
                          <tr style={{ backgroundColor: "white" }}>
                            {/* <th>ID</th> */}
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.slice(0, 10).map((txn) => (
                            <tr key={txn._id}>
                              {/* <td>{txn._id}</td> */}
                              <td>{txn.user.firstName}</td>
                              <td>${(txn.amount / 100).toFixed(2)}</td>
                              <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
                              <td>{txn.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                {/* <div className="dashboard-box report-list">
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
                        <tr style={{ backgroundColor: "white" }}>
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
                </div> */}
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
            Copyright © 2025 Travele. All rights reserveds.
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
