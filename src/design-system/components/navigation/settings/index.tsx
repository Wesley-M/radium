import { ActionButton } from "@design-system/components/inputs/action-button"
import { useState } from "react"
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Drawer, Stack } from "@mui/material";
import { useTheme } from "@design-system/theme";
import { Text } from "@design-system/components/data-display/text";
import { LanguageSelector } from "@design-system/components/navigation/settings/components/language-selector";
import { useTranslation } from "react-i18next";
import { ModeSelector } from "@design-system/components/navigation/settings/components/mode-selector";
import { CornerSelector } from "@design-system/components/navigation/settings/components/corner-selector";
import { ColorSchemeSelector } from "@design-system/components/navigation/settings/components/color-scheme-selector";

export const Settings = () => {
    const { palette, radius, spacing } = useTheme()
    const { t } = useTranslation()
    
    // Whether the drawer is open or not
    const [open, setOpen] = useState(false)

    const handleDrawer = (open: boolean) => {    
        setOpen(open)
    }

    const header = (
        <Box sx={{ borderBottom: `2px solid ${palette("sr-300")}` }}>
            <Stack 
                direction="row" 
                sx={{ padding: `${spacing("in-sm", 1.25)} ${spacing("in-sm")}` }}
                justifyContent="space-between"
                alignItems="center"
            >
                <Text as="h4" isBold sx={{ fontWeight: 600 }}>{t("settings.title")}</Text>
                <ActionButton 
                    onClick={() => handleDrawer(false)}
                    icon={<CloseRoundedIcon />}
                    size="xxs"
                />
            </Stack>
        </Box>
    )

    return (
        <>
            <ActionButton 
                onClick={() => handleDrawer(true)}
                icon={<SettingsRoundedIcon />}
                size="xxs"
            />
            <Drawer
                anchor="right"
                open={open}
                onClose={() => handleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': { 
                      backgroundColor: palette("bc-body"), 
                      borderLeft: `2px solid ${palette("sr-300")}`,
                      borderRadius: `${radius("md")} 0 0 ${radius("md")}`,
                      width: 300
                    },
                }}
            >
                {header}
                <Stack sx={{ padding: spacing("in-sm") }} gap={spacing("st-md")}>
                    <Stack gap={spacing("st-xs")}>
                        <Text as="body2" sx={{ opacity: 0.6 }} isUppercase isBold>{t("settings.mode")}</Text>
                        <ModeSelector />
                    </Stack>

                    <Stack gap={spacing("st-xs")}>
                        <Text as="body2" sx={{ opacity: 0.6 }} isUppercase isBold>{t("settings.colorScheme")}</Text>
                        <ColorSchemeSelector />
                    </Stack>

                    <Stack gap={spacing("st-xs")}>
                        <Text as="body2" sx={{ opacity: 0.6 }} isUppercase isBold>{t("settings.language")}</Text>
                        <LanguageSelector />
                    </Stack> 

                    <Stack gap={spacing("st-xs")}>
                        <Text as="body2" sx={{ opacity: 0.6 }} isUppercase isBold>{t("settings.corners")}</Text>
                        <CornerSelector />
                    </Stack>
                </Stack>
            </Drawer>
        </>
    )
}