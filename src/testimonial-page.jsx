import React from "react";

// Example testimonials data (put in a separate file if you want)
const testimonials = [
  {
    img: "/assets/images/img21.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Robert Holland",
    role: "Traveller",
  },
  {
    img: "/assets/images/img20.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "William Wright",
    role: "Traveller",
  },
  {
    img: "/assets/images/img22.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Alison Hobb",
    role: "Traveller",
  },
  {
    img: "/assets/images/img20.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Scott Harry",
    role: "Traveller",
  },
  {
    img: "/assets/images/img22.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Mary James",
    role: "Traveller",
  },
  {
    img: "/assets/images/img21.jpg",
    text: "Vulputate vulputate mauris primis viverra quis netus leo voluptates. Placerat, feugiat nascetur placerat pulvinar parturient dis quaerat facilisis? Dignisim felis pretium amet. Donec eros faucibus.",
    rating: 60,
    name: "Harry Smith",
    role: "Traveller",
  },
];

const Testimonial_Page = () => {
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
                <h1 className="inner-title">Testimonial</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>

        {/* Testimonials */}
        <div className="testimonial-page-section">
          <div className="container">
            <div className="row">
              {testimonials.map((t, idx) => (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <div className="testimonial-item text-center">
                    <figure className="testimonial-img">
                      <img src={t.img} alt={t.name} />
                    </figure>
                    <div className="testimonial-content">
                      <p>{t.text}</p>
                      <div className="start-wrap">
                        <div
                          className="rating-start"
                          title="Rated 5 out of 5"
                          style={{ position: "relative", display: "inline-block", width: "100px", height: "20px" }}
                        >
                          {/* You can improve this star rendering for accessibility */}
                          <span
                            style={{
                              display: "block",
                              width: `${t.rating}%`,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              color: "#ffc107",
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                            }}
                          >
                            ★★★★★
                          </span>
                          <span
                            style={{
                              color: "#e0e0e0",
                              display: "block",
                              width: "100%",
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                            }}
                          >
                            ★★★★★
                          </span>
                        </div>
                      </div>
                      <h3>{t.name}</h3>
                      <span>{t.role}</span>
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

export default Testimonial_Page;
