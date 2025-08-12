import React from "react";
import Header from "./Header";

const BlogArchive = () => (
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
              {/* --- Blog Posts (Right Sidebar) --- */}
              <div className="col-lg-8 primary right-sidebar">
                <div className="grid row">
                  {/* Repeat for each post */}
                  <div className="grid-item col-md-6">
                    <article className="post">
                      <figure className="feature-image">
                        <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                      </figure>
                      <div className="entry-content">
                        <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
                        <div className="entry-meta">
                          <span className="byline"><a href="#">Demoteam</a></span>
                          <span className="posted-on"><a href="#">August 17, 2021</a></span>
                          <span className="comments-link"><a href="#">No Comments</a></span>
                        </div>
                        <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
                        <a href="#" className="button-text">CONTINUE READING..</a>
                      </div>
                    </article>
                  </div>
                  <div className="grid-item col-md-6">
                    <article className="post">
                      <figure className="feature-image">
                        <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                      </figure>
                      <div className="entry-content">
                        <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
                        <div className="entry-meta">
                          <span className="byline"><a href="#">Demoteam</a></span>
                          <span className="posted-on"><a href="#">August 17, 2021</a></span>
                          <span className="comments-link"><a href="#">No Comments</a></span>
                        </div>
                        <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
                        <a href="#" className="button-text">CONTINUE READING..</a>
                      </div>
                    </article>
                  </div>
                  <div className="grid-item col-md-6">
                    <article className="post">
                      <figure className="feature-image">
                        <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                      </figure>
                      <div className="entry-content">
                        <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
                        <div className="entry-meta">
                          <span className="byline"><a href="#">Demoteam</a></span>
                          <span className="posted-on"><a href="#">August 17, 2021</a></span>
                          <span className="comments-link"><a href="#">No Comments</a></span>
                        </div>
                        <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
                        <a href="#" className="button-text">CONTINUE READING..</a>
                      </div>
                    </article>
                  </div>
                  <div className="grid-item col-md-6">
                    <article className="post">
                      <figure className="feature-image">
                        <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                      </figure>
                      <div className="entry-content">
                        <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
                        <div className="entry-meta">
                          <span className="byline"><a href="#">Demoteam</a></span>
                          <span className="posted-on"><a href="#">August 17, 2021</a></span>
                          <span className="comments-link"><a href="#">No Comments</a></span>
                        </div>
                        <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
                        <a href="#" className="button-text">CONTINUE READING..</a>
                      </div>
                    </article>
                  </div>
                  <div className="grid-item col-md-6">
                    <article className="post">
                      <figure className="feature-image">
                        <a href="#"><img src="assets/images/img17.jpg" alt="" /></a>
                      </figure>
                      <div className="entry-content">
                        <h3><a href="#">Life is a beautiful journey not a destination</a></h3>
                        <div className="entry-meta">
                          <span className="byline"><a href="#">Demoteam</a></span>
                          <span className="posted-on"><a href="#">August 17, 2021</a></span>
                          <span className="comments-link"><a href="#">No Comments</a></span>
                        </div>
                        <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
                        <a href="#" className="button-text">CONTINUE READING..</a>
                      </div>
                    </article>
                  </div>
                  {/* ...other posts (copy structure above and update image/content) */}
                  <div className="grid-item col-md-6">
                    <article className="post">
                      <figure className="feature-image">
                        <a href="#"><img src="assets/images/img18.jpg" alt="" /></a>
                      </figure>
                      <div className="entry-content">
                        <h3><a href="#">Take only memories, leave only footprints</a></h3>
                        <div className="entry-meta">
                          <span className="byline"><a href="#">Demoteam</a></span>
                          <span className="posted-on"><a href="#">August 17, 2021</a></span>
                          <span className="comments-link"><a href="#">No Comments</a></span>
                        </div>
                        <p>Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit</p>
                        <a href="#" className="button-text">CONTINUE READING..</a>
                      </div>
                    </article>
                  </div>
                  {/* ...repeat for remaining posts... */}
                </div>
                {/* Pagination */}
                <div className="post-navigation-wrap">
                  <nav>
                    <ul className="pagination">
                      <li><a href="#"><i className="fas fa-arrow-left"></i></a></li>
                      <li className="active"><a href="#">1</a></li>
                      <li><a href="#">..</a></li>
                      <li><a href="#">5</a></li>
                      <li><a href="#"><i className="fas fa-arrow-right"></i></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              {/* --- Sidebar (Right) --- */}
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
                            <h3><a href="#">James Watson</a></h3>
                          </div>
                          <p>Accumsan? Aliquet nobis doloremque, aliqua? Inceptos voluptatem, duis tempore optio quae animi viverra distinctio cumque vivamus, earum congue, anim velit</p>
                        </div>
                        <div className="socialgroup">
                          <ul>
                            <li><a target="_blank" rel="noopener noreferrer" href="#"><i className="fab fa-facebook"></i></a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="#"><i className="fab fa-google"></i></a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="#"><i className="fab fa-pinterest"></i></a></li>
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
                        <figure className="post-thumb"><a href="#"><img src="assets/images/img17.jpg" alt="" /></a></figure>
                        <div className="post-content">
                          <h5><a href="#">Someday I’m going to be free and travel</a></h5>
                          <div className="entry-meta">
                            <span className="posted-on"><a href="#">August 17, 2021</a></span>
                            <span className="comments-link"><a href="#">No Comments</a></span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <figure className="post-thumb"><a href="#"><img src="assets/images/img17.jpg" alt="" /></a></figure>
                        <div className="post-content">
                          <h5><a href="#">Someday I’m going to be free and travel</a></h5>
                          <div className="entry-meta">
                            <span className="posted-on"><a href="#">August 17, 2021</a></span>
                            <span className="comments-link"><a href="#">No Comments</a></span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <figure className="post-thumb"><a href="#"><img src="assets/images/img17.jpg" alt="" /></a></figure>
                        <div className="post-content">
                          <h5><a href="#">Someday I’m going to be free and travel</a></h5>
                          <div className="entry-meta">
                            <span className="posted-on"><a href="#">August 17, 2021</a></span>
                            <span className="comments-link"><a href="#">No Comments</a></span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <figure className="post-thumb"><a href="#"><img src="assets/images/img17.jpg" alt="" /></a></figure>
                        <div className="post-content">
                          <h5><a href="#">Someday I’m going to be free and travel</a></h5>
                          <div className="entry-meta">
                            <span className="posted-on"><a href="#">August 17, 2021</a></span>
                            <span className="comments-link"><a href="#">No Comments</a></span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <figure className="post-thumb"><a href="#"><img src="assets/images/img17.jpg" alt="" /></a></figure>
                        <div className="post-content">
                          <h5><a href="#">Someday I’m going to be free and travel</a></h5>
                          <div className="entry-meta">
                            <span className="posted-on"><a href="#">August 17, 2021</a></span>
                            <span className="comments-link"><a href="#">No Comments</a></span>
                          </div>
                        </div>
                      </li>
                      {/* ...other recent posts */}
                    </ul>
                  </aside>
                  {/* Social Share */}
                  <aside className="widget widget_social">
                    <h3 className="widget-title">Social share</h3>
                    <div className="social-icon-wrap">
                      <div className="social-icon social-facebook"><a href="#"><i className="fab fa-facebook-f"></i><span>Facebook</span></a></div>
                      <div className="social-icon social-pinterest"><a href="#"><i className="fab fa-pinterest"></i><span>Pinterest</span></a></div>
                      <div className="social-icon social-whatsapp"><a href="#"><i className="fab fa-whatsapp"></i><span>WhatsApp</span></a></div>
                      <div className="social-icon social-linkedin"><a href="#"><i className="fab fa-linkedin"></i><span>Linkedin</span></a></div>
                      <div className="social-icon social-twitter"><a href="#"><i className="fab fa-twitter"></i><span>Twitter</span></a></div>
                      <div className="social-icon social-google"><a href="#"><i className="fab fa-google-plus-g"></i><span>Google</span></a></div>
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

export default BlogArchive;
