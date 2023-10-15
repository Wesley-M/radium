import { Box, IconButton, InputBase, InputBaseProps, Paper, Popper, Stack, alpha } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@design-system/theme";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@design-system/hooks/use-is-mobile";
import { ActionButton } from "@design-system/components/inputs/action-button";
import CloseIcon from '@mui/icons-material/Close';
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { debounce } from "@design-system/utils/debounce";
import { useLocation, useNavigate } from "react-router-dom";

interface SearchFieldProps {
    /** Placeholder text for search input */
    placeholder?: string
    /** [OPTIONAL] Callback when user types on search input */
    onChange?: (text: string) => void
    /** [OPTIONAL] Callback when user resets search input */
    onReset?: () => void
}

export const SearchField = (props: SearchFieldProps) => {
    const { 
        placeholder = "Search...",
        onChange = () => {},
        onReset = () => {}
    } = props

    // Used for popover on mobile
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    // Used for search input
    const [focus, setFocus] = useState(false)
    const [query, setQuery] = useQueryParam('q', withDefault(StringParam, ""))
    const [text, setText] = useState(query)

    // Utilities
    const location = useLocation()
    const navigate = useNavigate()
    const isMobile = useIsMobile("md")
    const { palette } = useTheme()

    /** 
     * Go to search page when typing outside of it
     */
    const handleSearch = (t: string) => {
        if (!t || location.pathname.includes("search")) return
        navigate("/search")
        handleQueryChange(t)
    }

    /**
     * Handle change on text
     */
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value)
        setText(e.target.value)
    }

    /**
     * Handle change on query
     */
    const handleQueryChange = useMemo(() => debounce((t: string) => {
        setQuery(t)
        onChange(t)
    }, 500), [])

    /**
     * Handle reset button click on search input
     */
    const handleReset = () => {
        if (isMobile) handlePopoverClose()
        setText("")
        setQuery("")
        setFocus(false)
        onReset()
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handlePopoverClose()
        }
    }

    /** 
     * Set anchor element for popover on mobile
    */
    const handlePopoverOpen = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPopoverAnchorEl(event?.currentTarget || null)
    }
    
    /** 
     * Remove the anchor element
    */
    const handlePopoverClose = () => {
        setPopoverAnchorEl(null)
    }

    /**
     * Handle focus on search input
     */
    const handleFocus = () => {
        setFocus(true)
    }

    /**
     * Handle blur on search input
     */
    const handleBlur = () => {
        setFocus(false)
    }

    /** 
     * When text changes, update query
    */
    useEffect(() => {
        handleQueryChange(text)
    }, [text])

    /** 
     * When out of search page, reset search input
    */
    useEffect(() => {
        if (!location.pathname.includes("search")) {
            handleReset()
        }
    }, [location])

    const open = Boolean(popoverAnchorEl);

    const search = (
        <StyledSearch focus={focus}>
            <IconWrapper>
                <SearchIcon />
            </IconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                value={text}
                onChange={handleTextChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoFocus={isMobile}
                onKeyDown={handleEnter}
            />
            <IconButton 
                sx={{ display: (focus || query !== "" || isMobile) ? "flex" : "none" }}
                onMouseDown={handleReset}
            >
                <CloseIcon style={{ color: palette("tx-primary") }}/>
            </IconButton>
        </StyledSearch>
    )

    if (isMobile) {
        return (
            <Box>
                <Stack 
                    direction="row"
                    sx={{
                        width: "100%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        visibility: open ? "hidden" : "inherit"
                    }}
                >
                    <ActionButton
                        icon={<SearchIcon />}
                        size="xxs"
                        hoverEffect="opacity"
                        onClick={handlePopoverOpen}
                    />
                </Stack>
                
                <Popper
                    anchorEl={null}
                    open={open}
                    sx={{
                        width: "100%",
                        position: "absolute",
                        zIndex: 1000,
                        padding: "10px 4px",
                        marginTop: "-2px"
                    }}
                    disablePortal
                >
                    <Paper
                        sx={{
                            backgroundColor: palette("sr-100"),
                            width: "100%",
                            maxWidth: "100%",
                            boxShadow: "none",
                            overflow: "hidden",
                            marginTop: "-0.25em"
                        }}
                    >
                        {search}
                    </Paper>
                </Popper>
            </Box>
        )
    }

    return search
}

interface StyledSearchProps {
    children: React.ReactNode
    focus?: boolean
}

const StyledSearch = ({ children, focus }: StyledSearchProps) => {
    const theme = useTheme()
    const isMobile = useIsMobile("md")

    return (
        <Box
            sx={{
                padding: theme.spacing("in-xs"),
                position: 'relative',
                border: `1px solid ${alpha(theme.palette("tx-primary"), 0.1)}`,
                borderRadius: theme.radius("md"),
                backgroundColor: alpha(theme.palette("tx-primary"), 0.1),
                marginRight: theme.spacing("in-sm"),
                marginLeft: 0,
                width: isMobile ? '100%' : '30%',
                minWidth: 300,
                height: isMobile ? 60 : 50,
                maxWidth: isMobile ? 'initial' : 600,
                display: 'flex',
                alignItems: "center",
                '&:hover': {
                    backgroundColor: alpha(theme.palette("tx-primary"), 0.15),
                    border: `1px solid ${alpha(theme.palette("tx-primary"), 0.2)}`,
                },
                ...(focus && {
                    backgroundColor: alpha(theme.palette("tx-primary"), 0.15),
                    border: `1px solid ${alpha(theme.palette("tx-primary"), 0.2)}`,
                })
            }}
        >
            {children}
        </Box>
    )
}

const IconWrapper = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                paddingX: theme.spacing("in-xs"),
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: alpha(theme.palette("tx-primary"), 0.8)
            }}
        >
            {children}
        </Box>
    )
}

const StyledInputBase = (props: InputBaseProps) => {
    const theme = useTheme()
    return (
        <InputBase
            {...props}
            sx={{
                width: '100%',
                color: theme.palette("tx-primary"),
                '& .MuiInputBase-input': {
                    width: '100%'
                },
            }}
        />
    )
}
