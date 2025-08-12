import React from "react";
import Header from "./Header";

const Single_page = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT GOES HERE (reuse for all pages) */}
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
                <h1 className="inner-title">Single page</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>
        {/* Single Page Content */}
        <div className="single-page-section">
          <div className="container">
            <figure className="single-feature-img">
              <img src="/assets/images/img31.jpg" alt="" />
            </figure>
            <div className="page-content">
              <p>
                Amet orci, nibh blanditiis tempor soluta bibendum, omnis dictumst
                eiusmod felis mollis porta molestiae, laborum fugiat, phasellus
                minim labore habitasse culpa dignissimos? Distinctio molestias!
                Incididunt pede nostra mollit quam quaerat voluptas similique
                accumsan quae accusantium aliqua illum faucibus amet voluptatum
                natoque sodales. Proident facilisis, atque impedit ullam
                recusandae ducimus quisquam faucibus dolorum nibh neque libero,
                laudantium harum labore facilis proident nec doloribus netus.
                Posuere accusamus nam repudiandae, tincidunt! Id doloribus tempus
                potenti adipiscing deleniti nemo! Vel, tortor eiusmod omnis
                molestie sint quisque mollitia molestiae et! Veniam mollitia
                adipisci, anim eligendi? Turpis laborum leo quisque eos! Suspen
                sectetuer proident ex nostrud, ratione.
              </p>
              <p>
                Amet orci, nibh blanditiis tempor soluta bibendum, omnis dictumst
                eiusmod felis mollis porta molestiae, laborum fugiat, phasellus
                minim labore habitasse culpa dignissimos? Distinctio molestias!
                Incididunt pede nostra mollit quam quaerat voluptas similique
                accumsan quae accusantium aliqua illum faucibus amet voluptatum
                natoque sodales. Laboris justo dolorem deserunt consectetur
                ultricies tortor cum tenetur ducimus occaecati imperdiet enim mus
                ab arcu. Taciti euismod metpus!
              </p>
              <ul>
                <li>
                  Purus sequi accusamus? Nibh aut perspiciatis, lorem lorem
                  perspiciatis.
                </li>
                <li>
                  Dictum? Posuere cumque sed illum facilisis leo illum facilisis.
                </li>
                <li>
                  Neque officiis feugiat praesentium qui, aliqua hic commodo
                  praesentium.
                </li>
                <li>
                  Asperiores irure class lobortis veritatis, alias sem lobortis
                  veritatis.
                </li>
                <li>
                  Ipsum eros quaerat deserunt proin porttitor, fugit ultrices.
                </li>
                <li>
                  Volutpat, justo mollit ullamco sagittis duis enim labore,
                  ullamcorper dicta
                </li>
              </ul>
              <p>
                Sequi sociis leo, interdum eos ipsa pharetra, unde fringilla erat
                vulputate litora nisl adipisicing primis consectetuer erat aliqua
                reprehenderit unde accusamus earum sollicitudin voluptatum wisi
                vulputate deleniti, accusamus, animi rutrum. Labore et! Odit,
                nunc nostra, excepturi dui netus, euismod pariatur? Proin vivamus
                diamlorem natoque reprehenderit vivamus diamlorem natpo.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT GOES HERE (reuse for all pages) */}
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

export default Single_page;

