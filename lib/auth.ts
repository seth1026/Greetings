// src/lib/auth.ts
import { supabase } from './supabase';
import { useUserStore } from '@/store/useUserStore';

export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    useUserStore.getState().logout();
    window.location.href = '/login';   // Force redirect
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback
    useUserStore.getState().logout();
    window.location.href = '/login';
  }
};