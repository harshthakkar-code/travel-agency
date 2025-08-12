import React from "react";
import Header from "./Header";

const Product_checkout = () => {
  return (
    <div id="page" className="full-page">
      {/* ===== HEADER COMPONENT ===== */}
      <Header />

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Checkout</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Checkout Section */}
        <div className="checkout-section">
          <div className="container">
            <div className="row">
              {/* Billing Details */}
              <div className="col-md-8 right-sidebar">
                <div className="checkout-field-wrap">
                  <h3>Billing details</h3>
                  <div className="coupon-field">
                    <label>
                      Have a Coupon? <a href="#">Click here to enter your code</a>
                    </label>
                    <div className="form-group">
                      <input type="text" name="coupon" placeholder="Coupon code" />
                      <input type="submit" name="submit" value="Apply coupon" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input type="text" name="firstName" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input type="text" name="lastName" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>Company Name (optional)</label>
                        <input type="text" name="companyName" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>Country *</label>
                        <select>
                          <option value="France">France</option>
                          <option value="England">England</option>
                          <option value="Brazil">Brazil</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <label>Street address *</label>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" name="street1" placeholder="Street name" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              name="street2"
                              placeholder="Street name (optional)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Postcode / ZIP *</label>
                        <input type="text" name="postcode" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Town / City *</label>
                        <input type="text" name="city" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Province *</label>
                        <select>
                          <option value="Bedfordshire">Bedfordshire</option>
                          <option value="Essex">Essex</option>
                          <option value="Suffolk">Suffolk</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone *</label>
                        <input type="text" name="phone" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>Email address *</label>
                        <input type="email" name="email" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>Additional Information </label>
                        <textarea
                          rows={6}
                          placeholder="Notes about your order, eg. special notes for delivery"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sidebar: Order Summary and Payment */}
              <div className="col-md-4">
                <aside className="sidebar">
                  <div className="widget-bg widget-table-summary">
                    <h4 className="bg-title">Our order</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>Album X 1</td>
                          <td className="text-right">$300</td>
                        </tr>
                        <tr>
                          <td>Beanie X 5</td>
                          <td className="text-right">$34</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Subtotal</strong>
                          </td>
                          <td className="text-right">$334</td>
                        </tr>
                        <tr>
                          <td>tax</td>
                          <td className="text-right">13%</td>
                        </tr>
                        <tr className="total">
                          <td>
                            <strong>Total cost</strong>
                          </td>
                          <td className="text-right">
                            <strong>$480</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="widget-bg widget-paymet-bank">
                    <div className="payment-wrap">
                      <h4 className="bg-title">Payment</h4>
                      <div className="form-group">
                        <div className="custom-radio-field">
                          <label>
                            <input type="radio" name="payment" value="bank" defaultChecked />
                            <span className="radio-field"></span>
                            Direct bank transfer
                          </label>
                        </div>
                        <div className="desc">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-radio-field">
                          <label>
                            <input type="radio" name="payment" value="check" />
                            <span className="radio-field"></span>
                            Check payment
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-radio-field">
                          <label>
                            <input type="radio" name="payment" value="cod" />
                            <span className="radio-field"></span>
                            Cash on delivery
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-radio-field">
                          <label>
                            <input type="radio" name="payment" value="paypal" />
                            <span className="radio-field"></span>
                            Paypal
                            <img src="/assets/images/cards.png" alt="" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="button-primary">Place Order</button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER COMPONENT ===== */}
      {/* <Footer /> */}
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

      {/* Back To Top */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* Search Form */}
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

export default Product_checkout;


