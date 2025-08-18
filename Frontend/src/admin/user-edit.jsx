// // import React from "react";
// // import DashboardSidebar from "./dashboardSidebar";
// // import DashboardHeader from "./dashboardHeader";

// // const UserEdit = () => (
// //   <div id="container-wrapper">
// //     <div id="dashboard" className="dashboard-container">

// //        {/* 🔹 HEADER */}
// //       <DashboardHeader />

// //       {/* 🔹 SIDEBAR */}
// //       <DashboardSidebar />
// //       {/* Header and Sidebar would be separate reusable components in real apps */}
// //       <div className="db-info-wrap">
// //         <div className="row">
// //           <div className="col-lg-12">
// //             <div className="dashboard-box user-form-wrap">
// //               <h4>User Edit Details</h4>
// //               <form className="form-horizontal" method="post">
// //                 <div className="row">
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>First name</label>
// //                       <input name="firstname" className="form-control" type="text" />
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>Last name</label>
// //                       <input name="lastname" className="form-control" type="text" />
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>Email</label>
// //                       <input name="email" className="form-control" type="email" />
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <label>Date of Birth</label>
// //                     <div className="row">
// //                       <div className="col-sm-4">
// //                         <div className="form-group">
// //                           <select>
// //                             <option value="1">Day</option>
// //                             <option value="0">Sunday</option>
// //                             <option value="0">Monday</option>
// //                             <option value="0">Tuesday</option>
// //                           </select>
// //                         </div>
// //                       </div>
// //                       <div className="col-sm-4">
// //                         <div className="form-group">
// //                           <select>
// //                             <option value="1">Month</option>
// //                             <option value="0">January</option>
// //                             <option value="0">February</option>
// //                             <option value="0">March</option>
// //                           </select>
// //                         </div>
// //                       </div>
// //                       <div className="col-sm-4">
// //                         <div className="form-group">
// //                           <select>
// //                             <option value="1">Years</option>
// //                             <option value="0">1990</option>
// //                             <option value="0">1992</option>
// //                             <option value="0">1993</option>
// //                           </select>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>Country Code</label>
// //                       <select>
// //                         <option value="1">+97701</option>
// //                         <option value="0">+91</option>
// //                         <option value="0">+1</option>
// //                         <option value="0">+44</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>Phone Number</label>
// //                       <input name="phone" id="input-phone" className="form-control" placeholder="" type="text" />
// //                     </div>
// //                   </div>
// //                   <div className="col-12">
// //                     <h4>Contact Details</h4>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>Country</label>
// //                       <select>
// //                         <option value="0">Italy</option>
// //                         <option value="1">Japan</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>State</label>
// //                       <select>
// //                         <option value="0">New York</option>
// //                         <option value="1">Mexico</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>City</label>
// //                       <select>
// //                         <option value="0">Tokyo</option>
// //                         <option value="1">Paris</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="form-group">
// //                       <label>Address</label>
// //                       <input name="address" className="form-control" type="text" />
// //                     </div>
// //                   </div>
// //                   <div className="col-12">
// //                     <h4>Upload Profile Photo</h4>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <div className="upload-input">
// //                       <div className="form-group">
// //                         <span className="upload-btn">Upload a image</span>
// //                         <input type="file" name="myfile" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="col-12">
// //                     <h4>Describe Yourself</h4>
// //                   </div>
// //                   <div className="col-sm-12">
// //                     <div className="form-group">
// //                       <label>Please Tell Us About You</label>
// //                       <textarea className="form-control" id="message" name="message" required=""></textarea>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <button type="submit" className="button-primary">Upload Setting</button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* Copyright footer, etc. */}
// //       <div className="copyrights">
// //         Copyright © 2021 Travele. All rights reserveds.
// //       </div>
// //     </div>
// //   </div>
// // );

// // export default UserEdit;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import DashboardSidebar from "./dashboardSidebar";
// import DashboardHeader from "./dashboardHeader";
// import api from "../utils/api";

// const UserEdit = () => {
//   const { id } = useParams(); // user id from URL

//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     day: "",
//     month: "",
//     year: "",
//     // countryCode: "+97701",
//     phone: "",
//     country: "",
//     state: "",
//     city: "",
//     address: "",
//     profilePhoto: null,
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   // Fetch user data on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await api.get(`/users/${id}`);
//         // Assuming data has fields: firstName, lastName, email, phone, country, city, etc.
//         // Map these fields to your form fields accordingly

