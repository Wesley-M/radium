import 'simplebar-react/dist/simplebar.min.css'
import '@design-system/components/surfaces/scroll/scroll-style.css'
import { Sidebar } from '@components/sidebar'
import { Player } from '@components/player'
import { Outlet } from 'react-router-dom'

export function App() {    
  return (
    <>
      <Sidebar content={<Outlet/>}/>
      <Player />
    </>
  )
}
  
export default App
  