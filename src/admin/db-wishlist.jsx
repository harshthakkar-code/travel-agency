import React from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import img25 from "/assets/images/img25.jpg";
import img26 from "/assets/images/img26.jpg";
import img27 from "/assets/images/img27.jpg";

const DbWishlist = () => (
  <div id="container-wrapper">
    <div id="dashboard" className="dashboard-container">
      {/* 🔹 HEADER */}
      <DashboardHeader />
      {/* 🔹 SIDEBAR */}
      <DashboardSidebar />
      {/* Wishlist Packages */}
      <div className="db-info-wrap db-wislist-wrap">
        <div className="dashboard-box ">
          <div className="row">
            {/* Package 1 */}
            <div className="grid-item col-md-6 col-lg-4">
              <div className="package-wrap">
                <figure className="feature-image">
                  <a href="#">
                    <img src={img25} alt="" />
                  </a>
                </figure>
                <div className="package-price">
                  <h6>
                    <span>$1,900 </span> / per person
                  </h6>
                </div>
                <div className="package-content-wrap">
                  <div className="package-content">
                    <h4>
                      <a href="#">Sunset view of beautiful lakeside resident</a>
                    </h4>
                    <div className="content-details">
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span></span>
                      </div>
                      <span className="review-text"><a href="#">1 review</a></span>
                    </div>
                    <div className="button-container">
                      <a href="#"><i className="far fa-edit"></i>Edit</a>
                      <a href="#"><i className="far fa-trash-alt"></i> Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Package 2 */}
            <div className="grid-item col-md-6 col-lg-4">
              <div className="package-wrap">
                <figure className="feature-image">
                  <a href="#">
                    <img src={img26} alt="" />
                  </a>
                </figure>
                <div className="package-price">
                  <h6>
                    <span>$2,300 </span> / per person
                  </h6>
                </div>
                <div className="package-content-wrap">
                  <div className="package-content">
                    <h4>
                      <a href="#">Experience the natural beauty of island</a>
                    </h4>
                    <div className="content-details">
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span></span>
                      </div>
                      <span className="review-text"><a href="#">1 review</a></span>
                    </div>
                    <div className="button-container">
                      <a href="#"><i className="far fa-edit"></i>Edit</a>
                      <a href="#"><i className="far fa-trash-alt"></i> Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Package 3 */}
            <div className="grid-item col-md-6 col-lg-4">
              <div className="package-wrap">
                <figure className="feature-image">
                  <a href="#">
                    <img src={img27} alt="" />
                  </a>
                </figure>
                <div className="package-price">
                  <h6>
                    <span>$1,500 </span>
                  </h6>
                </div>
                <div className="package-content-wrap">
                  <div className="package-content">
                    <h4>
                      <a href="#">Vacation to the water city of Portugal</a>
                    </h4>
                    <div className="content-details">
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span></span>
                      </div>
                      <span className="review-text"><a href="#">1 review</a></span>
                    </div>
                    <div className="button-container">
                      <a href="#"><i className="far fa-edit"></i>Edit</a>
                      <a href="#"><i className="far fa-trash-alt"></i> Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="pagination-wrap">
          <nav className="pagination-inner">
            <ul className="pagination disabled">
              <li className="page-item"><span className="page-link"><i className="fas fa-chevron-left"></i></span></li>
              <li className="page-item"><a href="#" className="page-link active">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Copyrights */}
      <div className="copyrights">
        Copyright © 2021 Travele. All rights reserveds.
      </div>
    </div>
  </div>
);

export default DbWishlist;
