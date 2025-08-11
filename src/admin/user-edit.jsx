import React from "react";

const UserEdit = () => (
  <div id="container-wrapper">
    <div id="dashboard" className="dashboard-container">
      {/* Header and Sidebar would be separate reusable components in real apps */}
      <div className="db-info-wrap">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-box user-form-wrap">
              <h4>User Edit Details</h4>
              <form className="form-horizontal" method="post">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>First name</label>
                      <input name="firstname" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Last name</label>
                      <input name="lastname" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input name="email" className="form-control" type="email" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Date of Birth</label>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <select>
                            <option value="1">Day</option>
                            <option value="0">Sunday</option>
                            <option value="0">Monday</option>
                            <option value="0">Tuesday</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <select>
                            <option value="1">Month</option>
                            <option value="0">January</option>
                            <option value="0">February</option>
                            <option value="0">March</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <select>
                            <option value="1">Years</option>
                            <option value="0">1990</option>
                            <option value="0">1992</option>
                            <option value="0">1993</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Country Code</label>
                      <select>
                        <option value="1">+97701</option>
                        <option value="0">+91</option>
                        <option value="0">+1</option>
                        <option value="0">+44</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phone" id="input-phone" className="form-control" placeholder="" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <h4>Contact Details</h4>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Country</label>
                      <select>
                        <option value="0">Italy</option>
                        <option value="1">Japan</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>State</label>
                      <select>
                        <option value="0">New York</option>
                        <option value="1">Mexico</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>City</label>
                      <select>
                        <option value="0">Tokyo</option>
                        <option value="1">Paris</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Address</label>
                      <input name="address" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <h4>Upload Profile Photo</h4>
                  </div>
                  <div className="col-sm-6">
                    <div className="upload-input">
                      <div className="form-group">
                        <span className="upload-btn">Upload a image</span>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <h4>Describe Yourself</h4>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Please Tell Us About You</label>
                      <textarea className="form-control" id="message" name="message" required=""></textarea>
                    </div>
                  </div>
                </div>
                <button type="submit" className="button-primary">Upload Setting</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright footer, etc. */}
      <div className="copyrights">
        Copyright © 2021 Travele. All rights reserveds.
      </div>
    </div>
  </div>
);

export default UserEdit;
