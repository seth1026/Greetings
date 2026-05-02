// src/lib/auth.ts
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useUserStore } from '@/store/useUserStore';

export const logoutUser = async () => {
  try {
    await signOut(auth);
    useUserStore.getState().logout();
    window.location.href = '/login';   // Force redirect
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback
    useUserStore.getState().logout();
    window.location.href = '/login';
  }
};