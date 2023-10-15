import { useTheme } from "@design-system/theme"
import { alpha } from "@mui/material"

export const GlobalStyle = () => {
    const { palette } = useTheme()
    
    return (
        <style>
            {`
                html, body {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                
                #root {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                }
                
                /* Style the scrollbar track */
                ::-webkit-scrollbar {
                    width: 6px; /* Width of the scrollbar */
                }
                
                /* Style the scrollbar handle */
                ::-webkit-scrollbar-thumb {
                    background-color: ${alpha(palette("tx-primary"), 0.3)}; /* Transparent white color */
                    border-radius: 6px; /* Rounded corners */
                }
                
                /* Style the scrollbar track in Firefox */
                /* Note: Firefox uses a different pseudo-element */
                ::-moz-scrollbar {
                    width: 6px; /* Width of the scrollbar */
                }
                
                /* Style the scrollbar handle in Firefox */
                /* Note: Firefox uses a different pseudo-element */
                ::-moz-scrollbar-thumb {
                    background-color: ${alpha(palette("tx-primary"), 0.3)}; /* Transparent white color */
                    border-radius: 6px; /* Rounded corners */
                }
                
                /* Style the scrollbar track in IE/Edge */
                /* Note: IE/Edge use a different pseudo-element */
                ::-ms-scrollbar {
                    width: 6px; /* Width of the scrollbar */
                }
                
                /* Style the scrollbar handle in IE/Edge */
                /* Note: IE/Edge use a different pseudo-element */
                ::-ms-scrollbar-thumb {
                    background-color: ${alpha(palette("tx-primary"), 0.3)}; /* Transparent white color */
                    border-radius: 6px; /* Rounded corners */
                }
            `}
        </style>
    )
}