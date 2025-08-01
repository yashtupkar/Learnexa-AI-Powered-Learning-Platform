// src/components/ThemeToggle.jsx

import { Moon, Sun } from "lucide-react";
import { useAppTheme } from "../context/AppThemeContext";

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useAppTheme();

  return (
    <div className="dark_mode ">
      <input
        type="checkbox"
        id="darkmode-toggle"
        className="dark_mode_input hidden"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="darkmode-toggle" className="dark_mode_label  ">
        <div className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
          {isDarkMode ? (
            <Moon sm:size={18} size={16} className=" text-zinc-400" />
          ) : (
            <Sun sm:size={18} size={16} className=" text-gray-500" />
          )}
        </div>
      </label>
    </div>
  );
}
