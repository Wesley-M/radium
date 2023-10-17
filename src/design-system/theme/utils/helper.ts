import { ColorScheme, ThemeMode } from "@design-system/theme/types"
import defaultLight from "../schemes/default-light.json";
import defaultDark from "../schemes/default-dark.json";
import solarizedLight from "../schemes/solarized-light.json";
import solarizedDark from "../schemes/solarized-dark.json";
import monokaiLight from "../schemes/monokai-light.json";
import monokaiDark from "../schemes/monokai-dark.json";

/**
 * Get user preferred mode (light or dark)
*/
export const getUserPreferredMode = () => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
    if (darkQuery.matches) return "dark"
    return "light"
}

/**
 * Get a theme by mode and color scheme
 */
export const getThemeByModeAndScheme = (mode: ThemeMode, colorScheme: ColorScheme = "default") => {
    switch (mode) {
        case "dark": return _getDarkTheme(colorScheme)
        case "light": return _getLightTheme(colorScheme)
        default: return defaultLight
    }
}

/**
 * Get a stored property from storage
 */
export const getStoredProperty = (prop: string, def: any) => {
    return localStorage.getItem(prop) || def
}

const _getDarkTheme = (scheme: ColorScheme = "default") => {
    switch (scheme) {
        case "solarized": return solarizedDark
        case "monokai": return monokaiDark
        default: return defaultDark
    }
}

const _getLightTheme = (scheme: ColorScheme = "default") => {
    switch (scheme) {
        case "solarized": return solarizedLight
        case "monokai": return monokaiLight
        default: return defaultLight
    }
}