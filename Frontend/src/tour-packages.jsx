import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "./utils/api"; // use your custom axios instance
import { Link, useNavigate } from "react-router-dom";

const Tour_packages = () => {
  const [packages, setPackages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages");
      setPackages(res.data.packages || []);
    } catch (err) {
      setPackages([]);
    }
  };
  fetchPackages();
}, []);


useEffect(() => {
  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // Not logged in

    try {
      const res = await api.get('/wishlist');
      // Adjust here as per your API response
      const wishlistPackages = Array.isArray(res.data) 
        ? res.data 
        : res.data.packages || [];
      setWishlist(wishlistPackages.map(pkg => pkg._id));
      console.log('Wishlist loaded:', wishlistPackages);
    } catch (error) {
      console.error('Failed to load wishlist', error);
    }
  };
  fetchWishlist();
}, []);



// Function to check auth and redirect or proceed
  const handleProtectedAction = (action) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in, redirect to login page
      navigate("/admin/login");
      return;
    }
    action();
  };

  const handleBookNow = (pkgId) => {
    navigate(`/package-detail/${pkgId}`);
  };

 const toggleWishlist = async (packageId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/admin/login');
    return;
  }

  const isWishlisted = wishlist.includes(packageId);

  try {
    if (isWishlisted) {
      // Remove from wishlist
      await api.delete(`/wishlist/${packageId}`);
      setWishlist(prev => prev.filter(id => id !== packageId));
    } else {
      // Add to wishlist
      await api.post('/wishlist', { packageId });
      setWishlist(prev => [...prev, packageId]);
    }
  } catch (error) {
    console.error('Wishlist update failed:', error);
  }
};


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
                {packages.length > 0 ? (
                  packages.map((pkg, idx) => (
                    <div className="col-lg-4 col-md-6" key={pkg._id || idx}>
                      <div className="package-wrap">
                        <figure className="feature-image">
                         
  <img src={pkg.imageUrl || "/assets/images/img5.jpg"} alt="" />
                        </figure>
                        <div className="package-price">
                          <h6>
                            <span>
                              {pkg.price ? `$${pkg.price}` : "$1,900"}{" "}
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
                              {pkg.title || "Package Title"}

                            </h3>
                            <div className="review-area">
                              <span className="review-text">
                                ({pkg.reviewsCount || 25} reviews)
                              </span>
                              <div
                                className="rating-start"
                                title={`Rated ${pkg.rating || 5} out of 5`}
                              >
                                <span
                                  style={{
                                    width: `${(pkg.rating || 5) * 20}%`,
                                  }}
                                ></span>
                              </div>
                            </div>
                            <p>
                              {pkg.description ||
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus."}
                            </p>
                            <div className="btn-wrap">
                             
                             <a style={{ cursor: "pointer" }}
                            className="button-text width-6 cursor-pointer"
                            onClick={() => handleProtectedAction(() => handleBookNow(pkg._id))}
                          >
                            Book Now <i className="fas fa-arrow-right"></i>
                          </a>
                              <a style={{ cursor: "pointer" }} onClick={() => toggleWishlist(pkg._id)} className="button-text width-6">
                                Wish List<i  className={`  ${wishlist.includes(pkg._id) ? "fa fa-solid fa-heart" : "far fa-heart"}`}></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // If no packages, display nothing or fallback message
                  null
                )}
              </div>
              {/* ...Any other rows/sections remain unchanged... */}
            </div>
          </div>
        </div>

        {/* Activity, Footer, etc. --- KEEP ALL ORIGINAL JSX BELOW UNCHANGED */}

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
