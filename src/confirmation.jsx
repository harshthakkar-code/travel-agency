import React from "react";

const Confirmation = () => (
  <main id="content" className="site-main">
    {/* Inner Banner */}
    <section className="inner-banner-wrap">
      <div className="inner-baner-container" style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}>
        <div className="container">
          <div className="inner-banner-content">
            <h1 className="inner-title">Booking</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>

    {/* Step Section */}
    <div className="step-section cart-section">
      <div className="container">
        <div className="step-link-wrap">
          <div className="step-item active">
            Your cart
            <a href="#" className="step-icon"></a>
          </div>
          <div className="step-item active">
            Your Details
            <a href="#" className="step-icon"></a>
          </div>
          <div className="step-item active">
            Finish
            <a href="#" className="step-icon"></a>
          </div>
        </div>

        {/* Confirmation Section */}
        <div className="confirmation-outer">
          <div className="success-notify">
            <div className="success-icon">
              <i className="fas fa-check"></i>
            </div>
            <div className="success-content">
              <h3>PAYMENT CONFIRMED</h3>
              <p>
                Thank you, your payment has been successful and your booking is now confirmed. A confirmation email has been sent to <a href="#">[email&#160;protected]</a>.
              </p>
            </div>
          </div>
          <div className="confirmation-inner">
            <div className="row">
              <div className="col-lg-8 right-sidebar">
                <div className="confirmation-details">
                  <h3>BOOKING DETAILS</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Booking id:</td>
                        <td>999-QSDE-55</td>
                      </tr>
                      <tr>
                        <td>First Name:</td>
                        <td>John</td>
                      </tr>
                      <tr>
                        <td>Last Name:</td>
                        <td>Doe</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>
                          <a href="#">[email&#160;protected]</a>
                        </td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>977 - 222 - 444 - 666</td>
                      </tr>
                      <tr>
                        <td>Card number</td>
                        <td>XXX-XXXX-XXX-03</td>
                      </tr>
                      <tr>
                        <td>Country:</td>
                        <td>London</td>
                      </tr>
                      <tr>
                        <td>Zip Code</td>
                        <td>44500</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>445 Mount Eden Road, london, borfish</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="details payment-details">
                    <h3>PAYMENT</h3>
                    <div className="details-desc">
                      <p>Payment is successful via Master card</p>
                    </div>
                  </div>
                  <div className="details">
                    <h3>VIEW BOOKING DETAILS</h3>
                    <div className="details-desc">
                      <p>
                        <a href="#">https://www.travele.com/sadsd-f646556</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="sidebar">
                  <div className="widget-bg widget-table-summary">
                    <h4 className="bg-title">Summary</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Packages cost </strong>
                          </td>
                          <td className="text-right">$300</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Dedicated tour guide</strong>
                          </td>
                          <td className="text-right">$34</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Insurance</strong>
                          </td>
                          <td className="text-right">$34</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>tax</strong>
                          </td>
                          <td className="text-right">13%</td>
                        </tr>
                        <tr className="total">
                          <td>
                            <strong>Total cost</strong>
                          </td>
                          <td className="text-right">
                            <strong>$368</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="widget-bg widget-support-wrap">
                    <div className="icon">
                      <i className="fas fa-phone-volume"></i>
                    </div>
                    <div className="support-content">
                      <h5>HELP AND SUPPORT</h5>
                      <a href="tel:+1123488900" className="phone">
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
        {/* Confirmation Section End */}
      </div>
    </div>
  </main>
);

export default Confirmation;
