import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import bgImage from '../admin/assets/images/bg.jpg';
import logoImg from '../admin/assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signin } = useAuth();
  // Validation functions
  const isEmailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = () => isEmailValid(username) && password.length > 0;

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!isFormValid()) {
      setError("Please enter a valid email and password.");
      return;
    }

    try {
      setLoading(true);

      // Use Firebase signin (AuthContext handles token/role storage)
      await signin(username, password);

      // Get role from localStorage (set by AuthContext)
      const userRole = localStorage.getItem('userRole');
      console.log('User role after login:', userRole);

      if (userRole === 'user') {
        navigate("/tour-packages");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <form className="login-from" onSubmit={handleLogin} noValidate>
          <div className="auth-header">
            <a href="/">
              <img src={logoImg} alt="Logo" />
            </a>
            <h3>Welcome Back</h3>
            <p>Please login to your account</p>
          </div>

          <div className="form-group">
            <label htmlFor="username">Email Address</label>
            <input
              type="email"
              id="username"
              className={`form-control-custom${touched.email && !isEmailValid(username) ? ' is-invalid' : ''}`}
              value={username}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {touched.email && !isEmailValid(username) && (
              <div className="input-error">
                Please enter a valid email address.
              </div>
            )}
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`form-control-custom${touched.password && password.length === 0 ? ' is-invalid' : ''}`}
              value={password}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(s => !s)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {touched.password && password.length === 0 && (
              <div className="input-error">
                Please enter your password.
              </div>
            )}
          </div>

          {error && (
            <div className="auth-alert error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <div className="form-group section-mt">
            <button type="submit" className="auth-btn" disabled={!isFormValid() || loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="auth-footer" style={{ justifyContent: 'space-between', display: 'flex' }}>
            <a href="/user/register" className="for-pass">
              Create Account
            </a>
            <a href="/admin/forgot" className="for-pass">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
