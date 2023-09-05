export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl"

export type Color = "100" | "200" | "300" | "400" | "500"

export type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2"

export interface SizeScale {
    xxs: string,
    xs: string,
    sm: string,
    md: string,
    lg: string,
    xl: string,
}

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
        background: {
            body: string,
            surface: ColorScale
        },
        accent: string,
        border: ColorScale,
        button: {
            primary: string,
        }
    },
    spacing: {
        stack: SizeScale,
        inline: SizeScale,
    },
    border: {
        radius: SizeScale,
    },
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
}