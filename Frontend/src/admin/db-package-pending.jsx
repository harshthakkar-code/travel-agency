import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import { useNavigate } from "react-router-dom";

const PACKAGES_PER_PAGE = 5;

const DbPackagePending = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  // Fetch only Pending packages from backend (paginated)
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const from = (currentPage - 1) * PACKAGES_PER_PAGE;
        const to = from + PACKAGES_PER_PAGE - 1;

        const { data, error, count } = await supabase
          .from('packages')
          .select('*', { count: 'exact' })
          .eq('status', 'Pending')
          .range(from, to);

        if (error) throw error;

        setPackages(data || []);
        setTotalPages(Math.ceil((count || 0) / PACKAGES_PER_PAGE) || 1);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch packages");
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [currentPage]);

  // Pagination control handler
  // const handlePageChange = (page) => {
  //   if (page < 1 || page > totalPages) return;
  //   setCurrentPage(page);
  // };

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />
        {loading && <div>Loading...</div>}

        <div className="db-info-wrap db-package-wrap">
          <div className="dashboard-box table-opp-color-box">
            <h4>Pending Packages List</h4>
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
                        No pending packages found.
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg) => (
                      <tr key={pkg._id}>
                        <td>
                          <span className="package-name">{pkg.title}</span>
                        </td>
                        <td>{pkg.trip_duration}</td>
                        <td>{pkg.destination || "-"}</td>
                        <td>
                          <span className="badge badge-primary">{pkg.status}</span>
                        </td>
                        <td>
                          <span
                            className="badge badge-success"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/admin/edit-package/${pkg.id}`)}
                            title="Edit Package"
                          >
                            <i className="far fa-edit"></i>
                          </span>
                          <span
                            className="badge badge-danger"
                            style={{ cursor: "pointer", marginLeft: 8 }}
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

          {/* Pagination UI exactly as per your preferred style */}
          <div className="pagination-wrap">
            <nav className="pagination-inner">
              <ul className="pagination">
                <li
                  className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                  data-testid="prev-page"      // ADD THIS LINE
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
                  data-testid="next-page"
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

        {/* Inline CSS for pagination perfection */}
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

export default DbPackagePending;
