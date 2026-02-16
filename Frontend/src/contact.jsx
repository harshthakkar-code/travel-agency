import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div id="page" className="full-page">
      <Header />

      <main id="content" className="site-main">
        {/* =================== HERO SECTION =================== */}
        <section className="contact-hero-section" style={{
          backgroundImage: "url(/assets/images/slider-banner-2.jpg)",
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
              <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>
              Get In Touch
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
              Contact <span className="hero-highlight">Us</span>
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
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* =================== CONTACT INFO CARDS =================== */}
        <section style={{ padding: '80px 0', background: '#f8f9fa', marginTop: '-60px', position: 'relative', zIndex: 3 }}>
          <div className="container">
            <div className="row" style={{ marginTop: '-80px', paddingTop: "50px" }}>
              <div className="col-lg-4 col-md-6 mb-4">
                <div style={{
                  background: '#fff',
                  padding: '40px 30px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  height: '100%'
                }}
                  className="contact-card-hover">
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #0791BE 0%, #065a7a 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 20px rgba(7, 145, 190, 0.3)'
                  }}>
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '28px', color: '#fff' }}></i>
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                    Visit Us
                  </h4>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                    123 Travel Street, Suite 100<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-4">
                <div style={{
                  background: '#fff',
                  padding: '40px 30px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  height: '100%'
                }}
                  className="contact-card-hover">
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #F56960 0%, #d94a42 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 20px rgba(245, 105, 96, 0.3)'
                  }}>
                    <i className="fas fa-phone-alt" style={{ fontSize: '28px', color: '#fff' }}></i>
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                    Call Us
                  </h4>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                    Phone: +1 (555) 123-4567<br />
                    Mobile: +1 (555) 987-6543<br />
                    Mon-Fri: 9AM - 6PM PST
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 mb-4">
                <div style={{
                  background: '#fff',
                  padding: '40px 30px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  height: '100%'
                }}
                  className="contact-card-hover">
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #f5a623 0%, #d68910 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 20px rgba(245, 166, 35, 0.3)'
                  }}>
                    <i className="fas fa-envelope" style={{ fontSize: '28px', color: '#fff' }}></i>
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>
                    Email Us
                  </h4>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                    info@travele.com<br />
                    support@travele.com<br />
                    We reply within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================== CONTACT FORM & MAP SECTION =================== */}
        <section style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container">
            <div className="row align-items-stretch">
              {/* Contact Form */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div style={{ paddingRight: '30px' }}>
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
                    Send Message
                  </span>
                  <h2 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    marginBottom: '20px',
                    color: '#101F46',
                    lineHeight: '1.2'
                  }}>
                    We'd Love to Hear From You
                  </h2>
                  <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', marginBottom: '40px' }}>
                    Fill out the form below and our team will get back to you within 24 hours. We're here to help make your travel dreams come true.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          required
                          style={{
                            width: '100%',
                            padding: '15px 20px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0791BE'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email *"
                          required
                          style={{
                            width: '100%',
                            padding: '15px 20px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0791BE'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          style={{
                            width: '100%',
                            padding: '15px 20px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0791BE'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                          style={{
                            width: '100%',
                            padding: '15px 20px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'border-color 0.3s ease',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0791BE'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message *"
                        required
                        rows="6"
                        style={{
                          width: '100%',
                          padding: '15px 20px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'border-color 0.3s ease',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0791BE'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      ></textarea>
                    </div>

                    {formStatus === 'success' && (
                      <div style={{
                        padding: '15px 20px',
                        background: '#d4edda',
                        border: '1px solid #c3e6cb',
                        borderRadius: '10px',
                        color: '#155724',
                        marginBottom: '20px',
                        fontSize: '15px'
                      }}>
                        <i className="fas fa-check-circle" style={{ marginRight: '10px' }}></i>
                        Thank you! Your message has been sent successfully.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-primary-custom"
                      style={{
                        padding: '15px 40px',
                        fontSize: '16px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-paper-plane" style={{ marginRight: '10px' }}></i>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Map */}
              <div className="col-lg-6">
                <div style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  height: '100%',
                  minHeight: '500px'
                }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977571630467!2d-122.41941708468186!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1645564658932!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '500px' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Office Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================== SOCIAL MEDIA SECTION =================== */}
        <section style={{
          padding: '80px 0',
          background: '#f8f9fa',
          textAlign: 'center'
        }}>
          <div className="container">
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
              Stay Connected
            </span>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#101F46'
            }}>
              Follow Us on Social Media
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.7'
            }}>
              Stay updated with our latest travel packages, tips, and exclusive offers.
            </p>

            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="#" style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b5998 0%, #2d4373 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 5px 15px rgba(59, 89, 152, 0.3)',
                textDecoration: 'none'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 89, 152, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(59, 89, 152, 0.3)';
                }}>
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="#" style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 5px 15px rgba(29, 161, 242, 0.3)',
                textDecoration: 'none'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(29, 161, 242, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(29, 161, 242, 0.3)';
                }}>
                <i className="fab fa-twitter"></i>
              </a>

              <a href="#" style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 5px 15px rgba(225, 48, 108, 0.3)',
                textDecoration: 'none'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(225, 48, 108, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(225, 48, 108, 0.3)';
                }}>
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#" style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #0077B5 0%, #005582 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 5px 15px rgba(0, 119, 181, 0.3)',
                textDecoration: 'none'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 119, 181, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 119, 181, 0.3)';
                }}>
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a href="#" style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF0000 0%, #cc0000 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 5px 15px rgba(255, 0, 0, 0.3)',
                textDecoration: 'none'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.3)';
                }}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Add hover effect styles */}
      <style>{`
        .contact-card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
        }
        
        @media (max-width: 991px) {
          .contact-hero-section h1 {
            font-size: 48px !important;
          }
          .contact-hero-section {
            min-height: 60vh !important;
            padding-top: 100px !important;
          }
        }
        
        @media (max-width: 767px) {
          .contact-hero-section h1 {
            font-size: 36px !important;
          }
          .contact-hero-section p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
