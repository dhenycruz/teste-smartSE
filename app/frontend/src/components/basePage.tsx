/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemIcon from '@mui/material/ListItemIcon'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import GroupIcon from '@mui/icons-material/Group'
import { createTheme, Container, ThemeProvider, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import { GlobalContext } from '../context/globalContext'
// import TableVehicle from './tableVehicle'
import TableFueling from './tableFueling'
import TableVehicle from './tableVehicle'
import TableUser from './TablerUser'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
)

export default function BasePage (): React.ReactElement {
  const { logout } = useContext(GlobalContext)
  const [open, setOpen] = useState(true)
  const [renderTable, setRenderTable] = useState('veiculos')

  const toggleDrawer = (): void => {
    setOpen(!open)
  }

  const mdTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2'
      }
    }
  })

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px' // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GESTÃO DE FROTAS
            </Typography>
            <Button color="inherit" onClick={logout}>Sair</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1]
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
          <Divider />
          <List>
            <ListItem disablePadding onClick={() => { setRenderTable('veiculos') }}>
              <ListItemButton>
                <ListItemIcon>
                  {
                    renderTable === 'veiculos'
                      ? <LocalShippingIcon color='primary' />
                      : <LocalShippingIcon />
                  }
                </ListItemIcon>
                {
                    renderTable === 'veiculos'
                      ? <ListItemText
                          primary='Veículos'
                          sx={{ color: '#1976d2' }}
                        />
                      : <ListItemText primary='Veículos' />
                  }
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => { setRenderTable('abastecimentos') }}>
              <ListItemButton>
                <ListItemIcon>
                {
                  renderTable === 'abastecimentos'
                    ? <LocalGasStationIcon color='primary' />
                    : <LocalGasStationIcon />
                }
                </ListItemIcon>
                {
                  renderTable === 'abastecimentos'
                    ? <ListItemText primary="Abastecimentos" sx={{ color: '#1976d2' }} />
                    : <ListItemText primary="Abastecimentos" />
                }
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem disablePadding onClick={() => { setRenderTable('usuarios') }}>
              <ListItemButton>
                <ListItemIcon>
                {
                  renderTable === 'usuarios'
                    ? <GroupIcon color='primary' />
                    : <GroupIcon />
                }
                </ListItemIcon>
                {
                  renderTable === 'usuarios'
                    ? <ListItemText primary="Usuários" sx={{ color: '#1976d2' }} />
                    : <ListItemText primary="Usuários" />
                }
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            { renderTable === 'veiculos' && <TableVehicle /> }
            { renderTable === 'abastecimentos' && <TableFueling /> }
            { renderTable === 'usuarios' && <TableUser /> }
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
