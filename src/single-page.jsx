import React from "react";

const Single_page = () => {
  return (
    <div id="page" className="full-page">
      {/* HEADER COMPONENT GOES HERE (reuse for all pages) */}

      <main id="content" className="site-main">
        {/* Inner Banner */}
        <section className="inner-banner-wrap">
          <div
            className="inner-baner-container"
            style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Single page</h1>
              </div>
            </div>
          </div>
          <div className="inner-shape"></div>
        </section>
        {/* Single Page Content */}
        <div className="single-page-section">
          <div className="container">
            <figure className="single-feature-img">
              <img src="/assets/images/img31.jpg" alt="" />
            </figure>
            <div className="page-content">
              <p>
                Amet orci, nibh blanditiis tempor soluta bibendum, omnis dictumst
                eiusmod felis mollis porta molestiae, laborum fugiat, phasellus
                minim labore habitasse culpa dignissimos? Distinctio molestias!
                Incididunt pede nostra mollit quam quaerat voluptas similique
                accumsan quae accusantium aliqua illum faucibus amet voluptatum
                natoque sodales. Proident facilisis, atque impedit ullam
                recusandae ducimus quisquam faucibus dolorum nibh neque libero,
                laudantium harum labore facilis proident nec doloribus netus.
                Posuere accusamus nam repudiandae, tincidunt! Id doloribus tempus
                potenti adipiscing deleniti nemo! Vel, tortor eiusmod omnis
                molestie sint quisque mollitia molestiae et! Veniam mollitia
                adipisci, anim eligendi? Turpis laborum leo quisque eos! Suspen
                sectetuer proident ex nostrud, ratione.
              </p>
              <p>
                Amet orci, nibh blanditiis tempor soluta bibendum, omnis dictumst
                eiusmod felis mollis porta molestiae, laborum fugiat, phasellus
                minim labore habitasse culpa dignissimos? Distinctio molestias!
                Incididunt pede nostra mollit quam quaerat voluptas similique
                accumsan quae accusantium aliqua illum faucibus amet voluptatum
                natoque sodales. Laboris justo dolorem deserunt consectetur
                ultricies tortor cum tenetur ducimus occaecati imperdiet enim mus
                ab arcu. Taciti euismod metpus!
              </p>
              <ul>
                <li>
                  Purus sequi accusamus? Nibh aut perspiciatis, lorem lorem
                  perspiciatis.
                </li>
                <li>
                  Dictum? Posuere cumque sed illum facilisis leo illum facilisis.
                </li>
                <li>
                  Neque officiis feugiat praesentium qui, aliqua hic commodo
                  praesentium.
                </li>
                <li>
                  Asperiores irure class lobortis veritatis, alias sem lobortis
                  veritatis.
                </li>
                <li>
                  Ipsum eros quaerat deserunt proin porttitor, fugit ultrices.
                </li>
                <li>
                  Volutpat, justo mollit ullamco sagittis duis enim labore,
                  ullamcorper dicta
                </li>
              </ul>
              <p>
                Sequi sociis leo, interdum eos ipsa pharetra, unde fringilla erat
                vulputate litora nisl adipisicing primis consectetuer erat aliqua
                reprehenderit unde accusamus earum sollicitudin voluptatum wisi
                vulputate deleniti, accusamus, animi rutrum. Labore et! Odit,
                nunc nostra, excepturi dui netus, euismod pariatur? Proin vivamus
                diamlorem natoque reprehenderit vivamus diamlorem natpo.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER COMPONENT GOES HERE (reuse for all pages) */}

      {/* Back To Top Button */}
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

export default Single_page;

