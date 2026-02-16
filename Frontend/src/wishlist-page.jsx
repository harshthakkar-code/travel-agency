import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const Wishlist_page = () => {
  const [wishlistPackages, setWishlistPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return; // Or redirect

        const { data, error } = await supabase
          .from('wishlist')
          .select(`
            id,
            package_id,
            packages:package_id (*)
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        // Transform data to flat package objects as expected by UI
        const packages = data.map(item => ({
          ...item.packages,
          _id: item.packages.id, // Keep _id for compatibility if needed, but use id generally
          wishlist_id: item.id
        }));

        setWishlistPackages(packages);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setWishlistPackages([]);
      }
    };
    fetchWishlist();
  }, [navigate]);

  const toggleWishlist = async (packageId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('package_id', packageId);

      if (error) throw error;

      setWishlistPackages(prev => prev.filter(pkg => pkg.id !== packageId && pkg._id !== packageId));
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalf = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star" style={{ color: '#f5a623', fontSize: '12px' }}></i>);
    }
    if (hasHalf) {
      stars.push(<i key="half" className="fas fa-star-half-alt" style={{ color: '#f5a623', fontSize: '12px' }}></i>);
    }
    const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < remaining; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star" style={{ color: '#ddd', fontSize: '12px' }}></i>);
    }
    return stars;
  };

  if (!wishlistPackages.length) {
    return (
      <div id="page" className="full-page">
        <Header />
        <main id="content" className="site-main">
          {/* =================== HERO SECTION =================== */}
          <section className="wishlist-hero-section" style={{
            backgroundImage: "url(/assets/images/slider-banner-2.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '60vh',
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
                <i className="fas fa-heart" style={{ marginRight: '10px' }}></i>
                My Favorites
              </span>
              <h1 style={{
                fontSize: '60px',
                fontWeight: '900',
                marginBottom: '20px',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                lineHeight: '1.2',
                letterSpacing: '-1px',
                color: '#fff'
              }}>
                Your <span style={{ color: '#F56960' }}>Wishlist</span>
              </h1>
              <p style={{
                fontSize: '18px',
                maxWidth: '700px',
                margin: '0 auto',
                opacity: 0.95,
                lineHeight: '1.6',
                fontWeight: '400',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                Save your dream destinations and plan your future adventures. All your favorite tour packages in one place.
              </p>
            </div>
          </section>

          <section style={{ padding: '100px 0', textAlign: 'center', background: '#f8f9fa' }}>
            <div className="container">
              <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '40px',
                background: '#fff',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'rgba(245, 105, 96, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px',
                  color: '#F56960',
                  fontSize: '40px'
                }}>
                  <i className="far fa-heart"></i>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>Your wishlist is empty</h2>
                <p style={{ color: '#666', fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
                  Explore our amazing travel packages and save your favorites here to plan your dream vacation.
                </p>
                <Link to="/tour-packages" className="btn-primary-custom" style={{
                  display: 'inline-block',
                  padding: '14px 30px',
                  borderRadius: '50px',
                  background: '#0791BE',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                  Browse Packages
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div id="page" className="full-page">
      <Header />
      <main id="content" className="site-main">
        {/* Inner Banner */}
        {/* =================== HERO SECTION =================== */}
        <section className="wishlist-hero-section" style={{
          backgroundImage: "url(/assets/images/slider-banner-2.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
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
              <i className="fas fa-heart" style={{ marginRight: '10px' }}></i>
              My Favorites
            </span>
            <h1 style={{
              fontSize: '60px',
              fontWeight: '900',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              color: '#fff'
            }}>
              Your <span style={{ color: '#F56960' }}>Wishlist</span>
            </h1>
            <p style={{
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.95,
              lineHeight: '1.6',
              fontWeight: '400',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              Save your dream destinations and plan your future adventures. All your favorite tour packages in one place.
            </p>
          </div>
        </section>

        {/* Wishlist Packages Section */}
        <div className="package-section" style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="container">
            <div className="row">
              {wishlistPackages.map((pkg) => (
                <div className="col-lg-4 col-md-6 mb-4" key={pkg._id}>
                  {/* MODERN PACKAGE CARD */}
                  <div className="package-card-modern" style={{
                    background: '#fff',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div className="package-card-image" style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                      <img
                        src={pkg.gallery?.[0] || "/assets/images/img5.jpg"}
                        alt={pkg.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div className="package-card-badge" style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: '#F56960',
                        color: '#fff',
                        padding: '5px 15px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: '700',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}>
                        {pkg.trip_duration || "7 Days"}
                      </div>
                      <button
                        onClick={() => toggleWishlist(pkg.id)}
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#fff',
                          border: 'none',
                          color: '#F56960',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          zIndex: 10
                        }}
                        title="Remove from wishlist"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>

                    <div className="package-card-body" style={{ padding: '25px', flexGrow: 1 }}>
                      <div className="package-card-meta" style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: '#666', fontSize: '13px' }}>
                        <span><i className="fas fa-map-marker-alt" style={{ color: '#0791BE', marginRight: '5px' }}></i> {pkg.destination || "Global"}</span>
                        <span><i className="fas fa-user-friends" style={{ color: '#0791BE', marginRight: '5px' }}></i> {pkg.group_size || "5"}</span>
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '15px', color: '#101F46', lineHeight: '1.4' }}>
                        <Link to={`/package-detail/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {pkg.title || "Package Title"}
                        </Link>
                      </h3>
                      <div className="package-card-reviews" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <div className="stars">
                          {renderStars(pkg.rating || 4.5)}
                        </div>
                        <span style={{ fontSize: '13px', color: '#888' }}>({pkg.reviewsCount || 0} reviews)</span>
                      </div>
                    </div>

                    <div className="package-card-footer" style={{
                      padding: '20px 25px',
                      borderTop: '1px solid #f0f0f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div className="package-card-price">
                        <span style={{ fontSize: '22px', fontWeight: '800', color: '#0791BE' }}>
                          ${pkg.sale_price || pkg.regular_price || "1,900"}
                        </span>
                        <span style={{ fontSize: '12px', color: '#888', marginLeft: '5px' }}>/ person</span>
                      </div>
                      <Link to={`/package-detail/${pkg.id}`} className="btn-book-now" style={{
                        padding: '10px 20px',
                        background: '#101F46',
                        color: '#fff',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#0791BE'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#101F46'}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist_page;
