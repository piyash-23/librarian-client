import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const themevalue = {
    currentTheme: theme,
    setTheme: setTheme,
    themes: ["light", "dark"],
  };
  return <ThemeContext value={themevalue}>{children}</ThemeContext>;
};

export default ThemeProvider;
