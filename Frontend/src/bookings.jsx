import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";
// You can use any modal library, or simple custom modal
import Modal from "react-modal";
import "./bookings.css";

// Make sure to bind modal to your app root div
Modal.setAppElement("#root");

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            packages:package_id (
              title,
              destination,
              tripDuration:trip_duration,
              sale_price,
              regular_price,
              gallery,
              groupSize:group_size,
              travelDate:created_at
            ),
            user:user_id (
              firstName:first_name,
              lastName:last_name,
              email,
              phone:mobile
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const openModal = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div id="page" className="full-page">
      <Header />

      <main id="content" className="site-main">
        {/* =================== HERO SECTION =================== */}
        <section className="bookings-hero-section" style={{
          backgroundImage: "url(/assets/images/inner-banner.jpg)",
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
              <i className="fas fa-calendar-check" style={{ marginRight: '10px' }}></i>
              Manage Adventures
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
              My <span style={{ color: '#F56960' }}>Bookings</span>
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
              Keep track of all your past and upcoming journeys. View your trip details, itineraries, and manage your travel history in one place.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p style={{ marginTop: '15px', color: '#666' }}>Fetching your adventures...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '15px' }}>
                <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', color: '#F56960', marginBottom: '15px' }}></i>
                <h3>{error}</h3>
                <button onClick={() => window.location.reload()} className="btn-primary-custom" style={{ marginTop: '15px' }}>Try Again</button>
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 40px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(7, 145, 190, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', color: '#0791BE', fontSize: '30px' }}>
                  <i className="fas fa-calendar-times"></i>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '15px', color: '#101F46' }}>No Bookings Found</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>You haven't booked any trips yet. Start exploring our amazing packages!</p>
                <Link to="/tour-packages" style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  background: '#0791BE',
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>Browse Packages</Link>
              </div>
            ) : (
              <div className="row">
                {bookings.map((booking) => (
                  <div className="col-lg-12 mb-4" key={booking.id}>
                    <div className="booking-card-modern" style={{
                      background: '#fff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      transition: 'transform 0.3s ease',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div className="booking-image" style={{ flex: '0 0 300px', height: '200px', minWidth: '300px' }}>
                        <img
                          src={booking.packages?.gallery?.[0] || "assets/images/img6.jpg"}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="booking-details" style={{ flex: '1', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <div>
                            <span style={{
                              background: 'rgba(7, 145, 190, 0.1)',
                              color: '#0791BE',
                              padding: '4px 12px',
                              borderRadius: '50px',
                              fontSize: '12px',
                              fontWeight: '700',
                              marginBottom: '10px',
                              display: 'inline-block'
                            }}>
                              ID: #{booking.id.slice(0, 8)}
                            </span>
                            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#101F46', marginBottom: '5px' }}>{booking.packages?.title}</h3>
                            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                              <i className="fas fa-map-marker-alt" style={{ color: '#0791BE', marginRight: '5px' }}></i>
                              {booking.packages?.destination}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '24px', fontWeight: '800', color: '#0791BE' }}>
                              ${booking.pricing?.totalCost || (booking.packages?.sale_price || booking.packages?.regular_price)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888' }}>Total Amount Paid</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginTop: '15px', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            <strong>Booking Date:</strong> {new Date(booking.created_at).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            <strong>Group Size:</strong> {booking.group_size || 1} People
                          </div>
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            <strong>Status:</strong> <span style={{ color: '#28a745', fontWeight: '600' }}>Confirmed</span>
                          </div>
                        </div>
                      </div>
                      <div className="booking-actions" style={{
                        padding: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        borderLeft: '1px solid #f0f0f0',
                        background: '#fafafa'
                      }}>
                        <button
                          onClick={() => openModal(booking)}
                          className="btn-view-details"
                          style={{
                            padding: '12px 25px',
                            background: '#101F46',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#0791BE'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#101F46'}
                        >
                          <i className="far fa-eye"></i> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* <Modal
        isOpen={!!selectedBooking}
        onRequestClose={closeModal}
        contentLabel="Booking Details"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,  // High z-index for overlay
          },
          content: {
            maxWidth: "600px",
            margin: "auto",
            inset: "40px",
            padding: "20px",
            position: "relative",
            fontFamily: "Arial, sans-serif",
            zIndex: 10001,
          },
        }}
      >
        {selectedBooking && (
          <div>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                lineHeight: "1",
                fontWeight: "bold",
              }}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 style={{ marginBottom: "20px" }}>Booking Details</h2>
            <div
              style={{
                display: "flex",
                gap: "40px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "1 1 45%" }}>
                <p><strong>User:</strong> {selectedBooking.user.fullName}</p>
                <p><strong>Email:</strong> {selectedBooking.user.email}</p>
                <p><strong>Phone:</strong> {selectedBooking.user.phone}</p>
                <p><strong>Status:</strong> {selectedBooking.status}</p>
                <p><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate || selectedBooking.createdAt).toLocaleDateString()}</p>
              </div>

              <div style={{ flex: "1 1 45%" }}>
                <p><strong>Destination:</strong> {selectedBooking.package.destination}</p>
                <p><strong>Package Title:</strong> {selectedBooking.package.packageTitle}</p>
                <p><strong>Travel Date:</strong> {new Date(selectedBooking.package.travelDate).toLocaleDateString()}</p>
                <p><strong>Group Size:</strong> {selectedBooking.package.groupSize}</p>
                <p><strong>Trip Duration:</strong> {selectedBooking.package.tripDuration}</p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Pricing Details:</h3>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li>Package Cost: ${(selectedBooking.pricing.packageCost).toFixed(2)}</li>
                <li>Tour Guide: ${(selectedBooking.pricing.tourGuide).toFixed(2)}</li>
                <li>Meals Included: ${(selectedBooking.pricing.mealsIncluded).toFixed(2)}</li>
                <li>Extra Baggage: ${(selectedBooking.pricing.extraBaggage).toFixed(2)}</li>
                <li>Transfers: ${(selectedBooking.pricing.transfers).toFixed(2)}</li>
                <li><strong>Total Cost: ${(selectedBooking.pricing.totalCost).toFixed(2)}</strong></li>
              </ul>
            </div>
          </div>
        )}
      </Modal> */}
      <Modal
        isOpen={!!selectedBooking}
        onRequestClose={closeModal}
        contentLabel="Booking Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 10000,
            backdropFilter: "blur(8px)",
            overflowX: 'auto',
            paddingTop: '30px'
          },
          content: {
            maxWidth: "700px",
            width: "90%",
            margin: "auto",
            inset: "auto",
            padding: "0",
            position: "relative",
            fontFamily: '"Outfit", sans-serif',
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            backgroundColor: "#fff",
            color: "#333",
            zIndex: 10001,
            border: "none",
            overflowX: 'auto',
            maxHeight: "90vh"
          },
        }}
      >
        {selectedBooking && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Modal Header */}
            <div style={{
              padding: "25px 35px",
              background: "#101F46",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#fff" }}>Booking Details</h2>
                <p style={{ margin: "5px 0 0", fontSize: "14px", opacity: 0.8 }}>ID: #{selectedBooking.id.slice(0, 12)}</p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={{ padding: "35px", overflowY: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>

                {/* Traveler Information */}
                <div className="modal-section">
                  <h4 style={{ color: "#0791BE", fontSize: "16px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fas fa-user-circle"></i> Traveler Info
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-user"></i></span>
                      <span style={{ fontWeight: "600" }}>{selectedBooking.user ? `${selectedBooking.user.firstName} ${selectedBooking.user.lastName}` : "Guest User"}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-envelope"></i></span>
                      <span>{selectedBooking.user?.email || "N/A"}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-phone"></i></span>
                      <span>{selectedBooking.user?.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Package Information */}
                <div className="modal-section">
                  <h4 style={{ color: "#0791BE", fontSize: "16px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fas fa-map-marked-alt"></i> Trip Details
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-suitcase"></i></span>
                      <span style={{ fontWeight: "600" }}>{selectedBooking.packages?.title}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-map-pin"></i></span>
                      <span>{selectedBooking.packages?.destination}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-calendar-alt"></i></span>
                      <span>{new Date(selectedBooking.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ color: "#888", width: "20px" }}><i className="fas fa-users"></i></span>
                      <span>{selectedBooking.group_size || 1} Person(s)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div style={{ marginTop: "40px", background: "#f8f9fa", borderRadius: "15px", padding: "25px" }}>
                <h4 style={{ color: "#101F46", fontSize: "16px", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-receipt"></i> Payment Summary
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>
                    <span style={{ color: "#666" }}>Package Base Cost</span>
                    <span style={{ fontWeight: "600" }}>${Number(selectedBooking.pricing?.packageCost || 0).toFixed(2)}</span>
                  </div>
                  {selectedBooking.pricing?.tourGuide > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>
                      <span style={{ color: "#666" }}>Professional Tour Guide</span>
                      <span style={{ fontWeight: "600" }}>+${Number(selectedBooking.pricing.tourGuide).toFixed(2)}</span>
                    </div>
                  )}
                  {selectedBooking.pricing?.mealsIncluded > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>
                      <span style={{ color: "#666" }}>Meal Plan Upgrade</span>
                      <span style={{ fontWeight: "600" }}>+${Number(selectedBooking.pricing.mealsIncluded).toFixed(2)}</span>
                    </div>
                  )}
                  {selectedBooking.pricing?.extraBaggage > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>
                      <span style={{ color: "#666" }}>Extra Baggage Allowance</span>
                      <span style={{ fontWeight: "600" }}>+${Number(selectedBooking.pricing.extraBaggage).toFixed(2)}</span>
                    </div>
                  )}
                  {selectedBooking.pricing?.transfers > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px" }}>
                      <span style={{ color: "#666" }}>VIP Airport Transfers</span>
                      <span style={{ fontWeight: "600" }}>+${Number(selectedBooking.pricing.transfers).toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{
                    marginTop: "10px",
                    paddingTop: "15px",
                    borderTop: "2px dashed #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#101F46" }}>Total Amount</span>
                    <span style={{ fontSize: "24px", fontWeight: "800", color: "#0791BE" }}>
                      ${Number(selectedBooking.pricing?.totalCost || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
                <div style={{
                  background: "rgba(40, 167, 69, 0.1)",
                  color: "#28a745",
                  padding: "10px 30px",
                  borderRadius: "50px",
                  fontWeight: "700",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <i className="fas fa-check-circle"></i> Booking Status: Confirmed
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Keep your footer and other components unchanged below */}
      <Footer />
    </div>
  );
};

export default Bookings;
