import React from "react";
import Header from "./Header";

const products = [
  {
    id: 1,
    name: "Sleeping bag",
    image: "/assets/images/product1.jpg",
    oldPrice: "$15.68",
    price: "$14.00",
    onsale: true,
  },
  {
    id: 2,
    name: "Jacket",
    image: "/assets/images/product2.jpg",
    oldPrice: "$15.25",
    price: "$11.00",
    onsale: false,
  },
  {
    id: 3,
    name: "Hammock",
    image: "/assets/images/product3.jpg",
    price: "$10.00",
    onsale: false,
  },
  {
    id: 4,
    name: "Flash light",
    image: "/assets/images/product4.jpg",
    oldPrice: "$12.25",
    price: "$10.00",
    onsale: true,
  },
  {
    id: 5,
    name: "Combat shoe",
    image: "/assets/images/product5.jpg",
    oldPrice: "$15.68",
    price: "$14.00",
    onsale: true,
  },
  {
    id: 6,
    name: "Portable gas",
    image: "/assets/images/product6.jpg",
    price: "$25.00",
    onsale: true,
  },
  {
    id: 7,
    name: "Camping tent",
    image: "/assets/images/product7.jpg",
    price: "$11.00",
    onsale: false,
  },
  {
    id: 8,
    name: "Brown boot",
    image: "/assets/images/product8.jpg",
    price: "$8.00",
    onsale: false,
  },
];

const categories = [
  { name: "Wardrobe", count: 4 },
  { name: "Shoes", count: 2 },
  { name: "Gear", count: 5 },
];

const recentProducts = [
  {
    name: "Brown boot",
    image: "/assets/images/product8.jpg",
    author: "Demoteam",
    date: "August 17, 2021",
  },
  {
    name: "Camping tent",
    image: "/assets/images/product7.jpg",
    author: "Demoteam",
    date: "August 17, 2021",
  },
  {
    name: "Combat shoe",
    image: "/assets/images/product5.jpg",
    author: "Demoteam",
    date: "August 17, 2021",
  },
  {
    name: "Flash light",
    image: "/assets/images/product4.jpg",
    author: "Demoteam",
    date: "August 17, 2021",
  },
];

const galleryImages = [
  "/assets/images/product1.jpg",
  "/assets/images/product2.jpg",
  "/assets/images/product3.jpg",
  "/assets/images/product4.jpg",
  "/assets/images/product5.jpg",
  "/assets/images/product6.jpg",
];

const Product_right = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT */}
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
                <h1 className="inner-title">Archives: Products</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Product Section */}
        <div className="product-outer-wrap product-wrap">
          <div className="container">
            <div className="row">
              {/* Product List */}
              <div className="col-lg-8 right-sidebar">
                <div className="product-notices-wrapper">
                  <p className="product-result-count">Showing all 8 results</p>
                  <form method="get">
                    <select
                      name="orderby"
                      className="orderby"
                      aria-label="Shop order"
                      defaultValue="menu_order"
                    >
                      <option value="menu_order">Default sorting</option>
                      <option value="popularity">Sort by popularity</option>
                      <option value="rating">Sort by average rating</option>
                      <option value="date">Sort by latest</option>
                      <option value="price">Sort by price: low to high</option>
                      <option value="price-desc">
                        Sort by price: high to low
                      </option>
                    </select>
                  </form>
                </div>
                <div className="product-item-wrapper">
                  <div className="row">
                    {products.map((p) => (
                      <div className="col-sm-6" key={p.id}>
                        <div className="product-item text-center">
                          <figure className="product-image">
                            <a href="#">
                              <img src={p.image} alt={p.name} />
                            </a>
                            {p.onsale && <span className="onsale">Sale</span>}
                          </figure>
                          <div className="product-content">
                            <h3>{p.name}</h3>
                            <div className="product-price">
                              {p.oldPrice && <del>{p.oldPrice}</del>}
                              <ins>{p.price}</ins>
                            </div>
                            <a href="#" className="button-primary">
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="post-navigation-wrap">
                    <nav>
                      <ul className="pagination">
                        <li>
                          <a href="#">
                            <i className="fas fa-arrow-left"></i>
                          </a>
                        </li>
                        <li className="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-arrow-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Sidebar */}
              <div className="col-lg-4">
                <div className="sidebar">
                  <aside className="widget search_widget">
                    <form>
                      <input type="text" name="search" placeholder="Search.." />
                      <button className="search-btn">
                        <i className="fas fa-search"></i>
                      </button>
                    </form>
                  </aside>
                  <aside className="widget price_handel_widget">
                    <h3 className="widget-title">Filter Price</h3>
                    <form className="price-handel">
                      <div id="slider-range"></div>
                      <div className="price-amout">
                        <button type="submit" className="button-primary">
                          Filter
                        </button>
                        <div className="price-label">
                          <span className="symbol">$</span>
                          <input
                            type="text"
                            id="maxAmount"
                            readOnly
                            value=""
                          />
                        </div>
                      </div>
                    </form>
                  </aside>
                  <aside className="widget widget_category_product_thumb colum-3">
                    <ul>
                      {categories.map((cat) => (
                        <li key={cat.name}>
                          <figure className="product-thumb">
                            <a href="#">
                              <img src="/assets/images/product8.jpg" alt={cat.name} />
                            </a>
                          </figure>
                          <div className="product-content">
                            <h5>{cat.name}</h5>
                            <span className="count">({cat.count})</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </aside>
                  <aside className="widget widget_product_post widget-product-thumb">
                    <h3 className="widget-title">Recent Product</h3>
                    <ul>
                      {recentProducts.map((item) => (
                        <li key={item.name}>
                          <figure className="product-thumb">
                            <a href="#">
                              <img src={item.image} alt={item.name} />
                            </a>
                          </figure>
                          <div className="product-content">
                            <h5>
                              <a href="#">{item.name}</a>
                            </h5>
                            <div className="entry-meta">
                              <span className="byline">
                                <a href="#">{item.author}</a>
                              </span>
                              <span className="posted-on">
                                <a href="#">{item.date}</a>
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </aside>
                  <aside className="widget widget_gallery">
                    <h3 className="widget-title">Product Gallery</h3>
                    <div className="gallery gallery-colum-3">
                      {galleryImages.map((src, i) => (
                        <figure className="gallery-item" key={src}>
                          <a href="#">
                            <img src={src} alt="" />
                          </a>
                        </figure>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT */}
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

export default Product_right;


