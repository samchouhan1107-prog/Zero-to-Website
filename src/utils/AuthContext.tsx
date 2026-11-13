import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from './authService';
import type { StudentEntitlementSummary } from '../shared/paymentTypes';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  method: 'google' | 'email' | 'guest';
  avatar?: string | null;
}

const DEFAULT_ENTITLEMENT: StudentEntitlementSummary = {
  userId: '',
  hasActiveMonthlyPack: false,
  hasDownloadAccess: false,
  unlockedAllChapters: false,
  status: 'none',
  activeSubscription: null,
  freeChaptersAllowed: ['ch-00'],
};

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  entitlement: StudentEntitlementSummary;
  isEntitlementLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  refreshEntitlement: () => Promise<StudentEntitlementSummary>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  entitlement: DEFAULT_ENTITLEMENT,
  isEntitlementLoading: false,
  login: () => {},
  logout: () => {},
  refreshAuth: async () => {},
  refreshEntitlement: async () => DEFAULT_ENTITLEMENT,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [entitlement, setEntitlement] = useState<StudentEntitlementSummary>(DEFAULT_ENTITLEMENT);
  const [isEntitlementLoading, setIsEntitlementLoading] = useState(false);

  const refreshEntitlement = useCallback(async (): Promise<StudentEntitlementSummary> => {
    setIsEntitlementLoading(true);
    try {
      const res = await authService.fetchEntitlement();
      const next = res?.entitlement || DEFAULT_ENTITLEMENT;
      setEntitlement(next);
      return next;
    } catch {
      setEntitlement(DEFAULT_ENTITLEMENT);
      return DEFAULT_ENTITLEMENT;
    } finally {
      setIsEntitlementLoading(false);
    }
  }, []);

  // Restore session and load live entitlement from server
  useEffect(() => {
    (async () => {
      const saved = await authService.getCurrentUser();
      if (saved) {
        setUser(saved);
      }
      setIsLoading(false);
      await refreshEntitlement();
    })();
  }, [refreshEntitlement]);

  const login = useCallback(
    (u: AuthUser) => {
      setUser(u);
      void refreshEntitlement();
    },
    [refreshEntitlement]
  );

  const logout = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    setEntitlement(DEFAULT_ENTITLEMENT);
  }, []);

  const refreshAuth = useCallback(async () => {
    const saved = await authService.getCurrentUser();
    setUser(saved || null);
    await refreshEntitlement();
  }, [refreshEntitlement]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        entitlement,
        isEntitlementLoading,
        login,
        logout,
        refreshAuth,
        refreshEntitlement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
