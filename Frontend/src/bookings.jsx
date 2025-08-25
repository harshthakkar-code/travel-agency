// import React from "react";
// import Header from "./Header";

// const Bookings = () => (
//   <div id="page" className="full-page">
//     {/* --- Header (should ideally be a separate component) --- */}
//     <Header />
//       <section className="inner-banner-wrap">
//           <div
//             className="inner-baner-container"
//             style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
//           >
//             <div className="container">
//               <div className="inner-banner-content">
//                 <h1 className="inner-title">Your Bookings</h1>
//               </div>
//             </div>
//           </div>
//           <div className="inner-shape" style={{ height: "100px"}}></div>
//         </section>

// <div className="" style={{ padding: "20px" , backgroundColor: "grey"}}>
//         <div className="dashboard-box table-opp-color-box">
//           <h4>Recent Booking</h4>
//           <p>Airtport Hotels The Right Way To Start A Short Break Holiday</p>
//           <div className="table-responsive">
//             <table className="table">
//               <thead>
//                 <tr style={{ backgroundColor: "white" }}>
//                   <th>User</th>
//                   <th>Date</th>
//                   <th>Destination</th>
//                   <th>Id</th>
//                   <th>status</th>
//                   <th>Enquiry</th>
//                   <th>People</th>
//                   <th>action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <span className="list-img"><img src="assets/images/comment.jpg" alt="" /></span>
//                     <span className="list-enq-name">John Doe</span>
//                   </td>
//                   <td>12 may</td>
//                   <td>Japan</td>
//                   <td>755</td>
//                   <td><span className="badge badge-success">Approve</span></td>
//                   <td><span className="badge badge-success">15</span></td>
//                   <td><span className="badge badge-success">9</span></td>
//                   <td>
//                     <span className="badge badge-success"><i className="far fa-edit"></i></span>
//                     <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <span className="list-img"><img src="assets/images/comment2.jpg" alt="" /></span>
//                     <span className="list-enq-name">John Doe</span>
//                   </td>
//                   <td>12 may</td>
//                   <td>Japan</td>
//                   <td>755</td>
//                   <td><span className="badge badge-primary">Pending</span></td>
//                   <td><span className="badge badge-success">15</span></td>
//                   <td><span className="badge badge-success">9</span></td>
//                   <td>
//                     <span className="badge badge-success"><i className="far fa-edit"></i></span>
//                     <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <span className="list-img"><img src="assets/images/comment3.jpg" alt="" /></span>
//                     <span className="list-enq-name">John Doe</span>
//                   </td>
//                   <td>12 may</td>
//                   <td>Japan</td>
//                   <td>755</td>
//                   <td><span className="badge badge-danger">Reject</span></td>
//                   <td><span className="badge badge-success">15</span></td>
//                   <td><span className="badge badge-success">9</span></td>
//                   <td>
//                     <span className="badge badge-success"><i className="far fa-edit"></i></span>
//                     <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <span className="list-img"><img src="assets/images/comment4.jpg" alt="" /></span>
//                     <span className="list-enq-name">John Doe</span>
//                   </td>
//                   <td>12 may</td>
//                   <td>Japan</td>
//                   <td>755</td>
//                   <td><span className="badge badge-primary">Pendding</span></td>
//                   <td><span className="badge badge-success">15</span></td>
//                   <td><span className="badge badge-success">9</span></td>
//                   <td>
//                     <span className="badge badge-success"><i className="far fa-edit"></i></span>
//                     <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <span className="list-img"><img src="assets/images/comment5.jpg" alt="" /></span>
//                     <span className="list-enq-name">John Doe</span>
//                   </td>
//                   <td>12 may</td>
//                   <td>Japan</td>
//                   <td>755</td>
//                   <td><span className="badge badge-danger">Reject</span></td>
//                   <td><span className="badge badge-success">15</span></td>
//                   <td><span className="badge badge-success">9</span></td>
//                   <td>
//                     <span className="badge badge-success"><i className="far fa-edit"></i></span>
//                     <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <span className="list-img"><img src="assets/images/comment6.jpg" alt="" /></span>
//                     <span className="list-enq-name">John Doe</span>
//                   </td>
//                   <td>12 may</td>
//                   <td>Japan</td>
//                   <td>755</td>
//                   <td><span className="badge badge-success">approve</span></td>
//                   <td><span className="badge badge-success">15</span></td>
//                   <td><span className="badge badge-success">9</span></td>
//                   <td>
//                     <span className="badge badge-success"><i className="far fa-edit"></i></span>
//                     <span className="badge badge-danger"><i className="far fa-trash-alt"></i></span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//     {/* --- Footer (can also be a separate component) --- */}
//     <footer id="colophon" className="site-footer footer-primary">
//       <div className="top-footer">
//         <div className="container">
//           <div className="row">
//             {/* About Travel */}
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_text">
//                 <h3 className="widget-title">About Travel</h3>
//                 <div className="textwidget widget-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
//                 </div>
//                 <div className="award-img">
//                   <a href="#"><img src="assets/images/logo6.png" alt="" /></a>
//                   <a href="#"><img src="assets/images/logo2.png" alt="" /></a>
//                 </div>
//               </aside>
//             </div>
//             {/* Contact Info */}
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_text">
//                 <h3 className="widget-title">CONTACT INFORMATION</h3>
//                 <div className="textwidget widget-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   <ul>
//                     <li>
//                       <a href="#"><i className="fas fa-phone-alt"></i> +01 (977) 2599 12</a>
//                     </li>
//                     <li>
//                       <a href="#"><i className="fas fa-envelope"></i> [email&#160;protected]</a>
//                     </li>
//                     <li>
//                       <i className="fas fa-map-marker-alt"></i> 3146 Koontz, California
//                     </li>
//                   </ul>
//                 </div>
//               </aside>
//             </div>
//             {/* Latest Post */}
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_recent_post">
//                 <h3 className="widget-title">Latest Post</h3>
//                 <ul>
//                   <li>
//                     <h5>
//                       <a href="#">Life is a beautiful journey not a destination</a>
//                     </h5>
//                     <div className="entry-meta">
//                       <span className="post-on"><a href="#">August 17, 2021</a></span>
//                       <span className="comments-link"><a href="#">No Comments</a></span>
//                     </div>
//                   </li>
//                   <li>
//                     <h5>
//                       <a href="#">Take only memories, leave only footprints</a>
//                     </h5>
//                     <div className="entry-meta">
//                       <span className="post-on"><a href="#">August 17, 2021</a></span>
//                       <span className="comments-link"><a href="#">No Comments</a></span>
//                     </div>
//                   </li>
//                 </ul>
//               </aside>
//             </div>
//             {/* Subscribe */}
//             <div className="col-lg-3 col-md-6">
//               <aside className="widget widget_newslatter">
//                 <h3 className="widget-title">SUBSCRIBE US</h3>
//                 <div className="widget-text">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </div>
//                 <form className="newslatter-form">
//                   <input type="email" name="s" placeholder="Your Email.." />
//                   <input type="submit" name="s" value="SUBSCRIBE NOW" />
//                 </form>
//               </aside>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="buttom-footer">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-5">
//               <div className="footer-menu">
//                 <ul>
//                   <li><a href="#">Privacy Policy</a></li>
//                   <li><a href="#">Term & Condition</a></li>
//                   <li><a href="#">FAQ</a></li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-md-2 text-center">
//               <div className="footer-logo">
//                 <a href="#"><img src="assets/images/travele-logo.png" alt="" /></a>
//               </div>
//             </div>
//             <div className="col-md-5">
//               <div className="copy-right text-right">
//                 Copyright © 2021 Travele. All rights reserveds
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//     <a id="backTotop" href="#" className="to-top-icon">
//       <i className="fas fa-chevron-up"></i>
//     </a>

