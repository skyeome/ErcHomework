import { create } from "zustand";

interface DateState {
  date: Date;
  setDate: (date: Date) => void;
}

export const useDateStore = create<DateState>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),
}));
