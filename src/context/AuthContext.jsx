import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // On app load, check for saved token and validate it
  useEffect(() => {
    const token = localStorage.getItem('subsense_token');
    if (token) {
      authAPI
        .getProfile()
        .then((res) => {
          if (res.data?.data) {
            setUser(res.data.data);
            setIsAuthenticated(true);
          } else if (res.data?.user) {
            setUser(res.data.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid — clear it
            localStorage.removeItem('subsense_token');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          // Token expired or invalid
          localStorage.removeItem('subsense_token');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authAPI.login(credentials);
      const token = res.data?.token || res.data?.data?.token;
      const userData = res.data?.user || res.data?.data?.user || res.data?.data;

      if (token) {
        localStorage.setItem('subsense_token', token);
        setUser(userData || null);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: 'Login failed. No token received.' };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await authAPI.signup(userData);
      const token = res.data?.token || res.data?.data?.token;
      const newUser = res.data?.user || res.data?.data?.user || res.data?.data;

      if (token) {
        localStorage.setItem('subsense_token', token);
        setUser(newUser || null);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: 'Signup failed. No token received.' };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('subsense_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
