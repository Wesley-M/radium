import { useTheme } from "@design-system/theme"
import { Box, Chip, Stack, alpha } from "@mui/material"
import background from "@assets/hero-background.webp"
import { Text } from "@design-system/components/data-display/text"
import { useIsMobile } from "@design-system/hooks"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export const HeroSection = () => {
    const { palette, spacing, theme } = useTheme()
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    
    const transparency = parseFloat(theme("components.hero.transparency"))
    
    const tags = [
        "Workout", 
        "Relax", 
        "Romantic", 
        "Party", 
        "Rock",
        "Funky"
    ]

    return (
        <Stack sx={{ position: "relative" }}>
            <Box
                sx={{ 
                    marginTop: `-${spacing("st-xl", isMobile ? 1.4 : 1.8)}`, 
                    marginLeft: `-${spacing("in-xl", 2)}`,
                    marginRight: `-${spacing("in-md")}`,
                    background: `linear-gradient(0deg, ${alpha(palette("bc-body"), transparency)} 0%, ${alpha(palette("bc-body"), transparency - 0.2)} 100%), url(${background}), 0% / cover no-repeat`,
                    height: 300,
                    filter: "blur(20px) saturate(200%)",
                }}
            />

            <Stack sx={{ position: "absolute" }} gap={spacing("st-xs")}>
                <Text as="h1" isBold noWrap={false}>{t("hero.title")}</Text>
                <Text as="h5" sx={{ opacity: 0.8, fontWeight: 600 }}>{t("hero.subtitle")}</Text>
            </Stack>

            <TagList tags={tags}/>
        </Stack>
    )
}

interface TagListProps {
    tags: string[]
}

const TagList = (props: TagListProps) => {
    const { tags } = props
    const { palette, radius, spacing } = useTheme()
    const navigate = useNavigate()
    
    return (
        <Stack 
            direction="row" 
            sx={{
                marginTop: `-${spacing("st-xl", 1.2)}`,
                marginBottom: spacing("st-md"),
                overflowX: "auto",
                width: "100%",
                position: "relative",
                boxSizing: "border-box",
                "&:hover": {
                    overflowX: "auto",
                },
                paddingBottom: spacing("st-xs"),                
            }}
            gap={spacing("in-xs")}
            marginTop={spacing("st-sm")}
        >
            {tags.map((tag, index) => (
                <Chip 
                    key={index}
                    label={`#${tag}`} 
                    sx={{ 
                        color: palette("tx-primary"), 
                        backgroundColor: alpha(palette("tx-primary"), 0.1),
                        borderRadius: radius("lg")
                    }}
                    clickable
                    onClick={() => navigate(`/discover/${tag}`)}
                />
            ))}
        </Stack>
    )
}