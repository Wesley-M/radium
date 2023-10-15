import { usePlayer } from "@design-system/components/player/hooks/use-player"
import { useTheme } from "@design-system/theme"
import { ColorAlias } from "@design-system/utils"
import { VolumeDownRounded, VolumeUpRounded } from "@mui/icons-material"
import { Slider, Stack } from "@mui/material"

interface VolumeProps {
  color?: ColorAlias
}

export const Volume = (props: VolumeProps) => {
    const { color = "tx-primary" } = props    

    const { palette } = useTheme()
    const player = usePlayer()

    return (
        <Stack 
          spacing={2} 
          direction="row" 
          sx={{ width: "100%" }} 
          alignItems="center"
        >
          <VolumeDownRounded sx={{ color: palette(color), opacity: 0.5 }} />
          <Slider
            onChange={(_e, v) => player?.changeVolume?.(v as number)}
            value={player?.getVolume() || 0}
            aria-label="Volume"
            defaultValue={60}
            sx={{
              color: palette(color),
              '& .MuiSlider-track': {
                border: 'none',
              },
              '&:hover .MuiSlider-track': {
                color: palette(color),
                height: "6px",
              },
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded sx={{ color: palette(color), opacity: 0.5 }} />
        </Stack>
    )
}