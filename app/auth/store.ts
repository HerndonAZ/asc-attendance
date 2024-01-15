import { toast } from 'react-toastify';
import { create } from 'zustand';

export enum UserRoleTypes {
  user = 'user',
  admin = 'admin',
  editor = 'editor'
}
export interface AuthState {
  user: any;
  profile: any;
  isLoading: boolean;
  userRole: any;
  setUserRole: (userRole: string) => void;
  unsubscribeAuthListener: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userRole: null,
  user: null,
  profile: null,
  isLoading: false,
  setUserRole: (userRole: any) => set({ userRole }),
  unsubscribeAuthListener: () => {}
}));
