import { useTheme } from "@design-system/theme"
import { Button as MuiButton, alpha } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode,
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    const { children, onClick } = props
    const { palette } = useTheme()
    
    return (
        <MuiButton
            variant="outlined"
            size="small"
            sx={{
                borderColor: alpha(palette("tx-primary"), 0.6),
                color: alpha(palette("tx-primary"), 0.6),
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "2rem",
                "&:hover": {
                    borderColor: alpha(palette("tx-primary"), 0.8),
                    backgroundColor: alpha(palette("tx-primary"), 0.1),
                    color: alpha(palette("tx-primary"), 0.8)
                }
            }}
            onClick={onClick}
        >
            {children}
        </MuiButton>
    )
}