import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

const Booking = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    // Payment fields
    nameOnCard: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    ccv: "",
    // Billing fields
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    postalCode: "",
    additionalInfo: "",
  });

  // Package data from localStorage
  const [packageData, setPackageData] = useState(null);

  // Errors state for form validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get booking data from localStorage
    const bookingData = localStorage.getItem("bookingData");

    if (bookingData) {
      try {
        const parsedData = JSON.parse(bookingData);
        setPackageData(parsedData);

        // Pre-fill the form with data from package detail page
        if (parsedData.fullName) {
          // Split full name into first and last name
          const nameParts = parsedData.fullName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setFormData((prev) => ({
            ...prev,
            firstName: firstName,
            lastName: lastName,
            email: parsedData.email || "",
            confirmEmail: parsedData.email || "",
            phone: parsedData.phone || "",
          }));
        }
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckout = async () => {
    // Validate form as usual
    if (!validateForm()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login to book a package.");
        return;
      }

      // Prepare booking data compatible with Supabase schema
      // Note: We are currently only storing core fields. 
      // Billing/Guest details would need schema expansion (jsonb column or separate table).
      const bookingPayload = {
        user_id: user.id,
        package_id: packageData.packageId,
        package_title: packageData.packageTitle,
        package_destination: packageData.destination,
        booking_date: new Date().toISOString(),
        status: 'Pending',
        pricing: {
          packageCost: parseFloat(packageData?.packagePrice || 0),
          taxRate: "13%",
          totalCost: parseFloat(calculateTotal()),
          breakdown: (packageData.optionsConfig || [
            { name: 'tourGuide', label: 'Tour Guide', price: 34 },
            { name: 'mealsIncluded', label: 'Meals Included', price: 25 },
            { name: 'extraBaggage', label: 'Extra Baggage', price: 15 },
            { name: 'transfers', label: 'Transfers', price: 20 }
          ]).reduce((acc, opt) => {
            if (packageData.addOns?.[opt.name]) {
              acc[opt.name] = opt.price;
            }
            return acc;
          }, {})
        },
        billing_address: {
          country: formData.country,
          street1: formData.street1,
          street2: formData.street2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          additionalInfo: formData.additionalInfo,
        },
        add_ons: packageData?.addOns || {},
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select()
        .single();

      if (error) throw error;

      // Clear local storage
      localStorage.removeItem("bookingData");
      localStorage.removeItem("completeBooking");

      // Call Supabase Edge Function to create Stripe Checkout Session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: { booking_id: data.id },
      });

      if (checkoutError) throw checkoutError;

      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("No checkout URL returned");
      }

    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking creation failed: " + (err.message || "Unknown error"));
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!packageData) return 0;

    let total = parseFloat(packageData.packagePrice || 0);

    // Dynamic Add-ons
    const options = packageData.optionsConfig || [
      { name: 'tourGuide', price: 34 },
      { name: 'mealsIncluded', price: 25 },
      { name: 'extraBaggage', price: 15 },
      { name: 'transfers', price: 20 }
    ];

    options.forEach(opt => {
      // Check if the option is selected in addOns
      if (packageData.addOns?.[opt.name]) {
        total += (parseFloat(opt.price) || 0);
      }
    });

    // Add tax (13%)
    const tax = total * 0.13;

    return (total + tax).toFixed(2);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = "Confirm Email is required";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Email and Confirm Email do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.street1.trim()) {
      newErrors.street1 = "Street Line 1 is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
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
        phone: formData.phone,
      },

      // Billing Address
      billingAddress: {
        country: formData.country,
        street1: formData.street1,
        street2: formData.street2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        additionalInfo: formData.additionalInfo,
      },

      // Package Details
      packageDetails: packageData
        ? {
          packageId: packageData.packageId,
          packageTitle: packageData.packageTitle,
          destination: packageData.destination,
          tripDuration: packageData.tripDuration,
          groupSize: packageData.groupSize,
          travelDate: packageData.travelDate,
          packagePrice: packageData.packagePrice,
          packageImage: packageData.packageImage,
          rating: packageData.rating,
        }
        : null,

      // Add-ons
      addOns: packageData?.addOns || {},

      // Pricing
      pricing: {
        packageCost: packageData?.packagePrice || 0,
        tourGuide: packageData?.addOns?.tourGuide ? 34 : 0,
        mealsIncluded: packageData?.addOns?.mealsIncluded ? 25 : 0,
        extraBaggage: packageData?.addOns?.extraBaggage ? 15 : 0,
        transfers: packageData?.addOns?.transfers ? 20 : 0,
        taxRate: "13%",
        totalCost: calculateTotal(),
      },

      // Terms
      termsAccepted: formData.acceptTerms,

      // Booking Date
      bookingDate: new Date().toISOString(),

      // Status
      bookingStatus: "pending",
    };

    // Log all details to console
    console.log("=== COMPLETE BOOKING DETAILS ===");
    console.log("User Details:", completeBookingDetails.userDetails);
    console.log("Billing Address:", completeBookingDetails.billingAddress);
    console.log("Package Details:", completeBookingDetails.packageDetails);
    console.log("Add-ons Selected:", completeBookingDetails.addOns);
    console.log("Pricing Breakdown:", completeBookingDetails.pricing);
    console.log("Complete Booking Object:", completeBookingDetails);

    // You can also save this to localStorage or send to your backend API
    localStorage.setItem(
      "completeBooking",
      JSON.stringify(completeBookingDetails)
    );

    // Show success message
    alert(`Booking Details Logged! Total Amount: $${calculateTotal()}`);
  };

  return (
    <div id="page" className="full-page">
      <Header />

      <main id="content" className="site-main">
        {/* =================== HERO SECTION =================== */}
        <section className="booking-hero-section" style={{
          backgroundImage: "url(/assets/images/slider-banner-1.jpg)",
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
              <i className="fas fa-lock" style={{ marginRight: '10px' }}></i>
              Secure Checkout
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
              Secure Your <span style={{ color: '#F56960' }}>Adventure</span>
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
              Don't miss out on this incredible journey. Complete your booking details below and get ready for an unforgettable travel experience.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="container">
            {/* Step Progress Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '50px',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              {[
                { step: 1, label: 'Package Detail', active: true, done: true },
                { step: 2, label: 'Your Details', active: true, done: false },
                { step: 3, label: 'Finish', active: false, done: false }
              ].map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: s.active ? '#0791BE' : '#fff',
                    color: s.active ? '#fff' : '#888',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                    border: s.active ? 'none' : '1px solid #ddd'
                  }}>
                    {s.done ? <i className="fas fa-check"></i> : s.step}
                  </div>
                  <span style={{ fontWeight: '600', color: s.active ? '#101F46' : '#888' }}>{s.label}</span>
                  {idx < 2 && <div style={{ width: '40px', height: '2px', background: '#ddd', marginLeft: '10px' }}></div>}
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-lg-8">
                {/* Section 1: Personal Details */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ width: '45px', height: '45px', background: 'rgba(7, 145, 190, 0.1)', color: '#0791BE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      <i className="fas fa-user"></i>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#101F46' }}>Your Personal Information</h3>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>First Name*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. John"
                      />
                      {errors.firstName && <div className="text-danger mt-1 small">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Last Name*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Doe"
                      />
                      {errors.lastName && <div className="text-danger mt-1 small">{errors.lastName}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Email Address*</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                      {errors.email && <div className="text-danger mt-1 small">{errors.email}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Phone Number*</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 890"
                      />
                      {errors.phone && <div className="text-danger mt-1 small">{errors.phone}</div>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Billing Address */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ width: '45px', height: '45px', background: 'rgba(7, 145, 190, 0.1)', color: '#0791BE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      <i className="fas fa-file-invoice-dollar"></i>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#101F46' }}>Billing Details</h3>
                  </div>

                  <div className="row">
                    <div className="col-12 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Country*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Select Country"
                      />
                      {errors.country && <div className="text-danger mt-1 small">{errors.country}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Street Address*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.street1 ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="street1"
                        value={formData.street1}
                        onChange={handleInputChange}
                        placeholder="House number and street name"
                      />
                      {errors.street1 && <div className="text-danger mt-1 small">{errors.street1}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Apartment, suite, etc. (optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="street2"
                        value={formData.street2}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Town / City*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      {errors.city && <div className="text-danger mt-1 small">{errors.city}</div>}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>State*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      {errors.state && <div className="text-danger mt-1 small">{errors.state}</div>}
                    </div>
                    <div className="col-md-4 mb-4">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Postcode / ZIP*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                        style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                      {errors.postalCode && <div className="text-danger mt-1 small">{errors.postalCode}</div>}
                    </div>
                    <div className="col-12">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#555' }}>Additional Requests</label>
                      <textarea
                        rows="4"
                        className="form-control"
                        style={{ padding: '15px 20px', borderRadius: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any special requirements for your trip?"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Policy & Submit */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#101F46', marginBottom: '20px' }}>Final Step</h3>
                  <div style={{ background: '#fff9e6', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #ffeeba' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
                      <strong>Cancellation Policy:</strong> Free cancellation up to 48 hours before the trip. Terms and conditions apply.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-checkout"
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: '#101F46',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '18px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 20px rgba(16, 31, 70, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0791BE';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#101F46';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={handleCheckout}
                  >
                    Complete Your Booking <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                  </button>
                </div>
              </div>

              {/* Sidebar Summary */}
              <div className="col-lg-4">
                <aside style={{ position: 'sticky', top: '20px' }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '25px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{ position: 'relative', height: '180px' }}>
                      <img
                        src={packageData?.packageImage || "/assets/images/img6.jpg"}
                        alt="Package"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '15px',
                        background: 'rgba(7, 145, 190, 0.9)',
                        color: '#fff',
                        padding: '5px 15px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {packageData?.destination}
                      </div>
                    </div>

                    <div style={{ padding: '30px' }}>
                      <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#101F46', marginBottom: '20px' }}>Order Summary</h4>

                      {packageData ? (
                        <>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <i className="fas fa-suitcase-rolling" style={{ color: '#0791BE', width: '15px' }}></i>
                              <span style={{ fontSize: '14px', color: '#444', fontWeight: '600' }}>{packageData.packageTitle}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <i className="far fa-calendar-alt" style={{ color: '#0791BE', width: '15px' }}></i>
                              <span style={{ fontSize: '14px', color: '#444' }}>Date: {packageData.travelDate}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <i className="far fa-clock" style={{ color: '#0791BE', width: '15px' }}></i>
                              <span style={{ fontSize: '14px', color: '#444' }}>Duration: {packageData.tripDuration}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <i className="fas fa-users" style={{ color: '#0791BE', width: '15px' }}></i>
                              <span style={{ fontSize: '14px', color: '#444' }}>Guests: {packageData.groupSize} Traveler(s)</span>
                            </div>
                          </div>

                          <div style={{ borderTop: '1px dashed #ddd', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <span style={{ color: '#666', fontSize: '14px' }}>Base Fare</span>
                              <span style={{ fontWeight: '700', color: '#101F46' }}>${packageData.packagePrice}</span>
                            </div>

                            {(packageData.optionsConfig || [
                              { name: 'tourGuide', label: 'Tour Guide', price: 34 },
                              { name: 'mealsIncluded', label: 'Meals Included', price: 25 },
                              { name: 'extraBaggage', label: 'Extra Baggage', price: 15 },
                              { name: 'transfers', label: 'Transfers', price: 20 }
                            ]).map((opt) => (
                              packageData.addOns?.[opt.name] && (
                                <div key={opt.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                  <span style={{ color: '#666', fontSize: '14px' }}>{opt.label || opt.name}</span>
                                  <span style={{ fontWeight: '700', color: '#101F46' }}>+${opt.price}</span>
                                </div>
                              )
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                              <span style={{ color: '#666', fontSize: '14px' }}>GST / Tax (13%)</span>
                              <span style={{ fontWeight: '700', color: '#101F46' }}>+${(packageData.packagePrice * 0.13).toFixed(2)}</span>
                            </div>

                            <div style={{
                              background: '#f8f9fa',
                              padding: '20px',
                              borderRadius: '15px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span style={{ fontSize: '16px', fontWeight: '700', color: '#101F46' }}>Total Amount</span>
                              <span style={{ fontSize: '24px', fontWeight: '800', color: '#0791BE' }}>${calculateTotal()}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                          <p style={{ color: '#666', marginBottom: '20px' }}>No package selected.</p>
                          <Link to="/tour-packages" style={{ color: '#0791BE', fontWeight: '700', textDecoration: 'none' }}>Go back to packages</Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Support Widget */}
                  <div style={{
                    marginTop: '30px',
                    background: '#101F46',
                    borderRadius: '25px',
                    padding: '30px',
                    color: '#fff',
                    backgroundImage: 'linear-gradient(135deg, #101F46 0%, #0791BE 100%)',
                    boxShadow: '0 10px 25px rgba(7, 145, 190, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-headset"></i>
                      </div>
                      <h5 style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: '700' }}>Need Any Help?</h5>
                    </div>
                    <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '20px' }}>Our travel experts are available 24/7 to assist with your booking.</p>
                    <a href="tel:+1123488900" style={{
                      fontSize: '20px',
                      fontWeight: '800',
                      color: '#fff',
                      textDecoration: 'none',
                      display: 'block'
                    }}>+11 234 889 00</a>
                    <small style={{ fontSize: '11px', opacity: 0.6 }}>Mon - Fri: 9:00 AM - 7:30 PM</small>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a id="backTotop" href="#" className="to-top-icon" style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: '#0791BE',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        zIndex: 999,
        textDecoration: 'none',
        transition: 'all 0.3s ease'
      }}>
        <i className="fas fa-chevron-up"></i>
      </a>
    </div>
  );
};

export default Booking;
