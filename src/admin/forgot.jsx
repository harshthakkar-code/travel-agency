import React from "react";

const Forgot = () => (
  <div
    className="login-page"
    style={{ backgroundImage: "url(assets/images/bg.jpg)" }}
  >
    <div className="login-from-wrap">
      <form className="login-from">
        <h1 className="site-title">
          <a href="#">
            <img src="assets/images/logo.png" alt="Logo" />
          </a>
        </h1>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" className="validate" />
        </div>
        <div className="form-group">
          <a className="button-primary" href="dashboard.html">
            Submit
          </a>
        </div>
        <a href="login.html" className="for-pass">
          Login
        </a>
      </form>
    </div>
  </div>
);

export default Forgot;
