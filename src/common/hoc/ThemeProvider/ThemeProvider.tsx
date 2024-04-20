import { FC, ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";
import { useAppSelector } from "../../hooks/hooks";
import {ThemeType} from "@/app/appSlice";

let defaultTheme: Theme;

type PropsType = {
  children: ReactNode;
  initialTheme?: Theme;
};

export const ThemeProvider: FC<PropsType> = ({ children, initialTheme }) => {
  const themeRedux = useAppSelector<ThemeType>((state) => state.app.theme);

  const [theme, setTheme] = useState<Theme>(() => {
    const themeFromRedux = themeRedux as Theme;
    const themeFromStorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
    return themeFromRedux || initialTheme || themeFromStorage || defaultTheme;
  });

  useLayoutEffect(() => {
    const activeTheme = theme;
    document.documentElement.dataset.theme = activeTheme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, activeTheme);
  }, [theme]);

  const contextValue = useMemo(
      () => ({
        theme,
        setTheme,
      }),
      [theme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
