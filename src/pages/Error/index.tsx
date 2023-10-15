import { ErrorIndicator } from "@design-system/components/data-display/error-indicator"
import { Logo } from "@design-system/components/data-display/logo";
import { useTheme } from "@design-system/theme";
import { Stack } from "@mui/material";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError()
    const { palette } = useTheme()
    const navigate = useNavigate()
    
    let errorMessage: string
    if (isRouteErrorResponse(error)) {
        errorMessage = error.data.message || error.statusText
    } else if (error instanceof Error) {
        errorMessage = error.message
    } else if (typeof error === 'string') {
        errorMessage = error
    } else {
        errorMessage = 'Unknown error'
    }

    if (errorMessage.toLowerCase() === "not found") {
        errorMessage = "The page you requested does not exist"
    }

    const errorProps = {
        icon: <Logo style={{ width: "100%", height: "100%", color: "white" }}/>,
        title: "Something went wrong",
        subtitle: errorMessage,
        buttonProps: {
            children: "Home",
            onClick: () => navigate("/")
        },
        iconProps: {
            width: 200,
            height: 80
        },
        enableButton: true
    }

    return (
        <Stack 
            sx={{ 
                width: "100%", 
                height: "100vh", 
                overflow: "hidden", 
                backgroundColor: palette("sr-100"),
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <ErrorIndicator {...errorProps} />
        </Stack>
    )
}