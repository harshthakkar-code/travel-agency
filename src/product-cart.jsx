import React from "react";

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
      {/* <Header /> */}

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

