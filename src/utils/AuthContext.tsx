import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from './authService';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  method: 'google' | 'email' | 'guest';
  avatar?: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshAuth: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage (works offline)
  useEffect(() => {
    (async () => {
      const saved = await authService.getCurrentUser();
      if (saved) setUser(saved);
      setIsLoading(false);
    })();
  }, []);

  const login = useCallback((u: AuthUser) => setUser(u), []);

  const logout = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const refreshAuth = useCallback(async () => {
    const saved = await authService.getCurrentUser();
    if (saved) setUser(saved);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
