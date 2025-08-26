import React, { useEffect, useState } from "react";
import api from "../utils/api";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

const DbPackageExpired = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PACKAGES_PER_PAGE = 5; // adjust as needed

  // Fetch Expired packages on mount & when page changes
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/packages", {
          params: { status: "Expired", page: currentPage, limit: PACKAGES_PER_PAGE },
        });
        setPackages(res.data.packages || []);
        setTotalPages(res.data.totalPages || 1);
        setError("");
      } catch (err) {
        setError("Failed to fetch expired packages");
        setPackages([]);
      }
    };
    fetchPackages();
  }, [currentPage]);

  // Pagination control handler
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />

        <div className="db-info-wrap db-package-wrap">
          <div className="dashboard-box table-opp-color-box">
            <h4>Expired Packages List</h4>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ backgroundColor: "white" }}>
                    <th>Name</th>
                    <th>Trip Duration</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No expired packages found.
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg) => (
                      <tr key={pkg._id}>
                        <td>
                          <span className="package-name">{pkg.title}</span>
                        </td>
                        <td>{pkg.tripDuration}</td>
                        <td>{pkg.destination || "-"}</td>
                        <td>
                          <span className="badge badge-danger">{pkg.status}</span>
                        </td>
                        <td>
                          <span
                            className="badge badge-success"
                            style={{ cursor: "pointer", marginRight: "5px" }}
                            title="Edit"
                          >
                            <i className="far fa-edit"></i>
                          </span>
                          <span
                            className="badge badge-danger"
                            style={{ cursor: "pointer" }}
                            title="Delete"
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

          {/* Dynamic Pagination */}
          <div className="pagination-wrap">
            <nav className="pagination-inner">
              <ul className="pagination">
                <li
                  className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                  <span className="page-link">
                    <i className="fas fa-chevron-left"></i>
                  </span>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item${currentPage === i + 1 ? " active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    <a href="#" className="page-link">{i + 1}</a>
                  </li>
                ))}
                <li
                  className={`page-item${currentPage === totalPages ? " disabled" : ""}`}
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                >
                  <a className="page-link" href="#">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="copyrights">
          Copyright © 2025 Travele. All rights reserveds.
        </div>

        {/* Inline CSS for pagination styling - ONLY for this component */}
      <style>{`
    .pagination-wrap {
      display: flex;
      justify-content: center;
      margin-top: 2em;
    }
    .pagination {
      display: flex;
      list-style: none;
      background: none;
      border: none;
    }
    .pagination .page-item {
      margin: 0 6px;
    }
    .pagination .page-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fff;
      color: #000;
      border: 1.5px solid #e3e6ef;
      font-weight: 500;
      font-size: 18px;
      transition: background 0.15s, color 0.15s;
      text-decoration: none;
      cursor: pointer;
      outline: none;
      box-shadow: 0 2px 6px rgba(33,118,237,0.02);
    }
    .pagination .page-item.active .page-link,
    .pagination .page-link.active {
      background: #2176ed;
      color: #fff;
      border: 2.5px solid #2176ed;
      font-weight: bold;
      box-shadow: 0 3px 12px rgba(33,118,237,0.12);
    }
    .pagination .page-item.disabled .page-link {
      color: #bbb;
      background: #f7f9fb;
      cursor: not-allowed;
      border: 1.5px solid #e3e6ef;
    }
    .pagination .page-item:not(.active):not(.disabled) .page-link:hover {
      background: #e3e6ef;
      color: #lack;
    }
    @media (max-width: 600px) {
      .pagination .page-link {
        width: 28px;
        height: 28px;
        font-size: 14px;
      }
      .pagination-wrap { margin-top: 1em; }
    }
  `}</style>
      </div>
    </div>
  );
};

export default DbPackageExpired;
