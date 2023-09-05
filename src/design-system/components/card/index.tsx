import { DefaultCard } from "@design-system/components/card/variants/default-card"
import { CompactCard } from "@design-system/components/card/variants/compact-card"
import { MinimalCard } from "@design-system/components/card/variants/minimal-card"
import { CardProps } from "@design-system/components/card/variants/base-card"

type MainCardProps = CardProps & {
    variant?: "default" | "compact" | "compact-minimal"
}

export const Card = (props: MainCardProps) => {
    const { 
        variant = "default"
    } = props

    if (variant === "compact-minimal") {
        return <MinimalCard {...props} />
    }

    if (variant === "compact") {
        return <CompactCard {...props} />
    }
    
    return <DefaultCard {...props} />
}