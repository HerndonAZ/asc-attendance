'use client';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { AuthState, useAuthStore } from './store';
import { auth } from '.';
import { useRouter } from 'next/navigation';

// const refresh = () => {
//   window.location.reload();
// };

export const AuthContext = createContext<AuthState | any>(
  useAuthStore.getState()
);

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { setUserRole, userRole, isLoading } = useAuthStore();
  const setProfileState = (profile: any) => useAuthStore.setState({ profile });

  const setProfile = useCallback(
    (profile: any) => {
      setProfileState(profile);
    },
    [setProfileState]
  );

  const router = useRouter();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: () => auth()
  });

  const value = useMemo(
    () => ({
      session: session,
      isLoading,
      userRole,
      setUserRole
    }),
    [session, userRole, setUserRole, isLoading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
