import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";

const Package_detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [reviewError, setReviewError] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Booking form state
  const [bookingData, setBookingData] = useState({
    name_booking: '',
    email_booking: '',
    phone_booking: '',
    date: '',
    addOns: {}
  });

  // Errors state for form validation
  const [errors, setErrors] = useState({});

  // State for accordion
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  // Define available options (fallback to hardcoded if not in pkg or is empty array)
  const availableOptions = (pkg?.options && pkg.options.length > 0) ? pkg.options : [
    { name: 'tourGuide', label: 'Tour Guide', price: 34 },
    { name: 'mealsIncluded', label: 'Meals Included', price: 25 },
    { name: 'extraBaggage', label: 'Extra Baggage', price: 15 },
    { name: 'transfers', label: 'Transfers', price: 20 }
  ];

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPkg(data);
      } catch (error) {
        setPkg(null);
      }
      setLoading(false);
    };

    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*, user:users(first_name, last_name)')
          .eq('package_id', id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
      setLoadingReviews(false);
    };

    fetchPackage();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    // Initialize form with localStorage data if available and state is empty
    const storedUser = localStorage.getItem('user');
    const storedEmail = localStorage.getItem('userEmail');

    setBookingData(prev => ({
      ...prev,
      name_booking: prev.name_booking || storedUser || '',
      email_booking: prev.email_booking || storedEmail || ''
    }));
  }, []); // Run once on component mount


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setBookingData(prev => ({
        ...prev,
        addOns: {
          ...prev.addOns,
          [name]: checked
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!bookingData.name_booking.trim()) {
      newErrors.name_booking = 'Full Name is required';
    }

    if (!bookingData.email_booking.trim()) {
      newErrors.email_booking = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email_booking)) {
      newErrors.email_booking = 'Email address is invalid';
    }

    if (!bookingData.phone_booking.trim()) {
      newErrors.phone_booking = 'Phone Number is required';
    }

    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");

    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login to submit a review");
        return;
      }

      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            package_id: id,
            user_id: user.id,
            rating: userRating,
            comment: userComment
          }
        ]);

      if (error) throw error;

      alert("Review submitted successfully!");
      setHasReviewed(true);
      setUserComment("");
      setUserRating(0);

      // Refresh reviews list to show the new review immediately
      setLoadingReviews(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('reviews')
          .select('*, user:users(first_name, last_name)')
          .eq('package_id', id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setReviews(data || []);
      } catch (fetchError) {
        console.error("Error refreshing reviews:", fetchError);
      }
      setLoadingReviews(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      setReviewError(error.message);
      alert("Error submitting review: " + error.message);
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    // Prepare data to pass to booking page
    const bookingInfo = {
      // Package details
      packageId: pkg.id,
      packageTitle: pkg.title,
      packagePrice: pkg.sale_price || pkg.regular_price,
      packageImage: (pkg.gallery && pkg.gallery[0]) || "/assets/images/img27.jpg",
      destination: pkg.destination,
      tripDuration: pkg.trip_duration,
      groupSize: pkg.group_size,
      rating: pkg.rating,

      // Configuration for dynamic pricing in booking page
      optionsConfig: availableOptions,

      // User booking data
      fullName: bookingData.name_booking,
      email: bookingData.email_booking,
      phone: bookingData.phone_booking,
      travelDate: bookingData.date,
      addOns: bookingData.addOns
    };

    // Store booking data in localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingInfo));

    // Navigate to booking page
    navigate('/booking');
  };

  if (loading) {
    return (
      <div id="page" className="full-page">
        <Header />
        <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3>Loading Package Details...</h3>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div id="page" className="full-page">
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Package Not Found</h2>
          <btn className="btn-primary-custom" onClick={() => navigate('/tour-packages')}>
            Browse Packages
          </btn>
        </div>
      </div>
    );
  }

  return (
    <div id="page" className="full-page">
      {/* ===== HEADER ===== */}
      <Header />

      <main id="content" className="site-main">
        {/* =================== NEW HERO SECTION =================== */}
        <section className="package-hero" style={{ backgroundImage: `url(${(pkg.gallery && pkg.gallery[0]) || "/assets/images/img27.jpg"})` }}>
          <div className="package-hero-overlay"></div>
          <div className="container">
            <div className="package-hero-content">
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
                  <li>
                    <Link to="/tour-packages" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F56960'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}>
                      Packages
                    </Link>
                  </li>
                  <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
                  <li style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Package Details</li>
                </ol>
              </nav>

              <span className="landing-hero-badge">
                <i className="fas fa-map-marker-alt"></i> {pkg.destination || "United States"}
              </span>
              <h1 className="landing-hero-title" style={{ fontSize: '48px', marginBottom: '10px' }}>
                {pkg.title || "Package Title"}
              </h1>
              <div className="package-card-meta" style={{ marginTop: '20px' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <i className="far fa-clock" style={{ color: '#fff' }}></i> {pkg.trip_duration || "7 Days"}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <i className="fas fa-user-friends" style={{ color: '#fff' }}></i> Max: {pkg.group_size || "10"}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <i className="fas fa-star" style={{ color: '#f5a623' }}></i> {pkg.rating || "4.5"} Rating
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================== MAIN CONTENT =================== */}
        <div className="single-tour-section" style={{ paddingBottom: '80px' }}>
          <div className="container">
            <div className="row">
              {/* Left Column: Content */}
              <div className="col-lg-8">
                {/* Modern Tabs */}
                <div className="modern-tabs">
                  <ul className="nav nav-tabs" role="tablist">
                    {['overview', 'program', 'review', 'map'].map((tab) => (
                      <li className="nav-item" key={tab} style={{ border: 'none' }}>
                        <button
                          className={`nav-link ${activeTab === tab ? "active" : ""}`}
                          onClick={() => setActiveTab(tab)}
                          style={{ textTransform: 'uppercase', letterSpacing: '1px', border: 'none' }}
                        >
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="tab-content" style={{ padding: '20px 20px', border: '1px solid #ddd' }}>
                    {/* Tab 1: Overview */}
                    {activeTab === "overview" && (
                      <div className="tab-pane fade show active">
                        <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Overview</h3>
                        <p style={{ lineHeight: '1.8', color: '#555' }}>
                          {pkg.description || "Experience the journey of a lifetime with our carefully curated package. From breathtaking views to cultural immersion, we handle every detail so you can focus on making memories."}
                        </p>

                        {/* Highlights (Mock) */}
                        <div style={{ marginTop: '30px', background: '#f9f9f9', padding: '25px', borderRadius: '12px' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Highlights</h4>
                          <div className="row">
                            <div className="col-md-6">
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fas fa-check-circle" style={{ color: '#0791BE' }}></i> 5-Star Accommodations</li>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fas fa-check-circle" style={{ color: '#0791BE' }}></i> Daily Breakfast Included</li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fas fa-check-circle" style={{ color: '#0791BE' }}></i> Expert Local Guide</li>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fas fa-check-circle" style={{ color: '#0791BE' }}></i> All Entrance Fees Covered</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Program */}
                    {activeTab === "program" && (
                      <div className="tab-pane fade show active">
                        <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Itinerary</h3>
                        {pkg.program && pkg.program.length > 0 ? (
                          <div className="tour-program-list">
                            {pkg.program.map((cityData, index) => (
                              <div key={cityData._id || index} className="program-city-item" style={{ marginBottom: '20px', paddingLeft: '20px', borderLeft: '3px solid #f0f0f0' }}>
                                <div className="city-header">
                                  <h4 className="city-name" style={{ fontSize: '18px', fontWeight: '700', color: '#101F46' }}>
                                    <span style={{ color: '#0791BE', marginRight: '10px' }}>Day {index + 1}:</span>
                                    {cityData.city}
                                  </h4>
                                </div>
                                <div className="city-activities" style={{ marginTop: '10px' }}>
                                  <ul className="activities-list" style={{ listStyle: 'none', padding: 0 }}>
                                    {cityData.activities.map((activity, actIndex) => (
                                      <li key={actIndex} className="activity-item" style={{ marginBottom: '5px', color: '#666' }}>
                                        <i className="far fa-dot-circle" style={{ fontSize: '10px', marginRight: '8px', color: '#ccc' }}></i>
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Detailed itinerary will be provided upon booking.</p>
                        )}
                      </div>
                    )}

                    {/* Tab 3: Reviews */}
                    {activeTab === "review" && (
                      <div className="tab-pane fade show active">
                        <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Reviews</h3>
                        {loadingReviews ? <p>Loading reviews...</p> : (
                          <div>
                            {reviews.length === 0 ? <p>No reviews yet.</p> : (
                              reviews.map(review => (
                                <div key={review.id} style={{ borderBottom: '1px solid #f0f0f0', padding: '20px 0' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong style={{ fontSize: '16px' }}>{review.user?.first_name || 'Anonymous'}</strong>
                                    <span style={{ color: '#999', fontSize: '13px' }}>{new Date(review.created_at).toLocaleDateString()}</span>
                                  </div>
                                  <div style={{ color: '#f5a623', marginBottom: '8px' }}>
                                    {[...Array(5)].map((_, i) => (
                                      <i key={i} className={i < review.rating ? "fas fa-star" : "far fa-star"}></i>
                                    ))}
                                  </div>
                                  <p style={{ color: '#555', fontStyle: 'italic' }}>"{review.comment}"</p>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {!hasReviewed && (
                          <div style={{ marginTop: '40px', background: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
                            <h4 style={{ marginBottom: '20px' }}>Write a Review</h4>
                            <form onSubmit={handleReviewSubmit}>
                              <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Rating</label>
                                <div style={{ fontSize: '24px', cursor: 'pointer' }}>
                                  {[1, 2, 3, 4, 5].map(num => (
                                    <span key={num} onClick={() => setUserRating(num)} style={{ color: num <= userRating ? '#f5a623' : '#ddd', marginRight: '5px' }}>★</span>
                                  ))}
                                </div>
                              </div>
                              <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Comment</label>
                                <textarea
                                  value={userComment}
                                  onChange={e => setUserComment(e.target.value)}
                                  rows="4"
                                  className="form-control"
                                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                                  placeholder="Tell us about your experience..."
                                ></textarea>
                              </div>
                              <button type="submit" className="btn-book-now">Submit Review</button>
                            </form>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 4: Map */}
                    {activeTab === "map" && (
                      <div className="tab-pane fade show active">
                        <iframe
                          src={pkg.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f7f1f84!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614316040854!5m2!1sen!2sau"}
                          width="100%"
                          height="450"
                          allowFullScreen
                          style={{ border: 0, borderRadius: '12px' }}
                          title="map"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Sidebar */}
              <div className="col-lg-4">
                <div className="booking-card">
                  <div className="booking-price-header">
                    <div>
                      <span className="booking-per-person">Starting from</span>
                      <div className="booking-price">
                        ${Number(pkg.sale_price || pkg.regular_price || 0).toLocaleString()} <span style={{ fontSize: '14px', color: '#787878', fontWeight: '400' }}>/ person</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#f5a623', fontSize: '14px' }}>
                        <i className="fas fa-star"></i> <strong>{pkg.rating || "4.8"}</strong>
                      </div>
                      <span style={{ fontSize: '12px', color: '#999' }}>({reviews.length || 120} reviews)</span>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#888', marginBottom: '5px', display: 'block' }}>Travel Date</label>
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && <small style={{ color: 'red' }}>{errors.date}</small>}
                    </div>

                    <div className="row" style={{ marginBottom: '15px' }}>
                      <div className="col-12" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#888', marginBottom: '5px', display: 'block' }}>Your Details</label>
                        <input type="text" name="name_booking" placeholder="Full Name" value={bookingData.name_booking} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        {errors.name_booking && <small style={{ color: 'red', display: 'block' }}>{errors.name_booking}</small>}

                        <input type="email" name="email_booking" placeholder="Email" value={bookingData.email_booking} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        {errors.email_booking && <small style={{ color: 'red', display: 'block' }}>{errors.email_booking}</small>}

                        <input type="tel" name="phone_booking" placeholder="Phone" value={bookingData.phone_booking} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        {errors.phone_booking && <small style={{ color: 'red', display: 'block' }}>{errors.phone_booking}</small>}
                      </div>
                    </div>

                    <div className="accordion" style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ background: '#f8f9fa', padding: '10px 15px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                        <span>Add Options (Optional)</span>
                        <i className={`fas fa-chevron-${isOptionsOpen ? 'up' : 'down'}`}></i>
                      </div>
                      {isOptionsOpen && (
                        <div style={{ padding: '15px' }}>
                          {availableOptions.map((opt) => (
                            <div key={opt.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={(e) => {
                              // Prevent triggering when clicking the checkbox directly (it already handles it)
                              if (e.target.type !== 'checkbox') {
                                handleInputChange({
                                  target: {
                                    name: opt.name,
                                    type: 'checkbox',
                                    checked: !bookingData.addOns[opt.name]
                                  }
                                });
                              }
                            }}>
                              <input
                                type="checkbox"
                                className="booking-addon-checkbox"
                                name={opt.name}
                                checked={!!bookingData.addOns[opt.name]}
                                onChange={handleInputChange}
                                style={{
                                  appearance: 'auto',
                                  WebkitAppearance: 'checkbox',
                                  MozAppearance: 'checkbox',
                                  marginRight: '10px',
                                  width: '18px',
                                  height: '18px',
                                  cursor: 'pointer',
                                  display: 'inline-block',
                                  position: 'relative',
                                  flexShrink: 0,
                                  opacity: '1',
                                  visibility: 'visible',
                                  border: '2px solid #0791BE',
                                  backgroundColor: 'white',
                                  accentColor: '#0791BE'
                                }}
                              />
                              <span style={{ fontSize: '14px', fontWeight: '500' }}>{opt.label}</span>
                              {opt.price && (
                                <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#666' }}>
                                  +${opt.price}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn-book-now" style={{ width: '100%', padding: '15px', fontSize: '16px' }}>
                      Proceed to Booking
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '10px' }}>
                      You won't be charged yet
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default Package_detail;
