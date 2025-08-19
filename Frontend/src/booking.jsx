import React, { useState, useEffect } from "react";
import Header from "./Header";

const Booking = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    // Payment fields
    nameOnCard: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    ccv: '',
    // Billing fields
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    additionalInfo: '',
    acceptTerms: false
  });

  // Package data from localStorage
  const [packageData, setPackageData] = useState(null);
  
  // Errors state for form validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get booking data from localStorage
    const bookingData = localStorage.getItem('bookingData');
    
    if (bookingData) {
      try {
        const parsedData = JSON.parse(bookingData);
        setPackageData(parsedData);
        
        // Pre-fill the form with data from package detail page
        if (parsedData.fullName) {
          // Split full name into first and last name
          const nameParts = parsedData.fullName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          setFormData(prev => ({
            ...prev,
            firstName: firstName,
            lastName: lastName,
            email: parsedData.email || '',
            confirmEmail: parsedData.email || '',
            phone: parsedData.phone || ''
          }));
        }
      } catch (error) {
        console.error('Error parsing booking data:', error);
      }
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
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

  // Calculate total price
  const calculateTotal = () => {
    if (!packageData) return 0;
    
    let total = parseFloat(packageData.packagePrice || 0);
    
    // Add-on prices (you can adjust these based on your requirements)
    if (packageData.addOns?.tourGuide) total += 34;
    if (packageData.addOns?.mealsIncluded) total += 25;
    if (packageData.addOns?.extraBaggage) total += 15;
    if (packageData.addOns?.transfers) total += 20;
    
    // Add tax (13%)
    const tax = total * 0.13;
    
    return (total + tax).toFixed(2);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Confirm Email is required';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Email and Confirm Email do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.street1.trim()) {
      newErrors.street1 = 'Street Line 1 is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Book Now button click
  const handleBookNow = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!validateForm()) {
      return;
    }

    // Create complete booking object
    const completeBookingDetails = {
      // User Details
      userDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        confirmEmail: formData.confirmEmail,
        phone: formData.phone
      },
      
      // Billing Address
      billingAddress: {
        country: formData.country,
        street1: formData.street1,
        street2: formData.street2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        additionalInfo: formData.additionalInfo
      },
      
      // Package Details
      packageDetails: packageData ? {
        packageId: packageData.packageId,
        packageTitle: packageData.packageTitle,
        destination: packageData.destination,
        tripDuration: packageData.tripDuration,
        groupSize: packageData.groupSize,
        travelDate: packageData.travelDate,
        packagePrice: packageData.packagePrice,
        packageImage: packageData.packageImage,
        rating: packageData.rating
      } : null,
      
      // Add-ons
      addOns: packageData?.addOns || {},
      
      // Pricing
      pricing: {
        packageCost: packageData?.packagePrice || 0,
        tourGuide: packageData?.addOns?.tourGuide ? 34 : 0,
        mealsIncluded: packageData?.addOns?.mealsIncluded ? 25 : 0,
        extraBaggage: packageData?.addOns?.extraBaggage ? 15 : 0,
        transfers: packageData?.addOns?.transfers ? 20 : 0,
        taxRate: '13%',
        totalCost: calculateTotal()
      },
      
      // Terms
      termsAccepted: formData.acceptTerms,
      
      // Booking Date
      bookingDate: new Date().toISOString(),
      
      // Status
      bookingStatus: 'pending'
    };

    // Log all details to console
    console.log('=== COMPLETE BOOKING DETAILS ===');
    console.log('User Details:', completeBookingDetails.userDetails);
    console.log('Billing Address:', completeBookingDetails.billingAddress);
    console.log('Package Details:', completeBookingDetails.packageDetails);
    console.log('Add-ons Selected:', completeBookingDetails.addOns);
    console.log('Pricing Breakdown:', completeBookingDetails.pricing);
    console.log('Complete Booking Object:', completeBookingDetails);

    // You can also save this to localStorage or send to your backend API
    localStorage.setItem('completeBooking', JSON.stringify(completeBookingDetails));
    
    // Show success message
    alert(`Booking Details Logged! Total Amount: $${calculateTotal()}`);
  };

  return (
    <>
      <div id="page" className="full-page">
        <Header />

        <main id="content" className="site-main">
          <section className="inner-banner-wrap">
            <div
              className="inner-baner-container"
              style={{
                backgroundImage: "url(/assets/images/inner-banner.jpg)",
              }}
            >
              <div className="container">
                <div className="inner-banner-content">
                  <h1 className="inner-title">Booking</h1>
                  {packageData && (
                    <p style={{ color: '#fff', marginTop: '10px' }}>
                      Package: {packageData.packageTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="inner-shape"></div>
          </section>

          <div className="step-section booking-section">
            <div className="container">
              <div className="step-link-wrap">
                <div className="step-item active">
                  Package Detail
                  <a href="#" className="step-icon"></a>
                </div>
                <div className="step-item active">
                  Your Details
                  <a href="#" className="step-icon"></a>
                </div>
                <div className="step-item">
                  Finish
                  <a href="#" className="step-icon"></a>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 right-sidebar">
                  <div className="booking-form-wrap">
                    {/* Your Details Section */}
                    <div className="booking-content">
                      <div className="form-title">
                        <span>1</span>
                        <h3>Your Details</h3>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>First name*</label>
                            <input
                              type="text"
                              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                            {errors.firstName && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Last name*</label>
                            <input
                              type="text"
                              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                            {errors.lastName && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Email*</label>
                            <input
                              type="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Confirm Email*</label>
                            <input
                              type="email"
                              className={`form-control ${errors.confirmEmail ? 'is-invalid' : ''}`}
                              name="confirmEmail"
                              value={formData.confirmEmail}
                              onChange={handleInputChange}
                            />
                            {errors.confirmEmail && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.confirmEmail}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Phone*</label>
                            <input
                              type="tel"
                              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            {errors.phone && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address Section */}
                    <div className="booking-content">
                      <div className="form-title">
                        <span>2</span>
                        <h3>Billing Address</h3>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Country*</label>
                            <select
                              className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                            >
                              <option value="">Select your country</option>
                              <option value="Europe">Europe</option>
                              <option value="United states">United states</option>
                              <option value="India">India</option>
                            </select>
                            {errors.country && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.country}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Street line 1*</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.street1 ? 'is-invalid' : ''}`}
                              name="street1"
                              value={formData.street1}
                              onChange={handleInputChange}
                            />
                            {errors.street1 && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.street1}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Street line 2</label>
                            <input 
                              type="text" 
                              className="form-control"
                              name="street2"
                              value={formData.street2}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>City*</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                            {errors.city && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.city}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div className="form-group">
                            <label>State*</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                            {errors.state && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.state}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div className="form-group">
                            <label>Postal code*</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                            />
                            {errors.postalCode && (
                              <div className="invalid-feedback" style={{
                                display: 'block',
                                color: '#dc3545',
                                fontSize: '0.875em',
                                marginTop: '0.25rem'
                              }}>
                                {errors.postalCode}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Additional Information</label>
                            <textarea
                              rows="6"
                              className="form-control"
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleInputChange}
                              placeholder="Notes about your order, e.g. special notes for delivery"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-policy">
                      <h3>Cancellation policy</h3>
                      <div className="form-group">
                        <label className="checkbox-list">
                          <input 
                            type="checkbox" 
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                          />
                          <span className="custom-checkbox"></span>
                          I accept terms and conditions and general policy.
                        </label>
                        {errors.acceptTerms && (
                          <div className="invalid-feedback" style={{
                            display: 'block',
                            color: '#dc3545',
                            fontSize: '0.875em',
                            marginTop: '0.25rem'
                          }}>
                            {errors.acceptTerms}
                          </div>
                        )}
                      </div>
                      <button 
                        type="button" 
                        className="button-primary"
                        onClick={handleBookNow}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Updated Summary Sidebar */}
                <div className="col-lg-4">
                  <aside className="sidebar">
                    <div className="widget-bg widget-table-summary">
                      <h4 className="bg-title">Summary</h4>
                      {packageData && (
                        <>
                          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                            <h5 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>Package : {packageData.packageTitle}</h5>
                            <div style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
                              <div>📍 Destination : {packageData.destination}</div>
                              <div>⏰ Duration :{packageData.tripDuration}</div>
                              <div>👥 People :{packageData.groupSize}</div>
                              <div>📅 Travel Date: {packageData.travelDate}</div>
                            </div>
                          </div>
                          
                          <table>
                            <tbody>
                              <tr>
                                <td><strong>Package cost</strong></td>
                                <td className="text-right">${packageData.packagePrice}</td>
                              </tr>
                              {packageData.addOns?.tourGuide && (
                                <tr>
                                  <td><strong>Tour guide</strong></td>
                                  <td className="text-right">$34</td>
                                </tr>
                              )}
                              {packageData.addOns?.mealsIncluded && (
                                <tr>
                                  <td><strong>Meals included</strong></td>
                                  <td className="text-right">$25</td>
                                </tr>
                              )}
                              {packageData.addOns?.extraBaggage && (
                                <tr>
                                  <td><strong>Extra baggage</strong></td>
                                  <td className="text-right">$15</td>
                                </tr>
                              )}
                              {packageData.addOns?.transfers && (
                                <tr>
                                  <td><strong>Transfers</strong></td>
                                  <td className="text-right">$20</td>
                                </tr>
                              )}
                              <tr>
                                <td><strong>Tax</strong></td>
                                <td className="text-right">13%</td>
                              </tr>
                              <tr className="total">
                                <td><strong>Total cost</strong></td>
                                <td className="text-right">
                                  <strong>${calculateTotal()}</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      )}
                      
                      {!packageData && (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                          <p>No package data found. Please go back and select a package.</p>
                          <a href="/tour-packages" className="button-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                            Browse Packages
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="widget-bg widget-support-wrap">
                      <div className="icon">
                        <i className="fas fa-phone-volume"></i>
                      </div>
                      <div className="support-content">
                        <h5>HELP AND SUPPORT</h5>
                        <a href="tel:12345678" className="phone">
                          +11 234 889 00
                        </a>
                        <small>Monday to Friday 9.00am - 7.30pm</small>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </main>

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

        <a id="backTotop" href="#" className="to-top-icon">
          <i className="fas fa-chevron-up"></i>
        </a>

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
    </>
  );
};

export default Booking;
