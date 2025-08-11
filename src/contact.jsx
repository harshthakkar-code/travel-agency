import React from "react";

const Contact = () => (
  <main id="content" className="site-main">
    {/* Inner Banner */}
    <section className="inner-banner-wrap">
      <div
        className="inner-baner-container"
        style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}
      >
        <div className="container">
          <div className="inner-banner-content">
            <h1 className="inner-title">Contact us</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>

    {/* Contact Form Section */}
    <div className="contact-page-section">
      <div className="contact-form-inner">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-md-6">
              <div className="contact-from-wrap">
                <div className="section-heading">
                  <h5 className="dash-style">GET IN TOUCH</h5>
                  <h2>CONTACT US TO GET MORE INFO</h2>
                  <p>
                    Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Esse? Aut nostrum, ornare quas provident laoreet nesciunt odio voluptates etiam, omnis.
                  </p>
                </div>
                <form className="contact-from">
                  <p>
                    <input type="text" name="name" placeholder="Your Name*" />
                  </p>
                  <p>
                    <input type="email" name="email" placeholder="Your Email*" />
                  </p>
                  <p>
                    <textarea rows="8" placeholder="Your Message*"></textarea>
                  </p>
                  <p>
                    <input type="submit" name="submit" value="SUBMIT MESSAGE" />
                  </p>
                </form>
              </div>
            </div>
            {/* Contact Details */}
            <div className="col-md-6">
              <div className="contact-detail-wrap">
                <h3>Need help ?? Feel free to contact us !</h3>
                <p>
                  Penatibus numquam? Non? Aliqua tempore est deserunt sequi itaque, nascetur, consequuntur conubianigp, explicabo? Primis convallis ullam. Egestas deserunt eius molestias app incididunt.
                </p>
                <p>
                  Nostra doloribus blandit et semper ultrices, quibusdam dignissimos! Netus recusandae, rerum cupidatat. Perferendis aptent wisi.
                </p>
                <div className="details-list">
                  <ul>
                    <li>
                      <span className="icon">
                        <i className="fas fa-map-signs"></i>
                      </span>
                      <div className="details-content">
                        <h4>Location Address</h4>
                        <span>411 D Avenue, San Francisco, CS 91950</span>
                      </div>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="fas fa-envelope-open-text"></i>
                      </span>
                      <div className="details-content">
                        <h4>Email Address</h4>
                        <span>
                          <a href="#">[email&#160;protected]</a>
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="fas fa-phone-volume"></i>
                      </span>
                      <div className="details-content">
                        <h4>Phone Number</h4>
                        <span>Telephone: 619-270-8578 / Mobile: +(911) 1987 123 88</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="contct-social social-links">
                  <h3>Follow us on social media..</h3>
                  <ul>
                    <li>
                      <a href="#"><i className="fab fa-facebook-f" aria-hidden="true"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End Contact Details */}
          </div>
        </div>
      </div>
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317838.95217734354!2d-0.27362819527326965!3d51.51107287614788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c7c7eb9be3%3A0x3918653583725b56!2sRiverside%20Building%2C%20County%20Hall%2C%20Westminster%20Bridge%20Rd%2C%20London%20SE1%207JA%2C%20UK!5e0!3m2!1sen!2snp!4v1632135241093!5m2!1sen!2snp"
          height="400"
          allowFullScreen
          loading="lazy"
          title="map"
        ></iframe>
      </div>
    </div>
    {/* End Contact Form Section */}
  </main>
);

export default Contact;
