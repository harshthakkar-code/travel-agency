import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "./utils/api";
import Header from "./Header";

const Blog_single = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle loading state
  if (loading) {
    return (
      <div id="page" className="full-page">
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <h3>Loading blog...</h3>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !blog) {
    return (
      <div id="page" className="full-page">
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <h3 style={{ color: 'red' }}>Blog not found</h3>
          <p>The requested blog post could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="page" className="full-page">
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">{blog.title}</h1>
                <div className="entry-meta">
                  <span className="byline"><a href="#">{blog.author || "Unknown Author"}</a></span>
                  <span className="posted-on"><a href="#">{formatDate(blog.createdAt)}</a></span>
                  <span className="comments-link"><a href="#">No Comments</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Blog Post */}
        <div className="single-post-section">
          <div className="single-post-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 primary right-sidebar">
                  {/* Blog Image */}
                  <figure className="feature-image">
                    <img 
                      src={blog.image || "assets/images/img30.jpg"} 
                      alt={blog.title} 
                    />
                  </figure>
                  
                  {/* Blog Content */}
                  <article className="single-content-wrap">
                    <div 
                      style={{ 
                        lineHeight: '1.6', 
                        fontSize: '16px',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {blog.content}
                    </div>
                  </article>

                  {/* Tags */}
                  <div className="meta-wrap">
                    <div className="tag-links">
                      {blog.tags && blog.tags.length > 0 ? (
                        blog.tags.map((tag, index) => (
                          <span key={index}>
                            <a href="#">{tag}</a>
                            {index < blog.tags.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <a href="#">{blog.category || "General"}</a>
                      )}
                    </div>
                  </div>

                  {/* Social Share */}
                  <div className="post-socail-wrap">
                    <div className="social-icon-wrap">
                      <div className="social-icon social-facebook">
                        <a href="#"><i className="fab fa-facebook-f"></i><span>Facebook</span></a>
                      </div>
                      <div className="social-icon social-google">
                        <a href="#"><i className="fab fa-google-plus-g"></i><span>Google</span></a>
                      </div>
                      <div className="social-icon social-pinterest">
                        <a href="#"><i className="fab fa-pinterest"></i><span>Pinterest</span></a>
                      </div>
                      <div className="social-icon social-linkedin">
                        <a href="#"><i className="fab fa-linkedin"></i><span>Linkedin</span></a>
                      </div>
                      <div className="social-icon social-twitter">
                        <a href="#"><i className="fab fa-twitter"></i><span>Twitter</span></a>
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="author-wrap">
                    <div className="author-thumb">
                      <img src="assets/images/user-img.png" alt="" />
                    </div>
                    <div className="author-content">
                      <h3 className="author-name">{blog.author || "Unknown Author"}</h3>
                      <p>
                        Anim eligendi error magnis. Pretium fugiat cubilia ullamcorper adipisci, lobortis repellendus sit culpa maiores!
                      </p>
                      <a href="#" className="button-text">VIEW ALL POSTS &gt; </a>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="comment-area">
                    <h2 className="comment-title">3 Comments</h2>
                    <div className="comment-area-inner">
                      <ol>
                        <li>
                          <figure className="comment-thumb">
                            <img src="assets/images/img20.jpg" alt="" />
                          </figure>
                          <div className="comment-content">
                            <div className="comment-header">
                              <h5 className="author-name">Tom Sawyer</h5>
                              <span className="post-on">Jana 10 2020</span>
                            </div>
                            <p>
                              Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.
                            </p>
                            <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                          </div>
                        </li>
                        <li>
                          <ol>
                            <li>
                              <figure className="comment-thumb">
                                <img src="assets/images/img21.jpg" alt="" />
                              </figure>
                              <div className="comment-content">
                                <div className="comment-header">
                                  <h5 className="author-name">John Doe</h5>
                                  <span className="post-on">Jana 10 2020</span>
                                </div>
                                <p>
                                  Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.
                                </p>
                                <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                              </div>
                            </li>
                          </ol>
                        </li>
                      </ol>
                      <ol>
                        <li>
                          <figure className="comment-thumb">
                            <img src="assets/images/img22.jpg" alt="" />
                          </figure>
                          <div className="comment-content">
                            <div className="comment-header">
                              <h5 className="author-name">Jaan Smith</h5>
                              <span className="post-on">Jana 10 2020</span>
                            </div>
                            <p>
                              Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.
                            </p>
                            <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                          </div>
                        </li>
                      </ol>
                    </div>

                    {/* Comment Form */}
                    <div className="comment-form-wrap">
                      <h2 className="comment-title">Leave a Reply</h2>
                      <p>Your email address will not be published. Required fields are marked *</p>
                      <form className="comment-form">
                        <p className="full-width">
                          <label>Comment</label>
                          <textarea rows={9}></textarea>
                        </p>
                        <p>
                          <label>Name *</label>
                          <input type="text" name="name" />
                        </p>
                        <p>
                          <label>Email *</label>
                          <input type="email" name="email" />
                        </p>
                        <p>
                          <label>Website</label>
                          <input type="text" name="web" />
                        </p>
                        <p className="full-width">
                          <input type="submit" name="submit" value="Post comment" />
                        </p>
                      </form>
                    </div>

                    {/* Post Navigation */}
                    <div className="post-navigation">
                      <div className="nav-prev">
                        <a href="#">
                          <span className="nav-label">Previous Reading</span>
                          <span className="nav-title">Deleniti illum culpa sodales cubilia.</span>
                        </a>
                      </div>
                      <div className="nav-next">
                        <a href="#">
                          <span className="nav-label">Next Reading</span>
                          <span className="nav-title">Deleniti illum culpa sodales cubilia.</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-lg-4 secondary">
                  <div className="sidebar">
                    {/* About Author */}
                    <aside className="widget author_widget">
                      <h3 className="widget-title">ABOUT AUTHOR</h3>
                      <div className="widget-content text-center">
                        <div className="profile">
                          <figure className="avatar">
                            <a href="#"><img src="assets/images/img21.jpg" alt="" /></a>
                          </figure>
                          <div className="text-content">
                            <div className="name-title">
                              <h3>
                                <a href="#">{blog.author || "James Watson"}</a>
                              </h3>
                            </div>
                            <p>
                              Accumsan? Aliquet nobis doloremque, aliqua? Inceptos voluptatem, duis tempore optio quae animi viverra distinctio cumque vivamus, earum congue, anim velit
                            </p>
                          </div>
                          <div className="socialgroup">
                            <ul>
                              <li><a target="_blank" href="#"><i className="fab fa-facebook"></i></a></li>
                              <li><a target="_blank" href="#"><i className="fab fa-google"></i></a></li>
                              <li><a target="_blank" href="#"><i className="fab fa-twitter"></i></a></li>
                              <li><a target="_blank" href="#"><i className="fab fa-instagram"></i></a></li>
                              <li><a target="_blank" href="#"><i className="fab fa-pinterest"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </aside>

                    {/* Recent Posts */}
                    <aside className="widget widget_latest_post widget-post-thumb">
                      <h3 className="widget-title">Recent Post</h3>
                      <ul>
                        <li>
                          <figure className="post-thumb">
                            <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                          </figure>
                          <div className="post-content">
                            <h5>
                              <a href="#">Someday I'm going to be free and travel</a>
                            </h5>
                            <div className="entry-meta">
                              <span className="posted-on"><a href="#">August 17, 2021</a></span>
                              <span className="comments-link"><a href="#">No Comments</a></span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <figure className="post-thumb">
                            <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                          </figure>
                          <div className="post-content">
                            <h5>
                              <a href="#">Someday I'm going to be free and travel</a>
                            </h5>
                            <div className="entry-meta">
                              <span className="posted-on"><a href="#">August 17, 2021</a></span>
                              <span className="comments-link"><a href="#">No Comments</a></span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <figure className="post-thumb">
                            <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                          </figure>
                          <div className="post-content">
                            <h5>
                              <a href="#">Someday I'm going to be free and travel</a>
                            </h5>
                            <div className="entry-meta">
                              <span className="posted-on"><a href="#">August 17, 2021</a></span>
                              <span className="comments-link"><a href="#">No Comments</a></span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <figure className="post-thumb">
                            <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                          </figure>
                          <div className="post-content">
                            <h5>
                              <a href="#">Someday I'm going to be free and travel</a>
                            </h5>
                            <div className="entry-meta">
                              <span className="posted-on"><a href="#">August 17, 2021</a></span>
                              <span className="comments-link"><a href="#">No Comments</a></span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <figure className="post-thumb">
                            <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                          </figure>
                          <div className="post-content">
                            <h5>
                              <a href="#">Someday I'm going to be free and travel</a>
                            </h5>
                            <div className="entry-meta">
                              <span className="posted-on"><a href="#">August 17, 2021</a></span>
                              <span className="comments-link"><a href="#">No Comments</a></span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </aside>

                    {/* Social Share */}
                    <aside className="widget widget_social">
                      <h3 className="widget-title">Social share</h3>
                      <div className="social-icon-wrap">
                        <div className="social-icon social-facebook">
                          <a href="#"><i className="fab fa-facebook-f"></i><span>Facebook</span></a>
                        </div>
                        <div className="social-icon social-pinterest">
                          <a href="#"><i className="fab fa-pinterest"></i><span>Pinterest</span></a>
                        </div>
                        <div className="social-icon social-whatsapp">
                          <a href="#"><i className="fab fa-whatsapp"></i><span>WhatsApp</span></a>
                        </div>
                        <div className="social-icon social-linkedin">
                          <a href="#"><i className="fab fa-linkedin"></i><span>Linkedin</span></a>
                        </div>
                        <div className="social-icon social-twitter">
                          <a href="#"><i className="fab fa-twitter"></i><span>Twitter</span></a>
                        </div>
                        <div className="social-icon social-google">
                          <a href="#"><i className="fab fa-google-plus-g"></i><span>Google</span></a>
                        </div>
                      </div>
                    </aside>
                  </div>
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

      {/* Back To Top */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* Search Overlay */}
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

export default Blog_single;
