import React, { useState } from "react";
import Header from "./Header";

const Popup = () => {
  // Popup open state
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  return (
    <div id="page" className="full-page">
      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== MAIN CONTENT ===== */}
      <main id="content" className="site-main">
        {/* Home slider section */}
        <section className="home-slider-section">
          <div className="home-slider">
            <div className="home-banner-items">
              <div className="banner-inner-wrap" style={{ backgroundImage: `url(/assets/images/slider-banner-1.jpg)` }}></div>
              <div className="banner-content-wrap">
                <div className="container">
                  <div className="banner-content text-center">
                    <h2 className="banner-title">TRAVELLING AROUND THE WORLD</h2>
                    <p>Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.</p>
                    <a href="#" className="button-primary">CONTINUE READING</a>
                  </div>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="home-banner-items">
              <div className="banner-inner-wrap" style={{ backgroundImage: `url(/assets/images/slider-banner-2.jpg)` }}></div>
              <div className="banner-content-wrap">
                <div className="container">
                  <div className="banner-content text-center">
                    <h2 className="banner-title">EXPERIENCE THE NATURE'S BEAUTY</h2>
                    <p>Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.</p>
                    <a href="#" className="button-primary">CONTINUE READING</a>
                  </div>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
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

      {/* Back to top */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* Custom search form */}
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

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="popup-wraper" style={{ display: showPopup ? "block" : "none" }}>
          <div className="popup-inner">
            <div className="popup-content">
              <h2>TIPS FOR YOUR <br /> NEXT TRIP?</h2>
              <p>Subscribe to recieve latest update & offer!</p>
              <form>
                <input type="email" name="email" placeholder="Enter your email" />
                <button type="submit" className="button-primary">Subscribe</button>
              </form>
            </div>
            <div className="popup-image">
              <img src="/assets/images/img52.png" alt="" />
            </div>
            <div className="popup-close-btn">
              <a href="#" onClick={handleClosePopup}></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;

