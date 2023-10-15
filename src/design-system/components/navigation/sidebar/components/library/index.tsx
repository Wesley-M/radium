import { Card } from "@design-system/components/surfaces/card";
import { useTheme } from "@design-system/theme";
import { Box, Stack, Tooltip } from "@mui/material";
import { Station } from "libs/radio-browser-api.types";
import { usePlaylist } from "@design-system/components/player/hooks/use-playlist";
import { usePlayer } from "@design-system/components/player/hooks/use-player";
import { Text } from "@design-system/components/data-display/text";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useLibrary } from "@api/index";
import { useSidebar } from "@design-system/hooks/use-sidebar";
  
export const Library = ({ maxHeight }: {maxHeight: string}) => {
    const library = useLibrary()
    const { isMini } = useSidebar()
    const { spacing } = useTheme()

    if (library.isEmpty() && !isMini) return <EmptyLibraryWarning/>
    
    return (
        <Box 
            sx={{
                marginTop: isMini ? 0 : spacing("st-xs"),
            }}
        >
            <Stack overflow="auto" maxHeight={maxHeight}>
                {library.list().map((station, idx) => (
                    <StationCard key={station.id} index={idx} station={station}/>
                ))}
            </Stack>
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
    const { isMini } = useSidebar()
    const { palette, spacing } = useTheme()
    
    const playlist = usePlaylist()
    const player = usePlayer()
    const library = useLibrary()

    const playStation = () => {
        playlist?.set(library.list(), index)
        player?.play(true)
    }

    const card = (
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
        />
    )

    return (
        <Tooltip 
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: palette("sr-200"), 
                        border: `2px solid ${palette("sr-400")}`,
                        padding: 0
                    }
                }
            }}
            title={isMini && (
                <Card 
                    variant="minimal"
                    title={station.name}
                    subtitle={station.tags.join(", ")}
                    disableAction
                    disableImage
                />
            )} 
            placement="right"
        >
            <div>{card}</div>
        </Tooltip>
    );
}
