import { Text } from "@design-system/components/text"
import { useTheme } from "@design-system/theme"
import { Stack } from "@mui/material"
import { ReactNode } from "react"

interface TitleProps {
    children?: ReactNode,
    above?: string,
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2"
}

export const Title = (props: TitleProps) => {
    const { 
        children, 
        above,
        as="h1"
    } = props

    const { spacing } = useTheme()
    
    return (
        <Stack direction="column" gap={spacing("st-xxs")}>
            { above && <Text isUppercase as="body1">{above}</Text> }
            <Text as={as}>{children}</Text>
        </Stack>
    )
}   