import { Typography } from "@mui/material";

interface TagListProps {
    list?: string[] 
}

export const TagList = (props: TagListProps) => {
    const { list } = props
    
    const truncateString = (text?: string, maxLength = 25) =>
        (text?.length || 0) > maxLength ? `${text?.slice(0, maxLength)}...` : text;

    const tags = list?.join(", ")
    const truncatedTags = truncateString(tags)
    
    return (
        <Typography 
            sx={{ 
                textTransform: "uppercase", 
                fontSize: "0.7em", 
                fontWeight: "bold",   
                textAlign: "center", 
                width: 200, 
                color: "#F1F1F1"
            }}
            title={tags}
        >
            {truncatedTags}
        </Typography>
    )
}