import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DateState {
  date: Date;
  setDate: (date: Date) => void;
}

export const useDateStore = create<DateState>()(
  persist(
    (set) => ({
      date: new Date(),
      setDate: (date) => {
        console.log("Setting new date in store:", date);
        set({ date });
      },
    }),
    {
      name: "date-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        date: state.date.toISOString(),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("Rehydrated date state:", state);
          // ISO 문자열을 Date 객체로 변환
          state.date = new Date(state.date);
        }
      },
    },
  ),
);
