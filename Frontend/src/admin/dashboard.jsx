import React, { useEffect, useState } from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import { supabase } from "../supabaseClient";
import DashboardStatCard from "./components/DashboardStatCard";
import RecentBookingsTable from "./components/RecentBookingsTable";

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
        const { data, error } = await supabase
          .from('bookings')
          .select('*, user:users(first_name, last_name), package:packages(title, destination)')
          .order('booking_date', { ascending: false })
          .limit(5);

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        console.error(err);
        setErrorBookings("Failed to load bookings");
      } finally {
        setLoadingBookings(false);
      }
    };

    const fetchUsers = async () => {
      try {
        // Fetch users
        const { data, error, count } = await supabase
          .from('users')
          .select('*', { count: 'exact' })
          .eq('role', 'user')
          .limit(7);

        if (error) throw error;

        setUsers(data || []);
        setTotalUsers(count || 0);
      } catch (err) {
        console.error(err);
        setErrorUsers("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*, user:users(first_name)')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setTransactions(data || []);

        // Calculate total earnings (simplified)
        // For real app, use a subtle RPC or separate query for sum
        const { data: allTxns } = await supabase.from('transactions').select('amount');
        const total = allTxns?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;
        setTotalEarnings(total / 100); // Assuming amount is in cents
      } catch (err) {
        console.error(err);
        setErrorTransactions("Failed to load transactions");
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
      <div id="container-wrapper">
        <div className="dashboard-container" id="dashboard">
          <DashboardHeader />
          <DashboardSidebar />

          <div className="db-info-wrap">
            {/* Stats Grid */}
            <div className="dashboard-grid">
              <DashboardStatCard
                title="Total Views"
                value="22,520"
                icon="far fa-chart-bar"
                colorClass="bg-blue"
              />
              <DashboardStatCard
                title="Earnings"
                value={`$${totalEarnings.toFixed(2)}`}
                icon="fas fa-dollar-sign"
                colorClass="bg-green"
              />
              <DashboardStatCard
                title="Users"
                value={totalUsers}
                icon="fas fa-users"
                colorClass="bg-purple"
              />
              <DashboardStatCard
                title="Enquiries"
                value="1,520"
                icon="far fa-envelope-open"
                colorClass="bg-red"
              />
            </div>

            {/* Recent Bookings & Enquiry */}
            <div className="dashboard-row-grid">
              <div className="dashboard-card">
                <h4>Recent Bookings</h4>
                <p>Latest flight and tour reservations.</p>
                <RecentBookingsTable
                  bookings={bookings}
                  loading={loadingBookings}
                  error={errorBookings}
                />
              </div>

              <div className="dashboard-card">
                <h4>Package Enquiry</h4>
                <p>Recent enquiries from potential customers.</p>
                {/* Placeholder for Enquiry Table or List */}
                <div className="table-responsive">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>12 May</td>
                        <td>Japan</td>
                        <td><span className="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>14 May</td>
                        <td>Paris</td>
                        <td><span className="badge badge-warning">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="row">
              <div className="col-12">
                <div className="dashboard-card">
                  <h4>User List</h4>
                  <p>Registered users overview.</p>
                  {loadingUsers ? <p>Loading...</p> : (
                    <div className="table-responsive">
                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Country</th>
                            <th>City</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td>{user.first_name} {user.last_name}</td>
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

            {/* Recent Activity & Earnings */}
            <div className="dashboard-row-grid mt-4">
              <div className="dashboard-card">
                <h4>Recent Activities</h4>
                <ul className="dashboard-activity-list pl-0 list-unstyled">
                  <li className="d-flex align-items-center mb-3">
                    <div className="activity-icon bg-blue text-white rounded-circle d-flex align-items-center justify-content-center mr-3" style={{ width: '40px', height: '40px' }}>
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    <div>
                      <h5 className="mb-0 text-sm">New booking received</h5>
                      <small className="text-muted">5 mins ago</small>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <div className="activity-icon bg-green text-white rounded-circle d-flex align-items-center justify-content-center mr-3" style={{ width: '40px', height: '40px' }}>
                      <i className="fas fa-user-plus"></i>
                    </div>
                    <div>
                      <h5 className="mb-0 text-sm">New user registered</h5>
                      <small className="text-muted">15 mins ago</small>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="dashboard-card">
                <h4>Transaction History</h4>
                {loadingTransactions ? <p>Loading...</p> : (
                  <div className="table-responsive">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(txn => (
                          <tr key={txn.id}>
                            <td>{txn.user?.first_name}</td>
                            <td>${(txn.amount / 100).toFixed(2)}</td>
                            <td>{new Date(txn.created_at).toLocaleDateString()}</td>
                            <td>{txn.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
          <div className="copyrights">
            Copyright © 2025 Travele. All rights reserveds.
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