//     {/* Custom search field overlay */}
//     <div className="header-search-form">
//       <div className="container">
//         <div className="header-search-container">
//           <form className="search-form" role="search" method="get">
//             <input type="text" name="s" placeholder="Enter your text..." />
//           </form>
//           <a href="#" className="search-close">
//             <i className="fas fa-times"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Bookings;


import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "./utils/api"; // Your axios instance for API requests
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
        const res = await api.get(`/bookings/${localStorage.getItem("userId")}`);
        setBookings(res.data || []); // Adjust path if response wraps data differently
      } catch (err) {
        setError("Failed to load bookings");
        setBookings([]);
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

      <section className="inner-banner-wrap">
        <div
          className="inner-baner-container"
          style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
        >
          <div className="container">
            <div className="inner-banner-content">
              <h1 className="inner-title">Your Bookings</h1>
            </div>
          </div>
        </div>
        <div className="inner-shape" style={{ height: "100px" }}></div>
      </section>

      <div style={{ padding: "20px", backgroundColor: "grey" }}>
        <div className="dashboard-box table-opp-color-box">
          <h4>Recent Booking</h4>
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ backgroundColor: "white" }}>
                    <th>User</th>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Package</th>
                    <th>Id</th>
                    {/* <th>Status</th> */}
                    <th>People</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>

                        <span className="list-enq-name">
                          {booking.user?.fullName || "Unknown User"}
                        </span>
                      </td>

                      <td>
                        {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}
                      </td>
                      <td>{booking.package?.destination || "-"}</td>
                      <td>
                        {/* Enquiry count if available */}
                        <span className="">
                          {booking.package?.packageTitle || "-"}
                        </span>
                      </td>
                      <td>{booking._id}</td>
                      {/* <td>
                        <span
                          className={`badge ${
                            booking.status === "Approved"
                              ? "badge-success"
                              : booking.status === "Pending"
                              ? "badge-primary"
                              : "badge-danger"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td> */}

                      <td>
                        <span className="badge badge-success">
                          {booking.package.groupSize || 1}
                        </span>
                      </td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        {/* Actions like Edit/Delete - you can add handlers */}
                        <span
                          className="badge badge-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => openModal(booking)}
                        >
                          <i className="far fa-eye"></i>
                        </span>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

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
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 10000,
      backdropFilter: 'blur(4px)',
    },
    content: {
      maxWidth: "600px",
      margin: "auto",
      inset: "40px",
      padding: "30px 40px",
      position: "relative",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      borderRadius: "12px",
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      backgroundColor: "#fff",
      color: "#333",
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
          top: "15px",
          right: "15px",
          background: "transparent",
          border: "none",
          fontSize: "28px",
          fontWeight: "700",
          cursor: "pointer",
          color: "#666",
          transition: "color 0.2s ease",
          lineHeight: "1",
        }}
        aria-label="Close modal"
        onMouseEnter={e => e.currentTarget.style.color = "#000"}
        onMouseLeave={e => e.currentTarget.style.color = "#666"}
      >
        &times;
      </button>

      <h3 style={{ 
        marginBottom: "25px", 
        borderBottom: "2px solid #eee", 
        paddingBottom: "10px", 
        fontWeight: "700",
        color: "#222"
      }}>
        Booking Details
      </h3>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
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

      <div style={{ marginTop: "30px" }}>
        <h3 style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "8px",
          fontWeight: "700",
          color: "#222"
        }}>
          Pricing Details:
        </h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "15px", color: "#555" }}>
          <li>Package Cost: ${(selectedBooking.pricing.packageCost).toFixed(2)}</li>
          <li>Tour Guide: ${(selectedBooking.pricing.tourGuide).toFixed(2)}</li>
          <li>Meals Included: ${(selectedBooking.pricing.mealsIncluded).toFixed(2)}</li>
          <li>Extra Baggage: ${(selectedBooking.pricing.extraBaggage).toFixed(2)}</li>
          <li>Transfers: ${(selectedBooking.pricing.transfers).toFixed(2)}</li>
          <li style={{ marginTop: "10px", fontWeight: "bold", fontSize: "18px", color: "#111" }}>
            Total Cost: ${(selectedBooking.pricing.totalCost).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  )}
</Modal>



      {/* Keep your footer and other components unchanged below */}
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
    </div>
  );
};

export default Bookings;
