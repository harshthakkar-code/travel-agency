import React from "react";
import Header from "./Header";

const Product_cart = () => {
  // You can replace the below cart items array with state and logic later
  const cartItems = [
    {
      id: 1,
      name: "Sleeping bag",
      image: "/assets/images/product1.jpg",
      price: 99.0,
      quantity: 1,
      subtotal: 99.0,
    },
    {
      id: 2,
      name: "Jacket",
      image: "/assets/images/product2.jpg",
      price: 99.0,
      quantity: 1,
      subtotal: 99.0,
    },
    {
      id: 3,
      name: "Hammock",
      image: "/assets/images/product3.jpg",
      price: 99.0,
      quantity: 1,
      subtotal: 99.0,
    },
  ];

  return (
    <div id="page" className="full-page">
      {/* ===== HEADER COMPONENT (copy from your modularized header) ===== */}
      <Header />

      {/* ===== MAIN CONTENT ===== */}
      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Products Cart</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Cart Section */}
        <div className="cart-section">
          <div className="container">
            <div className="cart-list-inner">
              <form action="#">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <button className="close" aria-label="Close" type="button">
                              <span aria-hidden="true">×</span>
                            </button>
                            <span className="cartImage">
                              <img src={item.image} alt="image" />
                            </span>
                          </td>
                          <td data-column="Product Name">{item.name}</td>
                          <td data-column="Price">${item.price.toFixed(2)}</td>
                          <td data-column="Quantity" className="count-input">
                            <div>
                              <a className="minus-btn" href="#">
                                <i className="fa fa-minus"></i>
                              </a>
                              <input className="quantity" type="text" value={item.quantity} readOnly />
                              <a className="plus-btn" href="#">
                                <i className="fa fa-plus"></i>
                              </a>
                            </div>
                          </td>
                          <td data-column="Sub Total">${item.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="updateArea">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="I have a discount coupon"
                    />
                    <a href="#" className="button-primary">
                      apply coupon
                    </a>
                  </div>
                  <a href="#" className="outline-primary update-btn">
                    update cart
                  </a>
                </div>
                <div className="totalAmountArea">
                  <ul className="list-unstyled">
                    <li>
                      <strong>Sub Total</strong> <span>$ 792.00</span>
                    </li>
                    <li>
                      <strong>Vat</strong> <span>$ 18.00</span>
                    </li>
                    <li>
                      <strong>Grand Total</strong> <span className="grandTotal">$ 810.00</span>
                    </li>
                  </ul>
                </div>
                <div className="checkBtnArea text-right">
                  <a href="#" className="button-primary">
                    checkout
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER COMPONENT (copy from your modularized footer) ===== */}
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

      {/* ===== BACK TO TOP ===== */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* ===== SEARCH FORM ===== */}
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

export default Product_cart;

