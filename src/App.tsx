import 'simplebar-react/dist/simplebar.min.css'
import '@design-system/components/surfaces/scroll/scroll-style.css'
import { Sidebar } from '@components/sidebar'
import { Player } from '@components/player'
import { Outlet } from 'react-router-dom'
import { Scroll } from '@design-system/components/surfaces/scroll'

export function App() {    
  return (
    <>
      <Scroll maxHeight="100vh">
        <Sidebar content={<Outlet/>}/>
      </Scroll>
      <Player/>
    </>
  )
}
  
export default App
  