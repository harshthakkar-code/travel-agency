import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #0791BE 0%, #065a7a 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        boxShadow: '0 4px 20px rgba(7, 145, 190, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 1000,
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(7, 145, 190, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(7, 145, 190, 0.4)';
                    }}
                    aria-label="Scroll to top"
                >
                    <i className="fas fa-chevron-up"></i>
                </button>
            )}

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          button[aria-label="Scroll to top"] {
            bottom: 20px !important;
            right: 20px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 18px !important;
          }
        }
      `}</style>
        </>
    );
};

export default ScrollToTop;
