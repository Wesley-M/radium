import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { ColorScheme, CornerType, Theme, ThemeMode } from "../types";
import { getStoredProperty, getThemeByModeAndScheme, getUserPreferredMode } from "@design-system/theme/utils";

interface ThemeContextProps {
  mode: ThemeMode
  corners: CornerType
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextProps | null>(null)


interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props

  const savedMode = getStoredProperty("mode", getUserPreferredMode()) as ThemeMode
  const savedCorners = getStoredProperty("corners", "rounded")
  const savedColorScheme = getStoredProperty("colorScheme", "default") as ColorScheme
  
  const [ mode, setMode ] = useState<ThemeMode>(savedMode)
  const [ colorScheme, setColorScheme ] = useState<ColorScheme>(savedColorScheme)
  const [ theme, setTheme ] = useState<Theme>(getThemeByModeAndScheme(savedMode, savedColorScheme))
  const [ corners, setCorners ] = useState<CornerType>(savedCorners as CornerType)

  const setLightMode = useCallback(() => setMode("light"), [])
  const setDarkMode = useCallback(() => setMode("dark"), [])
  const setRoundedCorners = useCallback(() => setCorners("rounded"), [])
  const setSharpCorners = useCallback(() => setCorners("sharp"), [])
  const setDefaultScheme = useCallback(() => setColorScheme("default"), [])
  const setSolarizedScheme = useCallback(() => setColorScheme("solarized"), [])
  const setMonokaiScheme = useCallback(() => setColorScheme("monokai"), [])

  const events = [
    { name: "mode-selection-light", listener: setLightMode },
    { name: "mode-selection-dark", listener: setDarkMode },
    { name: "corners-selection-rounded", listener: setRoundedCorners },
    { name: "corners-selection-sharp", listener: setSharpCorners },
    { name: "colorScheme-selection-default", listener: setDefaultScheme },
    { name: "colorScheme-selection-solarized", listener: setSolarizedScheme },
    { name: "colorScheme-selection-monokai", listener: setMonokaiScheme },
  ]

  const addThemeListeners = () => {
    for (const event of events) {
      window.addEventListener(event.name, event.listener)
    }
  }

  const removeThemeListeners = () => {
    for (const event of events) {
      window.removeEventListener(event.name, event.listener)
    }
  }

  // Start listening for theme selection events
  useEffect(() => {
    addThemeListeners()
    return removeThemeListeners
  }, [])

  // Update theme on mode and color scheme change
  useEffect(() => {
    setTheme(getThemeByModeAndScheme(mode, colorScheme))
  }, [mode, colorScheme])

  return (
    <ThemeContext.Provider value={{ mode, theme, corners }}>
      {children}
    </ThemeContext.Provider>
  )
}