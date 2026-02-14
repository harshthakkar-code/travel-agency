import React from "react";
import Header from "./Header";

const Faq = () => (
  <main id="content" className="site-main">

      <Header />
    {/* Inner Banner */}
    <section className="inner-banner-wrap">
      <div
        className="inner-baner-container"
        style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}
      >
        <div className="container">
          <div className="inner-banner-content">
            <h1 className="inner-title">Faq</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>

    {/* FAQ Section */}
    <div className="faq-page-section">
      <div className="container">
        <div className="faq-page-container">
          <div className="row">
            {/* Left Accordion */}
            <div className="col-lg-6">
              <div className="faq-content-wrap">
                <div className="section-heading">
                  <h5 className="dash-style">ANY QUESTIONS</h5>
                  <h2>FREQUENTLY ASKED QUESTIONS</h2>
                  <p>
                    Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. Nostrud. Esse? Aut nostrum, ornare quas provident laoreet nesciunt odio voluptates etiam, omnis.
                  </p>
                </div>
                <div className="accordion" id="accordionOne">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h4 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          HOW WE BECAME BEST AMONG OTHERS?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionOne">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingTwo">
                      <h4 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          WHAT WE OFFER TO YOU?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionOne">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingThree">
                      <h4 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          HOW WE PROVIDE SERVICES FOR YOU?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionOne">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingFour">
                      <h4 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                          ARE WE AFFORDABLE TO HIRE?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionOne">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Form */}
            <div className="col-lg-6">
              <div className="qsn-form-container">
                <h3>STILL HAVE A QUESTION?</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullam corper</p>
                <form>
                  <p>
                    <input type="text" name="name" placeholder="Your Name*" />
                  </p>
                  <p>
                    <input type="email" name="email" placeholder="Your Email*" />
                  </p>
                  <p>
                    <input type="number" name="number" placeholder="Your Number*" />
                  </p>
                  <p>
                    <textarea rows="8" placeholder="Enter your message"></textarea>
                  </p>
                  <p>
                    <input type="submit" name="submit" value="SUBMIT QUESTIONS" />
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonial & Right Accordion */}
        <div className="faq-page-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="faq-testimonial">
                <figure className="faq-image">
                  <img src="assets/images/img37.jpg" alt="" />
                </figure>
                <div className="testimonial-content">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </span>
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-wrap pl-20">
                <div className="section-heading">
                  <h5 className="dash-style">QUESTIONS/ANSWERS</h5>
                  <h2>BENEFITS & WHAT WE DO?</h2>
                </div>
                <div className="accordion" id="accordionTwo">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h4 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2">
                          HOW DO YOU MANAGE TO TRAVEL THE WORLD?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseOne2" className="collapse" aria-labelledby="headingOne" data-parent="#accordionTwo">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingTwo">
                      <h4 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                          HOW DID YOU MANAGE YOUR CLIENTS?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseTwo2" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionTwo">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingThree">
                      <h4 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                          HOW TO TRAVEL WITH YOUR TIPS?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseThree2" className="collapse" aria-labelledby="headingThree" data-parent="#accordionTwo">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingFour">
                      <h4 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour2" aria-expanded="false" aria-controls="collapseFour2">
                          WHAT LOW BUDGET DESTINATIONS DO YOU RECOMMEND?
                        </button>
                      </h4>
                    </div>
                    <div id="collapseFour2" className="collapse" aria-labelledby="headingFour" data-parent="#accordionTwo">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
    {/* End FAQ Section */}
  </main>
);

export default Faq;
