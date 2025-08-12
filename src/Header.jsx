import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

   // Dynamic link color style based on scroll
  const navLinkStyle = {
    color: isScrolled ? "#101F46" : "#fff",
    transition: "color 0.3s ease"
  };

  return (
    <header id="masthead" className="site-header header-primary">
      {/* --- Top Header --- */}
      <div
        className="top-header"
        style={{
          display: isScrolled ? "none" : "block",
          transition: "all 0.3s ease"
        }}
      >
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-8 d-none d-lg-block">
              <div className="header-contact-info">
                <ul>
                  <li><a href="#"><i className="fas fa-phone-alt"></i> +01 (977) 2599 12</a></li>
                  <li><a href="#"><i className="fas fa-envelope"></i> [email protected]</a></li>
                  <li><i className="fas fa-map-marker-alt"></i> 3146 Koontz Lane, California</li>
                </ul>
              </div>
            </div>

            {/* Social + Search */}
            <div className="col-lg-4 d-flex justify-content-lg-end justify-content-between">
              <div className="header-social social-links">
                <ul>
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
              <div className="header-search-icon">
                <button className="search-icon">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Header --- */}
      <div
        className="bottom-header"
        style={{
          position: isScrolled ? "fixed" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1020,
          backgroundColor: isScrolled ? "#fff" : "transparent",
          boxShadow: isScrolled ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
          transition: "all 0.3s ease"
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="site-identity">
            <p className="site-title">
              <img
                className="black-logo"
                src="/assets/images/travele-logo1.png"
                alt="logo"
                style={{ display: isScrolled ? "inline" : "none" }}
              />
              {/* Show white logo when scrolled down */}
              <img
                className="white-logo"
                src="/assets/images/travele-logo.png"
                alt="logo"
                style={{ display: isScrolled ? "none" : "inline" }}
              />
            </p>
          </div>

          {/* Navigation */}
          <div className="main-navigation d-none d-lg-block">
            <nav id="navigation" className="navigation">
              <ul>
                <li className="menu-item-has-children">
                  <a href="/" style={navLinkStyle}>Home</a>
                  <ul><li><a href="/index-v2">Home 2</a></li></ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Tour</a>
                  <ul>
                    <li><a href="/destination">Destination</a></li>
                    <li><a href="/tour-packages">Tour Packages</a></li>
                    <li><a href="/package-offer">Package Offer</a></li>
                    <li><a href="/package-detail">Package Detail</a></li>
                    <li><a href="/tour-cart">Tour Cart</a></li>
                    <li><a href="/booking">Package Booking</a></li>
                    <li><a href="/confirmation">Confirmation</a></li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Pages</a>
                  <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/service">Service</a></li>
                    <li><a href="/career">Career</a></li>
                    <li><a href="/career-detail">Career Detail</a></li>
                    <li><a href="/tour-guide">Tour Guide</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/single-page">Single Page</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/testimonial-page">Testimonial</a></li>
                    <li><a href="/popup">Popup</a></li>
                    <li><a href="/search-page">Search Page</a></li>
                    <li><a href="/404">404 Page</a></li>
                    <li><a href="/coming-soon">Coming Soon</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/wishlist-page">Wishlist</a></li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Shop</a>
                  <ul>
                    <li><a href="/product-right">Shop Archive</a></li>
                    <li><a href="/product-detail">Shop Single</a></li>
                    <li><a href="/product-cart">Shop Cart</a></li>
                    <li><a href="/product-checkout">Shop Checkout</a></li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Blog</a>
                  <ul>
                    <li><a href="/blog-archive">Blog List</a></li>
                    <li><a href="/blog-archive-left">Blog Left Sidebar</a></li>
                    <li><a href="/blog-archive-both">Blog Both Sidebar</a></li>
                    <li><a href="/blog-single">Blog Single</a></li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Dashboard</a>
                  <ul>
                    <li><a href="/admin/dashboard">Dashboard</a></li>
                    <li className="menu-item-has-children">
                      <a href="#">User</a>
                      <ul>
                        <li><a href="/admin/user">User List</a></li>
                        <li><a href="/admin/user-edit">User Edit</a></li>
                        <li><a href="/admin/new-user">New User</a></li>
                      </ul>
                    </li>
                    <li><a href="/admin/db-booking">Booking</a></li>
                    <li className="menu-item-has-children">
                      <a href="/admin/db-package">Package</a>
                      <ul>
                        <li><a href="/admin/db-package-active">Package Active</a></li>
                        <li><a href="/admin/db-package-pending">Package Pending</a></li>
                        <li><a href="/admin/db-package-expired">Package Expired</a></li>
                      </ul>
                    </li>
                    <li><a href="/admin/db-comment">Comments</a></li>
                    <li><a href="/admin/db-wishlist">Wishlist</a></li>
                    <li><a href="/admin/login">Login</a></li>
                    <li><a href="/admin/forgot">Forget Password</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          {/* Buy Now */}
          <div className="header-btn">
            <a href="https://1.envato.market/6eay43" className="button-primary">BUY NOW</a>
          </div>
        </div>
      </div>

      <div className="mobile-menu-container"></div>
    </header>
  );
};

export default Header;
