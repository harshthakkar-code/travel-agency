import React from "react";
import Header from "./Header";

const Tour_guide = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT GOES HERE */}
      <Header />

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Tour Guide</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Guides Section */}
        <div className="guide-page-section">
          <div className="container">
            <div className="row">
              {/* Guide 1 */}
              <div className="col-lg-4 col-md-6">
                <div className="guide-content-wrap text-center">
                  <figure className="guide-image">
                    <img src="/assets/images/img38.jpg" alt="" />
                  </figure>
                  <div className="guide-content">
                    <h3>William Scott</h3>
                    <h5>Tour Supervisor</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullampor.</p>
                    <div className="guide-social social-links">
                      <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Guide 2 */}
              <div className="col-lg-4 col-md-6">
                <div className="guide-content-wrap text-center">
                  <figure className="guide-image">
                    <img src="/assets/images/img39.jpg" alt="" />
                  </figure>
                  <div className="guide-content">
                    <h3>Jennie Bennett</h3>
                    <h5>Travel Agent</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullampor.</p>
                    <div className="guide-social social-links">
                      <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Guide 3 */}
              <div className="col-lg-4 col-md-6">
                <div className="guide-content-wrap text-center">
                  <figure className="guide-image">
                    <img src="/assets/images/img40.jpg" alt="" />
                  </figure>
                  <div className="guide-content">
                    <h3>James Hardy</h3>
                    <h5>Travel Agent</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullampor.</p>
                    <div className="guide-social social-links">
                      <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Guide 4 */}
              <div className="col-lg-4 col-md-6">
                <div className="guide-content-wrap text-center">
                  <figure className="guide-image">
                    <img src="/assets/images/img41.jpg" alt="" />
                  </figure>
                  <div className="guide-content">
                    <h3>Harry Wilson</h3>
                    <h5>Travel Agent</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullampor.</p>
                    <div className="guide-social social-links">
                      <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Guide 5 */}
              <div className="col-lg-4 col-md-6">
                <div className="guide-content-wrap text-center">
                  <figure className="guide-image">
                    <img src="/assets/images/img42.jpg" alt="" />
                  </figure>
                  <div className="guide-content">
                    <h3>Sally Watson</h3>
                    <h5>Travel Guide</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullampor.</p>
                    <div className="guide-social social-links">
                      <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Guide 6 */}
              <div className="col-lg-4 col-md-6">
                <div className="guide-content-wrap text-center">
                  <figure className="guide-image">
                    <img src="/assets/images/img43.jpg" alt="" />
                  </figure>
                  <div className="guide-content">
                    <h3>Sandy Warth</h3>
                    <h5>Travel Guide</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullampor.</p>
                    <div className="guide-social social-links">
                      <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Guides */}
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="client-section override-client">
          <div className="container">
            <div className="client-wrap client-slider secondary-bg" style={{display: "flex", justifyContent: "center"}}>
              <div className="client-item"><figure><img src="/assets/images/logo1.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="/assets/images/logo2.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="/assets/images/logo3.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="/assets/images/logo4.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="/assets/images/logo5.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="/assets/images/logo2.png" alt="" /></figure></div>
            </div>
          </div>
        </div>

        {/* Callback Section */}
        <div
          className="override-callback secondary-overlay"
          style={{ backgroundImage: "url(/assets/images/slider-banner-2.jpg)" }}
        >
          <div className="container">
            <div className="section-heading section-heading-white">
              <div className="row">
                <div className="col-lg-7">
                  <h5 className="dash-style">INVOLVE NOW</h5>
                  <h2>BE A PART OF OUR TEAM. JOIN US NOW !!</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus. Earum mollitia vitae eos vulputate? Suspendisse mi beatae odit senectus nostrud lacinia venenatis quia debitis! Viverra quisquam cubilia.</p>
                  <a href="#" className="button-primary">JOINS US NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT GOES HERE */}
       <footer id="colophon" className="site-footer footer-primary">
          <div className="top-footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_text">
                    <h3 className="widget-title">About Travel</h3>
                    <div className="textwidget widget-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                      elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                      leo.
                    </div>
                    <div className="award-img">
                      <a href="#">
                        <img src="/assets/images/logo6.png" alt="" />
                      </a>
                      <a href="#">
                        <img src="/assets/images/logo2.png" alt="" />
                      </a>
                    </div>
                  </aside>
                </div>
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_text">
                    <h3 className="widget-title">CONTACT INFORMATION</h3>
                    <div className="textwidget widget-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-phone-alt"></i> +01 (977) 2599
                            12
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-envelope"></i>{" "}
                            <span
                              className="__cf_email__"
                              data-cfemail="bcdfd3d1ccddd2c5fcd8d3d1ddd5d292dfd3d1"
                            >
                              [email&#160;protected]
                            </span>
                          </a>
                        </li>
                        <li>
                          <i className="fas fa-map-marker-alt"></i> 3146 Koontz,
                          California
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div>
                <div className="col-lg-3 col-md-6">
                  <aside className="widget widget_recent_post">
                    <h3 className="widget-title">Latest Post</h3>
                    <ul>
                      <li>
                        <h5>
                          <a href="#">Life is a beautiful journey not a destination</a>
                        </h5>
                        <div className="entry-meta">
                          <span className="post-on">
                            <a href="#">August 17, 2021</a>
                          </span>
                          <span className="comments-link">
                            <a href="#">No Comments</a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <h5>
                          <a href="#">Take only memories, leave only footprints</a>
                        </h5>
                        <div className="entry-meta">
                          <span className="post-on">
                            <a href="#">August 17, 2021</a>
                          </span>
                          <span className="comments-link">
                            <a href="#">No Comments</a>
                          </span>
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
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Term & Condition</a>
                      </li>
                      <li>
                        <a href="#">FAQ</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <div className="footer-logo">
                    <a href="#">
                      <img src="/assets/images/travele-logo.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="copy-right text-right">
                    Copyright © 2021 Travele. All rights reserveds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

      {/* Back To Top Button */}
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

export default Tour_guide;


