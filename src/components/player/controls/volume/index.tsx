import { VolumeDownRounded, VolumeUpRounded } from "@mui/icons-material"
import { Slider, Stack } from "@mui/material"
import { useDominantColor } from "../../../../context/dominant-color-context"

interface VolumeProps {
  value: number
  setVolume?: (vol: number) => void
}

export const Volume = (props: VolumeProps) => {    
    const { value, setVolume } = props

    const { dominantColor } = useDominantColor()

    return (
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor="#F1F1F180" />
          <Slider
            onChange={(_e, v) => setVolume?.(v as number)}
            aria-label="Volume"
            defaultValue={value}
            sx={{
              color: dominantColor ? `${dominantColor}AA` : '#F1F1F1',
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
          <VolumeUpRounded htmlColor="#F1F1F180" />
        </Stack>
    )
}