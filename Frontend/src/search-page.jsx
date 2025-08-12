import React from "react";
import Header from "./Header";

const searchResults = [
  {
    title: "Life is a beautiful journey not a destination",
    author: "Demoteam",
    date: "August 17, 2021",
    comments: "No Comments",
    desc:
      "Praesent, risus adipisicing donec! Cras. Lobortis id aliquip taciti repudiandae porro dolore facere officia! Natoque mollitia ultrices convallis nisl suscipit",
  },
  {
    title: "Tips To Reduce Your Travel Costs",
    author: "Admin",
    date: "Dec 15, 2019",
    comments: "Comment",
    desc:
      "Interdum veritatis quas minus eligendi urna eius, ea platea. Neque aut, eiusmod, ",
  },
  {
    title: "Tips To Reduce Your Travel Costs",
    desc:
      "Interdum veritatis quas minus eligendi urna eius, ea platea. Neque aut, eiusmod, ",
  },
  {
    title: "Sleeping bag",
    author: "Demoteam",
    date: "August 17, 2021",
    comments: "No Comments",
    desc:
      "Augue senectus quisque, repellat deserunt fugiat! Quasi nostra montes tellus montes? Cumque vivamus laborum, expedita quis exercitationem eiusmod. Illo orci ullamcorper! Augue senectus quisque, repellat deserunt fugiat! Quasi nostra montes tellus montes? Cumque vivamus laborum, expedita quis exercitationem eiusmod. Illo orci ullamcorper!",
  },
  {
    title: "Portable gas",
    desc:
      "Augue senectus quisque, repellat deserunt fugiat! Quasi nostra montes tellus montes? Cumque vivamus laborum, expedita quis exercitationem eiusmod. Illo orci ullamcorper! Augue senectus quisque, repellat deserunt fugiat! Quasi nostra montes tellus montes? Cumque vivamus laborum, expedita quis exercitationem eiusmod. Illo orci ullamcorper!",
  },
  {
    title: "Single page",
    author: "Demoteam",
    date: "August 17, 2021",
    comments: "No Comments",
    desc:
      "Amet orci, nibh blanditiis tempor soluta bibendum, omnis dictumst eiusmod felis mollis porta molestiae, laborum fugiat, phasellus minim labore habitasse",
  },
];

const Search_page = () => {
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
                <h1 className="inner-title">Search Result</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Search Results Section */}
        <div className="search-section">
          <div className="container">
            <div className="search-outer-wrap">
              <div className="row grid">
                {searchResults.map((item, idx) => (
                  <div className="col-lg-4 grid-item" key={idx}>
                    <div className="search-content-wrap">
                      <article className="post">
                        <div className="entry-content">
                          <h3 className="entry-title">
                            <a href="#">{item.title}</a>
                          </h3>
                          {item.author && (
                            <div className="entry-meta">
                              <span className="byline">
                                <a href="#">{item.author}</a>
                              </span>
                              {item.date && (
                                <span className="posted-on">
                                  <a href="#">{item.date}</a>
                                </span>
                              )}
                              {item.comments && (
                                <span className="comments-link">
                                  <a href="#">{item.comments}</a>
                                </span>
                              )}
                            </div>
                          )}
                          <div className="entry-text">
                            <p>{item.desc}</p>
                          </div>
                          <div className="button-container">
                            <a href="#" className="button-text">
                              Read More
                            </a>
                          </div>
                        </div>
                      </article>
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
              {/* Search Again Section */}
              <div className="content-search-from">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3 text-center">
                    <h4>Didn't find what you are looking for?</h4>
                    <h2>SEARCH AGAIN !!</h2>
                    <form className="search-form">
                      <input type="text" name="search" placeholder="Search.." />
                      <button className="search-btn">
                        <i className="fas fa-search"></i>
                      </button>
                    </form>
                  </div>
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

export default Search_page;

