import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const About = () => (
  <div id="page" className="full-page">
    <Header />

    <main id="content" className="site-main">
      {/* =================== HERO SECTION =================== */}
      <section className="about-hero-section" style={{
        backgroundImage: "url(/assets/images/slider-banner-1.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '120px',
        paddingBottom: '80px'
      }}>
        <div className="overlay" style={{
          background: 'linear-gradient(135deg, rgba(7, 145, 190, 0.88) 0%, rgba(16, 31, 70, 0.88) 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, color: '#fff', textAlign: 'center' }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '20px' }}>
            <ol className="breadcrumb" style={{
              background: 'transparent',
              padding: 0,
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px',
              listStyle: 'none'
            }}>
              <li>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F56960'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}>
                  <i className="fas fa-home" style={{ marginRight: '6px' }}></i>Home
                </Link>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
              <li style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>About Us</li>
            </ol>
          </nav>

          <span style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            marginBottom: '25px',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <i className="fas fa-info-circle" style={{ marginRight: '10px' }}></i>
            About Travele
          </span>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '900',
            marginBottom: '25px',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            color: '#fff'
          }}>
            Your Journey, <br /><span className="hero-highlight">Our Passion</span>
          </h1>
          <p style={{
            fontSize: '20px',
            maxWidth: '750px',
            margin: '0 auto',
            opacity: 0.95,
            lineHeight: '1.6',
            fontWeight: '400',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            Creating unforgettable travel experiences since day one. We turn your travel dreams into reality.
          </p>
        </div>
      </section>

      {/* =================== WHO WE ARE SECTION =================== */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div style={{ position: 'relative' }}>
                <img
                  src="/assets/images/img25.jpg"
                  alt="About Travele"
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-30px',
                  right: '-30px',
                  background: '#0791BE',
                  color: '#fff',
                  padding: '30px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(7, 145, 190, 0.3)',
                  textAlign: 'center',
                  minWidth: '180px'
                }}>
                  <h3 style={{ fontSize: '48px', fontWeight: '800', margin: '0', color: '#fff' }}>15+</h3>
                  <p style={{ margin: '5px 0 0', fontSize: '14px', opacity: 0.9 }}>Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ paddingLeft: '40px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 18px',
                  background: 'rgba(7, 145, 190, 0.1)',
                  color: '#0791BE',
                  borderRadius: '50px',
                  marginBottom: '15px',
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Who We Are
                </span>
                <h2 style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  marginBottom: '25px',
                  color: '#101F46',
                  lineHeight: '1.2'
                }}>
                  We Make Your Travel Dreams Come True
                </h2>
                <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
                  Travele is your trusted partner for unforgettable journeys. With over 15 years of experience in the travel industry, we've helped thousands of travelers discover the world's most amazing destinations.
                </p>
                <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
                  Our team of expert travel consultants works tirelessly to curate exceptional experiences tailored to your preferences, ensuring every trip is a masterpiece of adventure, comfort, and discovery.
                </p>
                <div className="row">
                  <div className="col-6 mb-3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fas fa-check-circle" style={{ fontSize: '24px', color: '#0791BE' }}></i>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>Expert Guidance</span>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fas fa-check-circle" style={{ fontSize: '24px', color: '#0791BE' }}></i>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>Best Prices</span>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fas fa-check-circle" style={{ fontSize: '24px', color: '#0791BE' }}></i>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>24/7 Support</span>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fas fa-check-circle" style={{ fontSize: '24px', color: '#0791BE' }}></i>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>Handpicked Hotels</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== WHY CHOOSE US SECTION =================== */}
      <section style={{ padding: '100px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{
              display: 'inline-block',
              padding: '6px 18px',
              background: 'rgba(245, 105, 96, 0.1)',
              color: '#F56960',
              borderRadius: '50px',
              marginBottom: '15px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Why Choose Us
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#101F46', marginBottom: '15px' }}>
              What Makes Us Special
            </h2>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              We go above and beyond to ensure your travel experience is seamless, memorable, and extraordinary.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%'
              }}
                className="feature-card-hover">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0791BE 0%, #065a7a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  boxShadow: '0 10px 25px rgba(7, 145, 190, 0.3)'
                }}>
                  <i className="fas fa-dollar-sign" style={{ fontSize: '32px', color: '#fff' }}></i>
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                  Competitive Pricing
                </h4>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  Get the best value for your money with our transparent pricing and exclusive deals on packages worldwide.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%'
              }}
                className="feature-card-hover">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #F56960 0%, #d94a42 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  boxShadow: '0 10px 25px rgba(245, 105, 96, 0.3)'
                }}>
                  <i className="fas fa-map-marked-alt" style={{ fontSize: '32px', color: '#fff' }}></i>
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                  Handpicked Destinations
                </h4>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  Explore carefully curated destinations that offer authentic experiences and breathtaking beauty.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%'
              }}
                className="feature-card-hover">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #f5a623 0%, #d68910 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  boxShadow: '0 10px 25px rgba(245, 166, 35, 0.3)'
                }}>
                  <i className="fas fa-headset" style={{ fontSize: '32px', color: '#fff' }}></i>
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                  24/7 Customer Support
                </h4>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  Our dedicated support team is available round the clock to assist you with any queries or concerns.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%'
              }}
                className="feature-card-hover">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  boxShadow: '0 10px 25px rgba(155, 89, 182, 0.3)'
                }}>
                  <i className="fas fa-shield-alt" style={{ fontSize: '32px', color: '#fff' }}></i>
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                  Secure Booking
                </h4>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  Book with confidence using our secure payment gateway and flexible cancellation policies.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%'
              }}
                className="feature-card-hover">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  boxShadow: '0 10px 25px rgba(39, 174, 96, 0.3)'
                }}>
                  <i className="fas fa-users" style={{ fontSize: '32px', color: '#fff' }}></i>
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                  Expert Travel Guides
                </h4>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  Travel with experienced local guides who bring destinations to life with insider knowledge.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%'
              }}
                className="feature-card-hover">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  boxShadow: '0 10px 25px rgba(231, 76, 60, 0.3)'
                }}>
                  <i className="fas fa-heart" style={{ fontSize: '32px', color: '#fff' }}></i>
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                  Personalized Experiences
                </h4>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                  Every journey is tailored to your preferences, ensuring a unique and memorable adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== STATS SECTION =================== */}
      <section style={{
        backgroundImage: "url(/assets/images/img26.jpg)",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        position: 'relative'
      }}>
        <div className="overlay" style={{
          background: 'linear-gradient(135deg, rgba(7, 145, 190, 0.9) 0%, rgba(16, 31, 70, 0.9) 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div style={{ padding: '20px' }}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  color: '#fff',
                  marginBottom: '10px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  500K+
                </div>
                <p style={{ fontSize: '16px', color: '#fff', opacity: 0.9, margin: 0, fontWeight: '500' }}>
                  Happy Travelers
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div style={{ padding: '20px' }}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  color: '#fff',
                  marginBottom: '10px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  250+
                </div>
                <p style={{ fontSize: '16px', color: '#fff', opacity: 0.9, margin: 0, fontWeight: '500' }}>
                  Destinations
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div style={{ padding: '20px' }}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  color: '#fff',
                  marginBottom: '10px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  15+
                </div>
                <p style={{ fontSize: '16px', color: '#fff', opacity: 0.9, margin: 0, fontWeight: '500' }}>
                  Years Experience
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div style={{ padding: '20px' }}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  color: '#fff',
                  marginBottom: '10px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  98%
                </div>
                <p style={{ fontSize: '16px', color: '#fff', opacity: 0.9, margin: 0, fontWeight: '500' }}>
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== CTA SECTION =================== */}
      <section style={{ padding: '100px 0', background: '#fff', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 18px',
              background: 'rgba(7, 145, 190, 0.1)',
              color: '#0791BE',
              borderRadius: '50px',
              marginBottom: '15px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Ready to Explore?
            </span>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#101F46'
            }}>
              Start Your Journey With Us Today
            </h2>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', marginBottom: '40px' }}>
              Let us help you create memories that will last a lifetime. Browse our curated packages or get in touch with our travel experts to plan your perfect getaway.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/tour-packages" className="btn-primary-custom" style={{ padding: '15px 40px', fontSize: '16px' }}>
                <i className="fas fa-suitcase-rolling" style={{ marginRight: '8px' }}></i>
                Browse Packages
              </Link>
              <Link to="/contact" className="btn-outline-custom" style={{
                padding: '15px 40px',
                fontSize: '16px',
                background: 'transparent',
                border: '2px solid #0791BE',
                color: '#0791BE'
              }}>
                <i className="fas fa-phone-alt" style={{ marginRight: '8px' }}></i>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>

    <Footer />

    {/* Add hover effect styles */}
    <style>{`
      .feature-card-hover:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
      }
    `}</style>
  </div>
);

export default About;
