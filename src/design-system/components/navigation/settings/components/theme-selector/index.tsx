import { useTheme } from "@design-system/theme";
import { RadioGroup, Stack } from "@mui/material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { SelectionButton } from "@design-system/components/navigation/settings/components/selection-button";
import { ComponentType } from "react";

export const ThemeSelector = () => {
    const { mode, spacing } = useTheme()
    
    const handleThemeSelection = (th: string) => {
        localStorage.setItem("theme", th)
    }

    return (
        <RadioGroup name="theme-selector" defaultValue={mode}>
            <Stack 
                gap={spacing("in-xs")}
                direction="row"
                sx={{ width: "100%" }}
            >
                <SelectionButton 
                    value="light" 
                    label="Light" 
                    icon={LightModeRoundedIcon as ComponentType<{ color?: string }>} 
                    eventToDispatch="theme-selection"
                    onSelection={handleThemeSelection}
                />

                <SelectionButton 
                    value="dark" 
                    label="Dark" 
                    icon={DarkModeRoundedIcon as ComponentType<{ color?: string }>} 
                    eventToDispatch="theme-selection"
                    onSelection={handleThemeSelection}
                /> 
            </Stack>
        </RadioGroup>
    );
}