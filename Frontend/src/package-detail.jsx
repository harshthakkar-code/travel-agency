import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import api from "./utils/api";

const Package_detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
        const res = await api.get(`/packages/${id}`);
        setPkg(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setPkg(null);
      }
      setLoading(false);
    };
    fetchPackage();
  }, [id]);

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
      packageId: pkg._id || pkg.id,
      packageTitle: pkg.title,
      packagePrice: pkg.salePrice || pkg.regularPrice,
      packageImage: (pkg.gallery && pkg.gallery[0]) || "/assets/images/img27.jpg",
      destination: pkg.destination,
      tripDuration: pkg.tripDuration,
      groupSize: pkg.groupSize,
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
                          {pkg.tripDuration || "-"}
                        </li>
                        <li>
                          <i className="fas fa-user-friends"></i>
                          People: {pkg.groupSize || "-"}
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
                        <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">
                          DESCRIPTION
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="program-tab" data-toggle="tab" href="#program" role="tab" aria-controls="program" aria-selected="false">
                          PROGRAM
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">
                          REVIEW
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="false">
                          Map
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      {/* Overview */}
                      <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                        <div className="overview-content">
                          <p>{pkg.description || "No description provided."}</p>
                        </div>
                      </div>
                      
                      {/* Program */}
                      <div className="tab-pane" id="program" role="tabpanel" aria-labelledby="program-tab">
                        <div className="itinerary-content">
                          <h3>Program <span>({pkg.tripDuration || "N/A"})</span></h3>
                          <p>{pkg.program || "No program details provided."}</p>
                        </div>
                      </div>
                      
                      {/* Review */}
                      <div className="tab-pane" id="review" role="tabpanel" aria-labelledby="review-tab">
                        <div className="summary-review">
                          <div className="review-score">
                            <span>{pkg.rating || "4.9"}</span>
                          </div>
                          <div className="review-score-content">
                            <h3>
                              Excellent
                              <span>( Based on {pkg.reviewsCount || 24} reviews )</span>
                            </h3>
                            <p>Tincidunt iaculis pede mus lobortis hendrerit ...</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Map */}
                      <div className="tab-pane" id="map" role="tabpanel" aria-labelledby="map-tab">
                        <div className="map-area">
                          <iframe
                            src={pkg.mapUrl || "https://www.google.com/maps/embed?pb=..."}
                            height="450"
                            allowFullScreen
                            title="map"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gallery */}
                  <div className="single-tour-gallery">
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
                  </div>
                </div>
              </div>
              
              {/* Right: Sidebar */}
              <div className="col-lg-4">
                <div className="sidebar">
                  <div className="package-price">
                    <h5 className="price">
                      <span>
                        {pkg.salePrice
                          ? `$${pkg.salePrice}`
                          : pkg.regularPrice
                          ? `$${pkg.regularPrice}`
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
                              placeholder="Number *" 
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
                        <div className="col-sm-6">
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
                        <div className="col-sm-6">
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
                        <div className="col-sm-6">
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
                        <div className="col-sm-6">
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
