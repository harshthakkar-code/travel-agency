import React from "react";

const Career_detail = () => (
  <div id="page" className="full-page">
    {/* Header - import as a component for real project */}
    <header id="masthead" className="site-header header-primary">
      {/* ...reuse your navigation/header component here... */}
    </header>

    <main id="content" className="site-main">
      {/* Inner Banner */}
      <section className="inner-banner-wrap">
        <div
          className="inner-baner-container"
          style={{ backgroundImage: "url(assets/images/inner-banner.jpg)" }}
        >
          <div className="container">
            <div className="inner-banner-content">
              <h1 className="inner-title">Career Detail</h1>
            </div>
          </div>
        </div>
        <div className="inner-shape"></div>
      </section>

      <div className="career-detail-section">
        <div className="career-detail-inner">
          <div className="container">
            <div className="row">
              {/* Main content */}
              <div className="col-lg-8">
                <div className="job-description">
                  <ul>
                    <li>
                      <span>Post :</span>
                      <h4>Travel guide</h4>
                    </li>
                    <li>
                      <span>Time :</span>
                      <h4>Full Time</h4>
                    </li>
                    <li>
                      <span>Salary :</span>
                      <h4>Negotiable</h4>
                    </li>
                    <li>
                      <span>No. of Vacancy :</span>
                      <h4>8</h4>
                    </li>
                  </ul>
                  <figure className="job-imgage">
                    <img src="assets/images/img33.jpg" alt="" />
                  </figure>
                </div>
                {/* Tab Container */}
                <div className="tab-container">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">
                        Job Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="experience-tab" data-toggle="tab" href="#experience" role="tab" aria-controls="experience" aria-selected="false">
                        Experience & Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="requirement-tab" data-toggle="tab" href="#requirement" role="tab" aria-controls="requirement" aria-selected="false">
                        Requirement
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                      <div className="overview-content">
                        <p>Reprehenderit hic bibendum repellendus, repellat auctor! Integer temporibus, facilisis iaculis alias senectus, non quam molestiae incidunt cubilia, fuga? ...</p>
                        <ul>
                          <li>Nunc minima aspernatur dignissimos, sit adipiscing? Cupidatat cursus.</li>
                          <li>Netus donec justo mauris etiam velit.</li>
                          <li>Quis dolorum habitasse accusantium hic consequat.</li>
                          <li>Mus quasi aute non, at, saepe? Commodi sodales aliquam voluptatum.</li>
                          <li>Adipisicing ullamcorper dapibus, consequatur itaque eros orci odio.</li>
                          <li>Lobortis facere accusamus nemo, ipsum ad morbi.</li>
                          <li>Netus donec justo mauris etiam velit.</li>
                          <li>Quis dolorum habitasse accusantium hic consequat.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-pane" id="experience" role="tabpanel" aria-labelledby="experience-tab">
                      <div className="experience-content">
                        <h5>#OVERVIEW</h5>
                        <p>Reprehenderit hic bibendum repellendus, repellat auctor! Integer temporibus, facilisis iaculis alias senectus...</p>
                        <h5>#EXPERIENCE</h5>
                        <ul>
                          <li>Nunc minima aspernatur dignissimos, sit adipiscing? Cupidatat cursus.</li>
                          <li>Netus donec justo mauris etiam velit.</li>
                          <li>Quis dolorum habitasse accusantium hic consequat.</li>
                          <li>Mus quasi aute non, at, saepe? Commodi sodales aliquam voluptatum.</li>
                          <li>Adipisicing ullamcorper dapibus, consequatur itaque eros orci odio.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-pane" id="requirement" role="tabpanel" aria-labelledby="requirement-tab">
                      <div className="requirement-content">
                        <p>
                          Culpa cupidatat occaecat neque hic sollicitudin provident nascetur felis, sollicitudin nonummy class explicabo litora sed...
                        </p>
                        <ul>
                          <li>Nunc minima aspernatur dignissimos, sit adipiscing? Cupidatat cursus.</li>
                          <li>Netus donec justo mauris etiam velit.</li>
                          <li>Quis dolorum habitasse accusantium hic consequat.</li>
                          <li>Mus quasi aute non, at, saepe? Commodi sodales aliquam voluptatum.</li>
                          <li>Adipisicing ullamcorper dapibus, consequatur itaque eros orci odio.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sidebar */}
              <div className="col-lg-4 order-lg-first">
                <div className="sidebar">
                  <div className="widget-bg sidebar-list">
                    <h4 className="bg-title">How To Apply?</h4>
                    <ul>
                      <li><i className="fas fa-minus"></i>Nunc expedita montes minima.</li>
                      <li><i className="fas fa-minus"></i>Animi atque ornare iaculis.</li>
                      <li><i className="fas fa-minus"></i>Sociosqu scelerisque adipisci.</li>
                      <li><i className="fas fa-minus"></i>Purus eveniet incidi dunt.</li>
                      <li><i className="fas fa-minus"></i>Animi atque ornare iaculis.</li>
                    </ul>
                  </div>
                  <div className="widget-bg faq-widget">
                    <h4 className="bg-title">Frequently Asked Questions</h4>
                    <div className="accordion" id="accordionOne">
                      {/* FAQ Items */}
                      {[
                        {
                          id: "One",
                          question: "When the Announcements?",
                          answer:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                        },
                        {
                          id: "Two",
                          question: "Can I Apply After Rejection?",
                          answer:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                        },
                        {
                          id: "Three",
                          question: "Where to Interview?",
                          answer:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                        },
                      ].map((faq) => (
                        <div className="card" key={faq.id}>
                          <div className="card-header" id={`heading${faq.id}`}>
                            <button
                              className="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target={`#collapse${faq.id}`}
                              aria-expanded="false"
                              aria-controls={`collapse${faq.id}`}
                            >
                              {faq.question}
                            </button>
                          </div>
                          <div
                            id={`collapse${faq.id}`}
                            className="collapse"
                            aria-labelledby={`heading${faq.id}`}
                            data-parent="#accordionOne"
                          >
                            <div className="card-body">{faq.answer}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="widget-bg upload-widget text-center">
                    <div className="widget-icon">
                      <i className="fas fa-file-invoice"></i>
                    </div>
                    <h3>Send us your C.V.</h3>
                    <p>
                      Do you want to work with us? Please, send your CV to{" "}
                      <a href="#"><span className="__cf_email__" data-cfemail="1b7f74767a72752a29285b7c767a727735787476">[email&#160;protected]</span></a>
                    </p>
                    <span className="or-style">OR</span>
                    <a href="#" className="button-primary">CONTACT US</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Callback Section */}
        <div
          className="secondary-callback secondary-overlay"
          style={{ backgroundImage: "url(assets/images/img16.jpg)" }}
        >
          <div className="container">
            <div className="section-heading">
              <div className="row">
                <div className="col-lg-7">
                  <div className="heading-inner">
                    <h5 className="dash-style">INVOLVE TODAY</h5>
                    <h2>TRUSTED BY MORE THAN 65,000 PEOPLE</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo...
                    </p>
                    <a href="#" className="button-primary">
                      JOINS US NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    {/* Footer - import as a component for real project */}
    <footer id="colophon" className="site-footer footer-primary">
      {/* ...reuse your footer component here... */}
    </footer>

    {/* Back to top and Search overlay */}
    <a id="backTotop" href="#" className="to-top-icon">
      <i className="fas fa-chevron-up"></i>
    </a>
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

export default Career_detail;



