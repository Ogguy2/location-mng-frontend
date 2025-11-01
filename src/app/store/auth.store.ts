import { create } from "zustand";

const storeUser = create((set) => {
  return {
    user: {
      id: null,
      fullName: null,
      email: null,
    },
    setUser: (userData: any) =>
      set(() => ({
        user: userData,
      })),
  };
});

export const authStore = storeUser;
