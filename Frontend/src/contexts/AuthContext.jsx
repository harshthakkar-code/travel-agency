import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to generate session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('userSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('userSessionId', sessionId);
    }
    return sessionId;
  };

  // Helper function to track activity
  const trackActivity = async (activityType, activityDetails = {}, token = null) => {
    try {
      const authToken = token || localStorage.getItem('token');
      if (!authToken) return;

      await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/activities/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          activityType,
          activityDetails,
          sessionId: getSessionId()
        })
      });
    } catch (error) {
      console.error('Failed to track activity:', error);
    }
  };

  // Backend signup - no direct Firebase calls
  const signup = async (email, password, additionalInfo = {}) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        firstName: additionalInfo.firstName,
        lastName: additionalInfo.lastName,
        mobile: additionalInfo.mobile,
        country: additionalInfo.country,
        city: additionalInfo.city
      });
      
      // Store token and user info
      const { token, role, uid } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role || 'user');
      localStorage.setItem('userId', uid);
      localStorage.setItem('userEmail', email);
      
      // Track registration activity
      await trackActivity('user_registration', {
        email,
        registrationTime: new Date().toISOString(),
        userRole: role || 'user'
      }, token);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Backend signin - no direct Firebase calls, with activity tracking
  const signin = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      // Store token and user info
      const { token, role, uid, name } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role || 'user');
      localStorage.setItem('userId', uid);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('user', name);

      // Track login activity after successful signin
      await trackActivity('login', {
        email,
        loginTime: new Date().toISOString(),
        userRole: role || 'user'
      }, token);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    // Track logout activity before clearing tokens
    await trackActivity('logout', {
      logoutTime: new Date().toISOString()
    });

    // Clear storage and sign out
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    sessionStorage.removeItem('userSessionId');

    return signOut(auth);
  };

  // Keep the auth state listener for token refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Only refresh token if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
          console.log('User exists and has backend token');
          setCurrentUser(user);
        } else {
          console.log('User exists but no backend token');
          setCurrentUser(null);
        }
      } else {
        console.log('No Firebase user');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    signin,
    logout,
    trackActivity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
