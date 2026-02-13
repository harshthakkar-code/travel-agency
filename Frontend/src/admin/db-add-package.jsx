import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import uploadImage from "../utils/uploadImage";

const DbAddPackage = () => {
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
    status: "",
    program: [], // NEW field for tour program
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

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
      [name]: newValue,
    }));

    // Clear this field's error if now valid
    setErrors((prevErrors) => {
      const updated = { ...prevErrors };

      if (name === "title" && newValue.toString().trim() !== "")
        delete updated.title;
      if (name === "description" && newValue.toString().trim() !== "")
        delete updated.description;
      if (name === "groupSize" && newValue !== "") delete updated.groupSize;
      if (name === "destination" && newValue.toString().trim() !== "")
        delete updated.destination;

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
      if (name === "regularPrice" && newValue !== "")
        delete updated.regularPrice;
      if (name === "location" && newValue) delete updated.location;
      if (name === "mapUrl" && newValue.toString().trim() !== "")
        delete updated.mapUrl;

      return updated;
    });
  };

  // Tour Program handlers
  const addCity = () => {
    setForm((prev) => ({
      ...prev,
      program: [...prev.program, { city: "", activities: [""] }],
    }));
  };

  const removeCity = (cityIndex) => {
    setForm((prev) => ({
      ...prev,
      program: prev.program.filter((_, index) => index !== cityIndex),
    }));
  };

  const updateCityName = (cityIndex, cityName) => {
    setForm((prev) => ({
      ...prev,
      program: prev.program.map((city, index) =>
        index === cityIndex ? { ...city, city: cityName } : city
      ),
    }));
  };

  const addActivity = (cityIndex) => {
    setForm((prev) => ({
      ...prev,
      program: prev.program.map((city, index) =>
        index === cityIndex
          ? { ...city, activities: [...city.activities, ""] }
          : city
      ),
    }));
  };

  const removeActivity = (cityIndex, activityIndex) => {
    setForm((prev) => ({
      ...prev,
      program: prev.program.map((city, index) =>
        index === cityIndex
          ? {
            ...city,
            activities: city.activities.filter(
              (_, idx) => idx !== activityIndex
            ),
          }
          : city
      ),
    }));
  };

  const updateActivity = (cityIndex, activityIndex, activityText) => {
    setForm((prev) => ({
      ...prev,
      program: prev.program.map((city, index) =>
        index === cityIndex
          ? {
            ...city,
            activities: city.activities.map((activity, idx) =>
              idx === activityIndex ? activityText : activity
            ),
          }
          : city
      ),
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setErrors((prev) => ({ ...prev, image: undefined }));
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch {
      setErrors((prev) => ({ ...prev, image: "Image upload failed" }));
    }
    setUploading(false);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
  };

  // Validation + submit
  const handleSubmit = async (e) => {
    console.log("Submit");
    e.preventDefault();
    setErrors({});
    setSuccess("");

    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.groupSize) newErrors.groupSize = "Group size is required";

    if (form.tripDay === "" || form.tripNight === "") {
      newErrors.tripDuration = "Days and nights are required";
    } else if (Math.abs(form.tripDay - form.tripNight) > 1) {
      newErrors.tripDuration = "Days and nights difference must be 0 or 1";
    }

    if (!form.category) newErrors.category = "Category is required";
    if (!form.regularPrice)
      newErrors.regularPrice = "Regular price is required";

    if (!form.destination.trim())
      newErrors.destination = "Destination is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.mapUrl.trim()) newErrors.mapUrl = "API key is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tripDuration = `${form.tripDay} day / ${form.tripNight} night`;

    // Prepare payload. gallery should be text[]
    const payload = {
      title: form.title,
      description: form.description,
      group_size: form.groupSize, // map to snake_case
      trip_duration: tripDuration, // map to snake_case
      category: form.category,
      sale_price: form.salePrice ? Number(form.salePrice) : null, // map to snake_case
      regular_price: form.regularPrice ? Number(form.regularPrice) : null,
      discount: form.discount ? Number(form.discount) : null,
      destination: form.destination,
      location: form.location,
      map_url: form.mapUrl, // map to snake_case
      is_popular: form.isPopular, // map to snake_case
      // keywords: form.keywords, // if in schema? Not in schema I defined earlier. add if needed or ignore. 
      // Schema had: title, description, dates_and_prices, group_size, trip_duration, category, adult_price...
      // Wait, let's match the schema I defined in supabase_schema.sql
      // I defined: title, description, dates_and_prices, group_size, trip_duration, category, adult_price, child_price, couple_price, sale_price, regular_price, discount, gallery, location, map_url, destination, status, program, is_popular.

      status: form.status || 'Pending',
      gallery: imageUrl ? [imageUrl] : [],
      program: form.program // jsonb
    };

    try {
      const { data, error } = await supabase
        .from('packages')
        .insert([payload]);

      if (error) throw error;

      setSuccess("Package added successfully!");
      setForm({
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
        status: "Pending",
        program: [],
      });
      setImageFile(null);
      setImageUrl(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ api: err.message || "Error saving package" });
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
              {/* LEFT COLUMN */}
              <div className="col-lg-8 col-xl-9">
                {/* Title & Description */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                      />
                      {errors.title && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.title}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      ></textarea>
                      {errors.description && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* NEW SECTION: Tour Program */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Tour Program</h4>
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={addCity}
                        className="button-primary"
                      >
                        + Add City
                      </button>
                    </div>

                    {form.program.map((cityData, cityIndex) => (
                      <div
                        key={cityIndex}
                        className="dashboard-box"
                        style={{ marginBottom: "20px" }}
                      >
                        <div className="custom-field-wrap">
                          <div className="row">
                            <div className="col-sm-10">
                              <div className="form-group">
                                <label>City Name</label>
                                <input
                                  type="text"
                                  placeholder="Enter city name (e.g., Ahmedabad)"
                                  value={cityData.city}
                                  onChange={(e) =>
                                    updateCityName(cityIndex, e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-2">
                              <div className="form-group">
                                <label>&nbsp;</label>
                                <button
                                  type="button"
                                  onClick={() => removeCity(cityIndex)}
                                  className="button-primary"
                                  style={{
                                    backgroundColor: "#dc3545",
                                    width: "100%",
                                    fontSize: "12px",
                                    padding: "8px",
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12">
                              <label>Activities</label>
                              {cityData.activities.map(
                                (activity, activityIndex) => (
                                  <div
                                    key={activityIndex}
                                    className="row"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div className="col-sm-10">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          placeholder="Enter activity (e.g., Visit Sabarmati Ashram)"
                                          value={activity}
                                          onChange={(e) =>
                                            updateActivity(
                                              cityIndex,
                                              activityIndex,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-2">
                                      <div className="form-group">
                                        {cityData.activities.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              removeActivity(
                                                cityIndex,
                                                activityIndex
                                              )
                                            }
                                            className="button-primary"
                                            style={{
                                              backgroundColor: "#dc3545",
                                              width: "100%",
                                              padding: "8px",
                                              fontSize: "12px",
                                            }}
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                              <div className="form-group">
                                <button
                                  type="button"
                                  onClick={() => addActivity(cityIndex)}
                                  className="button-primary"
                                  style={{ backgroundColor: "#28a745" }}
                                >
                                  + Add Activity
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates and Prices */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Dates and Prices</h4>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Group Size</label>
                          <input
                            type="number"
                            name="groupSize"
                            value={form.groupSize}
                            onChange={handleChange}
                            placeholder="No of Pax"
                          />
                          {errors.groupSize && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.groupSize}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label>Trip Duration</label>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group">
                              <input
                                type="number"
                                name="tripDay"
                                value={form.tripDay}
                                onChange={handleChange}
                                placeholder="Days"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <input
                                type="number"
                                name="tripNight"
                                value={form.tripNight}
                                onChange={handleChange}
                                placeholder="Nights"
                              />
                            </div>
                          </div>
                          {errors.tripDuration && (
                            <div className="col-12">
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {errors.tripDuration}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Category</label>
                          <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                          >
                            <option value="">-- Select Category --</option>
                            <option value="Adult">Adult</option>
                            <option value="Child">Child</option>
                            <option value="Couple">Couple</option>
                          </select>
                          {errors.category && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.category}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label>Sale Price</label>
                          <input
                            type="text"
                            name="salePrice"
                            value={form.salePrice}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label>Regular Price</label>
                          <input
                            type="text"
                            name="regularPrice"
                            value={form.regularPrice}
                            onChange={handleChange}
                          />
                          {errors.regularPrice && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.regularPrice}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="form-group">
                          <label>Discount</label>
                          <input
                            type="number"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                          />
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
                          <input
                            type="file"
                            name="myfile"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      {uploading && <div>Uploading...</div>}
                      {imageUrl && (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src={imageUrl}
                            alt="Preview"
                            style={{ width: 150, borderRadius: 8 }}
                          />
                          <button
                            type="button"
                            className="button-primary"
                            style={{ marginLeft: 10 }}
                            onClick={handleRemoveImage}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {errors.image && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginTop: "10px",
                          }}
                        >
                          {errors.image}
                        </div>
                      )}
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
                          {errors.destination && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.destination}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Select Map</label>
                          <select
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                          >
                            <option value="">-- Select Map --</option>
                            <option value="Open Street Map">
                              Open Street Map
                            </option>
                            <option value="Google Map">Google Map</option>
                          </select>
                          {errors.location && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>API key</label>
                          <input
                            type="text"
                            name="mapUrl"
                            value={form.mapUrl}
                            onChange={handleChange}
                          />
                          {errors.mapUrl && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.mapUrl}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (unchanged) */}
              <div className="col-lg-4 col-xl-3">
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Publish</h4>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div className="publish-action">
                      <input type="submit" name="publish" value="Publish" />
                    </div>
                  </div>
                </div>

                {/* Popular */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap db-pop-field-wrap">
                    <h4>Popular</h4>
                    <div className="form-group">
                      <label className="custom-input">
                        <input
                          type="checkbox"
                          name="isPopular"
                          checked={form.isPopular}
                          onChange={handleChange}
                        />
                        <span className="custom-input-field"></span>
                        Use Popular
                      </label>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="custom-field-wrap db-pop-field-wrap">
                    <h4>Keywords</h4>
                    <div className="form-group">
                      <input
                        type="text"
                        name="keywords"
                        value={form.keywords}
                        onChange={handleChange}
                        placeholder="Keywords"
                      />
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

            {errors.api && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errors.api}
              </div>
            )}
            {success && (
              <div style={{ color: "green", marginTop: "10px" }}>{success}</div>
            )}
          </form>
        </div>

        <div className="copyrights">
          Copyright © 2025 Travele. All rights reserveds.
        </div>
      </div>
    </div>
  );
};

export default DbAddPackage;
