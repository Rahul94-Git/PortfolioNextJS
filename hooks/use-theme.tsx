import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  
  if (!mounted) {
    return {
      theme: undefined,
      toggleTheme: () => {},
      setTheme: () => {}
    }
  }
  
  return {
    theme: resolvedTheme,
    toggleTheme,
    setTheme
  }
}
