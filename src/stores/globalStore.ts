import { create } from "zustand";
import { persist } from "zustand/middleware";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
} | null;

type UserState = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  initializeAuthListener: () => void;
};

let authListenerInitialized = false; // Track initialization outside the store

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      initializeAuthListener: () => {
        if (!authListenerInitialized) {
          authListenerInitialized = true; // Mark listener as initialized
          onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log("User is signed in:", user);
              set({
                user: {
                  uid: user.uid,
                  email: user.email || null,
                  displayName: user.displayName || null,
                  photoURL: user.photoURL || null,
                  phoneNumber: user.phoneNumber || null,
                },
                isAuthenticated: true,
              });
            } else {
              console.log("No user is signed in");
              set({ user: null, isAuthenticated: false });
            }
          });
        }
      },
    }),
    { name: "user-store" }
  )
);
