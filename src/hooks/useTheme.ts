import { useEffect, useLayoutEffect, useState } from "react";
import IUseTheme from "../interfaces/hooks/useTheme.interface";

const defaultTheme = window.store.theme;

export const useTheme = (): IUseTheme => {
  const localStorageThemeValue = localStorage.getItem("app-theme");

  const [theme, setTheme] = useState<string>(
    localStorageThemeValue || defaultTheme
  );

  const handleSetTheme = (value: string) => {
    window.store.setTheme(value);
    setTheme(value);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);

    window.addEventListener("themeChange", () => {
      document.documentElement.setAttribute("data-theme", window.store.theme);
      setTheme(window.store.theme);
    });
  }, [theme]);

  return { theme, setTheme: handleSetTheme };
};
