// import React from "react";
// import Header from "./Header";

// const BlogArchive = () => (
//   <div id="page" className="full-page">
//     {/* Header */}
//     <Header />

//     {/* Main Content */}
//     <main id="content" className="site-main">
//       {/* Inner Banner */}
//       <section className="inner-banner-wrap">
//         <div className="inner-baner-container" style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}>
//           <div className="container">
//             <div className="inner-banner-content">
//               <h1 className="inner-title">Archives</h1>
//             </div>
//           </div>
//         </div>
//         <div className="inner-shape"></div>
//       </section>

//       <div className="archive-section blog-archive">
//         <div className="archive-inner">
//           <div className="container">
//             <div className="row">
//               {/* --- Blog Posts (Right Sidebar) --- */}
//               <div className="col-lg-12 primary right-sidebar">
//                 <div className="grid row">
//                   {/* Repeat for each post */}
//                   <div className="grid-item col-md-6">
//                     <article className="post">
//                       <figure className="feature-image">
//                         <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
//                       </figure>
//                       <div className="entry-content">
//                         <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
//                         <div className="entry-meta">
//                           <span className="byline"><a href="#">Demoteam</a></span>
//                           <span className="posted-on"><a href="#">August 17, 2021</a></span>
//                           <span className="comments-link"><a href="#">No Comments</a></span>
//                         </div>
//                         <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
//                         <a href="#" className="button-text">CONTINUE READING..</a>
//                       </div>
//                     </article>
//                   </div>
//                   <div className="grid-item col-md-6">
//                     <article className="post">
//                       <figure className="feature-image">
//                         <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
//                       </figure>
//                       <div className="entry-content">
//                         <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
//                         <div className="entry-meta">
//                           <span className="byline"><a href="#">Demoteam</a></span>
//                           <span className="posted-on"><a href="#">August 17, 2021</a></span>
//                           <span className="comments-link"><a href="#">No Comments</a></span>
//                         </div>
//                         <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
//                         <a href="#" className="button-text">CONTINUE READING..</a>
//                       </div>
//                     </article>
//                   </div>
//                   <div className="grid-item col-md-6">
//                     <article className="post">
//                       <figure className="feature-image">
//                         <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
//                       </figure>
//                       <div className="entry-content">
//                         <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
//                         <div className="entry-meta">
//                           <span className="byline"><a href="#">Demoteam</a></span>
//                           <span className="posted-on"><a href="#">August 17, 2021</a></span>
//                           <span className="comments-link"><a href="#">No Comments</a></span>
//                         </div>
//                         <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
//                         <a href="#" className="button-text">CONTINUE READING..</a>
//                       </div>
//                     </article>
//                   </div>
//                   <div className="grid-item col-md-6">
//                     <article className="post">
//                       <figure className="feature-image">
//                         <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
//                       </figure>
//                       <div className="entry-content">
//                         <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
//                         <div className="entry-meta">
//                           <span className="byline"><a href="#">Demoteam</a></span>
//                           <span className="posted-on"><a href="#">August 17, 2021</a></span>
//                           <span className="comments-link"><a href="#">No Comments</a></span>
//                         </div>
//                         <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
//                         <a href="#" className="button-text">CONTINUE READING..</a>
//                       </div>
//                     </article>
//                   </div>
//                   <div className="grid-item col-md-6">
//                     <article className="post">
//                       <figure className="feature-image">
//                         <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
//                       </figure>
//                       <div className="entry-content">
//                         <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
//                         <div className="entry-meta">
//                           <span className="byline"><a href="#">Demoteam</a></span>
//                           <span className="posted-on"><a href="#">August 17, 2021</a></span>
//                           <span className="comments-link"><a href="#">No Comments</a></span>
//                         </div>
//                         <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
//                         <a href="#" className="button-text">CONTINUE READING..</a>
//                       </div>
//                     </article>
//                   </div>
//                   {/* ...other posts (copy structure above and update image/content) */}
//                   <div className="grid-item col-md-6">
//                     <article className="post">
//                       <figure className="feature-image">
//                         <a href="#"><img src="assets/images/img18.jpg" alt="" /></a>
//                       </figure>
//                       <div className="entry-content">
//                         <h3><a href="#">Take only memories, leave only footprints</a></h3>
//                         <div className="entry-meta">
//                           <span className="byline"><a href="#">Demoteam</a></span>
//                           <span className="posted-on"><a href="#">August 17, 2021</a></span>
//                           <span className="comments-link"><a href="#">No Comments</a></span>
//                         </div>
//                         <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
//                         <a href="#" className="button-text">CONTINUE READING..</a>
//                       </div>
//                     </article>
//                   </div>
//                   {/* ...repeat for remaining posts... */}
//                 </div>
//                 {/* Pagination */}
//                 <div className="post-navigation-wrap">
//                   <nav>
//                     <ul className="pagination">
//                       <li><a href="#"><i className="fas fa-arrow-left"></i></a></li>
//                       <li className="active"><a href="#">1</a></li>
//                       <li><a href="#">..</a></li>
//                       <li><a href="#">5</a></li>
//                       <li><a href="#"><i className="fas fa-arrow-right"></i></a></li>
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//               {/* --- Sidebar (Right) --- */}
           
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>

