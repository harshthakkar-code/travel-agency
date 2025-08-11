// src/components/PackageOffer.jsx
import React from "react";

const Package_offer = () => (
  <div id="page" className="full-page">
    {/* ===== HEADER ===== */}
    <header id="masthead" className="site-header header-primary">
      {/* Top Header */}
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 d-none d-lg-block">
              <div className="header-contact-info">
                <ul>
                  <li>
                    <a href="#"><i className="fas fa-phone-alt"></i> +01 (977) 2599 12</a>
                  </li>
                  <li>
                    <a href="#"><i className="fas fa-envelope"></i> [email&#160;protected]</a>
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> 3146 Koontz Lane, California
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-lg-end justify-content-between">
              <div className="header-social social-links">
                <ul>
                  <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="#"><i className="fab fa-twitter" /></a></li>
                  <li><a href="#"><i className="fab fa-instagram" /></a></li>
                  <li><a href="#"><i className="fab fa-linkedin" /></a></li>
                </ul>
              </div>
              <div className="header-search-icon">
                <button className="search-icon">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Header */}
      <div className="bottom-header">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="site-identity">
            <p className="site-title">
              <a href="/">
                <img className="white-logo" src="/assets/images/travele-logo.png" alt="logo" />
                <img className="black-logo" src="/assets/images/travele-logo1.png" alt="logo" />
              </a>
            </p>
          </div>
          {/* Main Navigation - Place your nav here */}
          <div className="main-navigation d-none d-lg-block">
            <nav id="navigation" className="navigation">
              {/* ... nav links here, as needed ... */}
            </nav>
          </div>
          <div className="header-btn">
            <a href="https://1.envato.market/6eay43" className="button-primary">BUY NOW</a>
          </div>
        </div>
      </div>
      <div className="mobile-menu-container"></div>
    </header>

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
            {/* Footer widgets (repeat as needed) */}
            <div className="col-lg-3 col-md-6">
              <aside className="widget widget_text">
                <h3 className="widget-title">About Travel</h3>
                <div className="textwidget widget-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </div>
                <div className="award-img">
                  <a href="#"><img src="/assets/images/logo6.png" alt="" /></a>
                  <a href="#"><img src="/assets/images/logo2.png" alt="" /></a>
                </div>
              </aside>
            </div>
            {/* ... more widgets ... */}
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
                <a href="#"><img src="/assets/images/travele-logo.png" alt="" /></a>
              </div>
            </div>
            <div className="col-md-5">
              <div className="copy-right text-right">Copyright © 2021 Travele. All rights reserveds</div>
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

