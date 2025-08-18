import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance with baseURL & token
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

const DbEditPackage = () => {
  const { id } = useParams(); // Package ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    groupSize: "",
    tripDay: "",
    tripNight: "",
    category: "",
    salePrice: "",
    regularPrice: "",
    discount: "",
    destination: "",
    location: "",
    mapUrl: "",
    isPopular: false,
    keywords: "",
    status: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Fetch package details on mount
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data } = await api.get(`/packages/${id}`);
        let tripDay = "", tripNight = "";
        if (data.tripDuration) {
          const matches = data.tripDuration.match(/(\d+)\s*day.*?(\d+)\s*night/i);
          if (matches) {
            tripDay = Number(matches[1]);
            tripNight = Number(matches[2]);
          }
        }
        setForm({
          title: data.title || "",
          description: data.description || "",
          groupSize: data.groupSize || "",
          tripDay,
          tripNight,
          category: data.category || "",
          salePrice: data.salePrice || "",
          regularPrice: data.regularPrice || "",
          discount: data.discount || "",
          destination: data.destination || "",
          location: data.location || "",
          mapUrl: data.mapUrl || "",
          isPopular: data.isPopular || false,
          keywords: data.keywords || "",
          status: data.status || ""
        });
      } catch (err) {
        console.error("Error fetching package:", err);
      }
    };
    fetchPackage();
  }, [id]);

  // Handle change with live validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? value === ""
          ? ""
          : Number(value)
        : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));

    // Clear this field's error if now valid
    setErrors((prevErrors) => {
      const updated = { ...prevErrors };
      if (name === "title" && newValue.toString().trim() !== "") delete updated.title;
      if (name === "description" && newValue.toString().trim() !== "") delete updated.description;
      if (name === "groupSize" && newValue !== "") delete updated.groupSize;
      if (name === "destination" && newValue.toString().trim() !== "") delete updated.destination;

      if (name === "tripDay" || name === "tripNight") {
        const newDay = name === "tripDay" ? newValue : form.tripDay;
        const newNight = name === "tripNight" ? newValue : form.tripNight;
        if (
          newDay !== "" &&
          newNight !== "" &&
          Math.abs(newDay - newNight) <= 1
        ) {
          delete updated.tripDuration;
        }
      }

      if (name === "category" && newValue) delete updated.category;
      if (name === "regularPrice" && newValue !== "") delete updated.regularPrice;
      if (name === "location" && newValue) delete updated.location;
      if (name === "mapUrl" && newValue.toString().trim() !== "") delete updated.mapUrl;

      return updated;
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Validation + submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    let newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.groupSize) newErrors.groupSize = "Group size is required";
    if (form.tripDay === "" || form.tripNight === "") {
      newErrors.tripDuration = "Days and nights are required";
    } else if (Math.abs(form.tripDay - form.tripNight) > 1) {
      newErrors.tripDuration = "Days and nights difference must be 0 or 1";
    }
    if (!form.category) newErrors.category = "Category is required";
    if (!form.regularPrice) newErrors.regularPrice = "Regular price is required";
    if (!form.destination.trim()) newErrors.destination = "Destination is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.mapUrl.trim()) newErrors.mapUrl = "API key is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tripDuration = `${form.tripDay} day / ${form.tripNight} night`;
    const data = { ...form, tripDuration, gallery: imageFile ? [imageFile.name] : [] };

    try {
      await api.put(`/packages/${id}`, data);
      setSuccess("Package updated successfully!");
      setTimeout(() => navigate("/admin/db-package-active"), 1000);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Error updating package" });
    }
  };

  return (
    <div id="container-wrapper">
      <div id="dashboard" className="dashboard-container">
        <DashboardHeader />
        <DashboardSidebar />

        <div className="db-info-wrap db-add-tour-wrap">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* LEFT COLUMN — identical to Add form */}
              <div className="col-lg-8 col-xl-9">
                {/* Title & Description */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" name="title" value={form.title} onChange={handleChange} />
                      {errors.title && <div style={{ color: "red", fontSize: "12px" }}>{errors.title}</div>}
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea name="description" value={form.description} onChange={handleChange}></textarea>
                      {errors.description && <div style={{ color: "red", fontSize: "12px" }}>{errors.description}</div>}
                    </div>
                  </div>
                </div>

                {/* Dates & Prices */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Dates and Prices</h4>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Group Size</label>
                          <input type="number" name="groupSize" value={form.groupSize} onChange={handleChange} placeholder="No of Pax" />
                          {errors.groupSize && <div style={{ color: "red", fontSize: "12px" }}>{errors.groupSize}</div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Trip Duration</label>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group">
                              <input type="number" name="tripDay" value={form.tripDay} onChange={handleChange} placeholder="Days" />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <input type="number" name="tripNight" value={form.tripNight} onChange={handleChange} placeholder="Nights" />
                            </div>
                          </div>
                          {errors.tripDuration && (
                            <div className="col-12">
                              <div style={{ color: "red", fontSize: "12px" }}>{errors.tripDuration}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Category</label>
                          <select name="category" value={form.category} onChange={handleChange}>
                            <option value="">-- Select Category --</option>
                            <option value="Adult">Adult</option>
                            <option value="Child">Child</option>
                            <option value="Couple">Couple</option>
                          </select>
                          {errors.category && <div style={{ color: "red", fontSize: "12px" }}>{errors.category}</div>}
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label>Sale Price</label>
                          <input type="text" name="salePrice" value={form.salePrice} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label>Regular Price</label>
                          <input type="text" name="regularPrice" value={form.regularPrice} onChange={handleChange} />
                          {errors.regularPrice && <div style={{ color: "red", fontSize: "12px" }}>{errors.regularPrice}</div>}
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="form-group">
                          <label>Discount</label>
                          <input type="number" name="discount" value={form.discount} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <div className="dashboard-box">
                  <h4>Gallery</h4>
                  <div className="custom-field-wrap">
                    <div className="dragable-field-inner">
                      <p className="drag-drop-info">Drop Files To Upload</p>
                      <p>or</p>
                      <div className="upload-input">
                        <div className="form-group">
                          <span className="upload-btn">Upload a image</span>
                          <input type="file" name="myfile" onChange={handleFileChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="dashboard-box">
                  <h4>Location</h4>
                  <div className="custom-field-wrap">
                    <div className="row">
                      {/* Destination */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Destination</label>
                          <input
                            type="text"
                            name="destination"
                            value={form.destination}
                            onChange={handleChange}
                          />
                          {errors.destination && <div style={{ color: "red", fontSize: "12px" }}>{errors.destination}</div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Select Map</label>
                          <select name="location" value={form.location} onChange={handleChange}>
                            <option value="">-- Select Map --</option>
                            <option value="Open Street Map">Open Street Map</option>
                            <option value="Google Map">Google Map</option>
                          </select>
                          {errors.location && <div style={{ color: "red", fontSize: "12px" }}>{errors.location}</div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>API key</label>
                          <input type="text" name="mapUrl" value={form.mapUrl} onChange={handleChange} />
                          {errors.mapUrl && <div style={{ color: "red", fontSize: "12px" }}>{errors.mapUrl}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="col-lg-4 col-xl-3">
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Publish</h4>
                    <div className="form-group">
                      <label>Status</label>
                      <select name="status" value={form.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div className="publish-action">
                      <input type="submit" value="Save Changes" />
                    </div>
                  </div>
                </div>

                {/* Popular */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap db-pop-field-wrap">
                    <h4>Popular</h4>
                    <div className="form-group">
                      <label className="custom-input">
                        <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
                        <span className="custom-input-field"></span>
                        Use Popular
                      </label>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="custom-field-wrap db-pop-field-wrap">
                    <h4>Keywords</h4>
                    <div className="form-group">
                      <input type="text" name="keywords" value={form.keywords} onChange={handleChange} placeholder="Keywords" />
                    </div>
                  </div>

                  {/* Category Checkboxes */}
                  <div className="custom-field-wrap db-cat-field-wrap">
                    <h4>Category</h4>
                    <div className="form-group">
                      <label className="custom-input">
                        <input type="checkbox" />
                        <span className="custom-input-field"></span>
                        Hotel
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="custom-input">
                        <input type="checkbox" defaultChecked />
                        <span className="custom-input-field"></span>
                        Walking
                      </label>
                    </div>
                    <div className="add-btn">
                      <a href="#">Add category</a>
                    </div>
                  </div>

                  {/* Add Image */}
                  <div className="custom-field-wrap db-media-field-wrap">
                    <h4>Add image</h4>
                    <div className="upload-input">
                      <div className="form-group">
                        <span className="upload-btn">Upload a image</span>
                        <input type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {errors.api && <div style={{ color: "red", marginTop: "10px" }}>{errors.api}</div>}
            {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
          </form>
        </div>

        <div className="copyrights">
          Copyright © 2021 Travele. All rights reserveds.
        </div>
      </div>
    </div>
  );
};

export default DbEditPackage;
