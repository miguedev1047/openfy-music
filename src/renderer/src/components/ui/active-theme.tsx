import { createContext, ReactNode, use, useEffect, useState } from 'react'

const DEFAULT_THEME = 'default'

type ThemeContextType = {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ActiveThemeProvider({
  children,
  initialTheme
}: {
  children: ReactNode
  initialTheme?: string
}) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => localStorage.getItem('active-theme') || initialTheme || DEFAULT_THEME
  )

  useEffect(() => {
    localStorage.setItem('active-theme', activeTheme)
  }, [activeTheme])

  useEffect(() => {
    Array.from(document.body.classList)
      .filter((className) => className.startsWith('theme-'))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith('-scaled')) {
      document.body.classList.add('theme-scaled')
    }
  }, [activeTheme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  const context = use(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeConfig must be used within an ActiveThemeProvider')
  }
  return context
}
