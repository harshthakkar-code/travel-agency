import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Page404 = () => (
  <div id="page" className="full-page">
    {/* --- Header (should ideally be a separate component) --- */}
    <Header />

    {/* --- 404 Content --- */}
    <main id="content" className="site-main">
      <div
        className="no-content-section 404-page"
        style={{ backgroundImage: "url(assets/images/404-img.jpg)" }}
      >
        <div className="container">
          <div className="no-content-wrap">
            <span>404</span>
            <h1>Oops! That page can't be found</h1>
            <h4>
              It looks like nothing was found at this location. Maybe the page you
              are looking for was removed, renamed or might never existed.
            </h4>
            <div className="search-form-wrap">
              {/* <form className="search-form">
                <input type="text" name="search" placeholder="Search..." />
                <button className="search-btn"><i className="fas fa-search"></i></button>
              </form> */}
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </main>

    {/* --- Footer (can also be a separate component) --- */}
    <Footer />

    {/* Custom search field overlay */}
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

export default Page404;
