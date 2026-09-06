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

  /**
   * On mount: server is the authoritative source for auth.
   * We attempt to resume session via API /auth/me.
   * localStorage is ONLY used to persist the token for session resume — not as auth source.
   */
  useEffect(() => {
    (async () => {
      // Server is source of truth — validate session against API
      const apiUser = await authService.getCurrentUser();
      if (apiUser && apiUser.method !== 'guest') {
        setUser(apiUser);
      }
      setIsLoading(false);
    })();
  }, []);

  const login = useCallback((u: AuthUser) => {
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const refreshAuth = useCallback(async () => {
    const apiUser = await authService.getCurrentUser();
    if (apiUser && apiUser.method !== 'guest') {
      setUser(apiUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
