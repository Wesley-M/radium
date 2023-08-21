import { Stack, styled } from "@mui/material";

export const DefaultThumbnail = styled(Stack)`
    width: 200px;
    height: 200px;
    background: #F1F1F1AA;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    & .MuiSvgIcon-root {
        width: 80px;
        height: 80px;
        color: #F1F1F1;
    }
`