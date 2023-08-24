import { Stack, styled } from "@mui/material"

export const getBackground = (dominantColor: string | null, isFull?: boolean) => {
    if (isFull) {
        return dominantColor ? `linear-gradient(${dominantColor}DD, #000000DD)` : "#000000DD"
    }
    return "#000000DD"
}

export const FullContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isMobile"
})(({ isMobile } : { isMobile: boolean }) => ({
    position: "fixed", 
    right: 0,
    height: "100%",
    width: isMobile ? "100%" : "300px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    color: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
}));

export const PreviewContainer = styled(Stack)`
    position: fixed; 
    bottom: 0;
    height: 60px;
    width: calc(100% - 8px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    color: #F1F1F1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 4px;
    border-radius: 8px;
    padding: 0 16px;
`