//         // For DOB parsing, if stored as a date string, parse to day/month/year; else leave empty
//         let day = "", month = "", year = "";
//         if (data.dateOfBirth) {
//           const dob = new Date(data.dateOfBirth);
//           if (!isNaN(dob)) {
//             day = dob.getDate().toString();
//             month = (dob.getMonth() + 1).toString();
//             year = dob.getFullYear().toString();
//           }
//         }

//         setForm({
//           firstname: data.firstName || "",
//           lastname: data.lastName || "",
//           email: data.email || "",
//           day,
//           month,
//           year,
//           // countryCode: data.countryCode || "+97701",
//           phone: data.mobile || "",
//           country: data.country || "",
//           state: data.state || "",
//           city: data.city || "",
//           address: data.address || "",
//           profilePhoto: null, // file upload handled separately
//           message: data.description || "", // assuming description stored here for "About you"
//         });
//       } catch (err) {
//         console.error("Failed to load user data", err);
//         setErrors({ api: "Failed to load user data" });
//       }
//     };
//     fetchUser();
//   }, [id]);

//   // Validation function similar to Add User form, adapted to these fields
//   const validate = () => {
//     const newErrors = {};
//     if (!form.firstname.trim()) newErrors.firstname = "First name is required";
//     if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
//     if (!form.email.trim()) newErrors.email = "Email is required";
//     // Additional validation can be added for email format, phone number etc.
//     if (!form.day || !form.month || !form.year) newErrors.dob = "Complete date of birth is required";
//     // if (!form.countryCode) newErrors.countryCode = "Country code is required";
//     if (!form.mobile.trim()) newErrors.phone = "Phone number is required";
//     if (!form.country) newErrors.country = "Country is required";
//     if (!form.state) newErrors.state = "State is required";
//     if (!form.city) newErrors.city = "City is required";
//     if (!form.address.trim()) newErrors.address = "Address is required";
//     if (!form.message.trim()) newErrors.message = "Please tell us about yourself";

//     return newErrors;
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "profilePhoto" && files.length > 0) {
//       setForm((prev) => ({ ...prev, profilePhoto: files[0] }));
//       setErrors((prev) => {
//         const updateErrors = { ...prev };
//         delete updateErrors.profilePhoto;
//         return updateErrors;
//       });
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));

//       setErrors((prev) => {
//         const updateErrors = { ...prev };
//         if (value && updateErrors[name]) {
//           delete updateErrors[name];
//         }
//         return updateErrors;
//       });
//     }
//   };

//   // Submit the edited user data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess("");
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       // Prepare form data for submission, including the file if any
//       const formData = new FormData();
//       formData.append("firstName", form.firstname);
//       formData.append("lastName", form.lastname);
//       formData.append("email", form.email);
//       formData.append("dateOfBirth", `${form.year}-${form.month.padStart(2, "0")}-${form.day.padStart(2, "0")}`);
//       // formData.append("countryCode", form.countryCode);
//       formData.append("phone", form.mobile);
//       formData.append("country", form.country);
//       formData.append("state", form.state);
//       formData.append("city", form.city);
//       formData.append("address", form.address);
//       formData.append("description", form.message);
//       if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);

