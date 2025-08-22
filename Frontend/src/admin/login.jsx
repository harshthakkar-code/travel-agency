import React, { useState } from "react";
import api from "../utils/api";
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
  const navigate = useNavigate();

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
      const res = await api.post('/auth/login', {
        email: username,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userEmail', res.data.email);
      localStorage.setItem('user', res.data.name);
      localStorage.setItem('userRole', res.data.role);

      const userRole = res.data.user?.role || res.data.role;

      if (userRole === 'user') {
        navigate("/tour-packages");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-from-wrap">
        <form className="login-from" onSubmit={handleLogin} noValidate>
          <h1 className="site-title">
            <a href="#">
              <img src={logoImg} alt="Logo" />
            </a>
          </h1>

          <p className="form-subtitle" style={{ fontWeight: "bold" }}>Welcome! Please login to your account.</p>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              className={`validate${touched.email && !isEmailValid(username) ? ' is-invalid' : ''}`}
              value={username}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              onChange={e => setUsername(e.target.value)}
              required
            />
            {touched.email && !isEmailValid(username) && (
              <div style={{ color: "red", fontSize: "13px" }}>
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`validate${touched.password && password.length === 0 ? ' is-invalid' : ''}`}
              value={password}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              onClick={() => setShowPassword(s => !s)}
              style={{
                position: "absolute", right: "12px", top: "38px",
                cursor: "pointer", fontSize: "18px", color: "#333"
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {touched.password && password.length === 0 && (
              <div style={{ color: "red", fontSize: "13px" }}>
                Please enter your password.
              </div>
            )}
          </div>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <div className="form-group">
            <button type="submit" className="button-primary" disabled={!isFormValid()}>
              Login
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <a href="/user/register" className="for-pass">
              Don't have an account?
            </a>
            <a href="/admin/forgot" className="for-pass">
              Reset Password
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
