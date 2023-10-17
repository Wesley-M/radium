/**
 * Theme modes
*/
export type ThemeMode = "dark" | "light"

/**
 * Types of corners being used in the app
*/
export type CornerType = "rounded" | "sharp"

/**
 * All color schemes available to use
*/
export type ColorScheme = "default" | "solarized" | "monokai"

/** 
 * Possible size values
*/
export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl"

/** 
 * Common color scale
*/
export type Color = "100" | "200" | "300" | "400" | "500"

/** 
 * Predefined text tags
*/
export type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2"

/** 
 * Size scale structure
*/
export interface SizeScale {
    xxs: string,
    xs: string,
    sm: string,
    md: string,
    lg: string,
    xl: string,
}

/**
 * Color scale structure
*/
export interface ColorScale {
    100: string,
    200: string,
    300: string,
    400: string,
    500: string,
}

export interface Text {
    fontSize: string,
    fontWeight: string,
    color: string,
    fontFamily: string
}

export interface Theme {
    colors: {
        accent: string,
        background: {
            body: string,
            surface: ColorScale
        },
        border: ColorScale,
        button: {
            primary: string,
        },
        text: {
            primary: string,
            secondary: string,
            white: string,
            black: string,
        }
    }
    spacing: {
        stack: SizeScale,
        inline: SizeScale,
    }
    border: {
        radius: SizeScale,
    }
    image: {
        avatar: SizeScale,
    }
    text: {
        h1: Text,
        h2: Text,
        h3: Text,
        h4: Text,
        h5: Text,
        h6: Text,
        body1: Text,
        body2: Text
    }
    components: {
        player: {
            compact: {
                height: string
            }
        },
        sidebar: {
            mini: {
                width: string
            },
            default: {
                width: string
            }
        }
    }
}