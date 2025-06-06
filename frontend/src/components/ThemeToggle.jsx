import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeToggle = ({ className = "" }) => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "night", icon: Monitor, label: "Night" },
  ];

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {theme === "light" && <Sun className="w-5 h-5" />}
        {theme === "dark" && <Moon className="w-5 h-5" />}
        {theme === "night" && <Monitor className="w-5 h-5" />}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
      >
        {themes.map((themeOption) => {
          const IconComponent = themeOption.icon;
          return (
            <li key={themeOption.name}>
              <button
                onClick={() => setTheme(themeOption.name)}
                className={`flex items-center gap-2 ${
                  theme === themeOption.name ? "active" : ""
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {themeOption.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemeToggle;
