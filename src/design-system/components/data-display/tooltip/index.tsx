import { useTheme } from "@design-system/theme";
import { TooltipProps as MuiTooltipProps, SxProps, Tooltip as MuiTooltip } from "@mui/material";
import { Text } from "@design-system/components/data-display/text";

interface TooltipProps extends MuiTooltipProps {
    sx?: SxProps
    enable?: boolean
}

export const Tooltip = (props: TooltipProps) => {
    const { 
        children, 
        sx, 
        enable = true, 
        title, 
        placement = "right",
        ...rest 
    } = props

    const { palette, radius, spacing } = useTheme()
    const isTextTitle = typeof title === "string"

    return (
        <MuiTooltip 
            {...rest}
            enterDelay={250}
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: palette("sr-300"), 
                        border: `2px solid ${palette("sr-400")}`,
                        paddingX: spacing("in-xs"),
                        borderRadius: radius("md"),                        
                        ...sx
                    }
                }
            }}
            title={enable && (isTextTitle ? (
                <Text as="body2" sx={{ color: palette("tx-primary"), fontWeight: 500 }}>
                    {title}
                </Text>
            ) : title)} 
            placement={placement}
        >
            {children}
        </MuiTooltip>
    )
}