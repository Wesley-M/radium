import { ActionButton } from "@design-system/components/inputs/action-button"
import { TextProps } from "@design-system/components/data-display/text"
import { Title } from "@design-system/components/data-display/title"
import { useTheme } from "@design-system/theme"
import { Size } from "@design-system/theme/types"
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Chip, Stack } from "@mui/material"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

export interface SectionProps {
    /** Content of the section */
    children?: ReactNode
    /** Actions to render on the right */
    actions?: ReactNode
    /** Chip to render on the left */
    chip?: string
    /** Title of the section */
    title?: string
    /** Subtitle of the section */
    subtitle?: string
    /** Properties for the title */
    titleProps?: TextProps
    /** Properties for the subtitle */
    subtitleProps?: TextProps
    /** Gap between the title and the content */
    gap?: Size
    /** Route to go back */
    goBack?: string
    /** Ref for the section */
    innerRef?: (element: HTMLElement | null) => void
    /** Loading state */
    loading?: boolean
    /** Whether to disable loading hints */
    disableLoading?: boolean
}

export const Section = (props: SectionProps) => {
    const { 
        actions,
        chip,
        children, 
        title, 
        subtitle, 
        titleProps, 
        subtitleProps,
        gap = "md",
        goBack,
        innerRef,
        loading = true,
        disableLoading = false
    } = props

    const { palette, radius, spacing } = useTheme()
    const navigate = useNavigate()
    
    return (
        <Stack gap={spacing(`st-${gap}`)} ref={innerRef}>
            <Stack 
                direction="row" 
                alignItems="flex-end"
                justifyContent="space-between"
            >
                <Stack 
                    direction="row" 
                    gap={spacing("in-sm")} 
                    alignItems="center"
                    width="100%"
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
                        titleProps={{ as: "h2", noWrap: false, ...titleProps }}
                        subtitleProps={{ isUppercase: true, ...subtitleProps }}
                        loading={!disableLoading && loading}
                    >
                        {title} {" "}
                        {chip && (
                            <Chip 
                                size="small" 
                                label={chip} 
                                sx={{ 
                                    backgroundColor: palette("accent"),
                                    color: palette("tx-white"),
                                    borderRadius: radius("lg") 
                                }}
                            />
                        )}
                    </Title>
                </Stack>

                <Stack 
                    direction="row" 
                    gap={spacing("in-sm")} 
                    width="fit-content"
                >
                    {actions}
                </Stack>
            </Stack>
            {children}
        </Stack>
    )
}