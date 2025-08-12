import React from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

const DbBooking = () => (
  <div id="container-wrapper">
    {/* Dashboard */}
    <div id="dashboard" className="dashboard-container">
      {/* 🔹 HEADER */}
      <DashboardHeader />
      {/* 🔹 SIDEBAR */}
      <DashboardSidebar />
      <div className="db-info-wrap db-booking">
        <div className="dashboard-box table-opp-color-box">
          <h4>Recent Booking</h4>
          <p>Airtport Hotels The Right Way To Start A Short Break Holiday</p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr style={{ backgroundColor: "white" }}>
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
