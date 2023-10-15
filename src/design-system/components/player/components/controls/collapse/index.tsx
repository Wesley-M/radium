import { ActionButton } from "@design-system/components/inputs/action-button"
import { ColorAlias } from "@design-system/utils";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface CollapseProps {
    onClick?: () => void
    color?: ColorAlias
}

export const Collapse = (props: CollapseProps) => {
    const { onClick, color = "tx-primary" } = props
        
    return (
        <ActionButton
            icon={<KeyboardArrowDownRoundedIcon/>}
            size="sm"
            hoverEffect="opacity"
            onClick={onClick}
            color={color}
        />
    )
}