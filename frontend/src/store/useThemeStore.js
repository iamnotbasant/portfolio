import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark", // default theme
      availableThemes: ["light", "dark", "night"],

      setTheme: (newTheme) => {
        set({ theme: newTheme });
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", newTheme);
      },

      toggleTheme: () => {
        const { theme, availableThemes } = get();
        const currentIndex = availableThemes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % availableThemes.length;
        const newTheme = availableThemes[nextIndex];

        set({ theme: newTheme });
        document.documentElement.setAttribute("data-theme", newTheme);
      },

      initializeTheme: () => {
        const { theme } = get();
        document.documentElement.setAttribute("data-theme", theme);
      },
    }),
    {
      name: "arkham-theme-storage",
    }
  )
);
