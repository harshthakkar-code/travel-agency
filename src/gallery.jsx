import React from "react";
import Header from "./Header";

const Gallery = () => (
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
            <h1 className="inner-title">Gallery</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>

    {/* Gallery Section */}
    <div className="gallery-section">
      <div className="container">
        <div className="gallery-outer-wrap">
          <div className="gallery-inner-wrap gallery-container grid" style={{
          columnCount: 1,        // Three "masonry" columns
          columnGap: 20,         // Gap between columns in px
        }}>
            {[
              { img: "gallery-1.jpg", title: "Santorini Island" },
              { img: "gallery-2.jpg", title: "Malaysia Beach" },
              { img: "gallery-3.jpg", title: "Tibet Mountain" },
              { img: "gallery-5.jpg", title: "Burj Khalifa (Dubai)" },
              { img: "gallery-4.jpg", title: "Arizona Desert" },
              { img: "gallery-6.jpg", title: "Oxolotan Island" },
              { img: "gallery-7.jpg", title: "Narita Airport" },
              { img: "gallery-8.jpg", title: "Thailand Temple" },
            ].map((item, i) => (
              <div className="single-gallery grid-item" key={i}>
                <figure className="gallery-img" style={{ margin: 0, position: "relative" }}>
                  <img src={`assets/images/${item.img}`} alt={item.title} />
                  <div className="gallery-title">
                    <h3>
                      <a
                        href={`assets/images/${item.img}`}
                        data-lightbox="lightbox-set"
                      >
                        {item.title}
                      </a>
                    </h3>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Callback Section */}
    <div className="bg-color-callback">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-9 col-md-8">
            <div className="callback-content">
              <h2>LET'S JOIN US FOR MORE UPDATE & INFO !!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                orem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="button-wrap">
              <a href="#" className="button-primary">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Main Content */}

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
  </main>
);

export default Gallery;
