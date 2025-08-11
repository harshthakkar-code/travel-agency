import React from "react";

const Destination = () => (
  <main id="content" className="site-main">
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
    {/* End Subscribe Section */}
  </main>
);

export default Destination;
