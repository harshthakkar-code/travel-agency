import React from "react";

const Login = () => (
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
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="validate" />
        </div>
        <div className="form-group">
          <a className="button-primary" href="dashboard.html">
            Login
          </a>
        </div>
        <a href="forgot.html" className="for-pass">
          Forgot Password?
        </a>
      </form>
    </div>
  </div>
);

export default Login;
