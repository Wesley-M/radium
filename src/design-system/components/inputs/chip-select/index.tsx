import { useTheme } from "@design-system/theme";
import { Chip, Stack } from "@mui/material"
import { useState } from "react";

type ChipSelectProps = {
    items: {label: string, value: string}[];
    onChange?: (value: string[]) => void;
    multiple?: true;
    atLeastOne?: boolean;
  } | {
    items: {label: string, value: string}[];
    onChange?: (value: string) => void;
    multiple?: false;
    atLeastOne?: boolean;
  }

export const ChipSelect = (props: ChipSelectProps) => {
    const { 
        items, 
        onChange, 
        multiple = false,
        atLeastOne = false
    } = props

    const { palette, spacing } = useTheme()
    const [values, setValues] = useState<string[]>([items[0].value])

    const handleOnClick = (v: string) => {
        if (!canSelect(v)) return
        if (multiple) {
            const newValues = values.includes(v) ? values.filter((value) => value !== v) : [...values, v]; 
            (onChange as (v: string[]) => void)?.(newValues)
            setValues(newValues)
        } else {
            const newValues = values.includes(v) ? [] : [v];
            (onChange as (v: string) => void)?.(newValues[0])
            setValues(newValues)
        }
    }

    const canSelect = (v: string) => {
        if (!atLeastOne) return true
        if (atLeastOne && values.length === 1 && values.includes(v)) return false
        return true
    }

    const isSelected = (v: string) => {
        return values.includes(v)
    }

    return (
        <Stack direction="row" gap={spacing("in-xs")}>
            {items.map((item, index) => (
                <Chip 
                    label={item.label}
                    key={index}
                    sx={{
                        color: palette("tx-primary"),
                        backgroundColor: palette(isSelected(item.value) ? "accent" : "sr-300"),
                        border: `2px solid ${isSelected(item.value) ? "transparent" : palette("sr-400")}`,
                        opacity: 0.8,
                        transition: "border 0.2s ease-in-out; background-color 0.2s ease-in-out;",
                        "&:hover": {
                            backgroundColor: palette(isSelected(item.value) ? "accent" : "sr-400"),
                            border: `2px solid ${isSelected(item.value) ? "transparent" : palette("sr-500")}`
                        }
                    }}
                    onClick={() => handleOnClick(item.value)}
                    clickable
                />
            ))}
        </Stack>
    )
}