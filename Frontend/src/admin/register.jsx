import React, { useState } from "react";
import api from "../utils/api";
import bgImage from '../admin/assets/images/bg.jpg';
import logoImg from '../admin/assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false
  });

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
      await api.post("/auth/register", form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/admin/login"), 800);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        city: "",
        country: ""
      });
      setStep(1);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-from-wrap" style={{ maxWidth: "500px" }}>
        <form
          className="login-from"
          onSubmit={step === 1 ? (e) => e.preventDefault() : handleRegister}
        >
          <h1 className="site-title">
            <a href="#">
              <img src={logoImg} alt="Logo" />
            </a>
          </h1>

          {step === 1 && (
            <>
              <p className="form-subtitle" style={{ fontWeight: "bold" }}>
                Please enter your details to register.
              </p>

              {/* Row 1: First + Last */}
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div style={{ color: "red", fontSize: "10px" }}>{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div style={{ color: "red", fontSize: "10px" }}>{errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div style={{ color: "red", fontSize: "10px" }}>{errors.email}</div>
                )}
              </div>

              {/* Row 3: Password + Confirm */}
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Password */}
                <div className="form-group" style={{ flex: 1, position: "relative" }}>
                  <label>Password</label>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "45px",
                      cursor: "pointer",
                      color: "#888"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`far fa-eye${showPassword ? "" : "-slash"}`}></i>
                  </span>
                  {/* Dynamic requirement checklist */}
                  <div style={{ fontSize: "10px", marginTop: "5px" }}>
                    <div style={{ color: passwordChecks.length ? "green" : "red" }}>
                      {passwordChecks.length ? <FaCheckCircle /> : <FaTimesCircle />} Min 8 characters
                    </div>
                    <div style={{ color: passwordChecks.uppercase ? "green" : "red" }}>
                      {passwordChecks.uppercase ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 uppercase letter
                    </div>
                    <div style={{ color: passwordChecks.number ? "green" : "red" }}>
                      {passwordChecks.number ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 number
                    </div>
                    <div style={{ color: passwordChecks.specialChar ? "green" : "red" }}>
                      {passwordChecks.specialChar ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 special character
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group" style={{ flex: 1, position: "relative" }}>
                  <label>Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "45px",
                      cursor: "pointer",
                      color: "#888"
                    }}
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <i className={`far fa-eye${showConfirm ? "" : "-slash"}`}></i>
                  </span>
                  {errors.confirmPassword && (
                    <div style={{ color: "red", fontSize: "10px" }}>{errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              {errors.api && (
                <div style={{ color: "red", marginBottom: "10px" }}>{errors.api}</div>
              )}

              <div className="form-group">
                <button type="button" className="button-primary" onClick={handleNext}>
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  name="mobile"
                  type="text"
                  value={form.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <div style={{ color: "red", fontSize: "10px" }}>{errors.mobile}</div>}
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                />
                {errors.city && <div style={{ color: "red", fontSize: "10px" }}>{errors.city}</div>}
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                />
                {errors.country && <div style={{ color: "red", fontSize: "10px" }}>{errors.country}</div>}
              </div>

              {errors.api && <div style={{ color: "red", marginBottom: "10px" }}>{errors.api}</div>}
              {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}

              <div className="form-group" style={{ display: "flex", gap: "10px" }}>
                <button type="button" className="button-primary" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="button-primary">
                  Register
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
