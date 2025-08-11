import React from "react";

const Tour_cart = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT GOES HERE */}

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Package Cart</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>
        {/* Cart Steps and Table */}
        <div className="step-section cart-section">
          <div className="container">
            <div className="step-link-wrap">
              <div className="step-item active">
                Your cart
                <a href="#" className="step-icon"></a>
              </div>
              <div className="step-item">
                Your Details
                <a href="#" className="step-icon"></a>
              </div>
              <div className="step-item">
                Finish
                <a href="#" className="step-icon"></a>
              </div>
            </div>
            {/* Cart Table */}
            <div className="cart-list-inner">
              <form>
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
                      <tr>
                        <td>
                          <button className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                          <span className="cartImage"><img src="/assets/images/img5.jpg" alt="image" /></span>
                        </td>
                        <td data-column="Product Name">Sunset view of beautiful lakeside resident</td>
                        <td data-column="Price">$ 1100.00</td>
                        <td data-column="Quantity" className="count-input">
                          <div>
                            <a className="minus-btn" href="#"><i className="fa fa-minus"></i></a>
                            <input className="quantity" type="text" value="1" readOnly />
                            <a className="plus-btn" href="#"><i className="fa fa-plus"></i></a>
                          </div>
                        </td>
                        <td data-column="Sub Total">$ 1100.00</td>
                      </tr>
                      <tr>
                        <td>
                          <button className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                          <span className="cartImage"><img src="/assets/images/img6.jpg" alt="image" /></span>
                        </td>
                        <td data-column="Product Name">Experience the natural beauty of island</td>
                        <td data-column="Price">$ 1150.00</td>
                        <td data-column="Quantity" className="count-input">
                          <div>
                            <a className="minus-btn" href="#"><i className="fa fa-minus"></i></a>
                            <input className="quantity" type="text" value="1" readOnly />
                            <a className="plus-btn" href="#"><i className="fa fa-plus"></i></a>
                          </div>
                        </td>
                        <td data-column="Sub Total">$ 1150.00</td>
                      </tr>
                      <tr>
                        <td>
                          <button className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                          <span className="cartImage"><img src="/assets/images/img7.jpg" alt="image" /></span>
                        </td>
                        <td data-column="Product Name">Vacation to the water city of Portugal</td>
                        <td data-column="Price">$ 1150.00</td>
                        <td data-column="Quantity" className="count-input">
                          <div>
                            <a className="minus-btn" href="#"><i className="fa fa-minus"></i></a>
                            <input className="quantity" type="text" value="1" readOnly />
                            <a className="plus-btn" href="#"><i className="fa fa-plus"></i></a>
                          </div>
                        </td>
                        <td data-column="Sub Total">$ 1150.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Cart Actions */}
                <div className="updateArea">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="I have a discount coupon" />
                    <a href="#" className="outline-primary">apply coupon</a>
                  </div>
                  <a href="#" className="outline-primary update-btn">update cart</a>
                </div>
                {/* Cart Total */}
                <div className="totalAmountArea">
                  <ul className="list-unstyled">
                    <li><strong>Sub Total</strong> <span>$ 3400.00</span></li>
                    <li><strong>Vat</strong> <span>$ 18.00</span></li>
                    <li><strong>Grand Total</strong> <span className="grandTotal">$ 4012.00</span></li>
                  </ul>
                </div>
                {/* Checkout */}
                <div className="checkBtnArea text-right">
                  <a href="#" className="button-primary">checkout</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT GOES HERE */}

      {/* Back To Top Button */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>
      {/* Search Overlay */}
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

export default Tour_cart;


