import React from "react";

const NewUser = () => (
  <div id="container-wrapper">
    <div id="dashboard" className="dashboard-container">
      {/* Header and Navigation would be separate components in real apps */}
      <div className="db-info-wrap">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-box">
              <h4>Add New User</h4>
              <p>
                Veniam. Aenean beatae nonummy tenetur beatae? Molestias
                similique! Semper? Laudantium.
              </p>
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
                      <label>Mobile</label>
                      <input name="mobile" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input name="phone" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>City</label>
                      <input name="city" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input name="country" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Password</label>
                      <input name="password" className="form-control" type="password" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input name="confirmPassword" className="form-control" type="password" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input name="email" className="form-control" type="email" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Confirm Email</label>
                      <input name="confirmEmail" className="form-control" type="email" />
                    </div>
                  </div>
                </div>
                <br />
                <input type="submit" name="Submit" value="Submit" />
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

export default NewUser;
