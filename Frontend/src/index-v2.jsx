import React from "react";
import Header from "./Header";

const Index_v2 = () => (
  <main id="content" className="site-main">

    <Header />
    {/* Banner Section */}
    <section className="home-banner-section">
      <div className="home-banner-items">
        <div
          className="banner-inner-wrap"
          style={{ backgroundImage: "url(assets/images/slider-banner-2.jpg)" }}
        ></div>
        <div className="banner-content-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="banner-content section-heading section-heading-white">
                  <h5>EXPLORE. DISCOVER. TRAVEL</h5>
                  <h2 className="banner-title">JOURNEY TO EXPLORE NATURE</h2>
                  <div className="title-icon-divider">
                    <i className="fas fa-suitcase-rolling"></i>
                  </div>
                  <p>
                    Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.
                  </p>
                  <div className="slider-button">
                    <a href="#" className="button-primary">READ MORE</a>
                    <a href="#" className="button-secondary">SEE ALL OFFER</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                {/* Trip Search Section */}
                <div className="trip-search-section">
                  <div className="container">
                    <div className="trip-search-inner secondary-bg">
                      <div className="input-group width-col-1">
                        <label>Search Destination*</label>
                        <input type="text" placeholder="Enter Destination" />
                      </div>
                      <div className="input-group width-col-1">
                        <label>Pax Number*</label>
                        <input type="text" placeholder="No.of People" />
                      </div>
                      <div className="input-group width-col-1">
                        <label>Checkin Date*</label>
                        <i className="far fa-calendar"></i>
                        <input type="text" placeholder="MM / DD / YY" readOnly />
                      </div>
                      <div className="input-group width-col-1">
                        <label>Checkout Date*</label>
                        <i className="far fa-calendar"></i>
                        <input type="text" placeholder="MM / DD / YY" readOnly />
                      </div>
                      <div className="input-group width-col-1">
                        <label className="screen-reader-text">Search</label>
                        <input type="submit" value="INQUIRE NOW" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Trip Search */}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </section>

    {/* Destination Section */}
    <section className="destination-section">
      <div className="container">
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>POPULAR DESTINATION</h5>
              <h2>TOP NOTCH DESTINATION</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="destination-inner destination-four-column">
          <div className="row">
            {[
              { img: "img50.jpg", name: "Marina Ridge", loc: "NEW ZEALAND" },
              { img: "img11.jpg", name: "Santorini Island", loc: "GREECE" },
              { img: "img10.jpg", name: "Tibet Peak", loc: "TIBET" },
              { img: "img51.jpg", name: "Arctic Desert", loc: "NORWAY" },
            ].map((d, i) => (
              <div className="col-lg-3 col-sm-6" key={i}>
                <div className="desti-item text-center">
                  <figure className="desti-image">
                    <img src={`assets/images/${d.img}`} alt="" />
                    <div className="rating-start" title="Rated 5 out of 4">
                      <span style={{ width: "53%" }}></span>
                    </div>
                  </figure>
                  <div className="desti-content">
                    <h3>
                      <a href="#">{d.name}</a>
                    </h3>
                    <div className="meta-cat">
                      <a href="#">{d.loc}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-wrap text-center">
            <a href="#" className="button-primary">MORE DESTINATION</a>
          </div>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section className="home-about-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="about-img-wrap">
              <div className="about-img-left">
                <div className="about-content secondary-bg d-flex flex-wrap">
                  <h3>Something you want to know about us !!</h3>
                  <a href="#" className="button-primary">LEARN MORE</a>
                </div>
                <div className="about-img">
                  <img src="assets/images/img9.jpg" alt="" />
                </div>
              </div>
              <div className="about-img-right">
                <div className="about-img">
                  <img src="assets/images/img12.jpg" alt="" />
                </div>
                <div className="about-img">
                  <img src="assets/images/img34.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="banner-content section-heading">
              <h5>INTRODUCTION ABOUT US</h5>
              <h2 className="banner-title">ULTIMATE GUIDE TO EPIC ADVENTURE</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
              <p>Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Esse? Aut nostrum, ornare quas provident laoreet nesciunt odio voluptates etiam, omnis.</p>
            </div>
            <div className="about-service-container">
              {[
                { img: "icon15.png", title: "BEST PRICE GUARANTEED" },
                { img: "icon16.png", title: "AMAZING DESTINATION" },
                { img: "icon17.png", title: "PERSONAL SERVICES" },
              ].map((s, i) => (
                <div className="about-service" key={i}>
                  <div className="about-service-icon">
                    <img src={`assets/images/${s.img}`} alt="" />
                  </div>
                  <div className="about-service-content">
                    <h4>{s.title}</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Client Section */}
    <div className="client-section">
      <div className="container">
        <div className="client-wrap client-slider d-flex">
          {["logo7.png", "logo8.png", "logo9.png", "logo10.png", "logo11.png", "logo8.png"].map((logo, i) => (
            <div className="client-item" key={i}>
              <figure>
                <img src={`assets/images/${logo}`} alt="" />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Package Section */}
    <section className="package-section bg-light-grey">
      <div className="container">
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>EXPLORE GREAT PLACES</h5>
              <h2>POPULAR PACKAGES</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="package-inner package-inner-list">
          <div className="row">
              {/* <div className="package-inner package-inner-list">
                     <div className="row">
                        <div className="col-lg-6">
                           <div className="package-wrap package-wrap-list">
                              <figure className="feature-image">
                                 <a href="#">
                                    <img src="assets/images/img9.jpg" alt="" />
                                 </a>
                                 <div className="package-price">
                                    <h6>
                                       <span>$1,900 </span> / per person
                                    </h6>
                                 </div>
                                 <div className="package-meta text-center">
                                    <ul>
                                       <li>
                                          <i className="far fa-clock"></i>
                                          7D/6N
                                       </li>
                                       <li>
                                          <i className="fas fa-user-friends"></i>
                                          People: 5
                                       </li>
                                       <li>
                                          <i className="fas fa-map-marker-alt"></i>
                                          Malaysia
                                       </li>
                                    </ul>
                                 </div>
                              </figure>
                              <div className="package-content">
                                 <h3>
                                    <a href="#">Sunset view of beautiful lakeside</a>
                                 </h3>
                                 <div className="review-area">
                                    <span className="review-text">(25 reviews)</span>
                                    <div className="rating-start" title="Rated 5 out of 5">
                                       <span style="width: 60%"></span>
                                    </div>
                                 </div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.</p>
                                 <div className="btn-wrap">
                                    <a href="#" className="button-text width-6">Book Now<i className="fas fa-arrow-right"></i></a>
                                    <a href="#" className="button-text width-6">Wish List<i className="far fa-heart"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-6">
                           <div className="package-wrap package-wrap-list">
                              <figure className="feature-image">
                                 <a href="#">
                                    <img src="assets/images/img10.jpg" alt="" />
                                 </a>
                                 <div className="package-price">
                                    <h6>
                                       <span>$1,350 </span> / per person
                                    </h6>
                                 </div>
                                 <div className="package-meta text-center">
                                    <ul>
                                       <li>
                                          <i className="far fa-clock"></i>
                                          7D/6N
                                       </li>
                                       <li>
                                          <i className="fas fa-user-friends"></i>
                                          People: 5
                                       </li>
                                       <li>
                                          <i className="fas fa-map-marker-alt"></i>
                                          Malaysia
                                       </li>
                                    </ul>
                                 </div>
                              </figure>
                              <div className="package-content">
                                 <h3>
                                    <a href="#">Holiday to the Oxolotan River</a>
                                 </h3>
                                 <div className="review-area">
                                    <span className="review-text">(22 reviews)</span>
                                    <div className="rating-start" title="Rated 5 out of 5">
                                       <span style="width: 80%"></span>
                                    </div>
                                 </div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.</p>
                                 <div className="btn-wrap">
                                    <a href="#" className="button-text width-6">Book Now<i className="fas fa-arrow-right"></i></a>
                                    <a href="#" className="button-text width-6">Wish List<i className="far fa-heart"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-6">
                           <div className="package-wrap package-wrap-list">
                              <figure className="feature-image">
                                 <a href="#">
                                    <img src="assets/images/img11.jpg" alt="" />
                                 </a>
                                 <div className="package-price">
                                    <h6>
                                       <span>$1,000 </span> / per person
                                    </h6>
                                 </div>
                                 <div className="package-meta text-center">
                                    <ul>
                                       <li>
                                          <i className="far fa-clock"></i>
                                          7D/6N
                                       </li>
                                       <li>
                                          <i className="fas fa-user-friends"></i>
                                          People: 5
                                       </li>
                                       <li>
                                          <i className="fas fa-map-marker-alt"></i>
                                          Malaysia
                                       </li>
                                    </ul>
                                 </div>
                              </figure>
                              <div className="package-content">
                                 <h3>
                                    <a href="#">Experience the beauty of island</a>
                                 </h3>
                                 <div className="review-area">
                                    <span className="review-text">(22 reviews)</span>
                                    <div className="rating-start" title="Rated 5 out of 5">
                                       <span style="width: 80%"></span>
                                    </div>
                                 </div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.</p>
                                 <div className="btn-wrap">
                                    <a href="#" className="button-text width-6">Book Now<i className="fas fa-arrow-right"></i></a>
                                    <a href="#" className="button-text width-6">Wish List<i className="far fa-heart"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-6">
                           <div className="package-wrap">
                              <figure className="feature-image">
                                 <a href="#">
                                    <img src="assets/images/img9.jpg" alt="" />
                                 </a>
                                 <div className="package-price">
                                    <h6>
                                       <span>$1,100 </span> / per person
                                    </h6>
                                 </div>
                                 <div className="package-meta text-center">
                                    <ul>
                                       <li>
                                          <i className="far fa-clock"></i>
                                          7D/6N
                                       </li>
                                       <li>
                                          <i className="fas fa-user-friends"></i>
                                          People: 5
                                       </li>
                                       <li>
                                          <i className="fas fa-map-marker-alt"></i>
                                          Malaysia
                                       </li>
                                    </ul>
                                 </div>
                              </figure>
                              <div className="package-content">
                                 <h3>
                                    <a href="#">Vacation to water city of Portugal</a>
                                 </h3>
                                 <div className="review-area">
                                    <span className="review-text">(22 reviews)</span>
                                    <div className="rating-start" title="Rated 5 out of 5">
                                       <span style="width: 100%"></span>
                                    </div>
                                 </div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.</p>
                                 <div className="btn-wrap">
                                    <a href="#" className="button-text width-6">Book Now<i className="fas fa-arrow-right"></i></a>
                                    <a href="#" className="button-text width-6">Wish List<i className="far fa-heart"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="btn-wrap text-center">
                        <a href="#" className="button-primary">VIEW ALL PACKAGES</a>
                     </div>
                  </div> */}

                  <div className="package-inner package-inner-list">
      <div className="row">
        <div className="col-lg-6">
          <div className="package-wrap package-wrap-list">
            <figure className="feature-image">
              <a href="#">
                <img src="assets/images/img9.jpg" alt="" />
              </a>
              <div className="package-price">
                <h6>
                  <span>$1,900 </span> / per person
                </h6>
              </div>
              <div className="package-meta text-center">
                <ul>
                  <li>
                    <i className="far fa-clock"></i> 7D/6N
                  </li>
                  <li>
                    <i className="fas fa-user-friends"></i> People: 5
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Malaysia
                  </li>
                </ul>
              </div>
            </figure>
            <div className="package-content">
              <h3>
                <a href="#">Sunset view of beautiful lakeside</a>
              </h3>
              <div className="review-area">
                <span className="review-text">(25 reviews)</span>
                <div className="rating-start" title="Rated 5 out of 5">
                  <span style={{ width: "60%" }}></span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus
                nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.
              </p>
              <div className="btn-wrap">
                <a href="#" className="button-text width-6">
                  Book Now<i className="fas fa-arrow-right"></i>
                </a>
                <a href="#" className="button-text width-6">
                  Wish List<i className="far fa-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="package-wrap package-wrap-list">
            <figure className="feature-image">
              <a href="#">
                <img src="assets/images/img10.jpg" alt="" />
              </a>
              <div className="package-price">
                <h6>
                  <span>$1,350 </span> / per person
                </h6>
              </div>
              <div className="package-meta text-center">
                <ul>
                  <li>
                    <i className="far fa-clock"></i> 7D/6N
                  </li>
                  <li>
                    <i className="fas fa-user-friends"></i> People: 5
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Malaysia
                  </li>
                </ul>
              </div>
            </figure>
            <div className="package-content">
              <h3>
                <a href="#">Holiday to the Oxolotan River</a>
              </h3>
              <div className="review-area">
                <span className="review-text">(22 reviews)</span>
                <div className="rating-start" title="Rated 5 out of 5">
                  <span style={{ width: "80%" }}></span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus
                nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.
              </p>
              <div className="btn-wrap">
                <a href="#" className="button-text width-6">
                  Book Now<i className="fas fa-arrow-right"></i>
                </a>
                <a href="#" className="button-text width-6">
                  Wish List<i className="far fa-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="package-wrap package-wrap-list">
            <figure className="feature-image">
              <a href="#">
                <img src="assets/images/img11.jpg" alt="" />
              </a>
              <div className="package-price">
                <h6>
                  <span>$1,000 </span> / per person
                </h6>
              </div>
              <div className="package-meta text-center">
                <ul>
                  <li>
                    <i className="far fa-clock"></i> 7D/6N
                  </li>
                  <li>
                    <i className="fas fa-user-friends"></i> People: 5
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Malaysia
                  </li>
                </ul>
              </div>
            </figure>
            <div className="package-content">
              <h3>
                <a href="#">Experience the beauty of island</a>
              </h3>
              <div className="review-area">
                <span className="review-text">(22 reviews)</span>
                <div className="rating-start" title="Rated 5 out of 5">
                  <span style={{ width: "80%" }}></span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus
                nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.
              </p>
              <div className="btn-wrap">
                <a href="#" className="button-text width-6">
                  Book Now<i className="fas fa-arrow-right"></i>
                </a>
                <a href="#" className="button-text width-6">
                  Wish List<i className="far fa-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="package-wrap">
            <figure className="feature-image">
              <a href="#">
                <img src="assets/images/img9.jpg" alt="" />
              </a>
              <div className="package-price">
                <h6>
                  <span>$1,100 </span> / per person
                </h6>
              </div>
              <div className="package-meta text-center">
                <ul>
                  <li>
                    <i className="far fa-clock"></i> 7D/6N
                  </li>
                  <li>
                    <i className="fas fa-user-friends"></i> People: 5
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Malaysia
                  </li>
                </ul>
              </div>
            </figure>
            <div className="package-content">
              <h3>
                <a href="#">Vacation to water city of Portugal</a>
              </h3>
              <div className="review-area">
                <span className="review-text">(22 reviews)</span>
                <div className="rating-start" title="Rated 5 out of 5">
                  <span style={{ width: "100%" }}></span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit luctus
                nec ullam. Ut elit tellus, luctus nec ullam elit tellpus.
              </p>
              <div className="btn-wrap">
                <a href="#" className="button-text width-6">
                  Book Now<i className="fas fa-arrow-right"></i>
                </a>
                <a href="#" className="button-text width-6">
                  Wish List<i className="far fa-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

            {/* Repeat for each package - keep static or map */}
            {/* ... */}
            {/* This is a direct conversion; you can modularize as you need */}
            {/* ... */}
          </div>
          <div className="btn-wrap text-center">
            <a href="#" className="button-primary">VIEW ALL PACKAGES</a>
          </div>
        </div>
      </div>
    </section>

    {/* Activity Section */}
    <section
      className="activity-section activity-bg-image"
      style={{ backgroundImage: "url(assets/images/img29.jpg)" }}
    >
      <div className="container">
        <div className="section-heading section-heading-white text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>EXPLORE GREAT PLACES</h5>
              <h2>POPULAR PACKAGES</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="activity-inner row">
          {[
            { img: "img44.png", name: "Adventure", dest: 15 },
            { img: "img45.png", name: "Trekking", dest: 12 },
            { img: "img46.png", name: "Camp Fire", dest: 7 },
            { img: "img47.png", name: "Off Road", dest: 15 },
            { img: "img48.png", name: "Camping", dest: 13 },
            { img: "img49.png", name: "Exploring", dest: 25 },
          ].map((a, i) => (
            <div className="col-lg-2 col-md-4 col-6" key={i}>
              <div className="activity-item">
                <div className="activity-icon">
                  <a href="#"><img src={`assets/images/${a.img}`} alt="" /></a>
                </div>
                <div className="activity-content">
                  <h4>
                    <a href="#">{a.name}</a>
                  </h4>
                  <p>{a.dest} Destination</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Choice Section */}
    <section className="choice-section">
      <div className="container">
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>JOURNEY IS FUN</h5>
              <h2>TRAVELLER'S BEST CHOICE</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="choice-slider">
          {[
            { img: "img28.jpg", title: "Holiday to the Oxolotan River", text: "Maiores ab tempora deserunt quidem augue repellendus eleifend? Elementum sapien eu dis, rutrum augue nesciunt dolore viverra nec aspernatur proident eius porttitor faucibus netus? Maiores." },
            { img: "img29.jpg", title: "Couple vacation to Malaysia", text: "Maiores ab tempora deserunt quidem augue repellendus eleifend? Elementum sapien eu dis, rutrum augue nesciunt dolore viverra nec aspernatur proident eius porttitor faucibus netus? Maiores." },
          ].map((c, i) => (
            <div className="choice-slider-item" style={{ backgroundImage: `url(assets/images/${c.img})` }} key={i}>
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="choice-slider-content text-center">
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    <a href="#" className="button-primary">BOOK NOW</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Special Section */}
    <section className="special-section">
      <div className="container">
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>TRAVEL OFFER & DISCOUNT</h5>
              <h2>SPECIAL TRAVEL OFFER</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="special-inner mt-0">
          <div className="row">
            {[
              { img: "img11.jpg", cat: "MALAYSIA", title: "Sunset view of beautiful lakeside city" },
              { img: "img10.jpg", cat: "NEW ZEALAND", title: "Trekking to the mountain camp site" },
              { img: "img9.jpg", cat: "CANADA", title: "Experience the natural beauty of glacier" },
            ].map((s, i) => (
              <div className="col-sm-6 col-lg-4" key={i}>
                <div className="special-overlay-inner">
                  <div className="special-overlay-item">
                    <figure className="special-img">
                      <img src={`assets/images/${s.img}`} alt="" />
                      <div className="badge-dis">
                        <span>
                          <strong>15%</strong> off
                        </span>
                      </div>
                    </figure>
                    <div className="special-content">
                      <div className="meta-cat">
                        <a href="#">{s.cat}</a>
                      </div>
                      <h3>
                        <a href="#">{s.title}</a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Subscribe Section */}
    <section
      className="subscribe-section subscribe-bg-image"
      style={{ backgroundImage: "url(assets/images/img16.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="section-heading section-heading-white pr-40">
              <h5>TRAVEL OFFER & DISCOUNT</h5>
              <h2>HOLIDAY SPECIAL 25% OFF !</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
              <h4>
                Sign up now to recieve hot special offers and information about the best tour packages, updates and discounts !!
              </h4>
              <div className="newsletter-form">
                <form>
                  <input type="email" placeholder="Your Email Address" />
                  <input type="submit" value="SIGN UP NOW!" />
                </form>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus.</p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="progress-wrap">
              {/* These circles are for UI only; JS logic not included here */}
              {[
                { value: "85%", label: "Satisfied clients" },
                { value: "75%", label: "Reasonable price" },
                { value: "70%", label: "Best destination" },
                { value: "90%", label: "Positive reviews" },
              ].map((p, i) => (
                <div className="progress-inner" key={i}>
                  <div className="progress-circle">
                    <span className="circle-left">
                      <span className="circle-bar"></span>
                    </span>
                    <span className="circle-right">
                      <span className="circle-bar"></span>
                    </span>
                    <div className="progress-value">{p.value}</div>
                  </div>
                  <h4>{p.label}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section className="team-section">
      <div className="container">
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>TEAM MEMBERS</h5>
              <h2>OUR TOUR GUIDE</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {[
            { img: "img38.jpg", name: "Sony Madison", role: "Travel Agent" },
            { img: "img42.jpg", name: "Alison White", role: "Travel Guide" },
            { img: "img43.jpg", name: "William Hobb", role: "Travel Guide" },
            { img: "img39.jpg", name: "Jennie Bennett", role: "Travel Guide" },
          ].map((t, i) => (
            <div className="col-lg-3 col-sm-6" key={i}>
              <div className="team-item">
                <figure className="team-image">
                  <img src={`assets/images/${t.img}`} alt="" />
                </figure>
                <div className="team-content">
                  <div className="heading-wrap">
                    <h3>{t.name}</h3>
                    <h5>{t.role}</h5>
                  </div>
                  <div className="social-links">
                    <ul>
                      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Blog Section */}
    <section className="blog-section">
      <div className="container">
        <div className="section-heading text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5>FROM OUR BLOG</h5>
              <h2>OUR RECENT POSTS</h2>
              <div className="title-icon-divider">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {[
            { img: "img17.jpg", title: "Life is a beautiful journey not a destination" },
            { img: "img18.jpg", title: "Take only memories, leave only footprints" },
            { img: "img19.jpg", title: "Journeys are best measured in new friends" },
          ].map((b, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <article className="post">
                <figure className="feature-image">
                  <a href="#"><img src={`assets/images/${b.img}`} alt="" /></a>
                </figure>
                <div className="entry-content">
                  <h3>
                    <a href="#">{b.title}</a>
                  </h3>
                  <div className="entry-meta">
                    <span className="byline">
                      <a href="#">Demoteam</a>
                    </span>
                    <span className="posted-on">
                      <a href="#">August 17, 2021</a>
                    </span>
                    <span className="comments-link">
                      <a href="#">No Comments</a>
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Callback Section */}
    <section
      className="bg-img-callback"
      style={{ backgroundImage: "url(assets/images/img26.jpg)" }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-9 col-md-8">
            <div className="callback-content">
              <h2>JOIN US FOR MORE UPDATE !!</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="button-wrap">
              <a href="#" className="button-primary">LEARN MORE</a>
            </div>
          </div>
        </div>
      </div>
    </section>

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
  </main>
);

export default Index_v2;



