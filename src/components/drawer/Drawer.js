import * as React from 'react';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import GET_DATA from '../../auth/GET_DATA'

//mui components


import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AodIcon from '@mui/icons-material/Aod';
import { ListItemButton } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";





const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState("");


  const token = window.localStorage.getItem('token');


  const getData = async () => {
    const info = await GET_DATA(token)
    setUserData(info)
  }
  const logOut= () => {
    localStorage.setItem("token", "")
  }
  useEffect(() => {
    getData()
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            {(userData.isAdmin === true) ? 'Administrador: ': 'Vendedor: '}
            {userData.name}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

      <List>
      <Link to="/all-sales" style={{textDecoration: "none"}}>
        <ListItemButton>
          <ListItemIcon>
            < AodIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Todas las ventas"
            
          />
        </ListItemButton>
        </Link>
          </List>
          
          <Divider />
        <List>
          <Link to="/pendings" style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <IndeterminateCheckBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Pendientes" />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/aprobates" style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Aprobados" />
            </ListItemButton>
          </Link>
        </List>

        <Divider />
        <List>
          <Link to="/delivered" style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText primary="Entregados" />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
        <List>

      <Link to="/sales" style={{textDecoration: "none"}}>
        <ListItemButton>
          <ListItemIcon>
            < AddCircleIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Subir Venta"
          />
        </ListItemButton>
        </Link>
          </List>
        <Divider />

          {
            (userData.isAdmin === true) ? <>
          <List>
            <Link to="/adm" style={{textDecoration: "none"}}>
          <ListItemButton>
            <ListItemIcon>
              < PersonIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Usuarios en espera"
            />
          </ListItemButton>
          </Link>
            </List>
            </> : null
          }

          <Divider />
          <List>
      <Link to="/login" onClick={() => logOut()} style={{textDecoration: "none"}}>
        <ListItemButton>
          <ListItemIcon>
          <LogoutIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Cerrar sesión"
            
          />
        </ListItemButton>
        </Link>
          </List>

      </Drawer>

    </Box>
  );
}