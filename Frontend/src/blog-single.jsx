import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

const Blog_single = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const { data } = await supabase
          .from('blogs')
          .select('id, title, image, created_at')
          .order('created_at', { ascending: false })
          .limit(5);
        setRecentBlogs(data || []);
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      }
    };
    fetchRecentBlogs();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Recent Post";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper to format title with gradient on the last word
  const renderFormattedTitle = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length <= 1) return <span className="hero-highlight">{title}</span>;
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")} <span className="hero-highlight">{lastWord}</span>
      </>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog-archive?s=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div id="page" className="full-page">
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <h3>Loading blog...</h3>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !blog) {
    return (
      <div id="page" className="full-page">
        <Header />
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <h3 style={{ color: 'red' }}>Blog not found</h3>
          <p>The requested blog post could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="page" className="full-page">
      <Header />

      <main id="content" className="site-main">
        {/* =================== PREMIUM HERO SECTION =================== */}
        <section className="blog-single-hero" style={{
          backgroundImage: `url(${blog.image || '/assets/images/img22.jpg'})`,
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
            background: 'linear-gradient(135deg, rgba(7, 145, 190, 0.88) 0%, rgba(16, 31, 70, 0.88) 100%)',
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 2, color: '#fff' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
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
                  <li>
                    <Link to="/blog-archive" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F56960'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}>
                      Blog
                    </Link>
                  </li>
                  <li style={{ color: 'rgba(255,255,255,0.6)' }}>/</li>
                  <li style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>Article</li>
                </ol>
              </nav>

              <span style={{
                display: 'inline-block',
                padding: '8px 24px',
                background: 'linear-gradient(135deg, #F56960, #f5a623)',
                borderRadius: '50px',
                marginBottom: '25px',
                fontSize: '12px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(245, 105, 96, 0.4)',
                color: '#fff'
              }}>
                {blog.category || "Travel Insight"}
              </span>
              <h1 style={{
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: '900',
                marginBottom: '25px',
                lineHeight: '1.1',
                textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                letterSpacing: '-1px'
              }}>
                {renderFormattedTitle(blog.title)}
              </h1>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                fontSize: '14px',
                opacity: 0.9,
                fontWeight: '600'
              }}>
                <span><i className="far fa-user" style={{ marginRight: '8px' }}></i> {blog.author || "Admin"}</span>
                <span><i className="far fa-calendar-alt" style={{ marginRight: '8px' }}></i> {formatDate(blog.created_at)}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="single-post-page" style={{ padding: '80px 0', background: '#fcfcfc' }}>
          <div className="container">
            <div className="row">
              {/* Blog Content */}
              <div className="col-lg-8">
                <div style={{
                  background: '#fff',
                  borderRadius: '30px',
                  padding: '40px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
                  marginBottom: '40px'
                }}>
                  {/* Article content */}
                  <div className="entry-content" style={{
                    fontSize: '17px',
                    lineHeight: '1.8',
                    color: '#444'
                  }}>
                    {blog.content && blog.content.split('\n').map((para, i) => (
                      <p key={i} style={{ marginBottom: '25px' }}>{para}</p>
                    ))}
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div style={{
                      marginTop: '40px',
                      paddingTop: '30px',
                      borderTop: '1px solid #eee',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <span style={{ fontWeight: '700', color: '#101F46', marginRight: '10px' }}>TAGS:</span>
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          background: '#f0f4f7',
                          color: '#0791BE',
                          padding: '5px 15px',
                          borderRadius: '50px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Sharing */}
                  <div style={{
                    marginTop: '40px',
                    background: '#f8f9fa',
                    borderRadius: '20px',
                    padding: '20px 30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px'
                  }}>
                    <span style={{ fontWeight: '700', color: '#101F46' }}>Share this story:</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {[
                        { icon: 'fa-facebook-f', color: '#3b5998' },
                        { icon: 'fa-twitter', color: '#1da1f2' },
                        { icon: 'fa-linkedin-in', color: '#0077b5' },
                        { icon: 'fa-whatsapp', color: '#25d366' }
                      ].map((social, i) => (
                        <a key={i} href="#" style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: social.color,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'transform 0.3s ease'
                        }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                          <i className={`fab ${social.icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Author Section */}
                <div style={{
                  background: '#101F46',
                  borderRadius: '30px',
                  padding: '40px',
                  color: '#fff',
                  display: 'flex',
                  gap: '30px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '60px',
                  boxShadow: '0 20px 40px rgba(16, 31, 70, 0.2)'
                }}>
                  <div style={{ flex: '0 0 100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.1)' }}>
                    <img src="/assets/images/user-img.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Author" />
                  </div>
                  <div style={{ flex: '1' }}>
                    <span className="hero-highlight" style={{ fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Written By</span>
                    <h4 style={{ fontSize: '24px', fontWeight: '800', margin: '5px 0 10px', color: '#fff' }}>{blog.author || "Travele Expert"}</h4>
                    <p style={{ margin: 0, opacity: 0.85, fontSize: '15px', lineHeight: '1.7' }}>
                      Passionate about discovering hidden gems and sharing authentic travel experiences from around the globe.
                    </p>
                  </div>
                </div>
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
                    <form onSubmit={handleSearch} style={{ position: 'relative' }}>
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
                      <button type="submit" style={{
                        position: 'absolute',
                        right: '5px',
                        top: '5px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#0791BE',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                        <i className="fas fa-search"></i>
                      </button>
                    </form>
                  </div>

                  {/* Recent Posts Widget */}
                  <div style={{
                    background: '#fff',
                    borderRadius: '25px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#101F46', marginBottom: '25px', position: 'relative', paddingLeft: '15px' }}>
                      <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '4px', height: '20px', background: '#F56960', borderRadius: '2px' }}></span>
                      Recent Stories
                    </h4>
                    {recentBlogs.map((post) => (
                      <div key={post.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }} className="side-post-item">
                        <Link to={`/blog-single/${post.id}`} style={{ flex: '0 0 80px', height: '80px', borderRadius: '15px', overflow: 'hidden' }}>
                          <img src={post.image || "/assets/images/img22.jpg"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </Link>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#101F46', marginBottom: '5px', lineHeight: '1.4' }}>
                            <Link to={`/blog-single/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{post.title}</Link>
                          </h5>
                          <span style={{ fontSize: '12px', color: '#888' }}>{formatDate(post.created_at)}</span>
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
                    textAlign: 'center',
                    boxShadow: '0 15px 35px rgba(7, 145, 190, 0.2)'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <i className="fas fa-paper-plane" style={{ fontSize: '24px', color: '#fff' }}></i>
                    </div>
                    <h4 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '15px', color: '#fff' }}>Stay Inspired</h4>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '25px', lineHeight: '1.6' }}>Join our community for the latest travel stories and exclusive offers.</p>
                    <div style={{ position: 'relative' }}>
                      <input type="email" placeholder="Email Address" style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '50px',
                        border: 'none',
                        marginBottom: '15px',
                        fontSize: '14px',
                        outline: 'none',
                        background: 'rgba(255,255,255,0.9)',
                        color: '#101F46'
                      }} />
                    </div>
                    <button style={{
                      width: '100%',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #F56960, #f5a623)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 15px rgba(245, 105, 96, 0.3)'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 105, 96, 0.4)';
                    }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 15px rgba(245, 105, 96, 0.3)';
                      }}>SUBSCRIBE NOW</button>
                  </div> */}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <style>{`
        .side-post-item:hover h5 {
          color: #0791BE !important;
        }
        .side-post-item img {
          transition: transform 0.3s ease;
        }
        .side-post-item:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Blog_single;
