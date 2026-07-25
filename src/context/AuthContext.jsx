import { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext provides authentication state across the app.
 * Placeholder implementation — will be connected to backend later.
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('subsense_token');
    if (token) {
      // Placeholder: In production, validate token with backend
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = (userData, token) => {
    localStorage.setItem('subsense_token', token);
    setUser({ ...userData, token });
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('subsense_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
