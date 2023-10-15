import { ButtonGroup, RadioGroup } from "@mui/material";
import { SelectionButton } from "@design-system/components/navigation/settings/components/selection-button";
import { USFlagIcon } from "@design-system/assets/USFlagIcon";
import { BRFlagIcon } from "@design-system/assets/BRFlagIcon";

export const LanguageSelector = () => {    
    const handleLanguageSelection = (lang: string) => {
        localStorage.setItem("language", lang)
    }

    return (
        <RadioGroup name="language-selector" defaultValue="english">
            <ButtonGroup>
                <SelectionButton 
                    value="english" 
                    label="English" 
                    icon={USFlagIcon} 
                    eventToDispatch="language-selection"
                    onSelection={handleLanguageSelection}
                />

                <SelectionButton 
                    value="portuguese" 
                    label="Português" 
                    icon={BRFlagIcon} 
                    eventToDispatch="language-selection"
                    onSelection={handleLanguageSelection}
                />  
            </ButtonGroup>
        </RadioGroup>
    );
}