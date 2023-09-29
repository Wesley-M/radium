import { ActionButton } from "@design-system/components/inputs/action-button"
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface CollapseProps {
    onClick?: () => void
}

export const Collapse = (props: CollapseProps) => {
    const { onClick } = props
        
    return (
        <ActionButton
            icon={<KeyboardArrowDownRoundedIcon/>}
            size="sm"
            hoverEffect="opacity"
            onClick={onClick}
        />
    )
}