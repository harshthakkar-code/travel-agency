// src/components/PackageOffer.jsx
import React from "react";
import Header from "./Header";

const Package_offer = () => (
  <div id="page" className="full-page">
    {/* ===== HEADER ===== */}
   <Header />

    {/* ===== MAIN CONTENT ===== */}
    <main id="content" className="site-main">
      {/* Inner Banner */}
      <section className="inner-banner-wrap">
        <div className="inner-baner-container" style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}>
          <div className="container">
            <div className="inner-banner-content">
              <h1 className="inner-title">Package Offer</h1>
            </div>
          </div>
        </div>
        <div className="inner-shape"></div>
      </section>
      {/* Package Offer Section */}
      <section className="package-offer-wrap">
        {/* Specials */}
        <div className="special-section">
          <div className="container">
            <div className="special-inner">
              <div className="row">
                {/* --- Repeat this block for each package --- */}
                <div className="col-md-6 col-lg-4">
                  <div className="special-item">
                    <figure className="special-img">
                      <img src="/assets/images/img9.jpg" alt="" />
                    </figure>
                    <div className="badge-dis">
                      <span>
                        <strong>20%</strong>
                        off
                      </span>
                    </div>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">CANADA</a>
                      </div>
                      <h3>
                        <a href="#">Experience the natural beauty of glacier</a>
                      </h3>
                      <div className="package-price">
                        Price:
                        <del>$1500</del>
                        <ins>$1200</ins>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ... more .col-md-6.col-lg-4 special-item blocks ... */}
                <div className="col-md-6 col-lg-4">
                  <div className="special-item">
                    <figure className="special-img">
                      <img src="/assets/images/img10.jpg" alt="" />
                    </figure>
                    <div className="badge-dis">
                      <span>
                        <strong>15%</strong>
                        off
                      </span>
                    </div>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">NEW ZEALAND</a>
                      </div>
                      <h3>
                        <a href="#">Trekking to the mountain camp site</a>
                      </h3>
                      <div className="package-price">
                        Price:
                        <del>$1300</del>
                        <ins>$1105</ins>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="special-item">
                    <figure className="special-img">
                      <img src="/assets/images/img10.jpg" alt="" />
                    </figure>
                    <div className="badge-dis">
                      <span>
                        <strong>15%</strong>
                        off
                      </span>
                    </div>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">NEW ZEALAND</a>
                      </div>
                      <h3>
                        <a href="#">Trekking to the mountain camp site</a>
                      </h3>
                      <div className="package-price">
                        Price:
                        <del>$1300</del>
                        <ins>$1105</ins>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="special-item">
                    <figure className="special-img">
                      <img src="/assets/images/img10.jpg" alt="" />
                    </figure>
                    <div className="badge-dis">
                      <span>
                        <strong>15%</strong>
                        off
                      </span>
                    </div>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">NEW ZEALAND</a>
                      </div>
                      <h3>
                        <a href="#">Trekking to the mountain camp site</a>
                      </h3>
                      <div className="package-price">
                        Price:
                        <del>$1300</del>
                        <ins>$1105</ins>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="special-item">
                    <figure className="special-img">
                      <img src="/assets/images/img10.jpg" alt="" />
                    </figure>
                    <div className="badge-dis">
                      <span>
                        <strong>15%</strong>
                        off
                      </span>
                    </div>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">NEW ZEALAND</a>
                      </div>
                      <h3>
                        <a href="#">Trekking to the mountain camp site</a>
                      </h3>
                      <div className="package-price">
                        Price:
                        <del>$1300</del>
                        <ins>$1105</ins>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="special-item">
                    <figure className="special-img">
                      <img src="/assets/images/img10.jpg" alt="" />
                    </figure>
                    <div className="badge-dis">
                      <span>
                        <strong>15%</strong>
                        off
                      </span>
                    </div>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">NEW ZEALAND</a>
                      </div>
                      <h3>
                        <a href="#">Trekking to the mountain camp site</a>
                      </h3>
                      <div className="package-price">
                        Price:
                        <del>$1300</del>
                        <ins>$1105</ins>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ... You can map these from data for DRY code ... */}
              </div>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="contact-img" style={{ backgroundImage: "url(/assets/images/img24.jpg)" }}></div>
              </div>
              <div className="col-lg-8">
                <div className="contact-details-wrap">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="contact-details">
                        <div className="contact-icon">
                          <img src="/assets/images/icon12.png" alt="" />
                        </div>
                        <ul>
                          <li><a href="#">[email&#160;protected]</a></li>
                          <li><a href="#">[email&#160;protected]</a></li>
                          <li><a href="#">[email&#160;protected]</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="contact-details">
                        <div className="contact-icon">
                          <img src="/assets/images/icon13.png" alt="" />
                        </div>
                        <ul>
                          <li><a href="#">+132 (599) 254 669</a></li>
                          <li><a href="#">+123 (669) 255 587</a></li>
                          <li><a href="#">+01 (977) 2599 12</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="contact-details">
                        <div className="contact-icon">
                          <img src="/assets/images/icon14.png" alt="" />
                        </div>
                        <ul>
                          <li>3146 Koontz, California</li>
                          <li>Quze.24 Second floor</li>
                          <li>36 Street, Melbourne</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-btn-wrap">
                  <h3>LET'S JOIN US FOR MORE UPDATE !!</h3>
                  <a href="#" className="button-primary">LEARN MORE</a>
                </div>
              </div>
            </div>
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

    {/* Back to top button */}
    <a id="backTotop" href="#" className="to-top-icon">
      <i className="fas fa-chevron-up"></i>
    </a>

    {/* Custom search field */}
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

export default Package_offer;

