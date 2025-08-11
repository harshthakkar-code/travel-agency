import React from "react";

// Example service data (you can map from an API instead)
const services = [
  {
    count: "01.",
    title: "Travel Insurance",
    desc: "Porro ipsum amet eiusmod, quae voluptate, architecto posuere risus imperdiet gravida porttitor, penatibus nemo dictumst quasi habitant ut mollit.",
    img: "/assets/images/img30.jpg",
  },
  {
    count: "02.",
    title: "Handpicked Hotels",
    desc: "Porro ipsum amet eiusmod, quae voluptate, architecto posuere risus imperdiet gravida porttitor, penatibus nemo dictumst quasi habitant ut mollit.",
    img: "/assets/images/img31.jpg",
  },
  {
    count: "03.",
    title: "Accessibility",
    desc: "Porro ipsum amet eiusmod, quae voluptate, architecto posuere risus imperdiet gravida porttitor, penatibus nemo dictumst quasi habitant ut mollit.",
    img: "/assets/images/img32.jpg",
  },
  {
    count: "04.",
    title: "24/7 Support",
    desc: "Porro ipsum amet eiusmod, quae voluptate, architecto posuere risus imperdiet gravida porttitor, penatibus nemo dictumst quasi habitant ut mollit.",
    img: "/assets/images/img33.jpg",
  },
];

const counters = [
  {
    img: "/assets/images/icon1.png",
    count: "500K+",
    label: "Satisfied Clients",
  },
  {
    img: "/assets/images/icon2.png",
    count: "250K+",
    label: "Awards Achieve",
  },
  {
    img: "/assets/images/icon3.png",
    count: "15K+",
    label: "Active Members",
  },
  {
    img: "/assets/images/icon4.png",
    count: "10K+",
    label: "Tour Destnation",
  },
];

const Service = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT */}
      {/* <Header /> */}

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Services</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Service Section */}
        <div className="service-page-section">
          <div className="container">
            <div className="row">
              {services.map((service, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="service-content-wrap">
                    <div className="service-content">
                      <div className="service-header">
                        <span className="service-count">{service.count}</span>
                        <h3>{service.title}</h3>
                      </div>
                      <p>{service.desc}</p>
                    </div>
                    <figure className="service-img">
                      <img src={service.img} alt={service.title} />
                    </figure>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Callback Section */}
        <div
          className="fullwidth-callback"
          style={{ backgroundImage: "url(/assets/images/img26.jpg)" }}
        >
          <div className="container">
            <div className="section-heading section-heading-white text-center">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <h5 className="dash-style">CALLBACK FOR MORE</h5>
                  <h2>GO TRAVEL.DISCOVER. REMEMBER US!!</h2>
                  <p>
                    Mollit voluptatem perspiciatis convallis elementum corporis quo
                    veritatis aliquid blandit, blandit torquent, odit placeat.
                    Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae
                    placeat.
                  </p>
                </div>
              </div>
            </div>
            <div className="callback-counter-wrap">
              {counters.map((item, idx) => (
                <div className="counter-item" key={idx}>
                  <div className="counter-item-inner">
                    <div className="counter-icon">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="counter-content">
                      <span className="counter-no">{item.count}</span>
                      <span className="counter-text">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT */}
      {/* <Footer /> */}

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

export default Service;
