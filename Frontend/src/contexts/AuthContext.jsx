// AuthContext.jsx - FIXED VERSION
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase-config';  // Adjust path as needed
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import api from '../utils/api';

const AuthContext = createContext();

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

  // Firebase signup with backend data storage
  const signup = async (email, password, additionalInfo = {}) => {
    try {
      // 1. Create user in Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // 2. Save additional info to Firestore via backend
      await api.post('/auth/register-profile', {
        uid: user.uid,
        email: user.email,
        displayName: `${additionalInfo.firstName} ${additionalInfo.lastName}`,
        ...additionalInfo
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  const signin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const token = await user.getIdToken();
          
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', idTokenResult.claims.role || 'user');
          localStorage.setItem('userId', user.uid);
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('user', user.displayName || user.email);
          
          setCurrentUser(user);
        } catch (error) {
          console.error('Error getting user token:', error);
          setCurrentUser(user);
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('user');
        
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    signin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
