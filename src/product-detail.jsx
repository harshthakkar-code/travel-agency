import React from "react";
import Header from "./Header";


//SHOP SINGLE PAGE IN UI 

const Product_detail = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT */}
      <Header />

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap inner-banner-gray">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Product details</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Product Section */}
        <div className="product-outer-wrap product-wrap">
          <div className="product-inner-wrap">
            <div className="container">
              <div className="row align-items-center">
                {/* Product Images */}
                <div className="col-sm-6">
                  <div className="product-thumbnails">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div className="single-product-item" key={num}>
                        <figure className="feature-image">
                          <img src={`/assets/images/product${num}.jpg`} alt="" />
                        </figure>
                        <div className="image-search-icon">
                          <a
                            href={`/assets/images/product${num}.jpg`}
                            data-lightbox="lightbox-set"
                          >
                            <i className="fas fa-search"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="product-thumb-nav">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div className="single-product-item" key={num}>
                        <figure className="feature-image">
                          <img src={`/assets/images/product${num}.jpg`} alt="" />
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="col-sm-6">
                  <div className="product-summary">
                    <nav aria-label="breadcrumb" className="breadcrumb-content">
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item active">
                          <a href="#">Sleeping bag</a>
                        </li>
                      </ul>
                    </nav>
                    <h2>Camping tent</h2>
                    <div className="product-price">
                      <del>$15.68</del>
                      <ins>$14.00</ins>
                    </div>
                    <form className="cart-item">
                      <input type="number" name="quantity" defaultValue={1} />
                      <button className="button-primary">Add to cart</button>
                    </form>
                    <div className="product-meta">
                      <div className="cat-detail">
                        <strong>Categories:</strong>
                        <a href="#">Gear</a>
                        <a href="#">Wardrobe</a>
                      </div>
                      <div className="tag-detail">
                        <strong>Tags:</strong>
                        <a href="#">Equipment</a>
                        <a href="#">Travel kit</a>
                        <a href="#">Waterproof</a>
                        <a href="#">windproof</a>
                      </div>
                    </div>
                    <div className="product-desc">
                      <p>
                        Dolores iaculis cupidatat sapiente? Omnis condimentum vulputate facilisi in arcu adipiscing animi mollitia iste! Praesentium, quasi! Ullamcorper suspendisse! Adipiscing mauris. Vestibulum eos magni sociosqu, dignissimos officia! Iste mollis, diam lacus.
                      </p>
                      <p>
                        Sagittis sapien mattis nec, gravida corrupti nunc placeat. Voluptatum odit. Ea debitis nisi! In dolor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Tabs */}
          <div className="product-tab-outer">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="tab-container">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="overview-tab"
                          data-toggle="tab"
                          href="#overview"
                          role="tab"
                          aria-controls="overview"
                          aria-selected="true"
                        >
                          Description
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="add-info-tab"
                          data-toggle="tab"
                          href="#add-info"
                          role="tab"
                          aria-controls="add-info"
                          aria-selected="false"
                        >
                          Additional information
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="review-tab"
                          data-toggle="tab"
                          href="#review"
                          role="tab"
                          aria-controls="review"
                          aria-selected="false"
                        >
                          review
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      {/* Description Tab */}
                      <div
                        className="tab-pane fade show active"
                        id="overview"
                        role="tabpanel"
                        aria-labelledby="overview-tab"
                      >
                        <div className="overview-content">
                          <p>Corporis dui nunc soluta veniam illo. Rutrum cupidatat sapiente commodi augue dictum pulvinar sem! Sociis, vivamus molestias ut! Nonummy, purus. Ad reprehenderit. Corrupti scelerisque fuga felis dis consequatur anim magnam morbi soluta laudantium felis cubilia egestas! Amet suscipit. Tempor iusto. Officiis dictum laudantium rem consequat, neque eleifend sollicitudin, tortor vehicula.</p>
                          <p>Officia nulla tenetur perferendis, turpis cupiditate class nihil, minima. Nibh distinctio ullamco quae montes voluptatem iste ipsum similique, ridiculus. Euismod! Pulvinar ab natoque enim, quisque, magni rerum. Blanditiis, a phasellus potenti curae sunt litora tempore sint! Erat ratione quam proin. Scelerisque ducimus architecto odit feugiat egestas mollis blanditiis iure pede.</p>
                          <p>Sociosqu pretium repellendus ridiculus nam provident volutpat, consequatur ultricies duis diam, dapibus! Blanditiis sollicitudin tortor viverra suscipit fusce nostra dignissimos urna porta justo irure ea? Ut dis exercitationem, illo placerat? Enim primis aliquid proin ipsum aspernatur morbi ex suscipit! Augue. Platea similique, officiis sociis molestiae irure facilisi nisi. Eros molestias.</p>
                        </div>
                      </div>
                      {/* Additional Info Tab */}
                      <div
                        className="tab-pane"
                        id="add-info"
                        role="tabpanel"
                        aria-labelledby="add-info-tab"
                      >
                        <div className="accordion" id="accordion">
                          <table>
                            <tbody>
                              <tr>
                                <th>Weight</th>
                                <td>4 kg</td>
                              </tr>
                              <tr>
                                <th>Dimensions</th>
                                <td>100 × 45 × 15 cm</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Review Tab */}
                      <div
                        className="tab-pane"
                        id="review"
                        role="tabpanel"
                        aria-labelledby="review-tab"
                      >
                        <div className="comment-area">
                          <h3 className="comment-title">1 Reviews</h3>
                          <div className="comment-area-inner">
                            <ol>
                              <li>
                                <figure className="comment-thumb">
                                  <img src="/assets/images/img20.jpg" alt="" />
                                </figure>
                                <div className="comment-content">
                                  <div className="comment-header">
                                    <h5 className="author-name">Jaan Smith</h5>
                                    <span className="post-on">Jana 10 2020</span>
                                    <div className="rating-wrap">
                                      <div
                                        className="rating-start"
                                        title="Rated 5 out of 5"
                                      >
                                        <span></span>
                                      </div>
                                    </div>
                                  </div>
                                  <p>
                                    Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.
                                  </p>
                                  <a href="#" className="reply">
                                    <i className="fas fa-reply"></i>Reply
                                  </a>
                                </div>
                              </li>
                            </ol>
                          </div>
                          <div className="comment-form-wrap">
                            <h3 className="comment-title">Leave a Review</h3>
                            <p>Your email address will not be published. Required fields are marked *</p>
                            <form className="comment-form">
                              <div className="rate-wrap">
                                <label>Your rating</label>
                                <div className="procduct-rate">
                                  <span></span>
                                </div>
                              </div>
                              <p>
                                <label>Your review *</label>
                                <textarea rows="6"></textarea>
                              </p>
                              <p>
                                <label>Name *</label>
                                <input type="text" name="name" />
                              </p>
                              <p>
                                <label>Email *</label>
                                <input type="email" name="email" />
                              </p>
                              <p>
                                <input type="submit" name="submit" value="Submit" />
                              </p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Related Products */}
                  <div className="related-product">
                    <div className="related-title">
                      <h3>Related products</h3>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="product-item text-center">
                          <figure className="product-image">
                            <a href="#">
                              <img src="/assets/images/product2.jpg" alt="" />
                            </a>
                            <span className="onsale">Sale</span>
                          </figure>
                          <div className="product-content">
                            <h3>Jacket</h3>
                            <div className="product-price">
                              <del>$15.25</del>
                              <ins>$11.00</ins>
                            </div>
                            <a href="#" className="button-primary">
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="product-item text-center">
                          <figure className="product-image">
                            <a href="#">
                              <img src="/assets/images/product4.jpg" alt="" />
                            </a>
                          </figure>
                          <div className="product-content">
                            <h3>Flash light</h3>
                            <div className="product-price">
                              <del>$12.25</del>
                              <ins>$10.00</ins>
                            </div>
                            <a href="#" className="button-primary">
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
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
                    <aside className="widget widget_category_product_thumb colum-3">
                      <ul>
                        {["Wardrobe", "Shoes", "Gear"].map((cat, idx) => (
                          <li key={cat}>
                            <figure className="product-thumb">
                              <a href="#">
                                <img src="/assets/images/product8.jpg" alt="" />
                              </a>
                            </figure>
                            <div className="product-content">
                              <h5>{cat}</h5>
                              <span className="count">({[4, 2, 5][idx]})</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </aside>
                    <aside className="widget widget_product_post widget-product-thumb">
                      <h3 className="widget-title">Recent Product</h3>
                      <ul>
                        {[
                          {
                            name: "Brown boot",
                            img: "product8.jpg",
                            author: "Demoteam",
                            date: "August 17, 2021",
                          },
                          {
                            name: "Camping tent",
                            img: "product7.jpg",
                            author: "Demoteam",
                            date: "August 17, 2021",
                          },
                          {
                            name: "Combat shoe",
                            img: "product5.jpg",
                            author: "Demoteam",
                            date: "August 17, 2021",
                          },
                          {
                            name: "Flash light",
                            img: "product4.jpg",
                            author: "Demoteam",
                            date: "August 17, 2021",
                          },
                        ].map((item) => (
                          <li key={item.name}>
                            <figure className="product-thumb">
                              <a href="#">
                                <img src={`/assets/images/${item.img}`} alt="" />
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
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <figure className="gallery-item" key={num}>
                            <a href="#">
                              <img src={`/assets/images/product${num}.jpg`} alt="" />
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
        </div>
      </main>

      {/* FOOTER COMPONENT */}
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

export default Product_detail;



