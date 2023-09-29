import { DefaultCard } from "@design-system/components/surfaces/card/variants/default-card"
import { CompactCard } from "@design-system/components/surfaces/card/variants/compact-card"
import { MinimalCard } from "@design-system/components/surfaces/card/variants/minimal-card"
import { CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import { ThumbnailCard } from "@design-system/components/surfaces/card/variants/thumbnail-card"

type MainCardProps = CardProps & {
    variant?: "default" | "compact" | "minimal" | "thumbnail"
}

export const Card = (props: MainCardProps) => {
    const { 
        variant = "default"
    } = props

    if (variant === "minimal") {
        return <MinimalCard {...props} />
    }

    if (variant === "thumbnail") {
        return <ThumbnailCard {...props} />
    }

    if (variant === "compact") {
        return <CompactCard {...props} />
    }
    
    return <DefaultCard {...props} />
}