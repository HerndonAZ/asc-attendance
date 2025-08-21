'use client';
import { useQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import React, { createContext, useContext, useMemo } from 'react';
import { useAuthStore } from './store';
import { auth } from '.';

export interface SessionState {
  session: Session | null;
  userRole: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<SessionState>({
  session: null,
  userRole: null,
  isLoading: false
});

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userRole } = useAuthStore();

  const {
    data: session,
    isLoading,
    error
  } = useQuery({
    queryKey: ['session'],
    queryFn: () => auth(),
    retry: false
  });

  const value = useMemo<SessionState>(
    () => ({
      session: session ?? null,
      userRole,
      isLoading
    }),
    [session, userRole, isLoading]
  );

  if (error) {
    return <div>Authentication error</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = (): SessionState => {
  return useContext(AuthContext);
};
