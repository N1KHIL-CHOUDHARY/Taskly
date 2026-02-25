import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService';
import { toast } from '../utils/toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogin = useCallback(
    async (credentials) => {
      const data = await loginUser(credentials);
      setUser(data.user);
      toast.success('Logged in successfully');
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    },
    [navigate, location.state]
  );

  const handleRegister = useCallback(
    async (payload) => {
      const data = await registerUser(payload);
      setUser(data.user);
      toast.success('Account created successfully');
      navigate('/', { replace: true });
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    toast.info('Logged out');
    navigate('/login');
  }, [navigate]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser: fetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
