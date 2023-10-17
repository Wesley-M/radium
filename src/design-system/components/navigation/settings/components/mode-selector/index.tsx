import { useTheme } from "@design-system/theme";
import { RadioGroup, Stack } from "@mui/material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { SelectionButton } from "@design-system/components/navigation/settings/components/selection-button";
import { ComponentType } from "react";
import { useTranslation } from "react-i18next";

export const ModeSelector = () => {
    const { mode, spacing } = useTheme()
    const { t } = useTranslation()
    
    const handleModeSelection = (th: string) => {
        localStorage.setItem("mode", th)
    }

    return (
        <RadioGroup name="mode-selector" defaultValue={mode}>
            <Stack 
                gap={spacing("in-xs")}
                direction="row"
                sx={{ width: "100%" }}
            >
                <SelectionButton 
                    value="light" 
                    label={t("settings.modes.light")}
                    icon={LightModeRoundedIcon as ComponentType<{ color?: string }>} 
                    eventToDispatch="mode-selection"
                    onSelection={handleModeSelection}
                />

                <SelectionButton 
                    value="dark" 
                    label={t("settings.modes.dark")}
                    icon={DarkModeRoundedIcon as ComponentType<{ color?: string }>} 
                    eventToDispatch="mode-selection"
                    onSelection={handleModeSelection}
                /> 
            </Stack>
        </RadioGroup>
    );
}