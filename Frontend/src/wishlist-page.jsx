import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "./utils/api"; // your axios instance
import { useNavigate } from "react-router-dom";

const Wishlist_page = () => {
  const [wishlistPackages, setWishlistPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If not logged in, redirect to login page
        navigate("/admin/login");
        return;
      }
      try {
        const res = await api.get("/wishlist"); // assuming auth handled globally
        setWishlistPackages(res.data.packages || []);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setWishlistPackages([]);
      }
    };
    fetchWishlist();
  }, [navigate]);

  if (!wishlistPackages.length) {
    return (
      <div>
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
                <h1 className="inner-title">Wish List</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>
        </main>
        <h2 style={{ textAlign: "center" }  }>Your wishlist is empty.</h2>
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
      </div>
    );
  }
  
  return (
    <div id="page" className="full-page">
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
                {wishlistPackages.map((pkg) => (
                  <div className="col-lg-4 col-md-6" key={pkg._id}>
                    <div className="package-wrap">
                      <figure className="feature-image">
                        <a href={`/package-detail/${pkg._id}`}>
                          <img
                            src={pkg.imageUrl || "/assets/images/img5.jpg"}
                            alt={pkg.title}
                          />
                        </a>
                      </figure>
                      <div className="package-price">
                        <h6>
                          <span>
                            {pkg.price
                              ? `$${(pkg.price / 100).toFixed(2)}`
                              : "$1,900"}{" "}
                          </span>
                          / per person
                        </h6>
                      </div>
                      <div className="package-content-wrap">
                        <div className="package-meta text-center">
                          <ul>
                            <li>
                              <i className="far fa-clock"></i>{" "}
                              {pkg.tripDuration || "7D/6N"}
                            </li>
                            <li>
                              <i className="fas fa-user-friends"></i>{" "}
                              People: {pkg.people || "5"}
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt"></i>{" "}
                              {pkg.destination || "-"}
                            </li>
                          </ul>
                        </div>
                        <div className="package-content">
                          <h3>
                            <a href={`/package-detail/${pkg._id}`}>
                              {pkg.title || "Package Title"}
                            </a>
                          </h3>
                          <div className="review-area">
                            <span className="review-text">
                              ({pkg.reviewsCount || 0} reviews)
                            </span>
                            <div
                              className="rating-start"
                              title={`Rated ${pkg.rating || 0} out of 5`}
                            >
                              <span
                                style={{
                                  width: `${(pkg.rating || 0) * 20}%`,
                                }}
                              ></span>
                            </div>
                          </div>
                          <p>{pkg.description}</p>
                          <div className="btn-wrap">
                            <a
                              href={`/package-detail/${pkg._id}`}
                              className="button-text"
                            >
                              Book Now <i className="fas fa-arrow-right"></i>
                            </a>
                            {/* Add Remove from Wishlist button next */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Keep your footer and other components unchanged */}
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
    </div>
  );
};

export default Wishlist_page;
