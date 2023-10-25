import { Card } from "@design-system/components/surfaces/card";
import { useTheme } from "@design-system/theme";
import { Box } from "@mui/material";
import { Station } from "libs/radio-browser-api.types";
import { usePlaylist } from "@components/player/hooks/use-playlist";
import { usePlayer } from "@components/player/hooks/use-player";
import { Text } from "@design-system/components/data-display/text";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useLibrary } from "@api/index";
import { useSidebar } from "@design-system/hooks/use-sidebar";
import { Trans, useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import { Tooltip } from "@design-system/components/data-display/tooltip";
  
export const Library = ({ maxHeight }: {maxHeight: string}) => {
    const library = useLibrary()
    const { isMini } = useSidebar()
    const { spacing } = useTheme()

    if (library.isEmpty() && !isMini) return <EmptyLibraryWarning/>
    
    return (
        <Box sx={{ marginTop: isMini ? 0 : spacing("st-xs") }}>
            <SimpleBar style={{ maxHeight: maxHeight }}>
                {library.list().map((station, idx) => (
                    <StationCard key={station.id} index={idx} station={station}/>
                ))}
            </SimpleBar>
        </Box>
    );
}

const EmptyLibraryWarning = () => {
    const { palette, spacing } = useTheme()
    const {t} = useTranslation()

    return (
        <Box sx={{ p: 1 }}>
            <Text as="h5" isBold>
                {t("sidebar.library.empty.title")}
            </Text>
            <Text as="h5" sx={{ mt: 1, opacity: 0.7, lineHeight: "1.5em" }} noWrap={false}>
                <Trans t={t} i18nKey="sidebar.library.empty.message" components={[ 
                    <FavoriteBorderRoundedIcon 
                        style={{ 
                            verticalAlign: "middle", 
                            color: palette("accent"),
                            margin: `0 ${spacing("in-xxs")}`,
                        }}
                    />
                ]}/>
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
    const { spacing } = useTheme()
    
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
            sx={{ padding: 0 }}
            enable={isMini}
            title={
                <Card 
                    variant="minimal"
                    title={station.name}
                    subtitle={station.tags.join(", ")}
                    disableAction
                    disableImage
                />
            } 
        >
            <div>{card}</div>
        </Tooltip>
    );
}
