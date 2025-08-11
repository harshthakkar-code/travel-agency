import React from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

const DbPackageActive = () => (
  <div id="container-wrapper">
    {/* Dashboard */}
    <div id="dashboard" className="dashboard-container">
      {/* 🔹 HEADER */}
      <DashboardHeader />
      {/* 🔹 SIDEBAR */ }
      <DashboardSidebar />    
      <div className="db-info-wrap db-package-wrap">
        <div className="dashboard-box table-opp-color-box">
          <h4>Packages List</h4>
          <p>Nonummy hac atque adipisicing donec placeat pariatur quia ornare nisl.</p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Destination</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="package-name">Singapore Holiday Tour</span></td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td><span className="package-name">New Year‘s Eve in Paris</span></td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td><span className="package-name">Paris Honeymoon Tour</span></td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td><span className="package-name">Japan Holiday Tour</span></td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td><span className="package-name">California Trip</span></td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
                <tr>
                  <td><span className="package-name">Dubai Tour</span></td>
                  <td>12 may</td>
                  <td>Japan</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <span className="badge badge-success"><i className="far fa-edit"></i></span>
                    <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default DbPackageActive;
