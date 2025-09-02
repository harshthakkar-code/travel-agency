import React, { useState, useEffect } from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardSidebar from "./dashboardSidebar";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch Firebase users with role filtering
      const res = await api.get("/admin/firebase-users", { params: { role: "user" } });
      const userRoleOnly = (res.data.users || []).filter(user => user.role === 'user');
      setUsers(userRoleOnly || []);
      setError("");
    } catch (err) {
      console.error('Error fetching users:', err);
      setError("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await api.delete(`/users/${userToDelete._id}`);
      setShowConfirm(false);
      setUserToDelete(null);
      await fetchUsers(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete user", err);
      setError("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div id="container-wrapper">
        <div id="dashboard" className="dashboard-container">
          <DashboardHeader />
          <DashboardSidebar />
          <div className="db-info-wrap">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              Loading users...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />

        <div className="db-info-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-box table-opp-color-box">
                <h4>User Details</h4>
                {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}
                
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr style={{ backgroundColor: "white" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Country</th>
                        <th>City</th>
                        {/* <th>Role</th> */}
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="9" style={{ textAlign: "center" }}>
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id ? user._id.slice(-4) : "----"}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>{user.mobile || "-"}</td>
                            <td>{user.country || "-"}</td>
                            <td>{user.city || "-"}</td>
                            {/* <td>
                              <span className={`badge ${user.role === 'admin' ? 'badge-warning' : 'badge-info'}`}>
                                {user.role}
                              </span>
                            </td> */}
                            <td>
                              <span
                                className="badge badge-success"
                                style={{ cursor: "pointer" }}
                                title="Edit User"
                                onClick={() => navigate(`/admin/user-edit/${user._id}`)}
                              >
                                <i className="far fa-edit"></i>
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge badge-danger"
                                style={{ cursor: "pointer" }}
                                title="Delete User"
                                onClick={() => handleDeleteClick(user)}
                              >
                                <i className="far fa-trash-alt"></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Popup */}
        {showConfirm && userToDelete && (
          <div
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1000
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                width: "90%",
              }}
            >
              <h4>Confirm Delete</h4>
              <p>
                Are you sure you want to delete{" "}
                <strong>{userToDelete.firstName} {userToDelete.lastName}</strong>?
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                This will permanently delete the user from Firebase Authentication and Firestore.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    background: "#ccc", border: "none",
                    padding: "8px 14px", borderRadius: "4px", cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    background: "#dc3545", border: "none", color: "#fff",
                    padding: "8px 14px", borderRadius: "4px", cursor: "pointer"
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="copyrights">
          Copyright © 2025 Travele. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default User;
