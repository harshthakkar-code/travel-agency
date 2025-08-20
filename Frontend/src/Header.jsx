import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);


   const handleLogoClick = () => {
    console.log('Logo clicked');
    window.location.href = '/';
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      try {
        const parsedUser = userData;
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('bookingData');
        localStorage.removeItem('completeBooking');
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear all authentication and booking related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('bookingData');
    localStorage.removeItem('completeBooking');
    
    // Reset states
    setIsAuthenticated(false);
    setUser(null);
    setShowUserDropdown(false);
    
    // Redirect to home page
    window.location.href = '/';
  };

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // Dynamic link color style based on scroll
  const navLinkStyle = {
    color: isScrolled ? "#101F46" : "#fff",
    transition: "color 0.3s ease"
  };

 
  // Render authentication buttons
  const renderAuthSection = () => {
    if (isAuthenticated && user) {
      return (
        <div className="header-user-section d-flex align-items-center">
          <div className="user-dropdown" style={{ position: 'relative' }}>
            <button 
              className="user-name-btn"
              onClick={toggleUserDropdown}
              style={{
                background: 'none',
                border: 'none',
                color: isScrolled ? "#101F46" : "#fff",
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
            >
              Welcome, {localStorage.getItem('user')}
              <i className="fas fa-chevron-down" style={{ marginLeft: '5px', fontSize: '12px' }}></i>
            </button>
            
            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div 
                className="dropdown-menu" 
                style={{ 
                  display: 'block',
                  position: 'absolute', 
                  top: '100%', 
                  right: '0', 
                  background: '#fff', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
                  borderRadius: '6px', 
                  minWidth: '180px', 
                  zIndex: 9999,
                  marginTop: '5px',
                  border: '1px solid #e9ecef'
                }}
              >
                <div style={{ padding: '10px 15px', borderBottom: '1px solid #f8f9fa', fontSize: '12px', color: '#6c757d' }}>
                  Signed in as <br />
                  <strong style={{ color: '#333' }}>{localStorage.getItem('userEmail')}</strong>
                </div>
                
                {/* <a 
                  href="/profile" 
                  style={{ 
                    display: 'block', 
                    padding: '10px 15px', 
                    color: '#333', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f8f9fa'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <i className="fas fa-user" style={{ marginRight: '8px', width: '15px' }}></i>
                  Profile
                </a> */}
                
                {/* <a 
                  href="/my-bookings" 
                  style={{ 
                    display: 'block', 
                    padding: '10px 15px', 
                    color: '#333', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f8f9fa'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <i className="fas fa-calendar-check" style={{ marginRight: '8px', width: '15px' }}></i>
                  My Bookings
                </a> */}
                
                  {/* <a 
                    href="/settings" 
                    style={{ 
                      display: 'block', 
                      padding: '10px 15px', 
                      color: '#333', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid #f8f9fa'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <i className="fas fa-cog" style={{ marginRight: '8px', width: '15px' }}></i>
                    Settings
                  </a> */}
                
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    width: '100%', 
                    textAlign: 'left', 
                    padding: '10px 15px', 
                    background: 'none', 
                    border: 'none', 
                    color: '#dc3545', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    borderRadius: '0 0 6px 6px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '8px', width: '15px' }}></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="header-auth-buttons d-flex">
          <a 
            href="/admin/login" 
            className="login-btn"
            style={{
              color: isScrolled ? "#101F46" : "#fff",
              textDecoration: 'none',
              padding: '8px 15px',
              marginRight: '10px',
              border: `1px solid ${isScrolled ? "#101F46" : "#fff"}`,
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              fontSize: '14px'
            }}
          >
            Login
          </a>
          <a 
            href="/user/register" 
            className="register-btn"
            style={{
              color: isScrolled ? "#fff" : "#101F46",
              backgroundColor: isScrolled ? "#101F46" : "#fff",
              textDecoration: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              fontSize: '14px'
            }}
          >
            Register
          </a>
        </div>
      );
    }
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
                  <li><a href="#"><i className="fas fa-envelope"></i> travelewithus@gmail.com</a></li>
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
          <div className="site-identity" onClick={handleLogoClick}>
            <p className="site-title">
              <img
                className="black-logo"
                src="/assets/images/travele-logo1.png"
                alt="logo"
                style={{ display: isScrolled ? "inline" : "none" }}
              />
              <img
                href="/"
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
                {/* <li className="menu-item-has-children">
                  <a href="/" style={navLinkStyle}>Home</a>
                  <ul><li><a href="/index-v2">Home 2</a></li></ul>
                </li> */}
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Tour</a>
                  <ul>
                    <li><a href="/destination">Destination</a></li>
                    <li><a href="/tour-packages">Tour Packages</a></li>
                    <li><a href="/package-offer">Package Offer</a></li>
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
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/testimonial-page">Testimonial</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
                </li>
                {/* <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Shop</a>
                  <ul>
                    <li><a href="/product-right">Shop Archive</a></li>
                    <li><a href="/product-detail">Shop Single</a></li>
                    <li><a href="/product-cart">Shop Cart</a></li>
                    <li><a href="/product-checkout">Shop Checkout</a></li>
                  </ul>
                </li> */}
                <li className="menu-item-has-children">
                  <a href="#" style={navLinkStyle}>Blog</a>
                  <ul>
                    <li><a href="/blog-archive">Blog List</a></li>
                    <li><a href="/blog-archive-left">Blog Left Sidebar</a></li>
                    <li><a href="/blog-archive-both">Blog Both Sidebar</a></li>
                    <li><a href="/blog-single">Blog Single</a></li>
                  </ul>
                </li>
                
                {/* Show Dashboard menu only for authenticated users */}
                {isAuthenticated && (
                  <li className="menu-item-has-children">
                    <a href="#" style={navLinkStyle}>Dashboard</a>
                    <ul>
                      <li><a href="/bookings">Booking</a></li>
                      <li><a href="/wishlist">Wishlist</a></li>
                    </ul>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Authentication Section - Replace Buy Now button */}
          <div className="header-btn">
            {renderAuthSection()}
          </div>
        </div>
      </div>

      <div className="mobile-menu-container"></div>
    </header>
  );
};

export default Header;
