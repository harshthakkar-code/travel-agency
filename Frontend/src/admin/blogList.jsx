// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import DashboardSidebar from './dashboardSidebar';
// import DashboardHeader from './dashboardHeader';

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchBlogs(currentPage);
//   }, [currentPage]);

//   const fetchBlogs = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/blogs?page=${page}`);
      
//       // Assuming your API response structure
//       setBlogs(response.data.blogs || response.data || []);
//       setTotalPages(response.data.totalPages || 1);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching blogs:', err);
//       setError('Failed to fetch blogs');
//       setBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (blogId) => {
//     // Navigate to edit page or open edit modal
//     window.location.href = `/admin/edit-blog/${blogId}`;
//   };

//   const handleDelete = async (blogId) => {
//     if (!window.confirm('Are you sure you want to delete this blog?')) {
//       return;
//     }

//     try {
//       await api.delete(`/blogs/${blogId}`);
//       // Remove the deleted blog from the state
//       setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
//       alert('Blog deleted successfully!');
//     } catch (err) {
//       console.error('Error deleting blog:', err);
//       alert('Failed to delete blog');
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   return (
//     <div id="container-wrapper">
//       <div id="dashboard" className="dashboard-container">
//         <DashboardHeader />
//         <DashboardSidebar />

//         <div className="db-info-wrap db-package-wrap">
//           <div className="dashboard-box table-opp-color-box">
//             <h4>Blog List</h4>

//             {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

//             <div className="table-responsive">
//               <table className="table">
//                 <thead>
//                   <tr style={{ backgroundColor: "white" }}>
//                     <th>Title</th>
//                     <th>Author</th>
//                     <th>Category</th>
//                     <th>Publish Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
//                         Loading blogs...
//                       </td>
//                     </tr>
//                   ) : blogs.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
//                         No blogs found.
//                       </td>
//                     </tr>
//                   ) : (
//                     blogs.map((blog) => (
//                       <tr key={blog._id}>
//                         <td>
//                           <span className="package-name">{blog.title}</span>
//                         </td>
//                         <td>{blog.author || '-'}</td>
//                         <td>{blog.category || '-'}</td>
//                         <td>{formatDate(blog.createdAt || blog.publishDate)}</td>
//                         <td>
//                           <span
//                             className="badge badge-success"
//                             style={{ 
//                               cursor: "pointer", 
//                               marginRight: "5px",
//                               padding: "5px 8px",
//                               fontSize: "12px"
//                             }}
//                             title="Edit"
//                             onClick={() => handleEdit(blog._id)}
//                           >
//                             <i className="far fa-edit"></i>
//                           </span>
//                           <span
//                             className="badge badge-danger"
//                             style={{ 
//                               cursor: "pointer",
//                               padding: "5px 8px",
//                               fontSize: "12px"
//                             }}
//                             title="Delete"
//                             onClick={() => handleDelete(blog._id)}
//                           >
//                             <i className="far fa-trash-alt"></i>
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Dynamic Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination-wrap">
//               <nav className="pagination-inner">
//                 <ul className="pagination">
//                   <li
//                     className={`page-item${currentPage === 1 ? " disabled" : ""}`}
//                     onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
//                   >
//                     <span className="page-link">
//                       <i className="fas fa-chevron-left"></i>
//                     </span>
//                   </li>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <li
//                       key={i + 1}
//                       className={`page-item${currentPage === i + 1 ? " active" : ""}`}
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       <a href="#" className="page-link">{i + 1}</a>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item${currentPage === totalPages ? " disabled" : ""}`}
//                     onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
//                   >
//                     <a className="page-link" href="#">
//                       <i className="fas fa-chevron-right"></i>
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           )}
//         </div>

//         <div className="copyrights">
//           Copyright © 2025 Travele. All rights reserveds.
//         </div>

//         {/* Inline CSS for pagination styling */}
//         <style>{`
//           .pagination-wrap {
//             display: flex;
//             justify-content: center;
//             margin-top: 2em;
//           }
//           .pagination {
//             display: flex;
//             list-style: none;
//             background: none;
//             border: none;
//           }
//           .pagination .page-item {
//             margin: 0 6px;
//           }
//           .pagination .page-link {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: #fff;
//             color: #000;
//             border: 1.5px solid #e3e6ef;
//             font-weight: 500;
//             font-size: 18px;
//             transition: background 0.15s, color 0.15s;
//             text-decoration: none;
//             cursor: pointer;
//             outline: none;
//             box-shadow: 0 2px 6px rgba(33,118,237,0.02);
//           }
//           .pagination .page-item.active .page-link,
//           .pagination .page-link.active {
//             background: #2176ed;
//             color: #fff;
//             border: 2.5px solid #2176ed;
//             font-weight: bold;
//             box-shadow: 0 3px 12px rgba(33,118,237,0.12);
//           }
//           .pagination .page-item.disabled .page-link {
//             color: #bbb;
//             background: #f7f9fb;
//             cursor: not-allowed;
//             border: 1.5px solid #e3e6ef;
//           }
//           .pagination .page-item:not(.active):not(.disabled) .page-link:hover {
//             background: #e3e6ef;
//             color: #black;
//           }
//           @media (max-width: 600px) {
//             .pagination .page-link {
//               width: 28px;
//               height: 28px;
//               font-size: 14px;
//             }
//             .pagination-wrap { margin-top: 1em; }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default BlogList;



import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import DashboardSidebar from './dashboardSidebar';
import DashboardHeader from './dashboardHeader';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // For custom delete confirmation popup
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/blogs?page=${page}`);
      
      setBlogs(response.data.blogs || response.data || []);
      setTotalPages(response.data.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blogId) => {
    window.location.href = `/admin/edit-blog/${blogId}`;
  };

  // Show custom confirmation popup
  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setBlogToDelete(null);
  };

  // Execute delete action
  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await api.delete(`/blogs/${blogToDelete._id}`);
      // Remove the deleted blog from the state
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogToDelete._id));
      setBlogToDelete(null); // Close the popup
      // You can add a success message here if needed
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
      setBlogToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />

        <div className="db-info-wrap db-package-wrap">
          <div className="dashboard-box table-opp-color-box">
            <h4>Blog List</h4>

            {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ backgroundColor: "white" }}>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Publish Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                        Loading blogs...
                      </td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                        No blogs found.
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td>
                          <span className="package-name">{blog.title}</span>
                        </td>
                        <td>{blog.author || '-'}</td>
                        <td>{blog.category || '-'}</td>
                        <td>{formatDate(blog.createdAt || blog.publishDate)}</td>
                        <td>
                          <span
                            className="badge badge-success"
                            style={{ 
                              cursor: "pointer", 
                              marginRight: "5px",
                              padding: "5px 8px",
                              fontSize: "12px"
                            }}
                            title="Edit"
                            onClick={() => handleEdit(blog._id)}
                          >
                            <i className="far fa-edit"></i>
                          </span>
                          <span
                            className="badge badge-danger"
                            style={{ 
                              cursor: "pointer",
                              padding: "5px 8px",
                              fontSize: "12px"
                            }}
                            title="Delete"
                            onClick={() => confirmDelete(blog)}
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

          {/* Custom Delete Confirmation Popup */}
          {blogToDelete && (
            <div className="confirmation-popup-overlay">
              <div className="confirmation-popup">
                <div className="popup-header">
                  <h5>Confirm Deletion</h5>
                </div>
                <div className="popup-body">
                  <p>Are you sure you want to delete <strong>"{blogToDelete.title}"</strong>?</p>
                  {/* <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                    This action cannot be undone.
                  </p> */}
                </div>
                <div className="popup-footer">
                  <button 
                    className="btn btn-danger" 
                    onClick={handleDelete}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px',
                      fontSize: '14px'
                    }}
                  >
                    Yes, Delete
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={cancelDelete}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    No, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Pagination */}
          {totalPages > 1 && (
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
          )}
        </div>

        <div className="copyrights">
          Copyright © 2025 Travele. All rights reserveds.
        </div>

        {/* CSS for popup and pagination styling */}
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
            color: #black;
          }
          
          /* Custom Confirmation Popup Styles */
          .confirmation-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease-out;
          }
          
          .confirmation-popup {
            background: white;
            border-radius: 8px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
          }
          
          .popup-header {
            padding: 20px 20px 0 20px;
            border-bottom: 1px solid #e9ecef;
          }
          
          .popup-header h5 {
            margin: 0;
            color: #333;
            font-size: 18px;
            font-weight: 600;
          }
          
          .popup-body {
            padding: 20px;
            text-align: center;
          }
          
          .popup-body p {
            margin: 0 0 10px 0;
            color: #333;
            line-height: 1.5;
          }
          
          .popup-footer {
            padding: 0 20px 20px 20px;
            text-align: center;
          }
          
          .btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @media (max-width: 600px) {
            .pagination .page-link {
              width: 28px;
              height: 28px;
              font-size: 14px;
            }
            .pagination-wrap { 
              margin-top: 1em; 
            }
            .confirmation-popup {
              margin: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default BlogList;
