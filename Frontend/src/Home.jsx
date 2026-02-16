import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [featuredPackages, setFeaturedPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data, error } = await supabase
                    .from('packages')
                    .select('*')
                    .eq('status', 'Active')
                    .limit(3); // Only show top 3
                if (!error) setFeaturedPackages(data || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFeatured();
    }, []);

    // Helper to render stars
    const renderStars = (rating) => {
        // ... same star logic ...
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<i key={i} className={i < Math.floor(rating) ? "fas fa-star" : "far fa-star"} style={{ color: '#f5a623', fontSize: '13px' }}></i>);
        }
        return stars;
    };

    return (
        <div id="page" className="full-page">
            <Header />
            <main id="content" className="site-main">
                {/* === HERO SECTION === */}
                <section className="home-hero-section" style={{
                    backgroundImage: "url(/assets/images/slider-banner-1.jpg)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    paddingTop: '80px'
                }}>
                    <div className="overlay" style={{ background: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2, color: '#fff', textAlign: 'center' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '50px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            <i className="fas fa-plane-departure" style={{ marginRight: '10px' }}></i>
                            Discover the World
                        </span>
                        <h1 style={{ fontSize: '64px', fontWeight: '800', marginBottom: '20px', textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#fff' }}>
                            Travel Beyond Your <br /> <span className="hero-highlight">Imagination</span>
                        </h1>
                        <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto 40px', opacity: 0.9 }}>
                            Experience the best destinations with our curated travel packages.
                            Adventure, luxury, and unforgettable memories await.
                        </p>
                        <div className="hero-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/tour-packages" className="btn-primary-custom" style={{ padding: '15px 40px', fontSize: '16px' }}>
                                Explore Packages
                            </Link>
                            <Link to="/contact" className="btn-outline-custom" style={{ padding: '15px 40px', fontSize: '16px', background: 'transparent', border: '2px solid #fff', color: '#fff' }}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>

                {/* === FEATURES SECTION === */}
                <section className="home-features" style={{ padding: '80px 0', background: '#fff' }}>
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-4">
                                <div className="feature-box" style={{ padding: '30px' }}>
                                    <i className="fas fa-globe-americas" style={{ fontSize: '50px', color: '#0791BE', marginBottom: '20px' }}></i>
                                    <h3>Best Destinations</h3>
                                    <p style={{ color: '#777' }}>We cover the most amazing places on Earth, verified by experts.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature-box" style={{ padding: '30px' }}>
                                    <i className="fas fa-wallet" style={{ fontSize: '50px', color: '#F56960', marginBottom: '20px' }}></i>
                                    <h3>Best Price Guarantee</h3>
                                    <p style={{ color: '#777' }}>We ensure you get the best value for your money with no hidden costs.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="feature-box" style={{ padding: '30px' }}>
                                    <i className="fas fa-headset" style={{ fontSize: '50px', color: '#f5a623', marginBottom: '20px' }}></i>
                                    <h3>24/7 Support</h3>
                                    <p style={{ color: '#777' }}>Our expert team is always available to assist you anytime, anywhere.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === POPULAR PACKAGES === */}
                <section className="home-packages" style={{ padding: '80px 0', background: '#f8f9fa' }}>
                    <div className="container">
                        <div className="section-heading text-center mb-5">
                            <h5 className="dash-style">CHECK OUT OUR</h5>
                            <h2>Popular Packages</h2>
                        </div>
                        <div className="row">
                            {featuredPackages.map((pkg) => (
                                <div className="col-lg-4 col-md-6 mb-4" key={pkg.id}>
                                    <div className="package-card-modern">
                                        <div className="package-card-image">
                                            <img src={pkg.gallery?.[0] || "/assets/images/img5.jpg"} alt={pkg.title} />
                                            <div className="package-card-overlay">
                                                <span className="view-details-btn" onClick={() => navigate(`/package-detail/${pkg.id}`)}>View Details</span>
                                            </div>
                                            {pkg.sale_price && <div className="package-card-badge">SALE</div>}
                                        </div>
                                        <div className="package-card-body">
                                            <div className="package-card-meta">
                                                <span><i className="far fa-clock"></i> {pkg.trip_duration}</span>
                                                <span><i className="fas fa-map-marker-alt"></i> {pkg.destination}</span>
                                            </div>
                                            <h3 className="package-card-title" onClick={() => navigate(`/package-detail/${pkg.id}`)}>{pkg.title}</h3>
                                            <div className="package-card-footer">
                                                <span className="current-price" style={{ color: '#F56960', fontWeight: 'bold', fontSize: '20px' }}>
                                                    ${pkg.sale_price || pkg.regular_price}
                                                </span>
                                                <button className="btn-book-now" onClick={() => navigate(`/package-detail/${pkg.id}`)}>Book Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/tour-packages" className="btn-primary-custom">View All Packages</Link>
                        </div>
                    </div>
                </section>

                {/* === NEWSLETTER / CTA === */}
                <section className="home-cta" style={{
                    backgroundImage: "url(/assets/images/slider-banner-2.jpg)", // Ensure this image exists
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    padding: '100px 0',
                    position: 'relative',
                    textAlign: 'center',
                    color: '#fff'
                }}>
                    <div className="overlay" style={{ background: 'rgba(0,0,0,0.6)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <h2>Subscribe To Our Newsletter</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 30px', opacity: 0.8 }}>
                            Get the latest updates, offers, and travel tips directly to your inbox.
                        </p>
                        <form style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '10px' }}>
                            <input type="email" placeholder="Your Email Address" style={{ flex: 1, padding: '15px', borderRadius: '5px', border: 'none' }} />
                            <button type="submit" className="btn-primary-custom" style={{ padding: '15px 30px' }}>Subscribe</button>
                        </form>
                    </div>
                </section>

            </main>
            <Footer />

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .home-hero-section h1 {
                        font-size: 36px !important;
                    }
                    .home-hero-section p {
                        font-size: 16px !important;
                        padding: 0 20px;
                    }
                    .hero-actions {
                        padding: 0 20px;
                        width: 100%;
                    }
                    .hero-actions .btn-primary-custom,
                    .hero-actions .btn-outline-custom {
                        width: 100%;
                        max-width: 300px;
                        padding: 12px 30px !important;
                        font-size: 15px !important;
                        text-align: center;
                    }
                }
                
                @media (max-width: 480px) {
                    .home-hero-section h1 {
                        font-size: 28px !important;
                    }
                    .home-hero-section p {
                        font-size: 14px !important;
                    }
                    .hero-actions .btn-primary-custom,
                    .hero-actions .btn-outline-custom {
                        padding: 10px 25px !important;
                        font-size: 14px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
