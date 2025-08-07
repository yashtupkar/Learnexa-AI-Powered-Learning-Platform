// src/context/AppThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppThemeContext = createContext();

export function AppThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode");
      return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    }
    return false;
  });

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark", "bg-gray-800");
      body.classList.remove("bg-white");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      body.classList.remove("dark", "bg-gray-800");
      body.classList.add("bg-white");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
 
   
  };

  return (
    <AppThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (context === undefined) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context;
}
