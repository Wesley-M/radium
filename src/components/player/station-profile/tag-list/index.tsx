import { Typography } from "@mui/material";

interface TagListProps {
    list?: string[]
    size?: string
    thresholdInLetters: number
}

export const TagList = (props: TagListProps) => {
    const { list, size = "0.7em", thresholdInLetters = 20 } = props
    
    const truncateString = (text?: string, maxLength = 20) =>
        (text?.length || 0) > maxLength ? `${text?.slice(0, maxLength)}...` : text;

    const tags = list?.join(", ")
    const truncatedTags = truncateString(tags, thresholdInLetters)
    
    return (
        <Typography 
            sx={{ 
                textTransform: "uppercase", 
                fontSize: size, 
                fontWeight: "bold",   
                width: "fit-content", 
                color: "#F1F1F1"
            }}
            title={tags}
        >
            {truncatedTags}
        </Typography>
    )
}