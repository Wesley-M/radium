import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import light from "../schemes/light.json";
import dark from "../schemes/dark.json";
import { Size, TextTag, Theme } from "../types";
import get from "lodash.get";
import { ColorAlias, SpacingAlias, BorderAlias, alias, AvatarAlias } from "../../utils";
import * as tk from "../tokens";

export type ThemeMode = "dark" | "light"

interface ThemeContextProps {
  mode: ThemeMode;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null)


interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props
  
  const getThemeByMode = (mode: ThemeMode) => {
    switch (mode) {
      case "dark": return dark
      case "light": return light
      default: return light
    }
  }

  const getUserPreferredMode = () => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
    if (darkQuery.matches) return "dark"
    return "light"
  }

  const savedTheme = (localStorage.getItem("theme") || getUserPreferredMode()) as ThemeMode
  const [ mode, setMode ] = useState<ThemeMode>(savedTheme)
  const [ theme, setTheme ] = useState<Theme>(getThemeByMode(savedTheme))
    
  const turnOnDarkMode = () => {
    setMode("dark")
    setTheme(getThemeByMode("dark"))
  }

  const turnOnLightMode = () => {
    setMode("light")
    setTheme(getThemeByMode("light"))
  }

  const addThemeListeners = () => {
    window.addEventListener('theme-selection-light', turnOnLightMode)
    window.addEventListener('theme-selection-dark', turnOnDarkMode)
  }

  const removeThemeListeners = () => {
    window.removeEventListener('theme-selection-light', turnOnLightMode)
    window.removeEventListener('theme-selection-dark', turnOnDarkMode)
  }

  /** 
   * Start listening to theme selection events
  */
  useEffect(() => {
    addThemeListeners()
    return removeThemeListeners
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}
    

export const useTheme = () => {
  const context = useContext(ThemeContext)

  const getTokenValue = (tokenName: string): string => {
    const tokenValue = tk[tokenName as keyof typeof tk]
    if (!tokenValue) throw new Error(`Token ${tokenName} was not found`)
    return tokenValue
  }

  const palette = (c: ColorAlias): string => {
    const tokenName = get(context?.theme.colors, alias("colors", c))
    return getTokenValue(tokenName)
  }

  const spacing = (s: SpacingAlias, multiplier = 1): string => {
    const tokenName = get(context?.theme.spacing, alias("spacing", s))
    const tokenValue = getTokenValue(tokenName)
    const tokenNumber = Number(tokenValue.replace(/[a-z]/g, ''))
    const tokenUnity = tokenValue.replace(/[0-9]./g, '')
    return (multiplier * tokenNumber) + tokenUnity
  }

  const radius = (r: Size): string => {
    const radiusPrefix = ("rd-" + r) as BorderAlias
    const tokenName = get(context?.theme.border, alias("border", radiusPrefix))
    return getTokenValue(tokenName)
  }

  const text = (tag: TextTag) => {
    const tokens = get(context?.theme.text, tag)
    return Object.fromEntries(Object.entries(tokens || {}).map(([k, v]) => [k, getTokenValue(v)]));
  }

  const avatar = (s: Size): string => {
    const avatarPrefix = ("av-" + s) as AvatarAlias
    const tokenName = get(context?.theme.image, alias("image", avatarPrefix))
    return getTokenValue(tokenName)
  }

  const theme = (path: string) => getTokenValue(get(context?.theme, path))

  return {
    mode: context?.mode,
    theme,
    avatar,
    palette,
    spacing,
    radius,
    text
  }
}