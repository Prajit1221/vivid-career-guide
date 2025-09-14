import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Token } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: Token, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load auth state from localStorage on app start
    const savedToken = localStorage.getItem('pragati_setu_token');
    const savedUser = localStorage.getItem('pragati_setu_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (tokenData: Token, userData: User) => {
    setToken(tokenData.access_token);
    setUser(userData);
    localStorage.setItem('pragati_setu_token', tokenData.access_token);
    localStorage.setItem('pragati_setu_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('pragati_setu_token');
    localStorage.removeItem('pragati_setu_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('pragati_setu_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};