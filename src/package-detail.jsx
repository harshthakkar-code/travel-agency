// src/components/PackageDetail.jsx
import React from "react";

const Package_detail = () => (
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
          {/* Main Navigation (simplified, add links/routes as needed) */}
          <div className="main-navigation d-none d-lg-block">
            <nav id="navigation" className="navigation">
              {/* ... put nav links here, or replace with your own nav component */}
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
              <h1 className="inner-title">Package Detail</h1>
            </div>
          </div>
        </div>
        <div className="inner-shape"></div>
      </section>
      {/* Main Content */}
      <div className="single-tour-section">
        <div className="container">
          <div className="row">
            {/* Left: Tour Info & Tabs */}
            <div className="col-lg-8">
              <div className="single-tour-inner">
                <h2>EXPERIENCE THE NATURAL BEAUTY OF ISLAND</h2>
                <figure className="feature-image">
                  <img src="/assets/images/img27.jpg" alt="" />
                  <div className="package-meta text-center">
                    <ul>
                      <li>
                        <i className="far fa-clock"></i>
                        6 days / 5 night
                      </li>
                      <li>
                        <i className="fas fa-user-friends"></i>
                        People: 4
                      </li>
                      <li>
                        <i className="fas fa-map-marked-alt"></i>
                        Norway
                      </li>
                    </ul>
                  </div>
                </figure>
                {/* Tabs */}
                <div className="tab-container">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">DESCRIPTION</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="program-tab" data-toggle="tab" href="#program" role="tab" aria-controls="program" aria-selected="false">PROGRAM</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">REVIEW</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="false">Map</a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    {/* Overview */}
                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                      <div className="overview-content">
                        <p>Occaecat pariatur! Quaerat ligula ...</p>
                        <p>Occaecat pariatur! Quaerat ligula ...</p>
                        <ul>
                          <li>- Travel cancellation insurance</li>
                          <li>- Breakfast and dinner included</li>
                          <li>- Health care included</li>
                          <li>- Transfer to the airport and return to the agency</li>
                          <li>- Lorem ipsum dolor sit amet, consectetur adipiscing</li>
                        </ul>
                      </div>
                    </div>
                    {/* Program */}
                    <div className="tab-pane" id="program" role="tabpanel" aria-labelledby="program-tab">
                      <div className="itinerary-content">
                        <h3>Program <span>( 4 days )</span></h3>
                        <p>Dolores maiores dicta dolore ...</p>
                      </div>
                      <div className="itinerary-timeline-wrap">
                        <ul>
                          <li>
                            <div className="timeline-content">
                              <div className="day-count">Day <span>1</span></div>
                              <h4>Ancient Rome Visit</h4>
                              <p>Nostra semper ultricies ...</p>
                            </div>
                          </li>
                          {/* ... repeat for more days */}
                        </ul>
                      </div>
                    </div>
                    {/* Review */}
                    <div className="tab-pane" id="review" role="tabpanel" aria-labelledby="review-tab">
                      <div className="summary-review">
                        <div className="review-score">
                          <span>4.9</span>
                        </div>
                        <div className="review-score-content">
                          <h3>
                            Excellent
                            <span>( Based on 24 reviews )</span>
                          </h3>
                          <p>Tincidunt iaculis pede mus lobortis hendrerit ...</p>
                        </div>
                      </div>
                      {/* Review Comments */}
                      <div className="comment-area">
                        <h3 className="comment-title">3 Reviews</h3>
                        <div className="comment-area-inner">
                          <ol>
                            <li>
                              <figure className="comment-thumb">
                                <img src="/assets/images/img20.jpg" alt="" />
                              </figure>
                              <div className="comment-content">
                                <div className="comment-header">
                                  <h5 className="author-name">Tom Sawyer</h5>
                                  <span className="post-on">Jana 10 2020</span>
                                  <div className="rating-wrap">
                                    <div className="rating-start" title="Rated 5 out of 5">
                                      <span style={{ width: "90%" }}></span>
                                    </div>
                                  </div>
                                </div>
                                <p>Officia amet posuere voluptates ...</p>
                                <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                              </div>
                            </li>
                            {/* ... more reviews */}
                          </ol>
                        </div>
                        <div className="comment-form-wrap">
                          <h3 className="comment-title">Leave a Review</h3>
                          <form className="comment-form">
                            <div className="full-width rate-wrap">
                              <label>Your rating</label>
                              <div className="procduct-rate"><span></span></div>
                            </div>
                            <p><input type="text" name="name" placeholder="Name" /></p>
                            <p><input type="text" name="lastname" placeholder="Last name" /></p>
                            <p><input type="email" name="email" placeholder="Email" /></p>
                            <p><input type="text" name="subject" placeholder="Subject" /></p>
                            <p><textarea rows="6" placeholder="Your review"></textarea></p>
                            <p><input type="submit" name="submit" value="Submit" /></p>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Map */}
                    <div className="tab-pane" id="map" role="tabpanel" aria-labelledby="map-tab">
                      <div className="map-area">
                        <iframe src="https://www.google.com/maps/embed?pb=..." height="450" allowFullScreen title="map"></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Gallery */}
                <div className="single-tour-gallery">
                  <h3>GALLERY / PHOTOS</h3>
                  <div className="single-tour-slider">
                    <div className="single-tour-item">
                      <figure className="feature-image"><img src="/assets/images/img28.jpg" alt="" /></figure>
                    </div>
                    <div className="single-tour-item">
                      <figure className="feature-image"><img src="/assets/images/img29.jpg" alt="" /></figure>
                    </div>
                    {/* ...more images */}
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Sidebar */}
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="package-price">
                  <h5 className="price">
                    <span>$649</span> / per person
                  </h5>
                  <div className="start-wrap">
                    <div className="rating-start" title="Rated 5 out of 5">
                      <span style={{ width: "60%" }}></span>
                    </div>
                  </div>
                </div>
                <div className="widget-bg booking-form-wrap">
                  <h4 className="bg-title">Booking</h4>
                  <form className="booking-form">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input name="name_booking" type="text" placeholder="Full Name" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input name="email_booking" type="text" placeholder="Email" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input name="phone_booking" type="text" placeholder="Number" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <input className="input-date-picker" type="text" name="s" autoComplete="off" readOnly placeholder="Date" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <h4 className="">Add Options</h4>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="checkbox-list">
                            <input type="checkbox" name="s" />
                            <span className="custom-checkbox"></span>
                            Tour guide
                          </label>
                        </div>
                      </div>
                      {/* ... more options */}
                      <div className="col-sm-12">
                        <div className="form-group submit-btn">
                          <input type="submit" name="submit" value="Boook Now" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="widget-bg information-content text-center">
                  <h5>TRAVEL TIPS</h5>
                  <h3>NEED TRAVEL RELATED TIPS & INFORMATION</h3>
                  <p>Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat.</p>
                  <a href="#" className="button-primary">GET A QUOTE</a>
                </div>
                <div className="travel-package-content text-center" style={{ backgroundImage: "url(/assets/images/img11.jpg)" }}>
                  <h5>MORE PACKAGES</h5>
                  <h3>OTHER TRAVEL PACKAGES</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</p>
                  <ul>
                    <li>
                      <a href="#"><i className="far fa-arrow-alt-circle-right"></i>Vacation packages</a>
                    </li>
                    {/* ... more links */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Subscribe Section */}
      <section className="subscribe-section" style={{ backgroundImage: "url(/assets/images/img16.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-heading section-heading-white">
                <h5 className="dash-style">HOLIDAY PACKAGE OFFER</h5>
                <h2>HOLIDAY SPECIAL 25% OFF !</h2>
                <h4>Sign up now to recieve hot special offers and information about the best tour packages, updates and discounts !!</h4>
                <div className="newsletter-form">
                  <form>
                    <input type="email" name="s" placeholder="Your Email Address" />
                    <input type="submit" name="signup" value="SIGN UP NOW!" />
                  </form>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus.</p>
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
            {/* Footer widgets... (repeat and fill out as needed) */}
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
            {/* ...more widgets */}
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

export default Package_detail;