//       // Call your update API - adjust endpoint and method accordingly
//       await api.put(`/users/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setSuccess("User updated successfully!");
//       setErrors({});
//     } catch (error) {
//       setErrors({ api: error.response?.data?.message || "Failed to update user" });
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
//               <div className="dashboard-box user-form-wrap">
//                 <h4>User Edit Details</h4>
//                 <form className="form-horizontal" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>First name</label>
//                         <input
//                           name="firstname"
//                           className="form-control"
//                           type="text"
//                           value={form.firstname}
//                           onChange={handleChange}
//                         />
//                         {errors.firstname && <div style={{ color: "red", fontSize: 12 }}>{errors.firstname}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Last name</label>
//                         <input
//                           name="lastname"
//                           className="form-control"
//                           type="text"
//                           value={form.lastname}
//                           onChange={handleChange}
//                         />
//                         {errors.lastname && <div style={{ color: "red", fontSize: 12 }}>{errors.lastname}</div>}
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Email</label>
//                         <input
//                           name="email"
//                           className="form-control"
//                           type="email"
//                           value={form.email}
//                           onChange={handleChange}
//                         />
//                         {errors.email && <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>}
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       <label>Date of Birth</label>
//                       <div className="row">
//                         <div className="col-sm-4">
//                           <div className="form-group">
//                             <select name="day" value={form.day} onChange={handleChange}>
//                               <option value="">Day</option>
//                               {[...Array(31)].map((_, i) => (
//                                 <option key={i + 1} value={i + 1}>
//                                   {i + 1}
//                                 </option>
//                               ))}
//                             </select>
//                             {errors.dob && !form.day && <div style={{ color: "red", fontSize: 12 }}>Day required</div>}
//                           </div>
//                         </div>
//                         <div className="col-sm-4">
//                           <div className="form-group">
//                             <select name="month" value={form.month} onChange={handleChange}>
//                               <option value="">Month</option>
//                               {[
//                                 "January",
//                                 "February",
//                                 "March",
//                                 "April",
//                                 "May",
//                                 "June",
//                                 "July",
//                                 "August",
//                                 "September",
//                                 "October",
//                                 "November",
//                                 "December",
//                               ].map((m, idx) => (
//                                 <option key={idx + 1} value={idx + 1}>
//                                   {m}
//                                 </option>
//                               ))}
//                             </select>
//                             {errors.dob && !form.month && <div style={{ color: "red", fontSize: 12 }}>Month required</div>}
//                           </div>
//                         </div>
//                         <div className="col-sm-4">
//                           <div className="form-group">
//                             <select name="year" value={form.year} onChange={handleChange}>
//                               <option value="">Year</option>
//                               {/* For example, years from 1970 to 2025 */}
//                               {Array.from({ length: 56 }, (_, i) => 2025 - i).map((year) => (
//                                 <option key={year} value={year}>
//                                   {year}
//                                 </option>
//                               ))}
//                             </select>
//                             {errors.dob && !form.year && <div style={{ color: "red", fontSize: 12 }}>Year required</div>}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* <div className="col-sm-6"> */}
//                       {/* <div className="form-group">
//                         <label>Country Code</label>
//                         <select name="countryCode" value={form.countryCode} onChange={handleChange}>
//                           <option value="+97701">+97701</option>
//                           <option value="+91">+91</option>
//                           <option value="+1">+1</option>
//                           <option value="+44">+44</option>
//                         </select>
//                         {errors.countryCode && <div style={{ color: "red", fontSize: 12 }}>{errors.countryCode}</div>}
//                       </div> */}
//                     {/* </div> */}

//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Mobile Number</label>
//                         <input
//                           name="mobile"
//                           id="input-phone"
//                           className="form-control"
//                           type="text"
//                           value={form.phone}
//                           onChange={handleChange}
//                         />
//                         {errors.phone && <div style={{ color: "red", fontSize: 12 }}>{errors.phone}</div>}
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <h4>Contact Details</h4>
//                     </div>

//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>Country</label>
//                         <select name="country" value={form.country} onChange={handleChange}>
//                           <option value="">Select Country</option>
//                           <option value="Italy">Italy</option>
//                           <option value="Japan">Japan</option>
//                         </select>
//                         {errors.country && <div style={{ color: "red", fontSize: 12 }}>{errors.country}</div>}
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>State</label>
//                         <select name="state" value={form.state} onChange={handleChange}>
//                           <option value="">Select State</option>
//                           <option value="New York">New York</option>
//                           <option value="Mexico">Mexico</option>
//                         </select>
//                         {errors.state && <div style={{ color: "red", fontSize: 12 }}>{errors.state}</div>}
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       <div className="form-group">
//                         <label>City</label>
//                         <select name="city" value={form.city} onChange={handleChange}>
//                           <option value="">Select City</option>
//                           <option value="Tokyo">Tokyo</option>
//                           <option value="Paris">Paris</option>
//                         </select>
//                         {errors.city && <div style={{ color: "red", fontSize: 12 }}>{errors.city}</div>}
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       {/* <div className="form-group">
//                         <label>Address</label>
//                         <input
//                           name="address"
//                           className="form-control"
//                           type="text"
//                           value={form.address}
//                           onChange={handleChange}
//                         />
//                         {errors.address && <div style={{ color: "red", fontSize: 12 }}>{errors.address}</div>}
//                       </div> */}
//                     </div>

//                     {/* <div className="col-12">
//                       <h4>Upload Profile Photo</h4>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="upload-input">
//                         <div className="form-group">
//                           <span className="upload-btn">Upload a image</span>
//                           <input type="file" name="profilePhoto" onChange={handleChange} />
//                         </div>
//                       </div>
//                     </div> */}

