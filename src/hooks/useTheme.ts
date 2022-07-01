import { useEffect, useLayoutEffect, useState } from "react";
import IUseTheme from "../interfaces/hooks/useTheme.interface";

const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
// @ts-ignore
const defaultTheme = window.store.theme;

export const useTheme = (): IUseTheme => {
  const localStorageThemeValue = localStorage.getItem("app-theme");

  const [theme, setTheme] = useState<string>(
    localStorageThemeValue || defaultTheme
  );

  // @ts-ignore
  const handleSetTheme = (value: string) => {
    // @ts-ignore
    window.store.setTheme(value);
    setTheme(value);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);

    window.addEventListener("themeChange", () => {
      // @ts-ignore
      document.documentElement.setAttribute("data-theme", window.store.theme);
    });
  }, [theme]);

  return { theme, setTheme: handleSetTheme };
};
