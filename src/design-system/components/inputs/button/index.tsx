import { useTheme } from "@design-system/theme"
import { ButtonProps, Button as MuiButton, SxProps, alpha } from "@mui/material"

export const Button = (props: ButtonProps) => {
    const { palette } = useTheme()
    const { variant = "outlined" } = props

    const baseStyle: SxProps = {
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "2rem",
        whiteSpace: "nowrap"
    }

    const outlinedStyle = {
        ...baseStyle,
        borderColor: alpha(palette("tx-primary"), 0.6),
        color: alpha(palette("tx-primary"), 0.6),
        "&:hover": {
            borderColor: alpha(palette("tx-primary"), 0.8),
            backgroundColor: alpha(palette("tx-primary"), 0.1),
            color: alpha(palette("tx-primary"), 0.8)
        },
    }

    const containedStyle = {
        ...baseStyle,
        backgroundColor: palette("tx-primary"),
        color: palette("bc-body"),
        opacity: 0.9,
        transition: "opacity 0.3s ease",
        "&:hover": {
            opacity: 1,
            backgroundColor: palette("tx-primary"),
            color: palette("bc-body"),
        }
    }

    return (
        <MuiButton
            {...props}
            variant={variant}
            sx={{
                ...(variant === "outlined" ? outlinedStyle : containedStyle),
                ...props.sx
            }}
        />
    )
}