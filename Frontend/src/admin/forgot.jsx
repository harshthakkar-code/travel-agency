import React from "react";
import 'popper.js';
import bgImage from '../admin/assets/images/bg.jpg';
import logoImg from '../admin/assets/images/logo.png';

const Forgot = () => {
  return (
    <div className="login-page" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <form className="login-from">
          <div className="auth-header">
            <a href="/">
              <img src={logoImg} alt="Logo" />
            </a>
            <h3>Reset Password</h3>
            <p>Enter your username/email to reset</p>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              className="form-control-custom"
              placeholder="Enter your username or email"
            />
          </div>

          <div className="form-group section-mt">
            <button className="auth-btn" type="submit">
              Send Reset Link
            </button>
          </div>

          <div className="auth-footer" style={{ justifyContent: 'center' }}>
            <a href="/admin/login" className="for-pass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-arrow-left"></i> Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
