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
          Copyright © 2025 Travele. All rights reserveds.
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
