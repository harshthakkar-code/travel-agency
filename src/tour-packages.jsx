import React from "react";

const Tour_packages = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT GOES HERE */}

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Tour Packages</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Packages Section */}
        <div className="package-section">
          <div className="container">
            <div className="package-inner">
              <div className="row">
                {/* Package Card 1 */}
                <div className="col-lg-4 col-md-6">
                  <div className="package-wrap">
                    <figure className="feature-image">
                      <a href="#">
                        <img src="/assets/images/img5.jpg" alt="" />
                      </a>
                    </figure>
                    <div className="package-price">
                      <h6>
                        <span>$1,900 </span> / per person
                      </h6>
                    </div>
                    <div className="package-content-wrap">
                      <div className="package-meta text-center">
                        <ul>
                          <li>
                            <i className="far fa-clock"></i> 7D/6N
                          </li>
                          <li>
                            <i className="fas fa-user-friends"></i> People: 5
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Malaysia
                          </li>
                        </ul>
                      </div>
                      <div className="package-content">
                        <h3>
                          <a href="#">Sunset view of beautiful lakeside resident</a>
                        </h3>
                        <div className="review-area">
                          <span className="review-text">(25 reviews)</span>
                          <div className="rating-start" title="Rated 5 out of 5">
                            <span style={{ width: "60%" }}></span>
                          </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.</p>
                        <div className="btn-wrap">
                          <a href="#" className="button-text width-6">
                            Book Now<i className="fas fa-arrow-right"></i>
                          </a>
                          <a href="#" className="button-text width-6">
                            Wish List<i className="far fa-heart"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Repeat the above card for other packages, or map from an array if dynamic */}
                {/* ...package cards 2-6, omitted for brevity but structure is identical */}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <section className="activity-section">
          <div className="container">
            <div className="section-heading text-center">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <h5 className="dash-style">TRAVEL BY ACTIVITY</h5>
                  <h2>ADVENTURE & ACTIVITY</h2>
                  <p>Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae placeat.</p>
                </div>
              </div>
            </div>
            <div className="activity-inner row">
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="activity-item">
                  <div className="activity-icon">
                    <a href="#">
                      <img src="/assets/images/icon6.png" alt="" />
                    </a>
                  </div>
                  <div className="activity-content">
                    <h4>
                      <a href="#">Adventure</a>
                    </h4>
                    <p>15 Destination</p>
                  </div>
                </div>
              </div>
              {/* Repeat for each activity icon... */}
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="activity-item">
                  <div className="activity-icon">
                    <a href="#">
                      <img src="/assets/images/icon10.png" alt="" />
                    </a>
                  </div>
                  <div className="activity-content">
                    <h4>
                      <a href="#">Trekking</a>
                    </h4>
                    <p>12 Destination</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="activity-item">
                  <div className="activity-icon">
                    <a href="#">
                      <img src="/assets/images/icon9.png" alt="" />
                    </a>
                  </div>
                  <div className="activity-content">
                    <h4>
                      <a href="#">Camp Fire</a>
                    </h4>
                    <p>7 Destination</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="activity-item">
                  <div className="activity-icon">
                    <a href="#">
                      <img src="/assets/images/icon8.png" alt="" />
                    </a>
                  </div>
                  <div className="activity-content">
                    <h4>
                      <a href="#">Off Road</a>
                    </h4>
                    <p>15 Destination</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="activity-item">
                  <div className="activity-icon">
                    <a href="#">
                      <img src="/assets/images/icon7.png" alt="" />
                    </a>
                  </div>
                  <div className="activity-content">
                    <h4>
                      <a href="#">Camping</a>
                    </h4>
                    <p>13 Destination</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="activity-item">
                  <div className="activity-icon">
                    <a href="#">
                      <img src="/assets/images/icon11.png" alt="" />
                    </a>
                  </div>
                  <div className="activity-content">
                    <h4>
                      <a href="#">Exploring</a>
                    </h4>
                    <p>25 Destination</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER COMPONENT GOES HERE */}

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

export default Tour_packages;


