import { ButtonGroup, RadioGroup } from "@mui/material";
import { SelectionButton } from "@design-system/components/navigation/settings/components/selection-button";
import { USFlagIcon } from "@design-system/assets/USFlagIcon";
import { BRFlagIcon } from "@design-system/assets/BRFlagIcon";
import { useLanguageContext } from "@i18n/context";

export const LanguageSelector = () => {  
    const context = useLanguageContext()

    const handleLanguageSelection = (lang: string) => {
        localStorage.setItem("language", lang)
    }

    return (
        <RadioGroup name="language-selector" defaultValue={context?.language}>
            <ButtonGroup>
                <SelectionButton 
                    value="en" 
                    label="English" 
                    icon={USFlagIcon} 
                    eventToDispatch="language-selection"
                    onSelection={handleLanguageSelection}
                />

                <SelectionButton 
                    value="pt" 
                    label="Português" 
                    icon={BRFlagIcon} 
                    eventToDispatch="language-selection"
                    onSelection={handleLanguageSelection}
                />  
            </ButtonGroup>
        </RadioGroup>
    );
}