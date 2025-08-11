import React from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import testiImg from '../admin/assets/images/testi-img1-150x150.jpg';
import testiImg2 from '../admin/assets/images/testi-img2-150x150.jpg';

const DbComment = () => (
  <div id="container-wrapper">
    {/* Dashboard */}
    <div id="dashboard" className="dashboard-container">
      {/* 🔹 HEADER */}
      <DashboardHeader />
      {/* 🔹 SIDEBAR */}
      <DashboardSidebar />
      {/* Comments Section */}
      <div className="db-info-wrap db-comment-wrap">
        <h4>Comments List</h4>
        <p>Nonummy hac atque adipisicing donec placeat pariatur quia ornare nisl.</p>
        <div className="dashboard-box">
          {/* post comment html */}
          <div className="comment-area">
            <div className="comment-area-inner">
              <ol>
                <li>
                  <figure className="comment-thumb">
                    <img src={testiImg} alt="" />
                  </figure>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h4 className="author-name">Tom Sawyer</h4>
                      <span className="post-on">Jana 10 2020</span>
                    </div>
                    <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                    <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                    <div className="comment-detail">
                      <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                      <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                      <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                    </div>
                  </div>
                </li>
                <ol>
                  <li>
                    <figure className="comment-thumb">
                      <img src={testiImg2} alt="" />
                    </figure>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="author-name">Tom Sawyer</h4>
                        <span className="post-on">Jana 10 2020</span>
                      </div>
                      <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                      <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                      <div className="comment-detail">
                        <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                        <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                        <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                      </div>
                    </div>
                  </li>
                </ol>
              </ol>
            </div>
          </div>
        </div>
        <div className="dashboard-box">
          {/* post comment html */}
          <div className="comment-area">
            <div className="comment-area-inner">
              <ol>
                <li>
                  <figure className="comment-thumb">
                    <img src={testiImg2} alt="" />
                  </figure>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h4 className="author-name">Tom Sawyer</h4>
                      <span className="post-on">Jana 10 2020</span>
                    </div>
                    <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                    <div className="rating-wrap">
                      <div className="rating-start" title="Rated 5 out of 5">
                        <span></span>
                      </div>
                    </div>
                    <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                    <div className="comment-detail">
                      <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                      <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                      <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                    </div>
                  </div>
                </li>
                <ol>
                  <li>
                    <figure className="comment-thumb">
                      <img src={testiImg} alt="" />
                    </figure>
                    <div className="comment-content">
                      <div className="comment-header">
                        <h4 className="author-name">Tom Sawyer</h4>
                        <span className="post-on">Jana 10 2020</span>
                      </div>
                      <h5 className="comment-title"><span>comment on:</span>Tips To Reduce Your Travel Costs</h5>
                      <div className="rating-wrap">
                        <div className="rating-start" title="Rated 5 out of 5">
                          <span></span>
                        </div>
                      </div>
                      <p>Officia amet posuere voluptates, mollit montes eaque accusamus laboriosam quisque cupidatat dolor pariatur, pariatur auctor.</p>
                      <div className="comment-detail">
                        <a href="#" className="reply"><i className="far fa-trash-alt"></i>Remove</a>
                        <a href="#" className="reply"><i className="fas fa-reply"></i>Reply</a>
                        <a href="#" className="reply"><i className="far fa-edit"></i>Edit</a>
                      </div>
                    </div>
                  </li>
                </ol>
              </ol>
            </div>
          </div>
        </div>
        {/* pagination html */}
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
    {/* Dashboard / End */}
  </div>
);

export default DbComment;
