import { useTheme } from "@design-system/theme"
import { Tabs as MuiTabs, Tab as MuiTab, alpha} from "@mui/material"
import { useState } from "react"

interface TabsProps {
    items: {label: string, value: string}[]
    onChange: (newValue: string) => void
}

export const Tabs = (props: TabsProps) => {
    const { items, onChange } = props

    const { palette } = useTheme()
    const [value, setValue] = useState(items[0].value)

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
        onChange(newValue)
    }

    return (
        <MuiTabs 
            value={value} 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
                '& .MuiTabs-indicator': {
                    backgroundColor: palette("accent"),
                },
                '& .MuiTabs-scrollButtons': {
                    color: palette("accent")
                },
                boxShadow: `inset 0 -1px 0 0 ${alpha(palette("tx-primary"), 0.25)}`
            }}
        >
            {items.map((item, index) => (
                <MuiTab 
                    label={item.label} 
                    value={item.value} 
                    key={index} 
                    sx={{
                        textTransform: "uppercase",
                        color: palette("tx-primary"),
                        opacity: 0.5,
                        fontWeight: "bold",
                        "&.Mui-selected": {
                            color: palette("accent"),
                            opacity: 1
                        }
                    }}
                />
            ))}
        </MuiTabs>
    )
}