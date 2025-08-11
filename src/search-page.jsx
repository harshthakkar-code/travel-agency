import React from "react";

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

