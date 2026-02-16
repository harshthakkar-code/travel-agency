import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";
import { Link, useNavigate } from "react-router-dom";

// Scroll reveal hook
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const Tour_packages = () => {
  const [packages, setPackages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [reviewsCount, setReviewsCount] = useState({});
  const [heroLoaded, setHeroLoaded] = useState(false);

  const navigate = useNavigate();
  const [packagesRef, packagesVisible] = useScrollReveal(0.1);
  const [activityRef, activityVisible] = useScrollReveal(0.1);
  const [statsRef, statsVisible] = useScrollReveal(0.2);
  const [ctaRef, ctaVisible] = useScrollReveal(0.2);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('status', 'Active');
        if (error) throw error;
        setPackages(data || []);
      } catch (err) {
        setPackages([]);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;
      try {
        const { data, error } = await supabase
          .from('wishlist')
          .select('package_id')
          .eq('user_id', user.data.user.id);
        if (error) throw error;
        setWishlist(data.map(item => item.package_id));
      } catch (error) {
        console.error('Failed to load wishlist', error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (packageId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
      return;
    }
    const isWishlisted = wishlist.includes(packageId);
    try {
      if (isWishlisted) {
        await supabase.from('wishlist').delete().match({ user_id: user.id, package_id: packageId });
        setWishlist(prev => prev.filter(id => id !== packageId));
      } else {
        await supabase.from('wishlist').insert([{ user_id: user.id, package_id: packageId }]);
        setWishlist(prev => [...prev, packageId]);
      }
    } catch (error) {
      console.error('Wishlist update failed:', error);
    }
  };

  useEffect(() => {
    const fetchReviewsCount = async () => {
      try {
        const { data: reviews, error } = await supabase.from('reviews').select('package_id, rating');
        if (error) throw error;
        const counts = {};
        const ratings = {};
        reviews.forEach(review => {
          const packageId = review.package_id;
          const rating = review.rating || 0;
          if (packageId) {
            counts[packageId] = (counts[packageId] || 0) + 1;
            if (!ratings[packageId]) ratings[packageId] = { sum: 0, count: 0 };
            ratings[packageId].sum += rating;
            ratings[packageId].count += 1;
          }
        });
        const avg = {};
        Object.keys(ratings).forEach(pid => {
          const { sum, count } = ratings[pid];
          avg[pid] = count > 0 ? parseFloat((sum / count).toFixed(1)) : 0;
        });
        setReviewsCount(counts);
        setAverageRatings(avg);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviewsCount({});
        setAverageRatings({});
      }
    };
    if (packages.length > 0) fetchReviewsCount();
  }, [packages]);

  const handleProtectedAction = (action) => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/admin/login");
      return;
    }
    action();
  };

  const handleBookNow = (pkgId) => {
    navigate(`/package-detail/${pkgId}`);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star" style={{ color: '#f5a623', fontSize: '13px' }}></i>);
    }
    if (hasHalf) {
      stars.push(<i key="half" className="fas fa-star-half-alt" style={{ color: '#f5a623', fontSize: '13px' }}></i>);
    }
    const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < remaining; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star" style={{ color: '#ddd', fontSize: '13px' }}></i>);
    }
    return stars;
  };

  return (
    <div id="page" className="full-page">
      <Header />

      <main id="content" className="site-main">
        {/* =================== HERO SECTION =================== */}
        <section className="landing-hero">
          <div className="landing-hero-bg" style={{ backgroundImage: "url(/assets/images/slider-banner-1.jpg)" }}></div>
          <div className="landing-hero-overlay"></div>
          <div className="container">
            <div className="landing-hero-content" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)', textAlign: 'center', margin: '0 auto' }}>
              <span className="landing-hero-badge">
                <i className="fas fa-globe-americas"></i> Explore The World With Us
              </span>
              <h1 className="landing-hero-title">
                Discover Your Next <br />
                <span className="hero-highlight">Adventure</span>
              </h1>
              <p className="landing-hero-subtitle">
                Curated travel experiences to the world's most breathtaking destinations.
                Let us craft your perfect journey with expert guides and exclusive packages.
              </p>
              <div className="landing-hero-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#packages-section" className="btn-primary-custom">
                  <i className="fas fa-compass"></i> Explore Packages
                </a>
                <Link to="/contact" className="btn-outline-custom">
                  <i className="fas fa-headset"></i> Talk to Expert
                </Link>
              </div>
            </div>
          </div>
          <div className="landing-hero-wave">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#ffffff" />
            </svg>
          </div>
        </section>

        {/* =================== STATS BAR =================== */}
        <section className="landing-stats" ref={statsRef} style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-map-marked-alt"></i></div>
                <div className="stat-info">
                  <h3>500+</h3>
                  <p>Destinations</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-users"></i></div>
                <div className="stat-info">
                  <h3>10K+</h3>
                  <p>Happy Travelers</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-award"></i></div>
                <div className="stat-info">
                  <h3>15+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><i className="fas fa-headset"></i></div>
                <div className="stat-info">
                  <h3>24/7</h3>
                  <p>Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================== PACKAGES SECTION =================== */}
        <div className="package-section" id="packages-section" ref={packagesRef}>
          <div className="container">
            <div className="section-heading text-center" style={{ marginBottom: '50px', opacity: packagesVisible ? 1 : 0, transform: packagesVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
              <h5 className="dash-style">POPULAR TOURS</h5>
              <h2>Our Best Tour Packages</h2>
              <p style={{ maxWidth: '600px', margin: '0 auto', color: '#787878' }}>
                Hand-picked travel experiences designed to create unforgettable memories.
                Choose your dream destination and let the adventure begin.
              </p>
            </div>
            <div className="package-inner">
              <div className="row">
                {packages.length > 0
                  ? packages.map((pkg, idx) => (
                    <div className="col-lg-4 col-md-6" key={pkg.id || idx} style={{ opacity: packagesVisible ? 1 : 0, transform: packagesVisible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease-out ${idx * 0.1}s` }}>
                      <div className="package-card-modern">
                        {/* Image */}
                        <div className="package-card-image" onClick={() => handleProtectedAction(() => handleBookNow(pkg.id))}>
                          <img
                            src={pkg.gallery?.[0] || "/assets/images/img5.jpg"}
                            alt={pkg.title || "Tour package"}
                          />
                          <div className="package-card-overlay">
                            <span className="view-details-btn">
                              View Details <i className="fas fa-arrow-right"></i>
                            </span>
                          </div>
                          {pkg.sale_price && pkg.regular_price && pkg.sale_price < pkg.regular_price && (
                            <div className="package-card-badge">
                              {Math.round(((pkg.regular_price - pkg.sale_price) / pkg.regular_price) * 100)}% OFF
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="package-card-body">
                          {/* Meta info */}
                          <div className="package-card-meta">
                            <span><i className="far fa-clock"></i> {pkg.trip_duration || "7D/6N"}</span>
                            <span><i className="fas fa-user-friends"></i> {pkg.group_size || "5"} People</span>
                            <span><i className="fas fa-map-marker-alt"></i> {pkg.destination || "-"}</span>
                          </div>

                          {/* Title */}
                          <h3 className="package-card-title" onClick={() => handleProtectedAction(() => handleBookNow(pkg.id))}>
                            {pkg.title || "Package Title"}
                          </h3>

                          {/* Reviews */}
                          <div className="package-card-reviews">
                            {reviewsCount[pkg.id] && reviewsCount[pkg.id] > 0 ? (
                              <>
                                <div className="stars-inline">
                                  {renderStars(averageRatings[pkg.id] || 0)}
                                </div>
                                <span className="review-count">
                                  {(averageRatings[pkg.id] || 0).toFixed(1)} ({reviewsCount[pkg.id]} reviews)
                                </span>
                              </>
                            ) : (
                              <span className="no-reviews">No reviews yet</span>
                            )}
                          </div>

                          {/* Description */}
                          <p className="package-card-desc">
                            {pkg.description ? pkg.description.slice(0, 80) + '...' : "Discover an amazing travel experience with expert guides and stunning views."}
                          </p>

                          {/* Price + Actions */}
                          <div className="package-card-footer">
                            <div className="package-card-price">
                              {pkg.sale_price && pkg.sale_price < pkg.regular_price && (
                                <span className="original-price">
                                  ${Math.round(pkg.regular_price / pkg.group_size).toLocaleString()}
                                </span>
                              )}
                              <span className="current-price">
                                ${Math.round(
                                  pkg.sale_price
                                    ? pkg.sale_price / pkg.group_size
                                    : pkg.regular_price / pkg.group_size
                                ).toLocaleString()}
                              </span>
                              <span className="per-person">/ person</span>
                            </div>
                            <div className="package-card-actions">
                              <button
                                className="btn-book-now"
                                onClick={() => handleProtectedAction(() => handleBookNow(pkg.id))}
                              >
                                Book Now
                              </button>
                              <button
                                className={`btn-wishlist ${wishlist.includes(pkg.id) ? 'wishlisted' : ''}`}
                                onClick={() => toggleWishlist(pkg.id)}
                                title="Add to wishlist"
                              >
                                <i className={wishlist.includes(pkg.id) ? "fas fa-heart" : "far fa-heart"}></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
        </div>

        {/* =================== CTA SECTION =================== */}
        <section className="landing-cta" ref={ctaRef} style={{ opacity: ctaVisible ? 1 : 0, transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
          <div className="landing-cta-bg" style={{ backgroundImage: "url(/assets/images/slider-banner-2.jpg)" }}></div>
          <div className="landing-cta-overlay"></div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="landing-cta-content text-center">
              <h5 style={{ color: '#F56960', fontWeight: 700, letterSpacing: '2px', marginBottom: '15px', fontSize: '14px' }}>
                READY FOR YOUR NEXT TRIP?
              </h5>
              <h2 style={{ color: '#fff', marginBottom: '20px' }}>
                Life Is Short And The World Is Wide
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 30px' }}>
                Start planning your dream vacation today. Our travel experts are ready to craft
                the perfect itinerary just for you.
              </p>
              <div className="landing-hero-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary-custom">
                  <i className="fas fa-paper-plane"></i> Plan My Trip
                </Link>
                <Link to="/about" className="btn-outline-custom" style={{ borderColor: '#fff', color: '#fff' }}>
                  <i className="fas fa-info-circle"></i> Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =================== ACTIVITY SECTION =================== */}
        <section className="activity-section" ref={activityRef}>
          <div className="container">
            <div className="section-heading text-center" style={{ opacity: activityVisible ? 1 : 0, transform: activityVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <h5 className="dash-style">TRAVEL BY ACTIVITY</h5>
                  <h2>ADVENTURE & ACTIVITY</h2>
                  <p>
                    Choose your travel style and explore destinations that match your passion
                    for adventure and discovery.
                  </p>
                </div>
              </div>
            </div>
            <div className="activity-inner row" style={{ opacity: activityVisible ? 1 : 0, transition: 'all 0.6s ease-out 0.2s' }}>
              {[
                { icon: "icon6.png", title: "Adventure", count: "15 Destination" },
                { icon: "icon10.png", title: "Trekking", count: "12 Destination" },
                { icon: "icon9.png", title: "Camp Fire", count: "7 Destination" },
                { icon: "icon8.png", title: "Off Road", count: "15 Destination" },
                { icon: "icon7.png", title: "Camping", count: "13 Destination" },
                { icon: "icon11.png", title: "Exploring", count: "25 Destination" },
              ].map((activity, i) => (
                <div className="col-lg-2 col-md-4 col-sm-6" key={i}>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <a href="#">
                        <img src={`/assets/images/${activity.icon}`} alt={activity.title} />
                      </a>
                    </div>
                    <div className="activity-content">
                      <h4><a href="#">{activity.title}</a></h4>
                      <p>{activity.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

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