import React from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardSidebar from "./dashboardSidebar";

const users = [
  {
    img: "assets/images/comment.jpg",
    name: "Kathy Brown",
    phone: "+01 3214 6522",
    email: "[email protected]",
    country: "Australia",
    listings: "02",
  },
  {
    img: "assets/images/comment2.jpg",
    name: "Kathy Brown",
    phone: "+01 3214 6522",
    email: "[email protected]",
    country: "Australia",
    listings: "02",
  },
  {
    img: "assets/images/comment3.jpg",
    name: "Kathy Brown",
    phone: "+01 3214 6522",
    email: "[email protected]",
    country: "Australia",
    listings: "02",
  },
  {
    img: "assets/images/comment4.jpg",
    name: "Kathy Brown",
    phone: "+01 3214 6522",
    email: "[email protected]",
    country: "Australia",
    listings: "02",
  },
  {
    img: "assets/images/comment5.jpg",
    name: "Kathy Brown",
    phone: "+01 3214 6522",
    email: "[email protected]",
    country: "Australia",
    listings: "02",
  },
  {
    img: "assets/images/comment6.jpg",
    name: "Kathy Brown",
    phone: "+01 3214 6522",
    email: "[email protected]",
    country: "Australia",
    listings: "02",
  },
];

const User = () => (
  <div id="container-wrapper">
    <div id="dashboard" className="dashboard-container">

        {/* 🔹 HEADER */}
      <DashboardHeader />

      {/* 🔹 SIDEBAR */}
      <DashboardSidebar />
      <div className="db-info-wrap">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-box table-opp-color-box">
              <h4>User Details</h4>
              <p>Airtport Hotels The Right Way To Start A Short Break Holiday</p>
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
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx}>
                        <td>
                          <span className="list-img">
                            <img src={user.img} alt="" />
                          </span>
                        </td>
                        <td>
                          <a href="#">
                            <span className="list-name">{user.name}</span>
                          </a>
                        </td>
                        <td>{user.phone}</td>
                        <td>
                          <a href="#">{user.email}</a>
                        </td>
                        <td>{user.country}</td>
                        <td>
                          <span className="badge badge-primary">{user.listings}</span>
                        </td>
                        <td>
                          <span className="badge badge-success">
                            <i className="far fa-eye"></i>
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-success">
                            <i className="far fa-edit"></i>
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-danger">
                            <i className="far fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright footer */}
      <div className="copyrights">
        Copyright © 2021 Travele. All rights reserveds.
      </div>
    </div>
  </div>
);

export default User;
