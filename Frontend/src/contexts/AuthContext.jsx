import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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

  const signup = async (email, password, additionalInfo = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName: additionalInfo.firstName,
            lastName: additionalInfo.lastName,
            mobile: additionalInfo.mobile,
            country: additionalInfo.country,
            city: additionalInfo.city,
            role: 'user' // Default role
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear local state
    setCurrentUser(null);
    localStorage.removeItem('userRole');
  };

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (data) {
        localStorage.setItem('userRole', data.role);
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
    }
  };

  // Helper to track activity (Optional: reimplement with Supabase if needed)
  const trackActivity = async () => {
    // activity tracking logic to be migrated to Supabase Edge Functions or plain Insert if needed
    // For now, leaving empty or implementing simple insert
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

