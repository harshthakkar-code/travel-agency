import React, { useState } from "react";

import bgImage from '../admin/assets/images/bg.jpg';
import logoImg from '../admin/assets/images/logo.png';
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    city: "",
    country: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (
      !passwordChecks.length ||
      !passwordChecks.uppercase ||
      !passwordChecks.number ||
      !passwordChecks.specialChar
    ) {
      newErrors.password = "Please meet all password requirements";
    }
    if (!form.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@#$%^&+=!]/.test(value)
      });
    }

    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const updated = { ...prev };
      if (updated[name]) delete updated[name];
      return updated;
    });
  };

  const handleNext = () => {
    const valErrors = validateStep1();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    const valErrors = validateStep2();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }

    try {
      setLoading(true);

      // Use Firebase signup (backend will automatically set default role)
      await signup(form.email, form.password, {
        firstName: form.firstName,
        lastName: form.lastName,
        mobile: form.mobile,
        city: form.city,
        country: form.country
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/admin/login"), 1500);

      setForm({
        firstName: "", lastName: "", email: "", password: "",
        confirmPassword: "", mobile: "", city: "", country: ""
      });
      setStep(1);
    } catch (err) {
      setErrors({ api: err.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };


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

      <div className="auth-card register-card">
        <form
          className="login-from"
          onSubmit={step === 1 ? (e) => e.preventDefault() : handleRegister}
        >
          <div className="auth-header">
            <Link to="/">
              <img src={logoImg} alt="Logo" />
            </Link>
            <h3>Create Account</h3>
            <p>Step {step} of 2</p>
          </div>

          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
          </div>

          {step === 1 && (
            <>
              {/* Row 1: First + Last */}
              <div className="auth-row">
                <div className="auth-col">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      className={`form-control-custom ${errors.firstName ? 'is-invalid' : ''}`}
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="input-error">{errors.firstName}</div>}
                  </div>
                </div>
                <div className="auth-col">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      className={`form-control-custom ${errors.lastName ? 'is-invalid' : ''}`}
                      value={form.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="input-error">{errors.lastName}</div>}
                  </div>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="form-group">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  className={`form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="input-error">{errors.email}</div>}
              </div>

              {/* Row 3: Password + Confirm */}
              <div className="auth-row">
                {/* Password */}
                <div className="auth-col relative">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                      value={form.password}
                      onChange={handleChange}
                    />
                    <span
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  {/* Dynamic requirement checklist */}
                  <div className="password-checklist">
                    <div className={`checklist-item ${passwordChecks.length ? "valid" : "invalid"}`}>
                      {passwordChecks.length ? <FaCheckCircle /> : <FaTimesCircle />} Min 8 chars
                    </div>
                    <div className={`checklist-item ${passwordChecks.uppercase ? "valid" : "invalid"}`}>
                      {passwordChecks.uppercase ? <FaCheckCircle /> : <FaTimesCircle />} 1 Uppercase
                    </div>
                    <div className={`checklist-item ${passwordChecks.number ? "valid" : "invalid"}`}>
                      {passwordChecks.number ? <FaCheckCircle /> : <FaTimesCircle />} 1 Number
                    </div>
                    <div className={`checklist-item ${passwordChecks.specialChar ? "valid" : "invalid"}`}>
                      {passwordChecks.specialChar ? <FaCheckCircle /> : <FaTimesCircle />} 1 Special Char
                    </div>
                  </div>
                  {errors.password && <div className="input-error">{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="auth-col relative">
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      className={`form-control-custom ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className="password-toggle"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && <div className="input-error">{errors.confirmPassword}</div>}
                </div>
              </div>

              {errors.api && (
                <div className="auth-alert error">
                  {errors.api}
                </div>
              )}

              <div className="form-group section-mt">
                <button type="button" className="auth-btn" onClick={handleNext}>
                  Next Step
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  name="mobile"
                  type="text"
                  className={`form-control-custom ${errors.mobile ? 'is-invalid' : ''}`}
                  value={form.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <div className="input-error">{errors.mobile}</div>}
              </div>

              <div className="auth-row">
                <div className="auth-col">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      name="city"
                      type="text"
                      className={`form-control-custom ${errors.city ? 'is-invalid' : ''}`}
                      value={form.city}
                      onChange={handleChange}
                    />
                    {errors.city && <div className="input-error">{errors.city}</div>}
                  </div>
                </div>
                <div className="auth-col">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      name="country"
                      type="text"
                      className={`form-control-custom ${errors.country ? 'is-invalid' : ''}`}
                      value={form.country}
                      onChange={handleChange}
                    />
                    {errors.country && <div className="input-error">{errors.country}</div>}
                  </div>
                </div>
              </div>

              {errors.api && <div className="auth-alert error">{errors.api}</div>}
              {success && <div className="auth-alert success">{success}</div>}

              <div className="auth-actions">
                <button type="button" className="auth-btn" style={{ background: '#787878', marginTop: 0 }} onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="auth-btn" style={{ marginTop: 0 }} disabled={loading}>
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>
              </div>
            </>
          )}

          <div className="auth-footer">
            <span>Already have an account? <Link to="/admin/login">Login here</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
