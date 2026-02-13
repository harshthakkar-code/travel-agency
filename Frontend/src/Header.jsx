import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserDropdown(false);
      setMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(".user-dropdown")) {
        setShowUserDropdown(false);
      }
      if (mobileMenuOpen && !event.target.closest(".mobile-menu-container") && !event.target.closest(".mobile-menu-btn")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown, mobileMenuOpen]);

  // Navbar styles
  const navLinkStyle = {
    color: isScrolled ? "#101F46" : "#fff",
    transition: "color 0.3s ease",
  };

  const MobileNavLink = ({ href, children }) => (
    <li>
      <a href={href} onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid #eee', color: '#333' }}>
        {children}
      </a>
    </li>
  );

  // Render authentication section
  const renderAuthSection = (isMobile = false) => {
    if (currentUser) {
      const firstName = currentUser.user_metadata?.first_name || currentUser.user_metadata?.firstName || "User";

      if (isMobile) {
        return (
          <div style={{ padding: '15px 0', borderTop: '1px solid #eee', marginTop: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Welcome, {firstName}</div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {localStorage.getItem("userRole") === "admin" ? (
                <li><a href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</a></li>
              ) : (
                <>
                  <li><a href="/bookings" onClick={() => setMobileMenuOpen(false)}>My Bookings</a></li>
                  <li><a href="/wishlist" onClick={() => setMobileMenuOpen(false)}>Wishlist</a></li>
                </>
              )}
              <li><button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'red', padding: '10px 0', cursor: 'pointer' }}>Logout</button></li>
            </ul>
          </div>
        );
      }

      return (
        <div className="header-user-section d-none d-lg-flex align-items-center">
          <div className="user-dropdown" style={{ position: "relative" }}>
            <button
              className="user-name-btn"
              onClick={toggleUserDropdown}
              style={{
                background: "none",
                border: "none",
                color: isScrolled ? "#101F46" : "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                padding: "8px 15px",
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Hi, {firstName}</span>
              <i className={`fas fa-chevron-${showUserDropdown ? 'up' : 'down'}`} style={{ fontSize: "10px" }}></i>
            </button>

            {showUserDropdown && (
              <div
                className="dropdown-menu"
                style={{
                  display: "block",
                  position: "absolute",
                  top: "120%",
                  right: "0",
                  background: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  minWidth: "200px",
                  zIndex: 9999,
                  border: "none",
                  overflow: 'hidden',
                  padding: '5px 0'
                }}
              >
                <div style={{ padding: "12px 20px", borderBottom: "1px solid #f0f0f0", fontSize: "12px", color: "#888" }}>
                  Signed in as <br />
                  <strong style={{ color: "#333", fontSize: '13px' }}>{currentUser.email}</strong>
                </div>

                {localStorage.getItem("userRole") === "admin" ? (
                  <a href="/admin/dashboard" className="dropdown-item" style={{ padding: "10px 20px", fontSize: "14px", color: "#333" }}>
                    <i className="fas fa-tachometer-alt" style={{ marginRight: "10px", color: '#0791BE', fontSize: '16px' }}></i> Dashboard
                  </a>
                ) : (
                  <>
                    <a href="/bookings" className="dropdown-item" style={{ padding: "10px 20px", fontSize: "14px", color: "#333" }}>
                      <i className="fas fa-calendar-check" style={{ marginRight: "10px", color: '#0791BE', fontSize: '16px' }}></i> My Bookings
                    </a>
                    <a href="/wishlist" className="dropdown-item" style={{ padding: "10px 20px", fontSize: "14px", color: "#333" }}>
                      <i className="fas fa-heart" style={{ marginRight: "10px", color: '#0791BE', fontSize: '16px' }}></i> Wishlist
                    </a>
                  </>
                )}

                <div style={{ borderTop: "1px solid #f0f0f0", marginTop: "5px" }}>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 20px",
                      background: "none",
                      border: "none",
                      color: "#dc3545",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    <i className="fas fa-sign-out-alt" style={{ marginRight: "10px", fontSize: '16px' }}></i> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Guest State
    if (isMobile) {
      return (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a href="/admin/login" className="btn-primary-custom" style={{ textAlign: 'center' }}>Login</a>
          <a href="/user/register" className="btn-outline-custom" style={{ textAlign: 'center' }}>Register</a>
        </div>
      )
    }

    return (
      <div className="header-auth-buttons d-none d-lg-flex align-items-center">
        <a
          href="/admin/login"
          style={{
            color: isScrolled ? "#101F46" : "#fff",
            textDecoration: "none",
            fontWeight: '600',
            marginRight: "20px",
            fontSize: "14px",
            transition: "color 0.3s"
          }}
        >
          Login
        </a>
        <a
          href="/user/register"
          style={{
            color: isScrolled ? "#fff" : "#101F46",
            backgroundColor: isScrolled ? "#101F46" : "#fff",
            padding: "8px 20px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          Register
        </a>
      </div>
    );
  };

  return (
    <>
      <header id="masthead" className="site-header header-primary">
        {/* --- Bottom Header (Main) --- */}
        <div
          className="bottom-header"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1020,
            backgroundColor: isScrolled ? "#fff" : "transparent",
            boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
            padding: isScrolled ? "15px 0" : "25px 0",
            transition: "all 0.4s ease",
          }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="site-identity" onClick={handleLogoClick} style={{ cursor: 'pointer', zIndex: 1021 }}>
              <img
                src={isScrolled ? "/assets/images/travele-logo1.png" : "/assets/images/travele-logo.png"}
                alt="logo"
                style={{ maxHeight: '45px', transition: 'all 0.3s' }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="main-navigation d-none d-lg-block">
              <nav id="navigation" className="navigation">
                <ul>
                  <li><a href="/" style={navLinkStyle}>Home</a></li>
                  <li><a href="/tour-packages" style={navLinkStyle}>Packages</a></li>
                  <li><a href="/about" style={navLinkStyle}>About Us</a></li>
                  <li><a href="/contact" style={navLinkStyle}>Contact</a></li>
                </ul>
              </nav>
            </div>

            {/* Auth Buttons (Desktop) */}
            {renderAuthSection(false)}

            {/* Mobile Menu Toggle */}
            <div className="d-lg-none" style={{ zIndex: 1021 }}>
              <button
                className="mobile-menu-btn"
                onClick={toggleMobileMenu}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isScrolled || mobileMenuOpen ? '#101F46' : '#fff',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-container ${mobileMenuOpen ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: mobileMenuOpen ? 0 : '-100%',
          width: '280px',
          height: '100vh',
          backgroundColor: '#fff',
          boxShadow: '-5px 0 20px rgba(0,0,0,0.1)',
          zIndex: 1010,
          padding: '80px 20px 20px',
          transition: 'right 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0)',
          overflowY: 'auto'
        }}
      >
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/tour-packages">Packages</MobileNavLink>
            <MobileNavLink href="/about">About Us</MobileNavLink>
            <MobileNavLink href="/contact">Contact</MobileNavLink>
          </ul>
        </nav>

        {renderAuthSection(true)}
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1009,
            backdropFilter: 'blur(3px)'
          }}
        />
      )}
    </>
  );
};

export default Header;
