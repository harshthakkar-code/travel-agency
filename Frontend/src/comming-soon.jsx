import React from "react";

const Comming_soon = () => (
  <div className="comming-soon-section" style={{ backgroundImage: "url(assets/images/404-img.jpg)" }}>
    <div className="container">
      <div className="comming-soon-wrap">
        <section className="site-identity">
          <h1 className="site-title">
            <a href="index.html">
              <img className="white-logo" src="assets/images/travele-logo.png" alt="logo" />
              <img className="black-logo" src="assets/images/travele-logo1.png" alt="logo" />
            </a>
          </h1>
        </section>
        <article className="comming-soon-content">
          <h2>WE ARE COMING SOON !!</h2>
          <h4>SOMETHING AWESOME IS IN THE WORKS.</h4>
        </article>
        <div className="time-counter-wrap">
          <div className="time-counter" data-date="2021-10-24 23:58:58">
            <div className="counter-time">
              <span className="counter-days">39</span>
              <span className="label-text">Days</span>
            </div>
            <div className="counter-time">
              <span className="counter-hours">10</span>
              <span className="label-text">Hours</span>
            </div>
            <div className="counter-time">
              <span className="counter-minutes">46</span>
              <span className="label-text">Minutes</span>
            </div>
            <div className="counter-time">
              <span className="counter-seconds">50</span>
              <span className="label-text">Seconds</span>
            </div>
          </div>
        </div>
        <div className="comming-soon-footer">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="com-contact-info">
                <ul>
                  <li>
                    <a href="#"><i className="fas fa-phone-alt"></i> (+984) 256 897 21</a>
                  </li>
                  <li>
                    <a href="#"><i className="fas fa-envelope"></i> <span>[email&#160;protected]</span></a>
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> San Francisco, USA
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="social-icons">
                <ul>
                  <li>
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="overlay"></div>
  </div>
);

export default Comming_soon;

