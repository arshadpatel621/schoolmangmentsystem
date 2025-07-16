import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, authHelpers, dbHelpers } from './supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'admin', 'teacher', 'student', 'parent'

  useEffect(() => {
    // Check for existing session in AsyncStorage or similar
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // For now, we'll use a simple approach
      // In a real app, you'd store the session in AsyncStorage
      setLoading(false);
    } catch (error) {
      console.error('Error checking user:', error);
      setLoading(false);
    }
  };

  const signIn = async (email, password, selectedRole) => {
    try {
      setLoading(true);
      
      // Query the users table directly
      const { data: userData, error } = await dbHelpers.getUserByEmail(email);
      
      if (error || !userData) {
        return { data: null, error: { message: 'User not found' } };
      }

      // Check if password matches (in production, use proper hashing)
      if (userData.password !== password) {
        return { data: null, error: { message: 'Invalid password' } };
      }

      // Check if role matches
      if (userData.role !== selectedRole) {
        return { data: null, error: { message: 'Invalid role for this user' } };
      }

      // Set user data
      const user = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        linked_id: userData.linked_id
      };

      setUser(user);
      setUserType(userData.role);

      return { data: user, error: null };
      
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true);
      
      // Check if user already exists
      const { data: existingUser } = await dbHelpers.getUserByEmail(email);
      if (existingUser) {
        return { data: null, error: { message: 'User already exists' } };
      }

      // Create new user
      const newUserData = {
        email,
        password, // In production, hash this password
        role: userData.role,
        linked_id: userData.linked_id || null
      };

      const { data, error } = await dbHelpers.createUser(newUserData);
      
      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
      
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setUser(null);
      setUserType(null);
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    userType,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 