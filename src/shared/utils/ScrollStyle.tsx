import { useIsMobile } from "@design-system/hooks"
import { useTheme } from "@design-system/theme"
import { alpha } from "@mui/material"

export const ScrollStyle = () => {
    const { palette } = useTheme()

    const isMobile = useIsMobile("md")
    
    const simplebarScrollStyle = `
        /* Dynamic Simplebar scroll styling */
        .simplebar-scrollbar::before {
            background-color: ${alpha(palette("tx-primary"), 0.6)};
        }
    `

    const nativeScrollStyle = `
        /* Style the scrollbar track */
        ::-webkit-scrollbar {
            width: 7px; /* Width of the scrollbar */
            height: 7px;
        }
        
        /* Style the scrollbar handle */
        ::-webkit-scrollbar-thumb {
            background-color: ${alpha(palette("tx-primary"), 0.3)}; /* Transparent white color */
            border-radius: 7px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: ${alpha(palette("tx-primary"), 0.4)}; /* Transparent white color */
        }
        
        /* Style the scrollbar track in Firefox */
        /* Note: Firefox uses a different pseudo-element */
        ::-moz-scrollbar {
            width: 7px; /* Width of the scrollbar */
            height: 7px;
        }
        
        /* Style the scrollbar handle in Firefox */
        /* Note: Firefox uses a different pseudo-element */
        ::-moz-scrollbar-thumb {
            background-color: ${alpha(palette("tx-primary"), 0.3)}; /* Transparent white color */
        }
        
        /* Style the scrollbar track in IE/Edge */
        /* Note: IE/Edge use a different pseudo-element */
        ::-ms-scrollbar {
            width: 7px; /* Width of the scrollbar */
            height: 7px;
        }
        
        /* Style the scrollbar handle in IE/Edge */
        /* Note: IE/Edge use a different pseudo-element */
        ::-ms-scrollbar-thumb {
            background-color: ${alpha(palette("tx-primary"), 0.3)}; /* Transparent white color */
        }
    `

    return (
        <style>
            {isMobile ? simplebarScrollStyle : simplebarScrollStyle + nativeScrollStyle}
        </style>
    )
}