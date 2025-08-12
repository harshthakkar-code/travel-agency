import React from "react";
import Header from "./Header";

// Example testimonials data (put in a separate file if you want)
const testimonials = [
  {
    img: "/assets/images/img21.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Robert Holland",
    role: "Traveller",
  },
  {
    img: "/assets/images/img20.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "William Wright",
    role: "Traveller",
  },
  {
    img: "/assets/images/img22.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Alison Hobb",
    role: "Traveller",
  },
  {
    img: "/assets/images/img20.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Scott Harry",
    role: "Traveller",
  },
  {
    img: "/assets/images/img22.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Mary James",
    role: "Traveller",
  },
  {
    img: "/assets/images/img21.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Harry Smith",
    role: "Traveller",
  },
];

const Testimonial_Page = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT */}
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
                <h1 className="inner-title">Testimonial</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Testimonials */}
        <div className="testimonial-page-section">
          <div className="container">
            <div className="row">
              {testimonials.map((t, idx) => (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <div className="testimonial-item text-center">
                    <figure className="testimonial-img">
                      <img src={t.img} alt={t.name} />
                    </figure>
                    <div className="testimonial-content">
                      <p>{t.text}</p>
                      <div className="start-wrap">
                        <div
                          className="rating-start"
                          title="Rated 5 out of 5"
                          style={{ position: "relative", display: "inline-block", width: "100px", height: "20px" }}
                        >
                          {/* You can improve this star rendering for accessibility */}
                          <span
                            style={{
                              display: "block",
                              width: `${t.rating}%`,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              color: "#ffc107",
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                            }}
                          >
                            ★★★★★
                          </span>
                          <span
                            style={{
                              color: "#e0e0e0",
                              display: "block",
                              width: "100%",
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                            }}
                          >
                            ★★★★★
                          </span>
                        </div>
                      </div>
                      <h3>{t.name}</h3>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT */}
      {/* <Footer /> */}
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

      {/* Back To Top */}
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

export default Testimonial_Page;
