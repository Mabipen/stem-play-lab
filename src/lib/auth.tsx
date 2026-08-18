'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiGet, apiPost, ApiError } from './api';
import type { User } from './types';

interface RegisterInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<User>;
  register: (data: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const currentUser = await apiGet<User>('/api/user');
      setUser(currentUser);
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 401)) {
        console.error(error);
      }
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email: string, password: string, remember = false) => {
    const { user: loggedInUser } = await apiPost<{ user: User }>('/api/login', { email, password, remember });
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    const { user: newUser } = await apiPost<{ user: User }>('/api/register', data);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await apiPost('/api/logout');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
