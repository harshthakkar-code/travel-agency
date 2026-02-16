import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribeStatus('success');
            setEmail('');
            setTimeout(() => setSubscribeStatus(''), 3000);
        }
    };

    return (
        <footer style={{
            background: 'linear-gradient(135deg, #101F46 0%, #0a1428 100%)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'rgba(7, 145, 190, 0.05)',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '400px',
                height: '400px',
                background: 'rgba(245, 105, 96, 0.05)',
                borderRadius: '50%',
                filter: 'blur(80px)'
            }}></div>

            {/* Main Footer Content */}
            <div style={{ padding: '40px 0 20px', position: 'relative', zIndex: 2 }}>
                <div className="container">
                    <div className="row">
                        {/* Column 1: About */}
                        <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                            <div style={{ paddingRight: '20px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <Link to="/">
                                        <img
                                            src="/assets/images/logo-white.png"
                                            alt="Travele"
                                            style={{
                                                maxWidth: '180px',
                                                filter: 'brightness(1.1)'
                                            }}
                                        />
                                    </Link>
                                </div>
                                <p style={{
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '15px'
                                }}>
                                    Your trusted partner for unforgettable journeys. We curate exceptional travel experiences tailored to your dreams.
                                </p>

                                {/* Social Links */}
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <a href="#" aria-label="Facebook" style={{
                                        width: '42px',
                                        height: '42px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#3b5998';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.borderColor = '#3b5998';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }}>
                                        <FaFacebookF />
                                    </a>
                                    <a href="#" aria-label="Twitter" style={{
                                        width: '42px',
                                        height: '42px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#1DA1F2';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.borderColor = '#1DA1F2';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }}>
                                        <FaTwitter />
                                    </a>
                                    <a href="#" aria-label="Instagram" style={{
                                        width: '42px',
                                        height: '42px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, #E1306C, #C13584)';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.borderColor = '#E1306C';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }}>
                                        <FaInstagram />
                                    </a>
                                    <a href="#" aria-label="LinkedIn" style={{
                                        width: '42px',
                                        height: '42px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#0077B5';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.borderColor = '#0077B5';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }}>
                                        <FaLinkedinIn />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="col-lg-2 col-md-6 mb-3 mb-lg-0">
                            <h3 style={{
                                fontSize: '17px',
                                fontWeight: '700',
                                marginBottom: '18px',
                                color: '#fff',
                                position: 'relative',
                                paddingBottom: '12px'
                            }}>
                                Quick Links
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #0791BE, #F56960)',
                                    borderRadius: '2px'
                                }}></span>
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="footer-quick-links">
                                {[
                                    { text: 'Home', link: '/' },
                                    { text: 'About Us', link: '/about' },
                                    { text: 'Tour Packages', link: '/tour-packages' },
                                    { text: 'Contact Us', link: '/contact' }
                                ].map((item, index) => (
                                    <li key={index} style={{ marginBottom: '12px' }}>
                                        <Link to={item.link} style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            textDecoration: 'none',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#0791BE';
                                                e.currentTarget.style.paddingLeft = '5px';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                                                e.currentTarget.style.paddingLeft = '0';
                                            }}>
                                            <span style={{ fontSize: '8px' }}>▸</span>
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                            <h3 style={{
                                fontSize: '17px',
                                fontWeight: '700',
                                marginBottom: '18px',
                                color: '#fff',
                                position: 'relative',
                                paddingBottom: '12px'
                            }}>
                                Contact Info
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #0791BE, #F56960)',
                                    borderRadius: '2px'
                                }}></span>
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(7, 145, 190, 0.15)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: '1px solid rgba(7, 145, 190, 0.3)'
                                    }}>
                                        <FaMapMarkerAlt style={{ color: '#0791BE', fontSize: '16px' }} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#fff' }}>Address</h5>
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.6' }}>
                                            123 Travel Street, Suite 100<br />
                                            San Francisco, CA 94102
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(7, 145, 190, 0.15)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: '1px solid rgba(7, 145, 190, 0.3)'
                                    }}>
                                        <FaPhoneAlt style={{ color: '#0791BE', fontSize: '16px' }} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#fff' }}>Phone</h5>
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                                            +1 (555) 123-4567
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(7, 145, 190, 0.15)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: '1px solid rgba(7, 145, 190, 0.3)'
                                    }}>
                                        <FaEnvelope style={{ color: '#0791BE', fontSize: '16px' }} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#fff' }}>Email</h5>
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                                            info@travele.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Newsletter */}
                        <div className="col-lg-3 col-md-6">
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginBottom: '25px',
                                color: '#fff',
                                position: 'relative',
                                paddingBottom: '12px'
                            }}>
                                Newsletter
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #0791BE, #F56960)',
                                    borderRadius: '2px'
                                }}></span>
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                lineHeight: '1.6',
                                color: 'rgba(255,255,255,0.7)',
                                marginBottom: '15px'
                            }}>
                                Subscribe for exclusive offers and travel inspiration.
                            </p>
                            <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '14px 50px 14px 18px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#0791BE';
                                            e.target.style.background = 'rgba(255,255,255,0.08)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                            e.target.style.background = 'rgba(255,255,255,0.05)';
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            position: 'absolute',
                                            right: '5px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, #0791BE, #065a7a)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, #065a7a, #0791BE)';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, #0791BE, #065a7a)';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                        }}
                                    >
                                        <FaPaperPlane style={{ fontSize: '14px' }} />
                                    </button>
                                </div>
                                {subscribeStatus === 'success' && (
                                    <p style={{
                                        marginTop: '12px',
                                        fontSize: '13px',
                                        color: '#4ade80',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        <i className="fas fa-check-circle"></i>
                                        Successfully subscribed!
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '20px 0',
                position: 'relative',
                zIndex: 2
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start'
                            }}>
                                <a href="#" style={{
                                    color: 'rgba(255,255,255,0.6)',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0791BE'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                    Privacy Policy
                                </a>
                                <a href="#" style={{
                                    color: 'rgba(255,255,255,0.6)',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0791BE'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                    Terms & Conditions
                                </a>
                                <a href="#" style={{
                                    color: 'rgba(255,255,255,0.6)',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0791BE'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                    FAQ
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p style={{
                                margin: 0,
                                fontSize: '14px',
                                color: 'rgba(255,255,255,0.6)',
                                textAlign: 'right'
                            }}>
                                © {new Date().getFullYear()} <span style={{ color: '#0791BE', fontWeight: '600' }}>Travele</span>. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 991px) {
                    footer .col-lg-4,
                    footer .col-lg-2,
                    footer .col-lg-3 {
                        margin-bottom: 35px !important;
                    }
                }

                @media (max-width: 767px) {
                    /* Mobile: Center all footer content */
                    footer .col-md-6,
                    footer .col-lg-4,
                    footer .col-lg-2,
                    footer .col-lg-3 {
                        text-align: center !important;
                        padding-left: 15px !important;
                        padding-right: 15px !important;
                    }
                    
                    /* Center flex containers */
                    footer .col-md-6 > div,
                    footer .col-lg-4 > div {
                        justify-content: center !important;
                        align-items: center !important;
                        padding-right: 0 !important;
                    }
                    
                    /* Center all text */
                    footer .col-md-6 p,
                    footer p {
                        text-align: center !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    
                    /* Center and adjust social icons */
                    footer .col-lg-4 > div > div:last-child {
                        justify-content: center !important;
                        margin-top: 20px !important;
                    }
                    
                    /* Quick Links - Two Column Layout on Mobile */
                    footer .footer-quick-links {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0 20px !important;
                        max-width: 280px !important;
                        margin: 0 auto !important;
                        text-align: left !important;
                    }
                    
                    footer .footer-quick-links li {
                        margin-bottom: 10px !important;
                    }
                    
                    footer .col-lg-2 ul li a {
                        justify-content: flex-start !important;
                    }
                    
                    /* Center contact info */
                    footer .col-lg-3 > div {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    
                    /* Contact info boxes - full width on mobile */
                    footer .col-lg-3 > div > div {
                        max-width: 100% !important;
                        width: 100% !important;
                        text-align: left !important;
                    }
                    
                    /* Center headings with better spacing */
                    footer h3 {
                        text-align: center !important;
                        margin-top: 0 !important;
                    }
                    
                    /* Center gradient underline */
                    footer h3 span {
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                    }
                    
                    /* Newsletter form - full width on mobile */
                    footer .col-lg-3:last-child form {
                        max-width: 100% !important;
                        margin: 0 auto !important;
                    }
                    
                    /* Compact column spacing */
                    footer .col-lg-4,
                    footer .col-lg-2,
                    footer .col-lg-3 {
                        margin-bottom: 35px !important;
                    }
                    
                    footer .row > div:last-child {
                        margin-bottom: 0 !important;
                    }
                    
                    /* Bottom footer - stack vertically */
                    footer .col-md-6:first-child > div {
                        margin-bottom: 15px !important;
                        flex-direction: column !important;
                        gap: 10px !important;
                    }
                    
                    /* Logo section - more compact */
                    footer .col-lg-4 img {
                        margin-bottom: 10px !important;
                    }
                    
                    footer .col-lg-4 p {
                        font-size: 13px !important;
                        line-height: 1.5 !important;
                        margin-bottom: 10px !important;
                    }
                }
                
                @media (max-width: 576px) {
                    /* Extra small mobile - even more compact */
                    footer .col-lg-4,
                    footer .col-lg-2,
                    footer .col-lg-3 {
                        margin-bottom: 30px !important;
                    }
                    
                    /* Smaller social icons */
                    footer a[aria-label] {
                        width: 36px !important;
                        height: 36px !important;
                        font-size: 14px !important;
                    }
                    
                    /* Smaller contact info boxes */
                    footer .col-lg-3 div[style*="width: 40px"] {
                        width: 35px !important;
                        height: 35px !important;
                    }
                    
                    footer .col-lg-3 div[style*="width: 40px"] svg {
                        font-size: 14px !important;
                    }
                    
                    /* Compact logo */
                    footer img[alt="Travele"] {
                        max-width: 140px !important;
                    }
                    
                    /* Smaller headings */
                    footer h3 {
                        font-size: 16px !important;
                        margin-bottom: 15px !important;
                    }
                    
                    /* Tighter contact info spacing */
                    footer .col-lg-3 > div {
                        gap: 10px !important;
                    }
                    
                    /* Compact description text */
                    footer .col-lg-4 p {
                        font-size: 12px !important;
                        margin-bottom: 8px !important;
                    }
                    
                    /* Smaller newsletter input */
                    footer input[type="email"] {
                        padding: 12px 45px 12px 15px !important;
                        font-size: 13px !important;
                    }
                    
                    footer button[type="submit"] {
                        width: 36px !important;
                        height: 36px !important;
                    }
                    
                    /* Bottom footer text size */
                    footer .col-md-6 p,
                    footer .col-md-6 a {
                        font-size: 12px !important;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
