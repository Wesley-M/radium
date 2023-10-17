import { ButtonGroup, RadioGroup } from "@mui/material";
import { SelectionButton } from "@design-system/components/navigation/settings/components/selection-button";
import FlashOnSharpIcon from '@mui/icons-material/FlashOnSharp';
import WbCloudySharpIcon from '@mui/icons-material/WbCloudySharp';
import { ComponentType } from "react";

export const CornerSelector = () => {  
    const handleCornersSelection = (c: string) => {
        localStorage.setItem("corners", c)
    }

    const getStoredCorners = () => {
        return localStorage.getItem("corners") || "rounded"
    }

    return (
        <RadioGroup name="corners-selector" defaultValue={getStoredCorners}>
            <ButtonGroup>
                <SelectionButton 
                    value="rounded" 
                    label="Rounded" 
                    icon={WbCloudySharpIcon as ComponentType<{ color?: string }>} 
                    eventToDispatch="corners-selection"
                    onSelection={handleCornersSelection}
                />

                <SelectionButton 
                    value={"sharp"} 
                    label="Sharp" 
                    icon={FlashOnSharpIcon as ComponentType<{ color?: string }>} 
                    eventToDispatch="corners-selection"
                    onSelection={handleCornersSelection}
                />  
            </ButtonGroup>
        </RadioGroup>
    );
}