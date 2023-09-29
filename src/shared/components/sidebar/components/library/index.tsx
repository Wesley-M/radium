import { Scroll } from "@design-system/components/surfaces/scroll";
import { MiniContext } from "@design-system/components/navigation/base-sidebar/context/mini-context";
import { Card } from "@design-system/components/surfaces/card";
import { useTheme } from "@design-system/theme";
import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import { Station } from "libs/radio-browser-api.types";
import { usePlaylist } from "@hooks/use-playlist";
import { usePlayer } from "@hooks/use-player";
import { Text } from "@design-system/components/data-display/text";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useLibrary } from "@api/index";

export const Library = ({ maxHeight }: {maxHeight: string}) => {
    const library = useLibrary()
    const isMini = useContext(MiniContext)

    if (library.isEmpty() && !isMini) return <EmptyLibraryWarning/>
    
    return (
        <Box 
            sx={{
                marginTop: isMini ? 0 : "1em",
                "& .simplebar-content": {
                    width: isMini ? "fit-content" : "100%"
                }
            }}
        >
            <Scroll maxHeight={maxHeight}>
                <Stack>
                    {library.list().map((station, idx) => (
                        <StationCard key={station.id} index={idx} station={station}/>
                    ))}
                </Stack>
            </Scroll>
        </Box>
    );
}

const EmptyLibraryWarning = () => {
    const { palette, spacing } = useTheme()

    return (
        <Box sx={{ p: 1 }}>
            <Text as="h4" isBold>
                No stations in sight!
            </Text>
            <Text as="h5" sx={{ mt: 1, opacity: 0.7, lineHeight: "1.5em" }} noWrap={false}>
                Add stations to your library by clicking the 
                <FavoriteBorderRoundedIcon 
                    style={{ 
                        verticalAlign: "middle", 
                        color: palette("accent"),
                        margin: `0 ${spacing("in-xxs")}`,
                    }}
                /> 
                on the station card.
            </Text>
        </Box>
    )
}

interface StationCardProps {
    station: Station
    index: number
}

const StationCard = ({ station, index }: StationCardProps) => {
    const isMini = useContext(MiniContext)
    const { spacing } = useTheme()
    
    const playlist = usePlaylist()
    const player = usePlayer()
    const library = useLibrary()

    const playStation = () => {
        playlist?.set(library.list(), index)
        player?.play(true)
    }

    return (
        <Card 
            actionProps={{
                onClick: playStation,
            }}
            contentProps={{
                sx: { gap: spacing("st-xxs") }
            }}
            imageProps={{
                src: station.favicon,
                borderRadius: "sm"
            }}
            variant={isMini ? "thumbnail" : "minimal"}
            title={isMini ? undefined : station.name}
            subtitle={isMini ? undefined : station.tags.join(", ")}
            size={60}
        />
    );
}
