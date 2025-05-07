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
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Domov" />
        </ListItem>
        <ListItem button component={Link} to="/menu">
          <ListItemText primary="Menu" />
        </ListItem>
        <ListItem button component={Link} to="/udalosti">
          <ListItemText primary="Udalosti" />
        </ListItem>
        <ListItem button component={Link} to="/podniky/gastro">
          <ListItemText primary="Podniky – Gastro" />
        </ListItem>
        <ListItem button component={Link} to="/podniky/sluzby">
          <ListItemText primary="Podniky – Služby" />
        </ListItem>
        <ListItem button component={Link} to="/podniky/remesla">
          <ListItemText primary="Podniky – Remeslá" />
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
              <Button color="inherit" component={Link} to="/">
                Domov
              </Button>
              <Button color="inherit" component={Link} to="/novinky">
                Novinky
              </Button>
              <Button color="inherit" component={Link} to="/menu">
                Menu
              </Button>
              <Button color="inherit" component={Link} to="/udalosti">
                Udalosti
              </Button>
              <Button
                color="inherit"
                onClick={handleMenuClick}
                aria-controls={isMenuOpen ? 'podniky-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
              >
                Podniky
              </Button>
              <Menu
                id="podniky-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/podniky/gastro"
                  onClick={handleMenuClose}
                >
                  Gastro
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/sluzby"
                  onClick={handleMenuClose}
                >
                  Služby
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/remesla"
                  onClick={handleMenuClose}
                >
                  Remeslá
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/podniky/hotely"
                  onClick={handleMenuClose}
                >
                  Hotely
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
