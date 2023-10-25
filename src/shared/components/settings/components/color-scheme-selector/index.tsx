import { useTheme } from "@design-system/theme";
import { RadioGroup, Stack } from "@mui/material";
import { SelectionButton } from "@components/settings/components/selection-button";
import { useTranslation } from "react-i18next";

export const ColorSchemeSelector = () => {
    const { spacing } = useTheme()
    const { t } = useTranslation()
    
    const handleSchemeSelection = (th: string) => {
        localStorage.setItem("colorScheme", th)
    }

    const getStoredColorScheme = () => {
        return localStorage.getItem("colorScheme") || "default"
    }

    return (
        <RadioGroup name="color-scheme-selector" defaultValue={getStoredColorScheme()}>
            <Stack 
                gap={spacing("in-xs")}
                sx={{ width: "100%" }}
            >
                <SelectionButton 
                    value="default" 
                    label={t("settings.schemes.default")}
                    eventToDispatch="colorScheme-selection"
                    onSelection={handleSchemeSelection}
                />

                <SelectionButton 
                    value="solarized" 
                    label={t("settings.schemes.solarized")}
                    eventToDispatch="colorScheme-selection"
                    onSelection={handleSchemeSelection}
                /> 

                <SelectionButton 
                    value="monokai" 
                    label={t("settings.schemes.monokai")}
                    eventToDispatch="colorScheme-selection"
                    onSelection={handleSchemeSelection}
                /> 
            </Stack>
        </RadioGroup>
    );
}