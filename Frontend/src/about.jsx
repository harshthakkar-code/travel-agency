import React from "react";
import Header from "./Header";

const About = () => (
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
              <h1 className="inner-title">About us</h1>
            </div>
          </div>
        </div>
        <div className="inner-shape"></div>
      </section>

      {/* About Section */}
      <section className="about-section about-page-section">
        <div className="about-service-wrap">
          <div className="container">
            <div className="section-heading">
              <div className="row align-items-end">
                <div className="col-lg-6">
                  <h5 className="dash-style">OUR TOUR GALLERY</h5>
                  <h2>HELLO. OUR AGENCY HAS BEEN PRESENT BEST IN THE MARKET</h2>
                </div>
                <div className="col-lg-6">
                  <div className="section-disc">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Placeat nostrud natus tempora justo. Laboriosam, eget mus nostrud natus tempora.</p>
                    <p>Lorem ipsum dolor sit amet, consec tetur adipiscing eliting dolor sit amet. Placeat nostrud natus tempora justo nostrud natus tempora.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-service-container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="about-service">
                    <div className="about-service-icon">
                      <img src="assets/images/icon15.png" alt="" />
                    </div>
                    <div className="about-service-content">
                      <h4>AFFORDABLE PRICE</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-service">
                    <div className="about-service-icon">
                      <img src="assets/images/icon16.png" alt="" />
                    </div>
                    <div className="about-service-content">
                      <h4>BEST DESTINATION</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-service">
                    <div className="about-service-icon">
                      <img src="assets/images/icon17.png" alt="" />
                    </div>
                    <div className="about-service-content">
                      <h4>PERSONAL SERVICE</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* About Video */}
            <div className="about-video-wrap" style={{ backgroundImage: "url(assets/images/img25.jpg)" }}>
              <div className="video-button">
                <a id="video-container" data-video-id="IUN664s7N-c">
                  <i className="fas fa-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="client-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="section-heading text-center">
                  <h5 className="dash-style">OUR ASSOCAITES</h5>
                  <h2>PARTNER'S AND CLIENTS</h2>
                  <p>Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat.</p>
                </div>
              </div>
            </div>
            <div className="client-wrap client-slider" style={{ display: "flex", margin: "0 auto", width: "100%" }}>
              <div className="client-item"><figure><img src="assets/images/logo7.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="assets/images/logo8.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="assets/images/logo9.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="assets/images/logo10.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="assets/images/logo11.png" alt="" /></figure></div>
              <div className="client-item"><figure><img src="assets/images/logo8.png" alt="" /></figure></div>
            </div>
          </div>
        </div>

        {/* Callback Section */}
        <div className="fullwidth-callback" style={{ backgroundImage: "url(assets/images/img26.jpg)" }}>
          <div className="container">
            <div className="section-heading section-heading-white text-center">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <h5 className="dash-style">CALLBACK FOR MORE</h5>
                  <h2>GO TRAVEL.DISCOVER. REMEMBER US!!</h2>
                  <p>Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat.</p>
                </div>
              </div>
            </div>
            <div className="callback-counter-wrap">
              <div className="counter-item">
                <div className="counter-item-inner">
                  <div className="counter-icon">
                    <img src="assets/images/icon1.png" alt="" />
                  </div>
                  <div className="counter-content">
                    <span className="counter-no"><span className="counter">500</span>K+</span>
                    <span className="counter-text">Satisfied Clients</span>
                  </div>
                </div>
              </div>
              <div className="counter-item">
                <div className="counter-item-inner">
                  <div className="counter-icon">
                    <img src="assets/images/icon2.png" alt="" />
                  </div>
                  <div className="counter-content">
                    <span className="counter-no"><span className="counter">250</span>K+</span>
                    <span className="counter-text">Awards Achieve</span>
                  </div>
                </div>
              </div>
              <div className="counter-item">
                <div className="counter-item-inner">
                  <div className="counter-icon">
                    <img src="assets/images/icon3.png" alt="" />
                  </div>
                  <div className="counter-content">
                    <span className="counter-no"><span className="counter">15</span>K+</span>
                    <span className="counter-text">Active Members</span>
                  </div>
                </div>
              </div>
              <div className="counter-item">
                <div className="counter-item-inner">
                  <div className="counter-icon">
                    <img src="assets/images/icon4.png" alt="" />
                  </div>
                  <div className="counter-content">
                    <span className="counter-no"><span className="counter">10</span>K+</span>
                    <span className="counter-text">Tour Destnation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}
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

export default About;
