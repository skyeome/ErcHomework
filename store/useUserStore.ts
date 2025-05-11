import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  uid: string;
  name: string;
  level: string;
  points: string;
  teacher: boolean;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // AsyncStorage에 저장될 키 이름
      storage: createJSONStorage(() => AsyncStorage), // AsyncStorage 사용
    },
  ),
);
