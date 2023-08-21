import { useRadioPlayer } from "./hooks/useRadioPlayer"
import { Player } from "./components/player"
import { useStations } from "./hooks/useStations"
import { Box } from "@mui/material"

function App() {
  const stations = useStations()
  const { station, audioRef, controls } = useRadioPlayer(stations)
  
  return (
    <Box style={{ width: '100%', height: '100vh', background: "url(https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)" }}>
      <Player 
        station={station} 
        audioRef={audioRef}
        controls={controls} 
      />
    </Box>
  )
}
  
export default App
  