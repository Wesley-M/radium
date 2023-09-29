import { ActionButton } from "@design-system/components/inputs/action-button"
import { TextProps } from "@design-system/components/data-display/text"
import { Title } from "@design-system/components/data-display/title"
import { useTheme } from "@design-system/theme"
import { Size } from "@design-system/theme/types"
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Stack } from "@mui/material"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface SectionProps {
    children?: ReactNode,
    actions?: ReactNode,
    title?: string,
    subtitle?: string,
    titleProps?: TextProps,
    subtitleProps?: TextProps,
    gap?: Size,
    goBack?: string
}

export const Section = (props: SectionProps) => {
    const { 
        actions,
        children, 
        title, 
        subtitle, 
        titleProps, 
        subtitleProps,
        gap = "md",
        goBack
    } = props

    const { spacing } = useTheme()
    const navigate = useNavigate();
    
    return (
        <Stack gap={spacing(`st-${gap}`)}>
            <Stack 
                direction="row" 
                alignItems="flex-end"
                justifyContent="space-between"
            >
                <Stack 
                    direction="row" 
                    gap={spacing("in-sm")} 
                    alignItems="center"
                >
                    {goBack && (
                        <ActionButton
                            icon={<ChevronLeftRoundedIcon/>}
                            onClick={() => navigate(goBack)}
                        />
                    )}

                    <Title 
                        isAbove
                        subtitle={subtitle} 
                        titleProps={{ as: "h2", ...titleProps }}
                        subtitleProps={{ isUppercase: true, ...subtitleProps }}
                    >
                        {title}
                    </Title>
                </Stack>

                <Stack direction="row" gap={spacing("in-sm")}>
                    {actions}
                </Stack>
            </Stack>
            {children}
        </Stack>
    )
}