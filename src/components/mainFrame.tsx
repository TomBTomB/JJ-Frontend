import React, { ReactNode } from 'react'
import { TopBar } from './topBar'
import { Box } from '@mui/material'
import { SideBar } from './sideBar'
import Toolbar from '@mui/material/Toolbar'

export type MainFrameProps = {
  children: ReactNode
  title: string
}

const drawerWidth = 240

export const MainFrame = ({title, children}: MainFrameProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleSideBarToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{display: 'flex'}}>
      <TopBar title={title} onSideBarToggle={handleSideBarToggle}/>
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
      >
        <SideBar onSideBarToggle={handleSideBarToggle} mobileOpen={mobileOpen}/>
      </Box>
      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
      >
        <Toolbar/>
        {children}
      </Box>
    </Box>
  )
}
