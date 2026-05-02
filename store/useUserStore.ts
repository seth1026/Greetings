import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  profilePic: string | null;
  isLoggedIn: boolean;
  isPremium: boolean;

  setName: (name: string) => void;
  setProfilePic: (url: string | null) => void;
  setPremium: (value: boolean) => void;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "Nikhil",
      profilePic: null,
      isLoggedIn: false,
      isPremium: false,

      setName: (name) => set({ name }),
      setProfilePic: (url) => set({ profilePic: url }),
      setPremium: (value) => set({ isPremium: value }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ 
        isLoggedIn: false, 
        isPremium: false, 
        name: "", 
        profilePic: null 
      }),
    }),
    { name: 'user-storage' }
  )
);