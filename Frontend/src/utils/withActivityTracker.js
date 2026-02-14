import React from 'react';

const withActivityTracker = (WrappedComponent, activityType = 'page_visit') => {
  return class extends React.Component {
    componentDidMount() {
      this.trackActivity();
    }

    componentDidUpdate(prevProps) {
      // Track when route changes
      if (this.props.location && prevProps.location &&
        this.props.location.pathname !== prevProps.location.pathname) {
        this.trackActivity();
      }
    }

    trackActivity = () => {
      // Legacy tracking disabled
      /*
      // Only track if user is logged in
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) return;

      const currentUrl = window.location.pathname + window.location.search;
      const pageName = this.getPageName(window.location.pathname);

      fetch(`${process.env.REACT_APP_API_BASE_URL}/activities/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          activityType,
          activityDetails: {
            pageName,
            pageUrl: currentUrl,
            timestamp: new Date().toISOString()
          },
          sessionId: this.getSessionId()
        })
      }).then(res => {
        if (!res.ok) {
          console.error('Failed to track activity');
        }
      }).catch(err => {
        console.error('Activity tracking error:', err);
      });
      */
    };

    getPageName = (pathname) => {
      const pathMap = {
        '/': 'Home',
        '/about': 'About',
        '/contact': 'Contact',
        '/tour-packages': 'Tour Packages',
        '/wishlist-page': 'Wishlist',
        '/gallery': 'Gallery',
        '/blog-archive': 'Blog Archive',
        '/admin/dashboard': 'Admin Dashboard',
        '/admin/user': 'Admin Users',
        '/admin/new-user': 'Admin New User'
      };

      if (pathname.includes('/package-detail/')) return 'Package Detail';
      if (pathname.includes('/booking/')) return 'Booking';
      if (pathname.includes('/blog-single/')) return 'Blog Post';
      if (pathname.includes('/admin/user-edit/')) return 'Admin User Edit';

      return pathMap[pathname] || pathname;
    };

    getSessionId = () => {
      let sessionId = sessionStorage.getItem('userSessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('userSessionId', sessionId);
      }
      return sessionId;
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withActivityTracker;
