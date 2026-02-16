import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  // Desktop nav link style
  const navLinkStyle = {
    color: isScrolled ? "#101F46" : "#fff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    position: "relative",
    display: "inline-block"
  };

  const MobileNavLink = ({ href, children, icon }) => {
    const isActive = location.pathname === href;
    return (
      <li style={{ marginBottom: '8px' }}>
        <Link
          to={href}
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            color: isActive ? '#0791BE' : '#333',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: isActive ? '600' : '500',
            transition: 'all 0.3s ease',
            background: isActive ? 'rgba(7, 145, 190, 0.1)' : 'transparent'
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = '#f8f9fa';
              e.currentTarget.style.color = '#0791BE';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#333';
            }
          }}
        >
          {icon && <i className={icon} style={{ fontSize: '16px', width: '20px' }}></i>}
          {children}
        </Link>
      </li>
    );
  };

  // Render authentication section
  const renderAuthSection = (isMobile = false) => {
    if (currentUser) {
      const firstName = currentUser.user_metadata?.first_name || currentUser.user_metadata?.firstName || "User";

      if (isMobile) {
        return (
          <div style={{
            padding: '20px 0',
            borderTop: '2px solid #f0f0f0',
            marginTop: '20px'
          }}>
            <div style={{
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #0791BE 0%, #065a7a 100%)',
              borderRadius: '10px',
              marginBottom: '15px',
              color: '#fff'
            }}>
              <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>Welcome back</div>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>{firstName}</div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {localStorage.getItem("userRole") === "admin" ? (
                <MobileNavLink href="/admin/dashboard" icon="fas fa-tachometer-alt">Dashboard</MobileNavLink>
              ) : (
                <>
                  <MobileNavLink href="/bookings" icon="fas fa-calendar-check">My Bookings</MobileNavLink>
                  <MobileNavLink href="/wishlist" icon="fas fa-heart">Wishlist</MobileNavLink>
                </>
              )}
              <li style={{ marginTop: '15px' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    border: '2px solid #dc3545',
                    background: 'transparent',
                    borderRadius: '8px',
                    color: '#dc3545',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dc3545';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#dc3545';
                  }}
                >
                  <i className="fas fa-sign-out-alt" style={{ fontSize: '16px', width: '20px' }}></i>
                  Logout
                </button>
              </li>
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
                background: isScrolled ? "rgba(7, 145, 190, 0.1)" : "rgba(255,255,255,0.15)",
                border: isScrolled ? "2px solid rgba(7, 145, 190, 0.2)" : "2px solid rgba(255,255,255,0.3)",
                color: isScrolled ? "#0791BE" : "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                padding: "10px 18px",
                borderRadius: "50px",
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isScrolled ? "#0791BE" : "#fff";
                e.currentTarget.style.color = isScrolled ? "#fff" : "#0791BE";
                e.currentTarget.style.borderColor = isScrolled ? "#0791BE" : "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isScrolled ? "rgba(7, 145, 190, 0.1)" : "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = isScrolled ? "#0791BE" : "#fff";
                e.currentTarget.style.borderColor = isScrolled ? "rgba(7, 145, 190, 0.2)" : "rgba(255,255,255,0.3)";
              }}
            >
              <i className="fas fa-user-circle" style={{ fontSize: "16px" }}></i>
              <span>{firstName}</span>
              <i className={`fas fa-chevron-${showUserDropdown ? 'up' : 'down'}`} style={{ fontSize: "10px" }}></i>
            </button>

            {showUserDropdown && (
              <div
                className="dropdown-menu"
                style={{
                  display: "block",
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: "0",
                  background: "#fff",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                  borderRadius: "12px",
                  minWidth: "240px",
                  zIndex: 9999,
                  border: "none",
                  overflow: 'hidden',
                  padding: '8px'
                }}
              >
                <div style={{
                  padding: "15px 18px",
                  borderBottom: "1px solid #f0f0f0",
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Signed in as
                  </div>
                  <strong style={{ color: "#333", fontSize: '14px', fontWeight: '600' }}>{currentUser.email}</strong>
                </div>

                <div style={{ padding: '8px 0' }}>
                  {localStorage.getItem("userRole") === "admin" ? (
                    <Link
                      to="/admin/dashboard"
                      className="dropdown-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: "12px 18px",
                        fontSize: "14px",
                        color: "#333",
                        textDecoration: 'none',
                        borderRadius: '8px',
                        margin: '0 8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8f9fa';
                        e.currentTarget.style.color = '#0791BE';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#333';
                      }}
                    >
                      <i className="fas fa-tachometer-alt" style={{ fontSize: '16px', width: '18px', color: '#0791BE' }}></i>
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/bookings"
                        className="dropdown-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: "12px 18px",
                          fontSize: "14px",
                          color: "#333",
                          textDecoration: 'none',
                          borderRadius: '8px',
                          margin: '0 8px 4px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.color = '#0791BE';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#333';
                        }}
                      >
                        <i className="fas fa-calendar-check" style={{ fontSize: '16px', width: '18px', color: '#0791BE' }}></i>
                        My Bookings
                      </Link>
                      <Link
                        to="/wishlist"
                        className="dropdown-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: "12px 18px",
                          fontSize: "14px",
                          color: "#333",
                          textDecoration: 'none',
                          borderRadius: '8px',
                          margin: '0 8px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f8f9fa';
                          e.currentTarget.style.color = '#0791BE';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#333';
                        }}
                      >
                        <i className="fas fa-heart" style={{ fontSize: '16px', width: '18px', color: '#0791BE' }}></i>
                        Wishlist
                      </Link>
                    </>
                  )}
                </div>

                <div style={{ borderTop: "1px solid #f0f0f0", marginTop: "8px", padding: '8px' }}>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item"
                    style={{
                      width: "100%",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: "left",
                      padding: "12px 18px",
                      background: "transparent",
                      border: "none",
                      color: "#dc3545",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: '600',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fff5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <i className="fas fa-sign-out-alt" style={{ fontSize: '16px', width: '18px' }}></i>
                    Logout
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
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            to="/admin/login"
            style={{
              textAlign: 'center',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #0791BE 0%, #065a7a 100%)',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              boxShadow: '0 4px 15px rgba(7, 145, 190, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Login
          </Link>
          <Link
            to="/user/register"
            style={{
              textAlign: 'center',
              padding: '14px 24px',
              background: 'transparent',
              color: '#0791BE',
              border: '2px solid #0791BE',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0791BE';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#0791BE';
            }}
          >
            Register
          </Link>
        </div>
      )
    }

    return (
      <div className="header-auth-buttons d-none d-lg-flex align-items-center" style={{ gap: '12px' }}>
        <Link
          to="/admin/login"
          style={{
            color: isScrolled ? "#101F46" : "#fff",
            textDecoration: "none",
            fontWeight: '600',
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "50px",
            transition: "all 0.3s ease",
            border: isScrolled ? "2px solid transparent" : "2px solid rgba(255,255,255,0.3)",
            background: isScrolled ? "transparent" : "rgba(255,255,255,0.1)",
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isScrolled ? "rgba(7, 145, 190, 0.1)" : "rgba(255,255,255,0.2)";
            e.currentTarget.style.borderColor = isScrolled ? "#0791BE" : "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isScrolled ? "transparent" : "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = isScrolled ? "transparent" : "rgba(255,255,255,0.3)";
          }}
        >
          Login
        </Link>
        <Link
          to="/user/register"
          style={{
            color: isScrolled ? "#fff" : "#101F46",
            backgroundColor: isScrolled ? "#0791BE" : "#fff",
            padding: "10px 24px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            border: "2px solid transparent"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
          }}
        >
          Register
        </Link>
      </div>
    );
  };

  return (
    <>
      <header id="masthead" className="site-header header-primary">
        <div
          className="bottom-header"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1020,
            backgroundColor: isScrolled ? "#fff" : "transparent",
            boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
            padding: isScrolled ? "12px 0" : "20px 0",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: isScrolled ? "blur(10px)" : "none"
          }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="site-identity" onClick={handleLogoClick} style={{ cursor: 'pointer', zIndex: 1021 }}>
              <img
                src={isScrolled ? "/assets/images/travele-logo1.png" : "/assets/images/travele-logo.png"}
                alt="Travele Logo"
                style={{
                  maxHeight: isScrolled ? '40px' : '50px',
                  transition: 'all 0.4s ease',
                  filter: isScrolled ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="main-navigation d-none d-lg-block">
              <nav id="navigation" className="navigation">
                <div style={{
                  background: isScrolled ? 'rgba(247, 250, 252, 0.95)' : 'rgba(255, 255, 255, 0.85)',
                  border: isScrolled ? '1px solid rgba(7, 145, 190, 0.1)' : '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '50px',
                  padding: '8px 12px',
                  boxShadow: isScrolled ? '0 2px 15px rgba(0,0,0,0.06)' : '0 4px 20px rgba(0,0,0,0.12)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.4s ease'
                }}>
                  <ul style={{
                    display: 'flex',
                    gap: '4px',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    alignItems: 'center'
                  }}>
                    {[
                      { text: 'Home', link: '/' },
                      { text: 'Packages', link: '/tour-packages' },
                      // { text: 'Blog', link: '/blog-archive' },
                      { text: 'About Us', link: '/about' },
                      { text: 'Contact', link: '/contact' }
                    ].map((item, index) => {
                      const isActive = location.pathname === item.link;
                      return (
                        <li key={index}>
                          <Link
                            to={item.link}
                            style={{
                              color: isActive ? '#fff' : '#101F46',
                              textDecoration: "none",
                              fontSize: "15px",
                              fontWeight: "600",
                              padding: "10px 20px",
                              borderRadius: "50px",
                              transition: "all 0.3s ease",
                              position: "relative",
                              display: "inline-block",
                              background: isActive ? '#0791BE' : 'transparent',
                              boxShadow: isActive ? '0 4px 15px rgba(7, 145, 190, 0.3)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.background = '#0791BE';
                                e.currentTarget.style.color = '#fff';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#101F46';
                              }
                            }}
                          >
                            {item.text}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
                  background: mobileMenuOpen ? '#0791BE' : (isScrolled ? 'rgba(7, 145, 190, 0.1)' : 'rgba(255,255,255,0.15)'),
                  border: '2px solid',
                  borderColor: mobileMenuOpen ? '#0791BE' : (isScrolled ? 'rgba(7, 145, 190, 0.2)' : 'rgba(255,255,255,0.3)'),
                  color: mobileMenuOpen ? '#fff' : (isScrolled ? '#0791BE' : '#fff'),
                  fontSize: '20px',
                  cursor: 'pointer',
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
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
          width: '85%',
          maxWidth: '320px',
          height: '100vh',
          backgroundColor: '#fff',
          boxShadow: '-5px 0 30px rgba(0,0,0,0.15)',
          zIndex: 1010,
          padding: '24px',
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #e0e0e0',
            background: '#fff',
            color: '#333',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 1011
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8f9fa';
            e.currentTarget.style.borderColor = '#0791BE';
            e.currentTarget.style.color = '#0791BE';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.borderColor = '#e0e0e0';
            e.currentTarget.style.color = '#333';
          }}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Menu Content */}
        <div style={{ marginTop: '60px' }}>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <MobileNavLink href="/" icon="fas fa-home">Home</MobileNavLink>
              <MobileNavLink href="/tour-packages" icon="fas fa-suitcase-rolling">Packages</MobileNavLink>
              {/* <MobileNavLink href="/blog-archive" icon="fas fa-blog">Blog</MobileNavLink> */}
              <MobileNavLink href="/about" icon="fas fa-info-circle">About Us</MobileNavLink>
              <MobileNavLink href="/contact" icon="fas fa-envelope">Contact</MobileNavLink>
            </ul>
          </nav>

          {renderAuthSection(true)}
        </div>
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
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1009,
            backdropFilter: 'blur(5px)',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 991px) {
          .container {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        @media (max-width: 576px) {
          .site-identity img {
            max-height: 35px !important;
          }
          
          .mobile-menu-container {
            width: 90% !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
