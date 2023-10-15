import { ButtonProps, Stack } from "@mui/material"
import { Text } from "@design-system/components/data-display/text"
import { useTheme } from "@design-system/theme"
import { Button } from "@design-system/components/inputs/button"

interface ErrorIndicatorProps {
    title: string
    subtitle?: string
    icon?: React.ReactNode
    iconProps?: {
        width?: number | string
        height?: number | string
    }
    buttonProps?: ButtonProps
    enableButton?: boolean  
}

export const ErrorIndicator = (props: ErrorIndicatorProps) => {
    const { 
        title, 
        subtitle, 
        icon, 
        iconProps,
        buttonProps,
        enableButton = false
    } = props
    
    const { spacing } = useTheme()
    
    return (
        <Stack 
            width="100%" 
            alignItems="center" 
            justifyContent="center"
            gap={spacing("st-md")}
        >
            {icon && (
                <Stack
                    width={iconProps?.width || 80} 
                    height={iconProps?.height || 80} 
                    alignItems="center"
                    justifyContent="center"
                >
                    {icon}
                </Stack>
            )}
            <Stack gap={spacing("st-sm")} alignItems="center">
                <Text 
                    as="h1" 
                    isBold 
                    noWrap={false} 
                    isCentered
                >
                    {title}
                </Text>
                <Text 
                    as="h4" 
                    isBold={false} 
                    noWrap={false}
                    isCentered
                >
                    {subtitle}
                </Text>
                {enableButton && (
                    <Button 
                        {...buttonProps}
                        size="large"
                        variant="contained"
                        sx={{ marginTop: spacing("st-sm"), width: "fit-content" }}
                    />
                )}
            </Stack>
        </Stack>
    )
}
