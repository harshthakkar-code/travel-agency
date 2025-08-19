import React, { useState } from "react";
import api from "../utils/api";
import bgImage from '../admin/assets/images/bg.jpg';
import logoImg from '../admin/assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submit
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  
  try {
    const res = await api.post('/auth/login', {
      email: username,
      password
    });
    
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.name));
    
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
        <form className="login-from" onSubmit={handleLogin}>
          <h1 className="site-title">
            <a href="#">
              <img src={logoImg} alt="Logo" />
            </a>
          </h1>
          
          <p className="form-subtitle" style={{fontWeight: "bold"}}>Welcome! Please login to your account.</p>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              className="validate"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <div className="form-group">
            <button type="submit" className="button-primary">
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
