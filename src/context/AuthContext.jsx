import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../data/coursesData';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'eduverse_auth_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading auth session:', e);
    }
    // Default to Krish Jain for seamless logged-in state or initial state
    return INITIAL_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return Boolean(saved);
    } catch (e) {
      return true; // Initial true for quick preview if requested, but login checks it
    }
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user, isAuthenticated]);

  const login = async (email, password) => {
    // Check fixed credentials: demo@eduverse.com / password123
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === 'demo@eduverse.com' && password === 'password123') {
      setUser(INITIAL_USER);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    // Also allow Krish's student email if typed
    if (normalizedEmail === 'krish.jain@bmsit.edu.in' && password === 'password123') {
      setUser(INITIAL_USER);
      setIsAuthenticated(true);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please use demo@eduverse.com and password123.'
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
