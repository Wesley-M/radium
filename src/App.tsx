import { Player } from "./components/player"
import { PlayerProvider } from "./context/player-context"
import { useStations } from "./hooks/useStations"
import { Box } from "@mui/material"

function App() {
  const stations = useStations()
  
  return (
    <PlayerProvider playlist={stations}>
      <Box style={{ width: '100%', height: '100vh' }}>
        <Player/>
      </Box>
    </PlayerProvider>
  )
}
  
export default App
  