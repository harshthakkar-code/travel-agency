import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Gallery = () => (
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
            <h1 className="inner-title">Gallery</h1>
          </div>
        </div>
      </div>
      <div className="inner-shape"></div>
    </section>

    {/* Gallery Section */}
    <div className="gallery-section">
      <div className="container">
        <div className="gallery-outer-wrap">
          <div className="gallery-inner-wrap gallery-container grid" style={{
            columnCount: 1,        // Three "masonry" columns
            columnGap: 20,         // Gap between columns in px
          }}>
            {[
              { img: "gallery-1.jpg", title: "Santorini Island" },
              { img: "gallery-2.jpg", title: "Malaysia Beach" },
              { img: "gallery-3.jpg", title: "Tibet Mountain" },
              { img: "gallery-5.jpg", title: "Burj Khalifa (Dubai)" },
              { img: "gallery-4.jpg", title: "Arizona Desert" },
              { img: "gallery-6.jpg", title: "Oxolotan Island" },
              { img: "gallery-7.jpg", title: "Narita Airport" },
              { img: "gallery-8.jpg", title: "Thailand Temple" },
            ].map((item, i) => (
              <div className="single-gallery grid-item" key={i}>
                <figure className="gallery-img" style={{ margin: 0, position: "relative" }}>
                  <img src={`assets/images/${item.img}`} alt={item.title} />
                  <div className="gallery-title">
                    <h3>
                      <a
                        href={`assets/images/${item.img}`}
                        data-lightbox="lightbox-set"
                      >
                        {item.title}
                      </a>
                    </h3>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Callback Section */}
    <div className="bg-color-callback">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-9 col-md-8">
            <div className="callback-content">
              <h2>LET'S JOIN US FOR MORE UPDATE & INFO !!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                orem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="button-wrap">
              <a href="#" className="button-primary">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Main Content */}

    <Footer />
  </main>
);

export default Gallery;
