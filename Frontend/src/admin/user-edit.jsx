import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import { supabase } from "../supabaseClient";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    role: "user" // Add role field
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        let day = "", month = "", year = "";
        // Assuming dateOfBirth might be stored as date string
        // If not present in schema, ignore or add to schema
        if (data.date_of_birth) { // Assuming date_of_birth in Supabase
          const dob = new Date(data.date_of_birth);
          if (!isNaN(dob)) {
            day = dob.getDate().toString();
            month = (dob.getMonth() + 1).toString();
            year = dob.getFullYear().toString();
          }
        }

        setForm({
          firstname: data.first_name || "",
          lastname: data.last_name || "",
          email: data.email || "",
          day, month, year,
          phone: data.mobile || "",
          country: data.country || "",
          city: data.city || "",
          role: data.role || "user"
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load user data", err);
        setErrors({ api: "Failed to load user data" });
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const updated = { ...prev };
      if (value && updated[name]) {
        delete updated[name];
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updates = {
        first_name: form.firstname,
        last_name: form.lastname,
        email: form.email,
        mobile: form.phone,
        country: form.country,
        city: form.city,
        role: form.role,
        updated_at: new Date()
      };

      // Add date of birth if provided
      if (form.day && form.month && form.year) {
        updates.date_of_birth = `${form.year}-${form.month.padStart(2, "0")}-${form.day.padStart(2, "0")}`;
      }

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setSuccess("User updated successfully!");
      setErrors({});

      // Redirect back to users list after 2 seconds
      setTimeout(() => {
        navigate('/admin/user');
      }, 2000);
    } catch (error) {
      console.error('Update error:', error);
      setErrors({ api: "Failed to update user" });
    }
  };

  if (loading) {
    return (
      <div id="container-wrapper">
        <div id="dashboard" className="dashboard-container">
          <DashboardHeader />
          <DashboardSidebar />
          <div className="db-info-wrap">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              Loading user data...
            </div>
          </div>
        </div>
      </div>
    );
  }

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

                    {/* Role */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          name="role"
                          className="form-control"
                          value={form.role}
                          onChange={handleChange}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    {/* Date of Birth */}
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
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
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
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="button-primary">
                    Save Changes
                  </button>
                  <button type="button" className="button-primary" onClick={() => navigate('/admin/user')}
                    style={{ background: '#ccc', paddingInlineStart: '20px', paddingInlineEnd: '20px', marginLeft: '10px' }}>
                    Cancel
                  </button>
                  {errors.api && <div style={{ color: "red", marginTop: 12 }}>{errors.api}</div>}
                  {success && <div style={{ color: "green", marginTop: 12 }}>{success}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="copyrights">
          Copyright © 2025 Travele. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
