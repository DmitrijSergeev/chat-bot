import { createContext } from 'react'

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme'

export const ThemeContext = createContext<ThemeContextPropsType>({
  setTheme: () => {},
  theme: Theme.LIGHT,
})

export type ThemeContextPropsType = {
  setTheme: (theme: Theme) => void
  theme: Theme
}
