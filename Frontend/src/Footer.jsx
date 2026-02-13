import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer id="colophon" className="site-footer footer-primary">
            <div className="top-footer">
                <div className="container">
                    <div className="row">
                        {/* Column 1: About */}
                        <div className="col-lg-3 col-md-6">
                            <aside className="widget widget_text">
                                <div className="footer-logo">
                                    <a href="/">
                                        <img src="/assets/images/logo-white.png" alt="Travele" style={{ maxWidth: '160px' }} />
                                    </a>
                                </div>
                                <div className="textwidget widget-text">
                                    Travele is your trusted partner for unforgettable journeys. We curate exceptional travel experiences tailored to your dreams, ensuring every trip is a masterpiece of adventure and discovery.
                                </div>
                                <div className="footer-social-links" style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                    <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                                    <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                                </div>
                            </aside>
                        </div>

                        {/* Column 2: Contact */}
                        <div className="col-lg-3 col-md-6">
                            <aside className="widget widget_text">
                                <h3 className="widget-title">Contact Us</h3>
                                <div className="textwidget widget-text">
                                    <div className="contact-widget-item">
                                        <FaPhoneAlt />
                                        <span>+01 (977) 2599 12</span>
                                    </div>
                                    <div className="contact-widget-item">
                                        <FaEnvelope />
                                        <span>contact@travele.com</span>
                                    </div>
                                    <div className="contact-widget-item">
                                        <FaMapMarkerAlt />
                                        <span>3146 Koontz, California</span>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Column 3: Quick Links */}
                        <div className="col-lg-3 col-md-6">
                            <aside className="widget widget_nav_menu">
                                <h3 className="widget-title">Quick Links</h3>
                                <ul>
                                    <li><a href="/about">About Us</a></li>
                                    <li><a href="/tour-packages">Tour Packages</a></li>
                                    <li><a href="/gallery">Gallery</a></li>
                                    <li><a href="/contact">Contact Support</a></li>
                                    <li><a href="/admin/login">Admin Login</a></li>
                                </ul>
                            </aside>
                        </div>

                        {/* Column 4: Newsletter */}
                        <div className="col-lg-3 col-md-6">
                            <aside className="widget widget_newslatter">
                                <h3 className="widget-title">Newsletter</h3>
                                <div className="widget-text">
                                    Subscribe to our newsletter for the latest updates, exclusive offers, and travel inspiration directly to your inbox.
                                </div>
                                <form className="newslatter-form">
                                    <input type="email" name="s" placeholder="Your Email Address" required />
                                    <input type="submit" value="Subscribe Now" />
                                </form>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="buttom-footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <div className="footer-menu">
                                <ul>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 text-center">
                            {/* Optional: Small logo or icon here if needed, keeping layout balanced */}
                        </div>
                        <div className="col-md-5">
                            <div className="copy-right text-right">
                                Copyright © 2024 Travele. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
