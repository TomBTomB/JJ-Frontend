import React, { useCallback } from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Home, Person } from '@mui/icons-material'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

export type SideBarProps = {
  mobileOpen: boolean
  onSideBarToggle: () => void
}

export type ItemProps = {
  title: string,
  path: string,
  iconComponent: React.ComponentType,
}

const items: ItemProps[] = [
  {
    title: 'Home',
    path: '/',
    iconComponent: Home,
  },
  {
    title: 'Profile',
    path: '/profile',
    iconComponent: Person,
  },
]

const drawerWidth = 240

const SideBarItem = ({path, title, iconComponent}: ItemProps) => {
  const Icon = iconComponent
  const navigate = useNavigate()

  const handleClick = useCallback(() => navigate(path), [path])

  return (
    <ListItem key={path} disablePadding onClick={handleClick}>
      <ListItemButton>
        <ListItemIcon>
          <Icon/>
        </ListItemIcon>
        <ListItemText primary={title}/>
      </ListItemButton>
    </ListItem>
  )

}

export const SideBar = ({mobileOpen, onSideBarToggle}: SideBarProps) => {
  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" fontFamily="">
          Jibber Jabber
        </Typography>
      </Toolbar>
      <List>
        {items.map((item) => <SideBarItem key={item.path} {...item}/>)}
      </List>
    </>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onSideBarToggle}
        ModalProps={{keepMounted: true}}
        sx={{
          display: {xs: 'block', sm: 'none'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {xs: 'none', sm: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  )
}