//     {/* Footer */}
//     <footer id="colophon" className="site-footer footer-primary">
//       <div className="top-footer">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_text">
//                 <h3 className="widget-title">About Travel</h3>
//                 <div className="textwidget widget-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
//                 </div>
//                 <div className="award-img">
//                   <a href="#"><img src="assets/images/logo6.png" alt="" /></a>
//                   <a href="#"><img src="assets/images/logo2.png" alt="" /></a>
//                 </div>
//               </aside>
//             </div>
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_text">
//                 <h3 className="widget-title">CONTACT INFORMATION</h3>
//                 <div className="textwidget widget-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   <ul>
//                     <li><a href="#"><i className="fas fa-phone-alt"></i> +01 (977) 2599 12</a></li>
//                     <li><a href="#"><i className="fas fa-envelope"></i> [email&#160;protected]</a></li>
//                     <li><i className="fas fa-map-marker-alt"></i> 3146  Koontz, California</li>
//                   </ul>
//                 </div>
//               </aside>
//             </div>
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_recent_post">
//                 <h3 className="widget-title">Latest Post</h3>
//                 <ul>
//                   <li>
//                     <h5><a href="#">Life is a beautiful journey not a destination</a></h5>
//                     <div className="entry-meta">
//                       <span className="post-on"><a href="#">August 17, 2021</a></span>
//                       <span className="comments-link"><a href="#">No Comments</a></span>
//                     </div>
//                   </li>
//                   <li>
//                     <h5><a href="#">Take only memories, leave only footprints</a></h5>
//                     <div className="entry-meta">
//                       <span className="post-on"><a href="#">August 17, 2021</a></span>
//                       <span className="comments-link"><a href="#">No Comments</a></span>
//                     </div>
//                   </li>
//                 </ul>
//               </aside>
//             </div>
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_newslatter">
//                 <h3 className="widget-title">SUBSCRIBE US</h3>
//                 <div className="widget-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </div>
//                 <form className="newslatter-form">
//                   <input type="email" name="s" placeholder="Your Email.." />
//                   <input type="submit" name="s" value="SUBSCRIBE NOW" />
//                 </form>
//               </aside>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="buttom-footer">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-5">
//               <div className="footer-menu">
//                 <ul>
//                   <li><a href="#">Privacy Policy</a></li>
//                   <li><a href="#">Term & Condition</a></li>
//                   <li><a href="#">FAQ</a></li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-md-2 text-center">
//               <div className="footer-logo">
//                 <a href="#"><img src="assets/images/travele-logo.png" alt="" /></a>
//               </div>
//             </div>
//             <div className="col-md-5">
//               <div className="copy-right text-right">Copyright © 2021 Travele. All rights reserveds</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//     <a id="backTotop" href="#" className="to-top-icon">
//       <i className="fas fa-chevron-up"></i>
//     </a>
//     {/* Custom search overlay */}
//     <div className="header-search-form">
//       <div className="container">
//         <div className="header-search-container">
//           <form className="search-form" role="search" method="get">
//             <input type="text" name="s" placeholder="Enter your text..." />
//           </form>
//           <a href="#" className="search-close">
//             <i className="fas fa-times"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default BlogArchive;


import React, { useState, useEffect } from "react";
import api from "./utils/api";
import Header from "./Header";

