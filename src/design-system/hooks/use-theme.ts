import { ThemeContext } from "@design-system/theme"
import { AvatarAlias, BorderAlias, ColorAlias, SpacingAlias, alias } from "@design-system/theme/aliases"
import { Size, TextTag } from "@design-system/theme/types"
import get from "lodash.get"
import { useContext } from "react"
import * as tk from "../theme/tokens";

/**
 * Hook to get theme values
*/
export const useTheme = () => {
    const context = useContext(ThemeContext)
  
    /**
     * Get token value from token name
    */
    const getTokenValue = (tokenName: string): string => {
      const tokenValue = tk[tokenName as keyof typeof tk]
      if (!tokenValue) throw new Error(`Token ${tokenName} was not found`)
      return tokenValue.toString()
    }
  
    /**
     * Get color value from palette
    */
    const palette = (c: ColorAlias): string => {
      const tokenName = get(context?.theme.colors, alias("colors", c))
      return getTokenValue(tokenName)
    }
  
    /**
     * Get spacing value from spacing and an optional multiplier
     * that will be applied to the token value
    */
    const spacing = (s: SpacingAlias, multiplier = 1): string => {
      const tokenName = get(context?.theme.spacing, alias("spacing", s))
      const tokenValue = getTokenValue(tokenName)
      const tokenNumber = Number(tokenValue.replace(/[a-z]/g, ''))
      const tokenUnity = tokenValue.replace(/[0-9]./g, '')
      return (multiplier * tokenNumber) + tokenUnity
    }
  
    /**
     * Get border radius value from a size.  In case of sharp UI, the 
     * radius will always be the smallest ("rd-xxs").
     * 
    */
    const radius = (size: Size): string => {
      const getRadiusPrefix = () => {
        const isSharpUI = context?.corners === "sharp"
        return isSharpUI ? "rd-xxs" : ("rd-" + size) as BorderAlias
      }
      const tokenName = get(context?.theme.border, alias("border", getRadiusPrefix()))      
      return getTokenValue(tokenName)
    }
  
    /**
     * Get all token values associated from a tag (h1, h2, h3, ...)
    */
    const text = (tag: TextTag) => {
      const tokens = get(context?.theme.text, tag)
      return Object.fromEntries(Object.entries(tokens || {}).map(([k, v]) => [k, getTokenValue(v)]));
    }
  
    /**
     * Get avatar size
    */
    const avatar = (s: Size): string => {
      const avatarPrefix = ("av-" + s) as AvatarAlias
      const tokenName = get(context?.theme.image, alias("image", avatarPrefix))
      return getTokenValue(tokenName)
    }
    
    /**
     * Get value from theme without aliases
    */
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