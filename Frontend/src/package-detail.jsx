import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
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
    tourGuide: false,
    mealsIncluded: false,
    extraBaggage: false,
    transfers: false
  });

  // Errors state for form validation
  const [errors, setErrors] = useState({});

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
    fetchPackage();
  }, [id]);

  useEffect(() => {
    if (activeTab === "review") {
      setLoadingReviews(true);

      const fetchReviews = async () => {
        try {
          const { data: reviewsData, error } = await supabase
            .from('reviews')
            .select(`
              *,
              user:users(first_name, last_name)
            `)
            .eq('package_id', id)
            .order('created_at', { ascending: false })
            .limit(6);

          if (error) throw error;

          const { data: { user } } = await supabase.auth.getUser();

          setReviews(reviewsData || []);
          setHasReviewed(user ? reviewsData.some(r => r.user_id === user.id) : false);
        } catch (err) {
          console.error("Error fetching reviews:", err);
          setReviews([]);
        } finally {
          setLoadingReviews(false);
        }
      };

      fetchReviews();
    }
  }, [activeTab, id]);



  // Add this useEffect after your existing useEffect for fetching package data
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
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

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
      setReviewError("Please select a rating.");
      return;
    }

    if (!userComment.trim()) {
      setReviewError("Please enter a comment.");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please login to submit a review.");
        return;
      }

      const newReview = {
        package_id: id,
        user_id: user.id,
        rating: userRating,
        comment: userComment,
        created_at: new Date()
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select(`
        *,
        user:users(first_name, last_name)
      `)
        .single();

      if (error) throw error;

      // Update local state
      setReviews(prev => [data, ...prev]);
      setHasReviewed(true);
      setUserRating(0);
      setUserComment("");

    } catch (error) {
      console.error("Review submission error:", error);
      setReviewError("Failed to submit review.");
    }
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";


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

      // User booking data
      fullName: bookingData.name_booking,
      email: bookingData.email_booking,
      phone: bookingData.phone_booking,
      travelDate: bookingData.date,
      addOns: {
        tourGuide: bookingData.tourGuide,
        mealsIncluded: bookingData.mealsIncluded,
        extraBaggage: bookingData.extraBaggage,
        transfers: bookingData.transfers
      }
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
        <main id="content" className="site-main">
          <section className="inner-banner-wrap">
            <div className="inner-baner-container" style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}>
              <div className="container">
                <div className="inner-banner-content">
                  <h1 className="inner-title">Package Detail</h1>
                </div>
              </div>
            </div>
            <div className="inner-shape"></div>
          </section>
          <div className="single-tour-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="single-tour-inner">
                    <h2>Loading...</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div id="page" className="full-page">
        <Header />
        <main id="content" className="site-main">
          <section className="inner-banner-wrap">
            <div className="inner-baner-container" style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}>
              <div className="container">
                <div className="inner-banner-content">
                  <h1 className="inner-title">Package Detail</h1>
                </div>
              </div>
            </div>
            <div className="inner-shape"></div>
          </section>
          <div className="single-tour-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="single-tour-inner">
                    <h2 style={{ color: "red" }}>Package not found.</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="page" className="full-page">
      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== MAIN CONTENT ===== */}
      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div className="inner-baner-container" style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}>
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">{pkg.title || "Package Detail"}</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Main Content */}
        <div className="single-tour-section">
          <div className="container">
            <div className="row">
              {/* Left: Tour Info & Tabs */}
              <div className="col-lg-8">
                <div className="single-tour-inner">
                  <h2>{pkg.title}</h2>
                  <figure className="feature-image">
                    <img src={(pkg.gallery && pkg.gallery[0]) || "/assets/images/img27.jpg"} alt="" />
                    <div className="package-meta text-center">
                      <ul>
                        <li>
                          <i className="far fa-clock"></i>
                          {pkg.trip_duration || "-"}
                        </li>
                        <li>
                          <i className="fas fa-user-friends"></i>
                          People: {pkg.group_size || "-"}
                        </li>
                        <li>
                          <i className="fas fa-map-marked-alt"></i>
                          {pkg.destination || "-"}
                        </li>
                      </ul>
                    </div>
                  </figure>

                  {/* Tabs */}
                  <div className="tab-container">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          href="#overview"
                          className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                          onClick={(e) => { e.preventDefault(); handleTabClick("overview"); }}
                        >
                          DESCRIPTION
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#program"
                          className={`nav-link ${activeTab === "program" ? "active" : ""}`}
                          onClick={(e) => { e.preventDefault(); handleTabClick("program"); }}
                        >
                          PROGRAM
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#review"
                          className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                          onClick={(e) => { e.preventDefault(); handleTabClick("review"); }}
                        >
                          REVIEW
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#map"
                          className={`nav-link ${activeTab === "map" ? "active" : ""}`}
                          onClick={(e) => { e.preventDefault(); handleTabClick("map"); }}
                        >
                          Map
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      {/* Overview */}
                      {activeTab === "overview" && (
                        <div className="tab-pane fade show active" id="overview">
                          <p>{pkg.description || "No description provided."}</p>
                        </div>
                      )}
                      {activeTab === "program" && (
                        <div className="tab-pane fade show active" id="program">
                          {/* Program */}
                          <div className="tab-pane" id="program" role="tabpanel" aria-labelledby="program-tab">
                            <div className="itinerary-content">
                              <h3>Program <span>({pkg.trip_duration || "N/A"})</span></h3>
                              {pkg.program && pkg.program.length > 0 ? (
                                <div className="tour-program-list">
                                  {pkg.program.map((cityData, index) => (
                                    <div key={cityData._id || index} className="program-city-item">
                                      <div className="city-header">
                                        <h4 className="city-name">
                                          <i className="fas fa-map-marker-alt"></i>
                                          {cityData.city}
                                        </h4>
                                      </div>
                                      <div className="city-activities">
                                        <ul className="activities-list">
                                          {cityData.activities.map((activity, actIndex) => (
                                            <li key={actIndex} className="activity-item">
                                              <i className="far fa-clock"></i>
                                              {activity}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p>No program details available for this package.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === "review" && (
                        <div className="tab-pane fade show active" id="review">
                          <div className="summary-review">
                            <div className="review-score">
                              <span>{averageRating}</span>
                            </div>
                            <div className="rating-start" title={`Rated ${averageRating} out of 5`}>
                              <span style={{ width: `${(averageRating || 0) * 20}%` }}></span>
                            </div>

                            <div className="review-score-content">
                              <h3>
                                Excellent
                                <span>({pkg.reviewsCount || reviews.length} reviews)</span>
                              </h3>
                              <p>Tincidunt iaculis pede mus lobortis hendrerit ...</p>
                            </div>
                          </div>

                          {loadingReviews && <p>Loading reviews...</p>}
                          {!loadingReviews && reviews.length === 0 && (
                            <p>No reviews yet. Be the first to review!</p>
                          )}

                          {reviews.map(review => (
                            <div key={review._id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                              <p>
                                <strong>{review.user?.first_name || 'Anonymous'}</strong> on {new Date(review.created_at).toLocaleDateString()}
                              </p>
                              <p>
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} style={{ color: i < review.rating ? '#ffc107' : '#e4e5e9' }}>★</span>
                                ))}
                              </p>
                              <p>{review.comment}</p>
                            </div>
                          ))}

                          {!hasReviewed ? (
                            <form onSubmit={handleReviewSubmit} style={{ marginTop: '20px' }}>
                              <h4>Add Your Review</h4>
                              {reviewError && <p style={{ color: 'red' }}>{reviewError}</p>}

                              <div className="rating-input" style={{ fontSize: '1.5rem', userSelect: 'none' }}>
                                {[1, 2, 3, 4, 5].map(num => (
                                  <span
                                    key={num}
                                    style={{ cursor: 'pointer', color: num <= userRating ? '#ffc107' : '#e4e5e9' }}
                                    onClick={() => setUserRating(num)}
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setUserRating(num); }}
                                    role="radio"
                                    tabIndex={0}
                                    aria-checked={userRating === num}
                                    aria-label={`${num} Star${num > 1 ? 's' : ''}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>

                              <textarea
                                rows={4}
                                placeholder="Write your review here"
                                value={userComment}
                                onChange={e => setUserComment(e.target.value)}
                                style={{ width: '100%', marginTop: '10px', padding: '8px' }}
                              />
                              <div className="publish-action" style={{ marginTop: '10px', padding: '8px 16px' }}>
                                <input type="submit" name="Submit" value="Submit" />
                              </div>
                            </form>
                          ) : (
                            <p style={{ marginTop: '20px', fontStyle: 'italic', color: 'green' }}>
                              You have already submitted a review for this package.
                            </p>
                          )}
                        </div>
                      )}
                      {activeTab === "map" && (
                        <div className="tab-pane fade show active" id="map">
                          <iframe
                            src={pkg.map_url || "https://www.google.com/maps/embed?pb=..."}
                            height="450"
                            allowFullScreen
                            title="map"
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Gallery */}
                  {/* <div className="single-tour-gallery">
                    <h3>GALLERY / PHOTOS</h3>
                    <div className="single-tour-slider">
                      {(pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [
                        "assets/images/img28.jpg",
                        "assets/images/img29.jpg",
                        "assets/images/img32.jpg",
                        "assets/images/img33.jpg"
                      ]).map((imgUrl, idx) => (
                        <div className="single-tour-item" key={idx}>
                          <figure className="feature-image">
                            <img src={imgUrl} alt="" />
                          </figure>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Right: Sidebar */}
              <div className="col-lg-4">
                <div className="sidebar">
                  <div className="package-price">
                    <h5 className="price">
                      <span>
                        {pkg.sale_price
                          ? `$${pkg.sale_price}`
                          : pkg.regular_price
                            ? `$${pkg.regular_price}`
                            : "$649"}
                      </span>
                      {" "} / per person
                    </h5>
                    <div className="start-wrap">
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span style={{ width: `${(pkg.rating || 5) * 20}%` }}></span>
                      </div>
                    </div>
                  </div>

                  {/* Updated Booking Form */}
                  <div className="widget-bg booking-form-wrap">
                    <h4 className="bg-title">Booking</h4>
                    <form className="booking-form" onSubmit={handleBookingSubmit}>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              name="name_booking"
                              type="text"
                              placeholder="Full Name *"
                              value={bookingData.name_booking}
                              onChange={handleInputChange}
                              className={errors.name_booking ? 'is-invalid' : ''}
                            />
                            {errors.name_booking && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.name_booking}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              name="email_booking"
                              type="email"
                              placeholder="Email *"
                              value={bookingData.email_booking}
                              onChange={handleInputChange}
                              className={errors.email_booking ? 'is-invalid' : ''}
                            />
                            {errors.email_booking && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.email_booking}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              name="phone_booking"
                              type="tel"
                              placeholder="Phone Number *"
                              value={bookingData.phone_booking}
                              onChange={handleInputChange}
                              className={errors.phone_booking ? 'is-invalid' : ''}
                            />
                            {errors.phone_booking && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.phone_booking}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              className={`input-date-picker ${errors.date ? 'is-invalid' : ''}`}
                              type="date"
                              name="date"
                              value={bookingData.date}
                              onChange={handleInputChange}
                              placeholder="Date *"
                              min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.date && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.date}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <h4 className="">Add Options</h4>
                        </div>
                        <div className="col-sm-6" style={{ paddingLeft: '14px' }}>
                          <div className="form-group">
                            <label className="checkbox-list">
                              <input
                                type="checkbox"
                                name="tourGuide"
                                checked={bookingData.tourGuide}
                                onChange={handleInputChange}
                              />
                              <span className="custom-checkbox"></span>
                              Tour guide
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6" style={{ paddingLeft: '14px' }}>
                          <div className="form-group">
                            <label className="checkbox-list">
                              <input
                                type="checkbox"
                                name="mealsIncluded"
                                checked={bookingData.mealsIncluded}
                                onChange={handleInputChange}
                              />
                              <span className="custom-checkbox"></span>
                              Meals included
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6" style={{ paddingLeft: '14px' }}>
                          <div className="form-group">
                            <label className="checkbox-list">
                              <input
                                type="checkbox"
                                name="extraBaggage"
                                checked={bookingData.extraBaggage}
                                onChange={handleInputChange}
                              />
                              <span className="custom-checkbox"></span>
                              Extra baggage
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6" style={{ paddingLeft: '14px' }}>
                          <div className="form-group">
                            <label className="checkbox-list">
                              <input
                                type="checkbox"
                                name="transfers"
                                checked={bookingData.transfers}
                                onChange={handleInputChange}
                              />
                              <span className="custom-checkbox"></span>
                              Transfers
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group submit-btn">
                            <input type="submit" name="submit" value="Book Now" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Static widgets remain unchanged */}
                  <div className="widget-bg information-content text-center">
                    <h5>TRAVEL TIPS</h5>
                    <h3>NEED TRAVEL RELATED TIPS & INFORMATION</h3>
                    <p>Mollit voluptatem perspiciatis convallis elementum corporis quo veritatis aliquid blandit, blandit torquent, odit placeat.</p>
                    <a href="#" className="button-primary">GET A QUOTE</a>
                  </div>

                  <div className="travel-package-content text-center" style={{ backgroundImage: "url(/assets/images/img11.jpg)" }}>
                    <h5>MORE PACKAGES</h5>
                    <h3>OTHER TRAVEL PACKAGES</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</p>
                    <ul>
                      <li>
                        <a href="#"><i className="far fa-arrow-alt-circle-right"></i>Vacation packages</a>
                      </li>
                      <li>
                        <a href="#"><i className="far fa-arrow-alt-circle-right"></i>Vacation packages</a>
                      </li>
                      <li>
                        <a href="#"><i className="far fa-arrow-alt-circle-right"></i>Vacation packages</a>
                      </li>
                      <li>
                        <a href="#"><i className="far fa-arrow-alt-circle-right"></i>Vacation packages</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <section className="subscribe-section" style={{ backgroundImage: "url(/assets/images/img16.jpg)" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="section-heading section-heading-white">
                  <h5 className="dash-style">HOLIDAY PACKAGE OFFER</h5>
                  <h2>HOLIDAY SPECIAL 25% OFF !</h2>
                  <h4>Sign up now to recieve hot special offers and information about the best tour packages, updates and discounts !!</h4>
                  <div className="newsletter-form">
                    <form>
                      <input type="email" name="s" placeholder="Your Email Address" />
                      <input type="submit" name="signup" value="SIGN UP NOW!" />
                    </form>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer id="colophon" className="site-footer footer-primary">
        <div className="top-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_text">
                  <h3 className="widget-title">About Travel</h3>
                  <div className="textwidget widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo.
                  </div>
                  <div className="award-img">
                    <a href="#">
                      <img src="/assets/images/logo6.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/images/logo2.png" alt="" />
                    </a>
                  </div>
                </aside>
              </div>
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_text">
                  <h3 className="widget-title">CONTACT INFORMATION</h3>
                  <div className="textwidget widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-phone-alt"></i> +01 (977) 2599
                          12
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-envelope"></i>{" "}
                          <span
                            className="__cf_email__"
                            data-cfemail="bcdfd3d1ccddd2c5fcd8d3d1ddd5d292dfd3d1"
                          >
                            [email&#160;protected]
                          </span>
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-map-marker-alt"></i> 3146 Koontz,
                        California
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_recent_post">
                  <h3 className="widget-title">Latest Post</h3>
                  <ul>
                    <li>
                      <h5>
                        <a href="#">Life is a beautiful journey not a destination</a>
                      </h5>
                      <div className="entry-meta">
                        <span className="post-on">
                          <a href="#">August 17, 2021</a>
                        </span>
                        <span className="comments-link">
                          <a href="#">No Comments</a>
                        </span>
                      </div>
                    </li>
                    <li>
                      <h5>
                        <a href="#">Take only memories, leave only footprints</a>
                      </h5>
                      <div className="entry-meta">
                        <span className="post-on">
                          <a href="#">August 17, 2021</a>
                        </span>
                        <span className="comments-link">
                          <a href="#">No Comments</a>
                        </span>
                      </div>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className="col-lg-3 col-md-6">
                <aside className="widget widget_newslatter">
                  <h3 className="widget-title">SUBSCRIBE US</h3>
                  <div className="widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <form className="newslatter-form">
                    <input type="email" name="s" placeholder="Your Email.." />
                    <input type="submit" name="s" value="SUBSCRIBE NOW" />
                  </form>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="buttom-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Term & Condition</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2 text-center">
                <div className="footer-logo">
                  <a href="#">
                    <img src="/assets/images/travele-logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-md-5">
                <div className="copy-right text-right">
                  Copyright © 2021 Travele. All rights reserveds
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* Custom search field */}
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
      {/* Add CSS for error styling and program styling */}
      <style jsx>{`
  .is-invalid {
    border: 1px solid #dc3545 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  }
  .invalid-feedback {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
  }
  
  /* Program Styles */
  .tour-program-list {
    margin-top: 20px;
  }
  
  .program-city-item {
    margin-bottom: 25px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .city-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 15px 20px;
    margin: 0;
  }
  
  .city-name {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
  }
  
  .city-name i {
    color: #fff;
    margin-right: 10px;
    font-size: 16px;
  }
  
  .city-activities {
    padding: 0;
    background: #f8f9fa;
  }
  
  .activities-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .activity-item {
    padding: 12px 20px;
    border-bottom: 1px solid #e9ecef;
    font-size: 14px;
    color: #555;
    display: flex;
    align-items: center;
    background: #fff;
    transition: background-color 0.2s ease;
  }
  
  .activity-item:hover {
    background-color: #f8f9fa;
  }
  
  .activity-item:last-child {
    border-bottom: none;
  }
  
  .activity-item i {
    color: #28a745;
    margin-right: 12px;
    font-size: 14px;
    min-width: 16px;
  }
`}</style>

      {/* Add CSS for error styling */}
      <style jsx>{`
        .is-invalid {
          border: 1px solid #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
        .invalid-feedback {
          width: 100%;
          margin-top: 0.25rem;
          font-size: 0.875em;
          color: #dc3545;
        }
      `}</style>
    </div>
  );
};

export default Package_detail;
