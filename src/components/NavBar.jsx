import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventIcon from '@mui/icons-material/Event';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [activeMenu, setActiveMenu] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuType);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu('');
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={Link} to="/">
          <HomeIcon sx={{ mr: 1 }} />
          <ListItemText primary="Domov" />
        </ListItem>
        <ListItem button component={Link} to="/novinky">
          <EventIcon sx={{ mr: 1 }} />
          <ListItemText primary="Novinky" />
        </ListItem>
        <ListItem button component={Link} to="/menu">
          <MenuBookIcon sx={{ mr: 1 }} />
          <ListItemText primary="Menu" />
        </ListItem>
        <ListItem button component={Link} to="/udalosti">
          <EventIcon sx={{ mr: 1 }} />
          <ListItemText primary="Udalosti" />
        </ListItem>
        <ListItem button component={Link} to="/podniky">
          <LocalDiningIcon sx={{ mr: 1 }} />
          <ListItemText primary="Podniky" />
        </ListItem>
        <ListItem button component={Link} to="/sluzby">
          <PeopleIcon sx={{ mr: 1 }} />
          <ListItemText primary="Služby" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: 'inherit' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Kam v Nitre
            </Link>
          </Typography>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
              >
                Domov
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/novinky"
                startIcon={<EventIcon />}
              >
                Novinky
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/menu"
                startIcon={<MenuBookIcon />}
              >
                Menu
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/udalosti"
                startIcon={<EventIcon />}
              >
                Udalosti
              </Button>
              <Button
                color="inherit"
                onClick={(e) => handleMenuClick(e, 'podniky')}
                aria-controls={isMenuOpen ? 'podniky-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                startIcon={<LocalDiningIcon />}
              >
                Podniky
              </Button>
              <Menu
                id="podniky-menu"
                anchorEl={anchorEl}
                open={activeMenu === 'podniky' && isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/podniky/restauracie"
                  onClick={handleMenuClose}
                >
                  Reštaurácie
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/kaviarne"
                  onClick={handleMenuClose}
                >
                  Kaviarne
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/fastfoody"
                  onClick={handleMenuClose}
                >
                  Fastfoody
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/puby"
                  onClick={handleMenuClose}
                >
                  Puby
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/cukrarne"
                  onClick={handleMenuClose}
                >
                  Cukrárne
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                onClick={(e) => handleMenuClick(e, 'sluzby')}
                aria-controls={isMenuOpen ? 'sluzby-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                startIcon={<PeopleIcon />}
              >
                Služby
              </Button>
              <Menu
                id="sluzby-menu"
                anchorEl={anchorEl}
                open={activeMenu === 'sluzby' && isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/sluzby/ubytovanie"
                  onClick={handleMenuClose}
                >
                  Ubytovanie
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/sluzby/remesla"
                  onClick={handleMenuClose}
                >
                  Remeslá
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/sluzby/osobna-starostlivost"
                  onClick={handleMenuClose}
                >
                  Osobná starostlivosť
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/sluzby/fitness"
                  onClick={handleMenuClose}
                >
                  Fitness
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/sluzby/zdravie"
                  onClick={handleMenuClose}
                >
                  Zdravie
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;
