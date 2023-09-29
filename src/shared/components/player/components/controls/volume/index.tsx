import { useDominantColor } from "@hooks/use-dominant-color"
import { usePlayer } from "@hooks/use-player"
import { useTheme } from "@design-system/theme"
import { VolumeDownRounded, VolumeUpRounded } from "@mui/icons-material"
import { Slider, Stack } from "@mui/material"

export const Volume = () => {    
    const { palette } = useTheme()
    const { dominantColor } = useDominantColor()
    const player = usePlayer()

    return (
        <Stack 
          spacing={2} 
          direction="row" 
          sx={{ width: "100%" }} 
          alignItems="center"
        >
          <VolumeDownRounded sx={{ color: palette("tx-primary"), opacity: 0.5 }} />
          <Slider
            onChange={(_e, v) => player?.changeVolume?.(v as number)}
            value={player?.getVolume() || 0}
            aria-label="Volume"
            defaultValue={60}
            sx={{
              color: dominantColor ? dominantColor : palette("tx-primary"),
              '& .MuiSlider-track': {
                border: 'none',
              },
              '&:hover .MuiSlider-track': {
                color: dominantColor,
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
          <VolumeUpRounded sx={{ color: palette("tx-primary"), opacity: 0.5 }} />
        </Stack>
    )
}