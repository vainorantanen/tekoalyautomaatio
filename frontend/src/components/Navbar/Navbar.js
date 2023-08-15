import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  createTheme,
  ThemeProvider,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  styled,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
})

const StyledButton = styled(Button)({
  marginLeft: '1rem',
  padding: '0.1rem 1rem 0.1rem 1rem',
  borderRadius: '1rem',
  border: 0,
  fontWeight: 'bold',
  letterSpacing: '0.1rem',
  boxShadow: 'none',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)', }
})

const Navbar = ({ logout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const user = useSelector(({ user }) => user)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} className='menuiconbutton'>
            <MenuIcon />
          </IconButton>
          <div className='nav-buttons'>
            <StyledButton color="inherit" component={Link} to="/">
              Etusivu
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/feed">
                Feed
              </StyledButton>
              <StyledButton color="inherit" component={Link} to="/lisaailmoitus">
                Lisää ilmoitus
              </StyledButton>

              <StyledButton color="inherit" component={Link} to="/hyodyntaminen">
                Tekoäly liiketoiminnassa
              </StyledButton>
            {user ? (
                <StyledButton color="inherit" onClick={logout}>
                Kirjaudu ulos
              </StyledButton>
              ): (
                <StyledButton color="inherit" component={Link} to="/login">
                Kirjaudu
              </StyledButton>
              )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {user && (
            <ListItemText sx={{ marginLeft: '8px' }}>{user.name} kirjautunut</ListItemText>
          )}
          <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Etusivu" />
          </ListItemButton>
          <ListItemButton component={Link} to="/feed" onClick={toggleDrawer}>
            <ListItemText primary="Feed" />
          </ListItemButton>
          <ListItemButton component={Link} to="/yrityksille" onClick={toggleDrawer}>
            <ListItemText primary="Yrityksille" />
          </ListItemButton>
          <ListItemButton component={Link} to="/avoimetprojektit" onClick={toggleDrawer}>
            <ListItemText primary="Avoimet tekoälyprojektit" />
          </ListItemButton>
          <ListItemButton component={Link} to="/kehittajat" onClick={toggleDrawer}>
            <ListItemText primary="Kehittäjät" />
          </ListItemButton>
          <ListItemButton component={Link} to="/users" onClick={toggleDrawer}>
            <ListItemText primary="Etsi käyttäjiä" />
          </ListItemButton>
          <ListItemButton component={Link} to="/kehittajienilmoitukset" onClick={toggleDrawer}>
            <ListItemText primary="Kehittäjien ilmoitukset" />
          </ListItemButton>
          <ListItemButton component={Link} to="/lisaailmoitus" onClick={toggleDrawer}>
            <ListItemText primary="Lisää ilmoitus" />
          </ListItemButton>
          <ListItemButton component={Link} to="/hyodyntaminen" onClick={toggleDrawer}>
            <ListItemText primary="Tekoäly liiketoiminnassa" />
          </ListItemButton>
          {user && (
            <ListItemButton component={Link} to={`/profiili`}>
              <ListItemText primary="Profiili" />
            </ListItemButton>
          )}
          {user && (
            <ListItemButton component={Link} to={`/portaali`}>
              <ListItemText primary="Portaali" />
            </ListItemButton>
          )}
          {user ? (
            <ListItemButton component={Link} onClick={logout}>
            <ListItemText primary="Kirjaudu ulos" />
          </ListItemButton>
          ): (
            <ListItemButton component={Link} to="/login" onClick={toggleDrawer}>
            <ListItemText primary="Kirjaudu" />
          </ListItemButton>
          )}
        </List>
      </Drawer>
    </ThemeProvider>
  )
}

export default Navbar