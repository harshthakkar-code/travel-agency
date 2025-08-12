import React from "react";
import Header from "./Header";

const Destination = () => (
  <main id="content" className="site-main">

  <Header />

    {/* Inner Banner */}
    <section className="inner-banner-wrap">
      <div
        className="inner-baner-container"
        style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}
      >
        <div className="container">
          <div className="inner-banner-content">
            <h1 className="inner-title">Destination</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>

    {/* Destinations Section */}
    <section className="destination-section destination-page">
      <div className="container">
        <div className="destination-inner destination-three-column">
          <div className="row">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-sm-6">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img1.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">THAILAND</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Disney Land</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 4">
                        <span style={{ width: "53%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img2.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">NORWAY</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Besseggen Ridge</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span style={{ width: "100%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-md-6 col-xl-12">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img3.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">NEW ZEALAND</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Oxolotan City</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span style={{ width: "100%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-12">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img4.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">SINGAPORE</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Marina Bay Sand City</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 4">
                        <span style={{ width: "60%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Repeat Block */}
          <div className="row">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-md-6 col-xl-12">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img3.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">NEW ZEALAND</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Oxolotan City</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span style={{ width: "100%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-12">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img4.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">SINGAPORE</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Marina Bay Sand City</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 4">
                        <span style={{ width: "60%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row">
                <div className="col-sm-6">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img1.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">THAILAND</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Disney Land</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 4">
                        <span style={{ width: "53%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="desti-item overlay-desti-item">
                    <figure className="desti-image">
                      <img src="assets/images/img2.jpg" alt="" />
                    </figure>
                    <div className="meta-cat bg-meta-cat">
                      <a href="#">NORWAY</a>
                    </div>
                    <div className="desti-content">
                      <h3>
                        <a href="#">Besseggen Ridge</a>
                      </h3>
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span style={{ width: "100%" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Repeat Block */}
        </div>
      </div>
    </section>

    {/* Subscribe Section */}
    <section
      className="subscribe-section"
      style={{ backgroundImage: "url(assets/images/img16.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="section-heading section-heading-white">
              <h5 className="dash-style">HOLIDAY PACKAGE OFFER</h5>
              <h2>HOLIDAY SPECIAL 25% OFF !</h2>
              <h4>
                Sign up now to recieve hot special offers and information about the best tour packages, updates and discounts !!
              </h4>
              <div className="newsletter-form">
                <form>
                  <input type="email" name="s" placeholder="Your Email Address" />
                  <input type="submit" name="signup" value="SIGN UP NOW!" />
                </form>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

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
    {/* End Subscribe Section */}
  </main>
);

export default Destination;
