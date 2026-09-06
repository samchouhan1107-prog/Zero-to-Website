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

const AUTH_STORAGE_KEY = 'wz_storehouse_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    (async () => {
      try {
        // Try API session first
        const apiUser = await authService.getCurrentUser();
        if (apiUser) {
          setUser(apiUser);
          setIsLoading(false);
          return;
        }
      } catch {}

      // Fallback to localStorage
      try {
        const saved = localStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) setUser(JSON.parse(saved));
      } catch {}

      setIsLoading(false);
    })();
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  const login = useCallback((u: AuthUser) => setUser(u), []);

  const logout = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const refreshAuth = useCallback(async () => {
    const apiUser = await authService.getCurrentUser();
    if (apiUser) setUser(apiUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
