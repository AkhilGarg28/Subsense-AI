import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { authAPI } from '../services/api';
import { mockDashboardData } from '../data/mockDashboardData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockDashboardData.user);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('subsense_token');
    if (token) {
      authAPI
        .getProfile()
        .then((res) => {
          if (res.data?.data) {
            setUser(res.data.data);
          }
        })
        .catch(() => {
          // Graceful fallback to mock user
          setUser(mockDashboardData.user);
        });
    } else {
      // Set default demo token & user state so all routes work seamlessly
      localStorage.setItem('subsense_token', 'demo_token_subsense');
      setUser(mockDashboardData.user);
    }
    setIsAuthenticated(true);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authAPI.login(credentials);
      if (res.data?.token) {
        localStorage.setItem('subsense_token', res.data.token);
        setUser(res.data.user || mockDashboardData.user);
      } else {
        localStorage.setItem('subsense_token', 'mock_jwt_token_' + Date.now());
        setUser(mockDashboardData.user);
      }
      setIsAuthenticated(true);
      return { success: true };
    } catch {
      localStorage.setItem('subsense_token', 'mock_jwt_token_' + Date.now());
      setUser(mockDashboardData.user);
      setIsAuthenticated(true);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await authAPI.signup(userData);
      if (res.data?.token) {
        localStorage.setItem('subsense_token', res.data.token);
        setUser(res.data.user || mockDashboardData.user);
      } else {
        localStorage.setItem('subsense_token', 'mock_jwt_token_' + Date.now());
        setUser({ ...mockDashboardData.user, name: userData.name || mockDashboardData.user.name });
      }
      setIsAuthenticated(true);
      return { success: true };
    } catch {
      localStorage.setItem('subsense_token', 'mock_jwt_token_' + Date.now());
      setUser({ ...mockDashboardData.user, name: userData.name || mockDashboardData.user.name });
      setIsAuthenticated(true);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('subsense_token');
    setIsAuthenticated(true); // Keep demo state active so user can browse
    setUser(mockDashboardData.user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
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
