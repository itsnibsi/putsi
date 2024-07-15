import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface State {
  isDarkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toggleDarkMode: () => void;
}

type Store = State;

export const useSettingsStore = create<Store>()(
  persist(
    (set) => ({
      isDarkMode: false,
      setDarkMode: (darkMode: boolean) => set({ isDarkMode: darkMode }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
