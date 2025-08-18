// import React, { useState } from "react";
// import DashboardSidebar from "./dashboardSidebar";
// import DashboardHeader from "./dashboardHeader";
// import api from "../utils/api"; // your custom axios instance

// const initialForm = {
//   firstname: "",
//   lastname: "",
//   mobile: "",
//   phone: "",
//   city: "",
//   country: "",
//   password: "",
//   confirmPassword: "",
//   email: "",
//   confirmEmail: "",
// };

// const NewUser = () => {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   // Helper for field-by-field validation
//   const validate = () => {
//     const newErrors = {};

//     if (!form.firstname.trim()) newErrors.firstname = "First name is required";
//     if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
//     if (!form.email.trim()) newErrors.email = "Email is required";
//     if (form.email !== form.confirmEmail) newErrors.confirmEmail = "Emails do not match";
//     if (!form.confirmEmail.trim()) newErrors.confirmEmail = "Please confirm your email";
//     if (!form.password) newErrors.password = "Password is required";
//     if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
//     if (form.password && form.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     if (form.password !== form.confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";
//     if (!form.mobile.trim()) newErrors.mobile = "Mobile is required";
//     if (!form.country.trim()) newErrors.country = "Country is required";
//     if (!form.city.trim()) newErrors.city = "City is required";
//     // Phone is optional

//     return newErrors;
//   };

//   // Live error clearing
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     // Remove error for this field when fixed
//     setErrors((prev) => {
//       const updated = { ...prev };
//       if ((name === "email" || name === "confirmEmail") && form.email && form.confirmEmail && form.email === form.confirmEmail) {
//         delete updated.confirmEmail;
//       }
//       if (name === "password" || name === "confirmPassword") {
//         if (form.password && form.confirmPassword && form.password === form.confirmPassword) {
//           delete updated.confirmPassword;
//         }
//         if (form.password && form.password.length >= 6) {
//           delete updated.password;
//         }
//       }
//       if (value && updated[name]) delete updated[name];
//       return updated;
//     });
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess("");
//     const newErrors = validate();

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Prepare registration payload
//     const payload = {
//       firstName: form.firstname,
//       lastName: form.lastname,
//       email: form.email,
//       password: form.password,
//       mobile: form.mobile,
//       phone: form.phone,
//       country: form.country,
//       city: form.city,
//       // role: 'user' // optional, backend default is user
//     };

//     try {
//       await api.post("/auth/register", payload);
//       setSuccess("User registered successfully!");
//       setForm(initialForm);
//       setErrors({});
//     } catch (err) {
//       setErrors({ api: err.response?.data?.message || "Registration failed." });
//     }
//   };

//   return (
//     <div id="container-wrapper">
//       <div id="dashboard" className="dashboard-container">
//         {/* 🔹 HEADER */}
//         <DashboardHeader />

//         {/* 🔹 SIDEBAR */}
//         <DashboardSidebar />

//         <div className="db-info-wrap">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="dashboard-box">
//                 <h4>Add New User</h4>
//                 <p>Veniam. Aenean beatae nonummy tenetur beatae? Molestias similique! Semper? Laudantium.</p>
//                 <form className="form-horizontal" method="post" onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>First name</label>
//                         <input name="firstname" className="form-control" type="text"
//                                value={form.firstname} onChange={handleChange} />
//                         {errors.firstname && <div style={{ color: "red", fontSize: 12 }}>{errors.firstname}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Last name</label>
//                         <input name="lastname" className="form-control" type="text"
//                                value={form.lastname} onChange={handleChange} />
//                         {errors.lastname && <div style={{ color: "red", fontSize: 12 }}>{errors.lastname}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Mobile</label>
//                         <input name="mobile" className="form-control" type="text"
//                                value={form.mobile} onChange={handleChange} />
//                         {errors.mobile && <div style={{ color: "red", fontSize: 12 }}>{errors.mobile}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Phone</label>
//                         <input name="phone" className="form-control" type="text"
//                                value={form.phone} onChange={handleChange} />
//                         {/* Phone not required */}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>City</label>
//                         <input name="city" className="form-control" type="text"
//                                value={form.city} onChange={handleChange} />
//                         {errors.city && <div style={{ color: "red", fontSize: 12 }}>{errors.city}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Country</label>
//                         <input name="country" className="form-control" type="text"
//                                value={form.country} onChange={handleChange} />
//                         {errors.country && <div style={{ color: "red", fontSize: 12 }}>{errors.country}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Password</label>
//                         <input name="password" className="form-control" type="password"
//                                value={form.password} onChange={handleChange} />
//                         {errors.password && <div style={{ color: "red", fontSize: 12 }}>{errors.password}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Confirm Password</label>
//                         <input name="confirmPassword" className="form-control" type="password"
//                                value={form.confirmPassword} onChange={handleChange} />
//                         {errors.confirmPassword && <div style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Email</label>
//                         <input name="email" className="form-control" type="email"
//                                value={form.email} onChange={handleChange} />
//                         {errors.email && <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Confirm Email</label>
//                         <input name="confirmEmail" className="form-control" type="email"
//                                value={form.confirmEmail} onChange={handleChange} />
//                         {errors.confirmEmail && <div style={{ color: "red", fontSize: 12 }}>{errors.confirmEmail}</div>}
//                       </div>
//                     </div>
//                   </div>
//                   <br />
//                   <input type="submit" name="Submit" value="Submit" />
//                   {errors.api && <div style={{ color: "red", marginTop: 12 }}>{errors.api}</div>}
//                   {success && <div style={{ color: "green", marginTop: 12 }}>{success}</div>}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="copyrights">
//           Copyright © 2021 Travele. All rights reserveds.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewUser;

