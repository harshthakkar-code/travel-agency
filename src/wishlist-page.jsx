import React from "react";

const Wishlist_page = () => {
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
                <h1 className="inner-title">Wish List</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Wishlist Packages Section */}
        <div className="package-section">
          <div className="container">
            <div className="package-inner">
              <div className="row">
                {/* --- Wishlist Card 1 --- */}
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
                            <i className="far fa-clock"></i>
                            7D/6N
                          </li>
                          <li>
                            <i className="fas fa-user-friends"></i>
                            People: 5
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i>
                            Malaysia
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
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.
                        </p>
                        <div className="btn-wrap">
                          <a href="#" className="button-text">
                            Book Now<i className="fas fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- Repeat for all other cards (Card 2, Card 3, ...Card 6) --- */}
                {/* Card 2 */}
                <div className="col-lg-4 col-md-6">
                  <div className="package-wrap">
                    <figure className="feature-image">
                      <a href="#">
                        <img src="/assets/images/img6.jpg" alt="" />
                      </a>
                    </figure>
                    <div className="package-price">
                      <h6>
                        <span>$1,230 </span> / per person
                      </h6>
                    </div>
                    <div className="package-content-wrap">
                      <div className="package-meta text-center">
                        <ul>
                          <li>
                            <i className="far fa-clock"></i>
                            5D/4N
                          </li>
                          <li>
                            <i className="fas fa-user-friends"></i>
                            People: 8
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i>
                            Canada
                          </li>
                        </ul>
                      </div>
                      <div className="package-content">
                        <h3>
                          <a href="#">Experience the natural beauty of island</a>
                        </h3>
                        <div className="review-area">
                          <span className="review-text">(17 reviews)</span>
                          <div className="rating-start" title="Rated 5 out of 5">
                            <span style={{ width: "100%" }}></span>
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.
                        </p>
                        <div className="btn-wrap">
                          <a href="#" className="button-text">
                            Book Now<i className="fas fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ...Cards 3 to 6 follow same structure as above... */}
              </div>
            </div>
          </div>
        </div>
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

export default Wishlist_page;


