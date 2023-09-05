import { useMediaQuery, useTheme } from "@mui/material"

export const useIsMobile = (s?: "sm" | "md") => {
    const theme = useTheme()
    return useMediaQuery(theme.breakpoints.down(s || "sm"))
}