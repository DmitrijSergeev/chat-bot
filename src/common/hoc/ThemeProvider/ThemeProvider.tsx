import { ReactNode, useLayoutEffect, useMemo, useState } from 'react'

import { ThemeType } from '@/app/appSlice'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '@/common/hoc/ThemeContext'
import { useAppSelector } from '@/common/hooks/hooks'

let defaultTheme: Theme

type PropsType = {
  children: ReactNode
  initialTheme?: Theme
}

export const ThemeProvider = ({ children, initialTheme }: PropsType) => {
  const themeRedux = useAppSelector<ThemeType>(state => state.app.theme)

  const [theme, setTheme] = useState<Theme>(() => {
    const themeFromStorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null
    const themeFromRedux = themeRedux as Theme

    return initialTheme || themeFromRedux || themeFromStorage || defaultTheme
  })

  useLayoutEffect(() => {
    const activeTheme = theme

    document.documentElement.dataset.theme = activeTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, activeTheme)
  }, [theme])

  const contextValue = useMemo(
    () => ({
      setTheme,
      theme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
