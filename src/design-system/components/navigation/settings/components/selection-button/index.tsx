import { useTheme } from "@design-system/theme";
import { Button, alpha, useRadioGroup } from "@mui/material";
import { Text } from "@design-system/components/data-display/text";

interface SelectionButtonProps {
    value: string
    label: string
    eventToDispatch: string 
    icon: React.ComponentType<{ color?: string }>    
    onSelection: (value: string) => void
}

/** 
 * An standard button used for settings selection. It dispatches custom
 * events and updates the radio group value which it is part of.
*/
export const SelectionButton = (props: SelectionButtonProps) => {
    const { 
        value, 
        label, 
        eventToDispatch, 
        icon, 
        onSelection 
    } = props

    const { palette, radius, spacing } = useTheme()
    const radioGroup = useRadioGroup()

    /** 
     * Whether the radio button is checked or not
    */
    let checked = false;
    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    /** 
     * When clicked, the radio group value is updated
    */
    const handleSelection = () => {
        onSelection(value)
        window.dispatchEvent(new Event(`${eventToDispatch}-${value}`))
        radioGroup?.onChange?.({target: {value} } as React.ChangeEvent<HTMLInputElement>, value)
    }

    /** 
     * Returns the style for the checked state
    */
    const getCheckedStyle = () => {
        if (!checked) return {}
        return {
            backgroundColor: alpha(palette("accent"), 0.1),
            border: "2px solid",
            borderColor: alpha(palette("accent"), 0.8),
            color: palette("accent"),
            opacity: 1,
            "&:hover": {
                border: "2px solid",
                backgroundColor: alpha(palette("accent"), 0.2),
                borderColor: palette("accent"),
            },
        }
    }
    
    const Icon = icon

    return (
        <Button 
            onClick={handleSelection}
            size="large"
            fullWidth
            disableElevation
            startIcon={<Icon color={checked ? palette("accent") : alpha(palette("tx-primary"), 0.5)}/>}
            sx={{
                boxSizing: "border-box",
                borderRadius: radius("md"),
                textTransform: "capitalize",
                padding: spacing("in-xs", 1.5),
                border: "2px solid",
                borderColor: alpha(palette("tx-primary"), 0.1),
                color: alpha(palette("tx-primary"), 0.5),
                "&:hover": {
                    border: "2px solid",
                    borderColor: alpha(palette("tx-primary"), 0.1),
                    backgroundColor: alpha(palette("tx-primary"), 0.05),
                },
                ...getCheckedStyle()
            }}
            disableRipple
        >
            <Text sx={{ color: "inherit", fontWeight: 500 }}>
                {label}
            </Text>
        </Button>
    )
}