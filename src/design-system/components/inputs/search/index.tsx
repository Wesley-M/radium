import { Box, InputBase, InputBaseProps, Popover, Stack, alpha } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@design-system/theme";
import { PropsWithChildren, useState } from "react";
import { useIsMobile } from "@design-system/hooks/use-is-mobile";
import { ActionButton } from "@design-system/components/inputs/action-button";

const StyledSearch = ({ children }: PropsWithChildren) => {
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
                '&:hover': {
                    backgroundColor: alpha(theme.palette("tx-primary"), 0.15),
                    border: `1px solid ${alpha(theme.palette("tx-primary"), 0.2)}`,
                },
                marginRight: theme.spacing("in-sm"),
                marginLeft: 0,
                width: isMobile ? '100%' : '60%',
                minWidth: 300,
                maxWidth: isMobile ? 'initial' : 600,
                display: 'flex',
                alignItems: "center"
            }}
        >
            {children}
        </Box>
    )
}

const SearchIconWrapper = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                paddingX: theme.spacing("in-xs"),
                position: 'absolute',
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
                    paddingLeft: `calc(1em + ${theme.spacing("in-md")})`,
                    width: '100%'
                },
            }}
        />
    )
}

interface SearchProps {
    placeholder?: string
    onEnter?: (text: string) => void
}

export const Search = (props: SearchProps) => {
    const { 
        placeholder = "Search...",
        onEnter = () => {}
    } = props

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [text, setText] = useState("")
    const isMobile = useIsMobile("md")

    const { palette } = useTheme()

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            onEnter(text)
        }
    }

    const handleClick = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event?.currentTarget || null)
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const search = (
        <StyledSearch>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={handleKeyDown}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </StyledSearch>
    )

    return (
        <>
            {isMobile ? (
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
                            onClick={handleClick}
                        />
                    </Stack>
                    <Popover 
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            marginRight: "1em",
                            width: "calc(100% - 2em)",
                            "& .MuiPopover-paper": {
                                backgroundColor: palette("sr-100"),
                                width: "100%",
                                maxWidth: "100%",
                                boxShadow: "none",
                                overflow: "hidden",
                                marginTop: "-0.25em"
                            }
                        }}
                    >
                        {search}
                    </Popover>
                </Box>
            ) : (
                <>{search}</>
            )}
        </>
    )
}