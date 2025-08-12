import React from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

const DbAddPackage = () => (
  <div id="container-wrapper">
    {/* Dashboard */}
    <div id="dashboard" className="dashboard-container">
      {/* 🔹 HEADER */}
      <DashboardHeader />
      {/* 🔹 SIDEBAR */}
      <DashboardSidebar />
      <div className="db-info-wrap db-add-tour-wrap">
        <div className="row">
          {/* Listings */}
          <div className="col-lg-8 col-xl-9">
            <div className="dashboard-box">
              <div className="custom-field-wrap">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" name="name" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea></textarea>
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <div className="custom-field-wrap">
                <h4>Dates and Prices</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Group Size</label>
                      <input type="number" name="size" placeholder="No of Pax" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Trip Duration</label>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <input type="number" placeholder="Days" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <input type="number" placeholder="Nights" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>Category</label>
                      <select>
                        <option>Adult</option>
                        <option>Child</option>
                        <option>Couple</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input type="text" name="name" />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Regular Price</label>
                      <input type="text" name="name" />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group">
                      <label>Discount</label>
                      <input type="text" name="name" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <h4>Gallery</h4>
              <div className="custom-field-wrap">
                <div className="dragable-field">
                  <div className="dragable-field-inner">
                    <p className="drag-drop-info">Drop Files To Upload</p>
                    <p>or</p>
                    <div className="upload-input">
                      <div className="form-group">
                        <span className="upload-btn">Upload a image</span>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <h4>Location</h4>
              <div className="custom-field-wrap">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Select Map</label>
                      <select>
                        <option>Google Map</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>API key</label>
                      <input type="text" name="apikey" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xl-3">
            <div className="dashboard-box">
              <div className="custom-field-wrap">
                <h4>Publish</h4>
                <div className="publish-btn">
                  <div className="form-group" >
                    <input type="submit" name="draft" value="Save Draft" />
                  </div>
                  <div className="form-group">
                    <input type="submit" name="preview" value="Preview" />
                  </div>
                </div>
                <div className="publish-status">
                  <span>
                    <strong>Status:</strong>
                    Draft
                  </span>
                  <a href="#">Edit</a>
                </div>
                <div className="publish-status">
                  <span>
                    <strong>Visibility:</strong>
                    Poblic
                  </span>
                  <a href="#">Edit</a>
                </div>
                <div className="publish-status">
                  <span>
                    <strong>Visibility:</strong>
                    Poblic
                  </span>
                  <a href="#">Edit</a>
                </div>
                <div className="publish-action">
                  <input type="submit" name="publish" value="Publish" />
                </div>
              </div>
            </div>
            <div className="dashboard-box">
              <div className="custom-field-wrap db-pop-field-wrap">
                <h4>Popular</h4>
                <div className="form-group">
                  <label className="custom-input">
                    <input type="checkbox" />
                    <span className="custom-input-field"></span>
                    Use Polpular
                  </label>
                </div>
              </div>
              <div className="custom-field-wrap db-pop-field-wrap">
                <h4>Keywords</h4>
                <div className="form-group">
                  <input type="text" name="keyword" placeholder="Keywords" />
                </div>
              </div>
              <div className="custom-field-wrap db-cat-field-wrap">
                <h4>Category</h4>
                <div className="form-group">
                  <label className="custom-input">
                    <input type="checkbox" />
                    <span className="custom-input-field"></span>
                    Hotel
                  </label>
                </div>
                <div className="form-group">
                  <label className="custom-input">
                    <input type="checkbox" defaultChecked />
                    <span className="custom-input-field"></span>
                    Walking
                  </label>
                </div>
                <div className="add-btn">
                  <a href="#">Add category</a>
                </div>
              </div>
              <div className="custom-field-wrap db-media-field-wrap">
                <h4>Add image</h4>
                <div className="upload-input">
                  <div className="form-group">
                    <span className="upload-btn">Upload a image</span>
                    <input type="file" name="myfile" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default DbAddPackage;
