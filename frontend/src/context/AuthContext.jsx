import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user && !!accessToken;

  const hasRole = useCallback((role) => {
    if (!user) return false;
    if (role === 'admin') return user.role === 'admin';
    if (role === 'user') return user.role === 'user' || user.role === 'admin';
    return false;
  }, [user]);

  const loadStoredAuth = useCallback(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode(storedToken);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          setAccessToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      const { user: userData, accessToken: token } = response.data.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const register = async (data) => {
    setError(null);
    try {
      const response = await authApi.register(data);
      const { user: userData, accessToken: token } = response.data.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const loginWithGoogle = async (credential) => {
    setError(null);
    try {
      const response = await authApi.googleLogin(credential);
      const { user: userData, accessToken: token } = response.data.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Google login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const completeGoogleRedirectLogin = useCallback(async (token) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    try {
      const response = await authApi.me();
      const userData = response.data.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setAccessToken(null);
      setUser(null);
      throw error;
    }
  }, []);

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setAccessToken(null);
      setUser(null);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await authApi.refresh();
      const { accessToken: token, user: userData } = response.data.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setAccessToken(null);
      setUser(null);
      return { success: false };
    }
  };

  const updateProfile = async (data) => {
    setError(null);
    try {
      const response = await authApi.updateProfile(data);
      const { user: userData } = response.data.data;

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Update failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    accessToken,
    isLoading,
    isAuthenticated,
    error,
    hasRole,
    login,
    register,
    loginWithGoogle,
    completeGoogleRedirectLogin,
    logout,
    refreshAccessToken,
    updateProfile,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;
