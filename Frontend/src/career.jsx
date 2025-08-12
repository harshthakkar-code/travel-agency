import React from "react";
import Header from "./Header";

const Career = () => (
  <div id="page" className="full-page">
    {/* Header - reuse as a component */}
    <Header />

    <main id="content" className="site-main">
      {/* Inner Banner */}
      <section className="inner-banner-wrap">
        <div
          className="inner-baner-container"
          style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}
        >
          <div className="container">
            <div className="inner-banner-content">
              <h1 className="inner-title">Career</h1>
            </div>
          </div>
        </div>
        <div className="inner-shape"></div>
      </section>

      <div className="carrer-page-section">
        <div className="container">
          <div className="vacancy-section">
            <div className="section-heading text-center">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <h5 className="dash-style">VACANCY / CAREERS</h5>
                  <h2>LET'S JOIN WITH US!</h2>
                  <p>
                    Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat.
                  </p>
                </div>
              </div>
            </div>
            <div className="vacancy-container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="vacancy-content-wrap">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="vacancy-content">
                          <h5>Full Time / Part Time</h5>
                          <h3>Travel Agent</h3>
                          <p>
                            Magna voluptatum dolorem! Dolores! Sociosqu commodo nobis imperdiet lacinia? Magni! Felis, elementum nobis.
                          </p>
                          <a href="#" className="button-primary">
                            APPLY NOW
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="vacancy-content">
                          <h5>Full Time</h5>
                          <h3>Front Desk</h3>
                          <p>
                            Magna voluptatum dolorem! Dolores! Sociosqu commodo nobis imperdiet lacinia? Magni! Felis, elementum nobis.
                          </p>
                          <a href="#" className="button-primary">
                            APPLY NOW
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="vacancy-content">
                          <h5>Part Time</h5>
                          <h3>Travel Guide</h3>
                          <p>
                            Magna voluptatum dolorem! Dolores! Sociosqu commodo nobis imperdiet lacinia? Magni! Felis, elementum nobis.
                          </p>
                          <a href="#" className="button-primary">
                            APPLY NOW
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="vacancy-content">
                          <h5>Full Time / Part Time</h5>
                          <h3>Tour Supervisor</h3>
                          <p>
                            Magna voluptatum dolorem! Dolores! Sociosqu commodo nobis imperdiet lacinia? Magni! Felis, elementum nobis.
                          </p>
                          <a href="#" className="button-primary">
                            APPLY NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="vacancy-form">
                    <h3>JOIN OUR TEAM</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus</p>
                    <form>
                      <p>
                        <input type="text" name="name" placeholder="Your Name" />
                      </p>
                      <p>
                        <input type="text" name="email" placeholder="Your Email" />
                      </p>
                      <p>
                        <input type="text" name="phone" placeholder="Your Phone" />
                      </p>
                      <p>
                        <textarea rows="7" placeholder="Enter your message"></textarea>
                      </p>
                      <p>
                        <input type="submit" name="submit" value="SEND APPLICATION" />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* About Service/Benefits Section */}
          <div className="about-service-wrap">
            <div className="section-heading">
              <div className="row no-gutters align-items-end">
                <div className="col-lg-6">
                  <h5 className="dash-style">OUR BENEFITS</h5>
                  <h2>OUR TRAVEL AGENCY HAS BEEN BEST AMONG OTHERS SINCE 1982</h2>
                </div>
                <div className="col-lg-6">
                  <div className="section-disc">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Placeat nostrud natus tempora justo. Laboriosam, eget mus nostrud natus tempora.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consec tetur adipiscing eliting dolor sit amet. Placeat nostrud natus tempora justo nostrud natus tempora.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-service-container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="about-service">
                    <div className="about-service-icon">
                      <img src="assets/images/icon19.png" alt="" />
                    </div>
                    <div className="about-service-content">
                      <h4>Award winning</h4>
                      <p>Lorem ipsum dolor sit amet, consec teturing.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-service">
                    <div className="about-service-icon">
                      <img src="assets/images/icon20.png" alt="" />
                    </div>
                    <div className="about-service-content">
                      <h4>Well allowance</h4>
                      <p>Lorem ipsum dolor sit amet, consec teturing.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-service">
                    <div className="about-service-icon">
                      <img src="assets/images/icon21.png" alt="" />
                    </div>
                    <div className="about-service-content">
                      <h4>Full Insurance</h4>
                      <p>Lorem ipsum dolor sit amet, consec teturing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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

    {/* Back to Top and Search Overlay */}
    <a id="backTotop" href="#" className="to-top-icon">
      <i className="fas fa-chevron-up"></i>
    </a>
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

export default Career;