const BlogArchive = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs?page=${currentPage}`);
        
        // Assuming your API response structure
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

    fetchBlogs();
  }, [currentPage]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle pagination clicks
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  // Get excerpt from content
  const getExcerpt = (content, length = 150) => {
    if (!content) return "No content available...";
    return content.length > length ? content.substring(0, length) + "..." : content;
  };

  return (
    <div id="page" className="full-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div className="inner-baner-container" style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}>
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Archives</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        <div className="archive-section blog-archive">
          <div className="archive-inner">
            <div className="container">
              <div className="row">
                {/* Blog Posts (Right Sidebar) */}
                <div className="col-lg-12 primary right-sidebar">
                  <div className="grid row">
                    {/* Loading State */}
                    {loading && (
                      <div className="col-12 text-center" style={{ padding: "50px 0" }}>
                        <h3>Loading blogs...</h3>
                      </div>
                    )}

                    {/* Error State */}
                    {error && (
                      <div className="col-12 text-center" style={{ padding: "50px 0" }}>
                        <h3 style={{ color: "red" }}>{error}</h3>
                      </div>
                    )}

                    {/* No Blogs State */}
                    {!loading && !error && blogs.length === 0 && (
                      <div className="col-12 text-center" style={{ padding: "50px 0" }}>
                        <h3>No blogs found.</h3>
                        <p>Check back later for new content!</p>
                      </div>
                    )}

                    {/* Dynamic Blog Posts */}
                    {!loading && !error && blogs.map((blog) => (
                      <div key={blog._id} className="grid-item col-md-6">
                        <article className="post">
                          <figure className="feature-image">
                            <a href={`/blog-single/${blog._id}`}>
                              <img 
                                src={blog.image || "assets/images/img17.jpg"} 
                                alt={blog.title} 
                              />
                            </a>
                          </figure>
                          <div className="entry-content">
                            <h3>
                              <a href={`/blog-single/${blog._id}`}>
                                {blog.title}
                              </a>
                            </h3>
                            <div className="entry-meta">
                              <span className="byline">
                                <a href="#">{blog.author || "Admin"}</a>
                              </span>
                              <span className="posted-on">
                                <a href="#">{formatDate(blog.createdAt)}</a>
                              </span>
                              <span className="comments-link">
                                <a href="#">No Comments</a>
                              </span>
                            </div>
                            <p>{getExcerpt(blog.content)}</p>
                            <a href={`/blog-single/${blog._id}`} className="button-text">
                              CONTINUE READING..
                            </a>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Pagination */}
                  {totalPages > 1 && (
                    <div className="post-navigation-wrap">
                      <nav>
                        <ul className="pagination">
                          {/* Previous Page */}
                          <li 
                            className={currentPage === 1 ? "disabled" : ""}
                            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                          >
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) handlePageClick(currentPage - 1);
                              }}
                            >
                              <i className="fas fa-arrow-left"></i>
                            </a>
                          </li>

                          {/* Page Numbers */}
                          {[...Array(totalPages)].map((_, i) => (
                            <li 
                              key={i + 1} 
                              className={currentPage === i + 1 ? "active" : ""}
                              style={{ cursor: "pointer" }}
                            >
                              <a 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageClick(i + 1);
                                }}
                              >
                                {i + 1}
                              </a>
                            </li>
                          ))}

                          {/* Next Page */}
                          <li 
                            className={currentPage === totalPages ? "disabled" : ""}
                            style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                          >
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) handlePageClick(currentPage + 1);
                              }}
                            >
                              <i className="fas fa-arrow-right"></i>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="colophon" className="site-footer footer-primary">
        <div className="top-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_text">
                  <h3 className="widget-title">About Travel</h3>
                  <div className="textwidget widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </div>
                  <div className="award-img">
                    <a href="#"><img src="assets/images/logo6.png" alt="" /></a>
                    <a href="#"><img src="assets/images/logo2.png" alt="" /></a>
                  </div>
                </aside>
              </div>
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_text">
                  <h3 className="widget-title">CONTACT INFORMATION</h3>
                  <div className="textwidget widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <ul>
                      <li><a href="#"><i className="fas fa-phone-alt"></i> +01 (977) 2599 12</a></li>
                      <li><a href="#"><i className="fas fa-envelope"></i> [email&#160;protected]</a></li>
                      <li><i className="fas fa-map-marker-alt"></i> 3146  Koontz, California</li>
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_recent_post">
                  <h3 className="widget-title">Latest Post</h3>
                  <ul>
                    <li>
                      <h5><a href="#">Life is a beautiful journey not a destination</a></h5>
                      <div className="entry-meta">
                        <span className="post-on"><a href="#">August 17, 2021</a></span>
                        <span className="comments-link"><a href="#">No Comments</a></span>
                      </div>
                    </li>
                    <li>
                      <h5><a href="#">Take only memories, leave only footprints</a></h5>
                      <div className="entry-meta">
                        <span className="post-on"><a href="#">August 17, 2021</a></span>
                        <span className="comments-link"><a href="#">No Comments</a></span>
                      </div>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_newslatter">
                  <h3 className="widget-title">SUBSCRIBE US</h3>
                  <div className="widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <form className="newslatter-form">
                    <input type="email" name="s" placeholder="Your Email.." />
                    <input type="submit" name="s" value="SUBSCRIBE NOW" />
                  </form>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="buttom-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="footer-menu">
                  <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Term & Condition</a></li>
                    <li><a href="#">FAQ</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2 text-center">
                <div className="footer-logo">
                  <a href="#"><img src="assets/images/travele-logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-md-5">
                <div className="copy-right text-right">Copyright © 2021 Travele. All rights reserveds</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* Custom search overlay */}
      <div className="header-search-form">
        <div className="container">
          <div className="header-search-container">
            <form className="search-form" role="search" method="get">
              <input type="text" name="s" placeholder="Enter your text..." />
            </form>
            <a href="#" className="search-close">
              <i className="fas fa-times"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArchive;
