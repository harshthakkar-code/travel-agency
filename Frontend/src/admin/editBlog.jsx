import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";
import uploadImage from "../utils/uploadImage";

const DbEditBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
    tags: "",
    status: "Draft"
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing blog data when component mounts
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/${id}`);
        const blog = response.data;
        
        // Pre-fill form with existing data
        setForm({
          title: blog.title || "",
          author: blog.author || "",
          content: blog.content || "",
          category: blog.category || "",
          tags: blog.tags ? blog.tags.join(", ") : "", // Convert array to comma-separated string
          status: blog.status || "Draft"
        });
        
        // Set existing image if available
        if (blog.image) {
          setImageUrl(blog.image);
        }
        
        setErrors({});
      } catch (err) {
        console.error('Error fetching blog:', err);
        setErrors({ api: "Failed to load blog data" });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Handle change with live validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));

    // Clear this field's error if now valid
    setErrors((prevErrors) => {
      const updated = { ...prevErrors };

      if (name === "title" && newValue.toString().trim() !== "") delete updated.title;
      if (name === "author" && newValue.toString().trim() !== "") delete updated.author;
      if (name === "content" && newValue.toString().trim() !== "") delete updated.content;
      if (name === "category" && newValue) delete updated.category;

      return updated;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setErrors(prev => ({ ...prev, image: undefined }));
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch {
      setErrors(prev => ({ ...prev, image: "Image upload failed" }));
    }
    setUploading(false);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageFile(null);
  };

  // Validation + submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.content.trim()) newErrors.content = "Content is required";
    if (!form.category) newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert tags string to array
    const tagsArray = form.tags
      ? form.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
      : [];

    const data = {
      ...form,
      tags: tagsArray,
      image: imageUrl || ""
    };

    try {
      await api.put(`/blogs/${id}`, data); // Use PUT for update
      setSuccess("Blog updated successfully!");
      
      // Optional: Navigate back to blog list after successful update
      setTimeout(() => {
        navigate('/admin/blogs');
      }, 2000);
      
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Error updating blog" });
    }
  };

  // Show loading state while fetching blog data
  if (loading) {
    return (
      <div id="container-wrapper">
        <div id="dashboard" className="dashboard-container">
          <DashboardHeader />
          <DashboardSidebar />
          <div className="db-info-wrap db-add-tour-wrap">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h3>Loading blog data...</h3>
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

        <div className="db-info-wrap db-add-tour-wrap">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* FULL WIDTH COLUMN */}
              <div className="col-lg-12">
                {/* Title, Author & Content */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Edit Blog</h4>
                    <div className="form-group">
                      <label>Blog Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={form.title} 
                        onChange={handleChange} 
                        placeholder="Enter blog title"
                      />
                      {errors.title && <div style={{ color: "red", fontSize: "12px" }}>{errors.title}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label>Author</label>
                      <input 
                        type="text" 
                        name="author" 
                        value={form.author} 
                        onChange={handleChange} 
                        placeholder="Enter author name"
                      />
                      {errors.author && <div style={{ color: "red", fontSize: "12px" }}>{errors.author}</div>}
                    </div>

                    <div className="form-group">
                      <label>Content</label>
                      <textarea 
                        name="content" 
                        value={form.content} 
                        onChange={handleChange}
                        rows="15"
                        placeholder="Write your blog content here..."
                      ></textarea>
                      {errors.content && <div style={{ color: "red", fontSize: "12px" }}>{errors.content}</div>}
                    </div>
                  </div>
                </div>

                {/* Category and Tags */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Blog Details</h4>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Category</label>
                          <select name="category" value={form.category} onChange={handleChange}>
                            <option value="">-- Select Category --</option>
                            <option value="Travel Tips">Travel Tips</option>
                            <option value="Destinations">Destinations</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Culture">Culture</option>
                            <option value="Food">Food</option>
                            <option value="Photography">Photography</option>
                            <option value="Budget Travel">Budget Travel</option>
                            <option value="Luxury Travel">Luxury Travel</option>
                          </select>
                          {errors.category && <div style={{ color: "red", fontSize: "12px" }}>{errors.category}</div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Tags</label>
                          <input 
                            type="text" 
                            name="tags" 
                            value={form.tags} 
                            onChange={handleChange} 
                            placeholder="Enter tags separated by commas"
                          />
                          <small style={{ color: "#666", fontSize: "11px" }}>
                            Separate tags with commas (e.g., travel, adventure, tips)
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="dashboard-box">
                  <h4>Featured Image</h4>
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
                        <div style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                          {errors.image}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                {/* <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <h4>Publication Status</h4>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Status</label>
                          <select name="status" value={form.status} onChange={handleChange}>
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Error and Success Messages */}
                {errors.api && <div style={{ color: "red", marginBottom: "10px" }}>{errors.api}</div>}
                {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}

                {/* Action Buttons */}
                <div className="dashboard-box">
                  <div className="custom-field-wrap">
                    <div className="publish-action" style={{ textAlign: 'center', padding: '20px 0' }}>
                      <input 
                        type="submit" 
                        name="update" 
                        value="Save Changes" 
                        style={{
                          backgroundColor: '#28a745',
                          color: 'white',
                          padding: '12px 30px',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s',
                          marginRight: '15px'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                      />
                      <button 
                        type="button"
                        onClick={() => navigate('/admin/blogs')}
                        style={{
                          backgroundColor: '#6c757d',
                          color: 'white',
                          padding: '12px 30px',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="copyrights">
          Copyright © 2021 Travele. All rights reserveds.
        </div>
      </div>
    </div>
  );
};

export default DbEditBlog;