//                     {/* <div className="col-12">
//                       <h4>Describe Yourself</h4>
//                     </div> */}
//                     {/* <div className="col-sm-12">
//                       <div className="form-group">
//                         <label>Please Tell Us About You</label>
//                         <textarea
//                           className="form-control"
//                           id="message"
//                           name="message"
//                           value={form.message}
//                           onChange={handleChange}
//                           required
//                         ></textarea>
//                         {errors.message && <div style={{ color: "red", fontSize: 12 }}>{errors.message}</div>}
//                       </div>
//                     </div> */}
//                   </div>
//                   <button type="submit" className="button-primary">
//                     Save Changes
//                   </button>
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

// export default UserEdit;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import api from "../utils/api";

const UserEdit = () => {
  const { id } = useParams(); // user id from URL

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    day: "",
    month: "",
    year: "",
    phone: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // 🔹 Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`);

        let day = "", month = "", year = "";
        if (data.dateOfBirth) {
          const dob = new Date(data.dateOfBirth);
          if (!isNaN(dob)) {
            day = dob.getDate().toString();
            month = (dob.getMonth() + 1).toString();
            year = dob.getFullYear().toString();
          }
        }

        setForm({
          firstname: data.firstName || "",
          lastname: data.lastName || "",
          email: data.email || "",
          day,
          month,
          year,
          phone: data.mobile || "",
          country: data.country || "",
          city: data.city || "",
        });
      } catch (err) {
        console.error("Failed to load user data", err);
        setErrors({ api: "Failed to load user data" });
      }
    };
    fetchUser();
  }, [id]);

  // 🔹 Validation
  const validate = () => {
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.day || !form.month || !form.year) newErrors.dob = "Complete date of birth is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  // 🔹 Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const updateErrors = { ...prev };
      if (value && updateErrors[name]) {
        delete updateErrors[name];
      }
      return updateErrors;
    });
  };

  // 🔹 Submit as JSON body
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Prepare plain JSON payload
      const payload = {
        firstName: form.firstname,
        lastName: form.lastname,
        email: form.email,
        dateOfBirth: `${form.year}-${form.month.padStart(2, "0")}-${form.day.padStart(2, "0")}`,
        mobile: form.phone,
        country: form.country,
        city: form.city,
      };

      await api.put(`/users/${id}`, payload);
      setSuccess("User updated successfully!");
      setErrors({});
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Failed to update user" });
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
              <div className="dashboard-box user-form-wrap">
                <h4>User Edit Details</h4>
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* First Name */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First name</label>
                        <input
                          name="firstname"
                          className="form-control"
                          type="text"
                          value={form.firstname}
                          onChange={handleChange}
                        />
                        {errors.firstname && <div style={{ color: "red", fontSize: 12 }}>{errors.firstname}</div>}
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last name</label>
                        <input
                          name="lastname"
                          className="form-control"
                          type="text"
                          value={form.lastname}
                          onChange={handleChange}
                        />
                        {errors.lastname && <div style={{ color: "red", fontSize: 12 }}>{errors.lastname}</div>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          name="email"
                          className="form-control"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        {errors.email && <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>}
                      </div>
                    </div>

                    {/* DOB */}
                    <div className="col-sm-6">
                      <label>Date of Birth</label>
                      <div className="row">
                        <div className="col-sm-4">
                          <select name="day" value={form.day} onChange={handleChange}>
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <select name="month" value={form.month} onChange={handleChange}>
                            <option value="">Month</option>
                            {["January","February","March","April","May","June","July","August","September","October","November","December"]
                              .map((m, idx) => (
                                <option key={idx + 1} value={idx + 1}>{m}</option>
                              ))}
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <select name="year" value={form.year} onChange={handleChange}>
                            <option value="">Year</option>
                            {Array.from({ length: 56 }, (_, i) => 2025 - i).map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.dob && <div style={{ color: "red", fontSize: 12 }}>{errors.dob}</div>}
                    </div>

                    {/* Mobile */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                          name="phone"
                          className="form-control"
                          type="text"
                          value={form.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && <div style={{ color: "red", fontSize: 12 }}>{errors.phone}</div>}
                      </div>
                    </div>

                    {/* Country */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          name="country"
                          className="form-control"
                          type="text"
                          value={form.country}
                          onChange={handleChange}
                        />
                        {errors.country && <div style={{ color: "red", fontSize: 12 }}>{errors.country}</div>}
                      </div>
                    </div>

                    {/* City */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          name="city"
                          className="form-control"
                          type="text"
                          value={form.city}
                          onChange={handleChange}
                        />
                        {errors.city && <div style={{ color: "red", fontSize: 12 }}>{errors.city}</div>}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="button-primary">
                    Save Changes
                  </button>
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

export default UserEdit;
