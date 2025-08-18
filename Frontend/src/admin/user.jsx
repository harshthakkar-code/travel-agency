// import React, { useState, useEffect } from "react";
// import DashboardHeader from "./dashboardHeader";
// import DashboardSidebar from "./dashboardSidebar";
// import api from "../utils/api"; // Axios instance
// import { useNavigate } from "react-router-dom";

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // For responsive tweaks
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
//   useEffect(() => {
//     const handleResize = () => setIsDesktop(window.innerWidth > 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Fetch users on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await api.get("/users", { params: { role: "user" } });
//         setUsers(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div id="container-wrapper">
//       <div id="dashboard" className="dashboard-container">
//         {/* HEADER */}
//         <DashboardHeader />
//         {/* SIDEBAR */}
//         <DashboardSidebar />

//         <div className="db-info-wrap" style={isDesktop ? {} : {}}>
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="dashboard-box table-opp-color-box">
//                 <h4>User Details</h4>
//                 {error && <div style={{ color: "red" }}>{error}</div>}
//                 <div className="table-responsive">
//                   <table className="table">
//                     <thead>
//                       <tr style={{ backgroundColor: "white" }}>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Phone</th>
//                         <th>Email</th>
//                         <th>Country</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {users.length === 0 ? (
//                         <tr>
//                           <td colSpan="7" style={{ textAlign: "center" }}>
//                             No users found.
//                           </td>
//                         </tr>
//                       ) : (
//                         users.map((user) => (
//                           <tr key={user._id}>
//                             {/* Last 4 chars of ID */}
//                             <td>{user._id ? user._id.slice(-4) : "----"}</td>
//                             <td>
//                               <span className="list-name">
//                                 {user.firstName} {user.lastName}
//                               </span>
//                             </td>
//                             <td>{user.mobile || "-"}</td>
//                             <td>
//                               <a href={`mailto:${user.email}`}>{user.email}</a>
//                             </td>
//                             <td>{user.country || "-"}</td>
//                             <td>
//                               <span
//                                 className="badge badge-success"
//                                 style={{ cursor: "pointer" }}
//                                 title="Edit User"
//                                 onClick={() => navigate(`/admin/user-edit/${user._id}`)}
//                               >
//                                 <i className="far fa-edit"></i>
//                               </span>
//                             </td>
//                             <td>
//                               <span
//                                 className="badge badge-danger"
//                                 style={{ cursor: "pointer" }}
//                                 title="Delete User"
//                               >
//                                 <i className="far fa-trash-alt"></i>
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="copyrights">
//           Copyright © 2021 Travele. All rights reserveds.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;


import React, { useState, useEffect } from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardSidebar from "./dashboardSidebar";
import api from "../utils/api"; // Axios instance
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", { params: { role: "user" } });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
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
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />

        <div className="db-info-wrap" style={isDesktop ? {} : {}}>
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-box table-opp-color-box">
                <h4>User Details</h4>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr style={{ backgroundColor: "white" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center" }}>
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id ? user._id.slice(-4) : "----"}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.mobile || "-"}</td>
                            <td>
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>{user.country || "-"}</td>
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
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    background: "#ccc", border: "none",
                    padding: "8px 14px", borderRadius: "4px", cursor: "pointer"
                  }}
                >
                  No
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
          Copyright © 2021 Travele. All rights reserveds.
        </div>
      </div>
    </div>
  );
};

export default User;