import React, { useState } from "react";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import api from "../utils/api"; // your custom axios instance
import { useNavigate } from "react-router-dom"; // ✅ import navigate


const initialForm = {
  firstname: "",
  lastname: "",
  mobile: "",
  phone: "",
  city: "",
  country: "",
  password: "",
  confirmPassword: "",
  email: "",
  confirmEmail: "",
};

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

const NewUser = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate(); // ✅ initialize

  // Validate all fields
  const validate = () => {
    const newErrors = {};

    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.confirmEmail.trim()) newErrors.confirmEmail = "Please confirm your email";
    if (form.email && form.confirmEmail && form.email !== form.confirmEmail)
      newErrors.confirmEmail = "Emails do not match";

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character";
    }

    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    return newErrors;
  };

  // Handle input changes + live error clearing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const updated = { ...prev };

      if ((name === "email" || name === "confirmEmail") && form.email && form.confirmEmail && form.email === form.confirmEmail) {
        delete updated.confirmEmail;
      }
      if ((name === "password" || name === "confirmPassword")) {
        if (form.password && passwordRegex.test(form.password)) delete updated.password;
        if (form.password && form.confirmPassword && form.password === form.confirmPassword)
          delete updated.confirmPassword;
      }
      if (value && updated[name]) delete updated[name];
      return updated;
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      firstName: form.firstname,
      lastName: form.lastname,
      email: form.email,
      password: form.password,
      mobile: form.mobile,
      phone: form.phone,
      country: form.country,
      city: form.city,
    };

    try {
      await api.post("/auth/register", payload);
      setSuccess("User registered successfully!");
      setForm(initialForm);
      setErrors({});
      setTimeout(() => navigate("/admin/user"), 500);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Registration failed." });
    }
  };

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />

        <div className="db-info-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-box">
                <h4>Add New User</h4>
                <p>Fill in the details to register a new user.</p>
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* First Name */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First name</label>
                        <input name="firstname" className="form-control" type="text"
                               value={form.firstname} onChange={handleChange} />
                        {errors.firstname && <div style={{ color: "red", fontSize: 12 }}>{errors.firstname}</div>}
                      </div>
                    </div>
                    {/* Last Name */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last name</label>
                        <input name="lastname" className="form-control" type="text"
                               value={form.lastname} onChange={handleChange} />
                        {errors.lastname && <div style={{ color: "red", fontSize: 12 }}>{errors.lastname}</div>}
                      </div>
                    </div>
                    {/* Mobile */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input name="mobile" className="form-control" type="text"
                               value={form.mobile} onChange={handleChange} />
                        {errors.mobile && <div style={{ color: "red", fontSize: 12 }}>{errors.mobile}</div>}
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone</label>
                        <input name="phone" className="form-control" type="text"
                               value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                    {/* City */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>City</label>
                        <input name="city" className="form-control" type="text"
                               value={form.city} onChange={handleChange} />
                        {errors.city && <div style={{ color: "red", fontSize: 12 }}>{errors.city}</div>}
                      </div>
                    </div>
                    {/* Country */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Country</label>
                        <input name="country" className="form-control" type="text"
                               value={form.country} onChange={handleChange} />
                        {errors.country && <div style={{ color: "red", fontSize: 12 }}>{errors.country}</div>}
                      </div>
                    </div>
                    {/* Password */}
                    <div className="col-sm-6">
                      <div className="form-group" style={{ position: "relative" }}>
                        <label>Password</label>
                        <input name="password" className="form-control" type={showPassword ? "text" : "password"}
                               value={form.password} onChange={handleChange} autoComplete="new-password"/>
                        <span onClick={() => setShowPassword(!showPassword)}>
                          <i className={`far fa-eye${showPassword ? "" : "-slash"}`}
                             style={{ position: "absolute", right: "14px", top: "52px", cursor: "pointer", color: "#999" }}></i>
                        </span>
                        {errors.password && <div style={{ color: "red", fontSize: 12 }}>{errors.password}</div>}
                      </div>
                    </div>
                    {/* Confirm Password */}
                    <div className="col-sm-6">
                      <div className="form-group" style={{ position: "relative" }}>
                        <label>Confirm Password</label>
                        <input name="confirmPassword" className="form-control" type={showConfirm ? "text" : "password"}
                               value={form.confirmPassword} onChange={handleChange} autoComplete="new-password"/>
                        <span onClick={() => setShowConfirm(!showConfirm)}>
                          <i className={`far fa-eye${showConfirm ? "" : "-slash"}`}
                             style={{ position: "absolute", right: "14px", top: "52px", cursor: "pointer", color: "#999" }}></i>
                        </span>
                        {errors.confirmPassword && <div style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</div>}
                      </div>
                    </div>
                    {/* Email */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input name="email" className="form-control" type="email"
                               value={form.email} onChange={handleChange} />
                        {errors.email && <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>}
                      </div>
                    </div>
                    {/* Confirm Email */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Confirm Email</label>
                        <input name="confirmEmail" className="form-control" type="email"
                               value={form.confirmEmail} onChange={handleChange} />
                        {errors.confirmEmail && <div style={{ color: "red", fontSize: 12 }}>{errors.confirmEmail}</div>}
                      </div>
                    </div>
                  </div>
                  <br />
                  <input type="submit" name="Submit" value="Submit" />
                  {errors.api && <div style={{ color: "red", marginTop: 12 }}>{errors.api}</div>}
                  {success && <div style={{ color: "green", marginTop: 12 }}>{success}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="copyrights">
          Copyright © 2021 Travele. All rights reserveds.
        </div>
      </div>
    </div>
  );
};

export default NewUser;
