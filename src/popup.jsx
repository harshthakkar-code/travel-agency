import React, { useState } from "react";

const Popup = () => {
  // Popup open state
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  return (
    <div id="page" className="full-page">
      {/* ===== HEADER ===== */}
      <header id="masthead" className="site-header header-primary">
        {/* ...Top header and nav structure exactly as previous components... */}
        {/* Omitted here for brevity; copy/paste from earlier JSX examples or use a <Header /> component */}
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main id="content" className="site-main">
        {/* Home slider section */}
        <section className="home-slider-section">
          <div className="home-slider">
            <div className="home-banner-items">
              <div className="banner-inner-wrap" style={{ backgroundImage: `url(/assets/images/slider-banner-1.jpg)` }}></div>
              <div className="banner-content-wrap">
                <div className="container">
                  <div className="banner-content text-center">
                    <h2 className="banner-title">TRAVELLING AROUND THE WORLD</h2>
                    <p>Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.</p>
                    <a href="#" className="button-primary">CONTINUE READING</a>
                  </div>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="home-banner-items">
              <div className="banner-inner-wrap" style={{ backgroundImage: `url(/assets/images/slider-banner-2.jpg)` }}></div>
              <div className="banner-content-wrap">
                <div className="container">
                  <div className="banner-content text-center">
                    <h2 className="banner-title">EXPERIENCE THE NATURE'S BEAUTY</h2>
                    <p>Taciti quasi, sagittis excepteur hymenaeos, id temporibus hic proident ullam, eaque donec delectus tempor consectetur nunc, purus congue? Rem volutpat sodales! Mollit. Minus exercitationem wisi.</p>
                    <a href="#" className="button-primary">CONTINUE READING</a>
                  </div>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer id="colophon" className="site-footer footer-primary">
        {/* ...Footer widgets, copy as in previous JSX... */}
      </footer>

      {/* Back to top */}
      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

      {/* Custom search form */}
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

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="popup-wraper" style={{ display: showPopup ? "block" : "none" }}>
          <div className="popup-inner">
            <div className="popup-content">
              <h2>TIPS FOR YOUR <br /> NEXT TRIP?</h2>
              <p>Subscribe to recieve latest update & offer!</p>
              <form>
                <input type="email" name="email" placeholder="Enter your email" />
                <button type="submit" className="button-primary">Subscribe</button>
              </form>
            </div>
            <div className="popup-image">
              <img src="/assets/images/img52.png" alt="" />
            </div>
            <div className="popup-close-btn">
              <a href="#" onClick={handleClosePopup}></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;

