import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Reports', 'Accounts', 'Total'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({ handleLogout, isLoggedIn }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  }

  const handleMenuItemClick = (setting) => {
    if (setting === 'Dashboard') {
      navigate("/dashboard");
    } else if (setting === 'Logout') {
      handleLogout();
    } else {
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={handleLogoClick}
            variant="h6"
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}
          >
            LOGO
          </Typography>
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={page.toLowerCase()}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn && ( // Conditionally render user settings only when user is logged in
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
              </IconButton>
            </Tooltip>
          )}
          {isLoggedIn && ( // Conditionally render user menu only when user is logged in
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
