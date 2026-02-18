

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";

const BlogArchive = () => {
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const blogsPerPage = 6;
  const location = useLocation();

  // Pick up search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get('s');
    if (s) {
      setSearchQuery(s);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Fetch all blogs to calculate pagination or use count
        const { data, error, count } = await supabase
          .from('blogs')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false });

        if (error) throw error;

        setBlogs(data || []);
        setTotalPages(Math.ceil((count || 0) / blogsPerPage) || 1);

        // Pick top 3 for recent posts
        setRecentBlogs((data || []).slice(0, 3));

        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError('Failed to fetch blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get excerpt from content
  const getExcerpt = (content, length = 120) => {
    if (!content) return "No content available...";
    // Strip HTML if any (though currently simple text)
    const plainText = content.replace(/<[^>]*>?/gm, '');
    return plainText.length > length ? plainText.substring(0, length) + "..." : plainText;
  };

  // Pagination slice
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (blog.content && blog.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Update total pages when filtered blogs change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredBlogs.length / blogsPerPage) || 1);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, blogs.length]);

  return (
    <div id="page" className="full-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="content" className="site-main">
        {/* =================== HERO SECTION =================== */}
        <section className="blog-hero-section" style={{
          backgroundImage: "url(/assets/images/img16.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: '120px',
          paddingBottom: '80px'
        }}>
          <div className="overlay" style={{
            background: 'linear-gradient(135deg, rgba(7, 145, 190, 0.9) 0%, rgba(16, 31, 70, 0.9) 100%)',
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 2, color: '#fff', textAlign: 'center' }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '20px' }}>
              <ol className="breadcrumb" style={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                listStyle: 'none'
              }}>
                <li>
                  <Link to="/" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#F56960'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}>
                    <i className="fas fa-home" style={{ marginRight: '6px' }}></i>Home
                  </Link>
                </li>
                <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
                <li style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Blog</li>
              </ol>
            </nav>

            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              marginBottom: '25px',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <i className="fas fa-feather-alt" style={{ marginRight: '10px' }}></i> Travel Insights
            </span>
            <h1 style={{
              fontSize: '60px',
              fontWeight: '900',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              lineHeight: '1.2',
              letterSpacing: '-1px'
            }}>
              Our Travel <span className="hero-highlight">Journal</span>
            </h1>
            <p style={{
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.95,
              lineHeight: '1.6'
            }}>
              Discover stories, tips, and guides from our expert world travelers. Your next big adventure starts with a single story.
            </p>
          </div>
        </section>

        <div className="archive-section" style={{ padding: '100px 0', background: '#f8f9fa' }}>
          <div className="container">
            <div className="row">
              {/* Blog Posts Column */}
              <div className="col-lg-8">
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div className="spinner-border text-primary" role="status"></div>
                    <h3 className="mt-3">Fetching Stories...</h3>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : currentBlogs.length === 0 ? (
                  <div className="text-center py-5">
                    <h3>{searchQuery ? `No stories found for "${searchQuery}"` : "No blog posts found."}</h3>
                    <button onClick={() => setSearchQuery("")} className="btn-primary-custom" style={{ border: 'none', marginTop: '15px' }}>
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {currentBlogs.map((blog) => (
                      <div key={blog.id} className="col-md-12 mb-5">
                        <article style={{
                          background: '#fff',
                          borderRadius: '25px',
                          overflow: 'hidden',
                          boxShadow: '0 15px 45px rgba(0,0,0,0.07)',
                          display: 'flex',
                          flexDirection: 'row',
                          transition: 'transform 0.3s ease'
                        }} className="blog-card-long">
                          <div style={{
                            flex: '0 0 40%',
                            minHeight: '280px',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            <img
                              src={blog.image || "/assets/images/img22.jpg"}
                              alt={blog.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px',
                              background: '#F56960',
                              color: '#fff',
                              padding: '5px 15px',
                              borderRadius: '5px',
                              fontSize: '12px',
                              fontWeight: '700'
                            }}>
                              {blog.category || "Travel"}
                            </div>
                          </div>
                          <div style={{ padding: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '13px', color: '#888', marginBottom: '10px', display: 'flex', gap: '15px' }}>
                              <span><i className="far fa-calendar-alt" style={{ color: '#0791BE', marginRight: '5px' }}></i> {formatDate(blog.created_at)}</span>
                              <span><i className="far fa-user" style={{ color: '#0791BE', marginRight: '5px' }}></i> {blog.author || "Admin"}</span>
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#101F46', marginBottom: '15px', lineHeight: '1.3' }}>
                              <Link to={`/blog-single/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{blog.title}</Link>
                            </h3>
                            <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                              {getExcerpt(blog.content)}
                            </p>
                            <Link to={`/blog-single/${blog.id}`} style={{
                              color: '#0791BE',
                              fontWeight: '700',
                              fontSize: '14px',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              CONTINUE READING <i className="fas fa-arrow-right"></i>
                            </Link>
                          </div>
                        </article>
                      </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="col-12 mt-4">
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => { setCurrentPage(i + 1); window.scrollTo(0, 400); }}
                              style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                border: currentPage === i + 1 ? 'none' : '1px solid #ddd',
                                background: currentPage === i + 1 ? '#101F46' : '#fff',
                                color: currentPage === i + 1 ? '#fff' : '#101F46',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <aside style={{ position: 'sticky', top: '100px' }}>
                  {/* Search Widget */}
                  <div style={{
                    background: '#fff',
                    borderRadius: '25px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#101F46', marginBottom: '20px' }}>Search</h4>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Search stories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '15px 50px 15px 20px',
                          borderRadius: '50px',
                          border: '1px solid #eee',
                          outline: 'none',
                          fontSize: '14px'
                        }}
                      />
                      <button style={{
                        position: 'absolute',
                        right: '5px',
                        top: '5px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#0791BE',
                        color: '#fff',
                        border: 'none',
                        cursor: 'default'
                      }}>
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>

                  {/* Recent Posts Widget */}
                  <div style={{
                    background: '#fff',
                    borderRadius: '25px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#101F46', marginBottom: '25px' }}>Recent Posts</h4>
                    {recentBlogs.map((blog) => (
                      <div key={blog.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }} className="recent-post-item">
                        <div style={{ flex: '0 0 80px', height: '80px', borderRadius: '15px', overflow: 'hidden' }}>
                          <img src={blog.image || "/assets/images/img22.jpg"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#101F46', marginBottom: '5px', lineHeight: '1.4' }}>
                            <Link to={`/blog-single/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{blog.title}</Link>
                          </h5>
                          <span style={{ fontSize: '12px', color: '#888' }}>{formatDate(blog.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Newsletter Widget */}
                  {/* <div style={{
                    background: 'linear-gradient(135deg, #101F46 0%, #0791BE 100%)',
                    borderRadius: '25px',
                    padding: '35px',
                    color: '#fff',
                    textAlign: 'center'
                  }}>
                    <i className="fas fa-paper-plane" style={{ fontSize: '40px', marginBottom: '20px', opacity: 0.8 }}></i>
                    <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '15px' }}>Stay Updated</h4>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '25px' }}>Get the latest travel stories and tips delivered to your inbox.</p>
                    <input type="email" placeholder="Email Address" style={{
                      width: '100%',
                      padding: '12px 20px',
                      borderRadius: '50px',
                      border: 'none',
                      marginBottom: '15px',
                      fontSize: '14px'
                    }} />
                    <button style={{
                      width: '100%',
                      padding: '12px',
                      background: '#F56960',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}>Subscribe Now</button>
                  </div> */}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <a id="backTotop" href="#" className="to-top-icon">
        <i className="fas fa-chevron-up"></i>
      </a>

    </div>
  );
};

export default BlogArchive;
