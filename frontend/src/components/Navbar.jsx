import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Badge, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onCartClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    setMobileOpen(false);
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
    handleMenuClose();
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Mobile Drawer Content
  const mobileDrawer = (
    <div className="w-72 h-full bg-beige-100 dark:bg-gray-900 flex flex-col">
      {/* Drawer Header with Close Button */}
      <div className="flex justify-between items-center p-4 border-b border-beige-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
        <IconButton onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-300">
          <CloseIcon />
        </IconButton>
      </div>
      
      {/* User info in mobile drawer if logged in */}
      {isAuthenticated && (
        <div className="px-4 py-4 border-b border-beige-200 dark:border-gray-700 flex items-center space-x-3">
          <Avatar className="bg-beige-500 w-12 h-12">
            {getUserInitials()}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white text-base">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
      )}
      
      {/* Navigation Links */}
      <List className="flex-1">
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            onClick={() => handleNavigation(item.path)}
            className={`py-3 ${isActive(item.path) ? 'bg-beige-200 dark:bg-gray-700' : ''}`}
          >
            <ListItemText 
              primary={item.label} 
              className={isActive(item.path) ? 'text-beige-600 font-semibold' : 'text-gray-800 dark:text-white'} 
              primaryTypographyProps={{ className: 'text-base' }}
            />
          </ListItem>
        ))}
        <ListItem button onClick={() => handleNavigation('/cart')} className="py-3">
          <ListItemText 
            primary={`Cart (${totalItems})`} 
            className={isActive('/cart') ? 'text-beige-600 font-semibold' : 'text-gray-800 dark:text-white'} 
            primaryTypographyProps={{ className: 'text-base' }}
          />
        </ListItem>
      </List>

      {/* Auth Buttons at Bottom */}
      <div className="border-t border-beige-200 dark:border-gray-700 p-4">
        {!isAuthenticated ? (
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation('/login')}
              className="w-full py-3 bg-beige-500 text-white rounded-lg font-semibold hover:bg-beige-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation('/register')}
              className="w-full py-3 border border-beige-500 text-beige-500 rounded-lg font-semibold hover:bg-beige-50 transition"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation('/profile')}
              className="w-full py-3 flex items-center justify-center space-x-2 bg-beige-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg font-semibold"
            >
              <PersonIcon className="w-5 h-5" />
              <span>My Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-beige-100 dark:bg-gray-900 shadow-sm z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center z-10">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                Fashion<span className="text-beige-500 dark:text-beige-400">Store</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative px-2 py-1 transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-beige-600 dark:text-beige-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-beige-500'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-beige-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <IconButton onClick={toggleTheme} className="text-gray-700 dark:text-gray-300">
                {theme === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
              </IconButton>

              {/* Cart Icon */}
              <IconButton onClick={onCartClick} className="text-gray-700 dark:text-gray-300">
                <Badge badgeContent={totalItems} color="primary" overlap="circular">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Desktop Account Menu */}
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={handleMenuOpen}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-beige-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Avatar className="bg-beige-500 w-8 h-8">
                        {getUserInitials()}
                      </Avatar>
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        {user?.name?.split(' ')[0]}
                      </span>
                    </button>
                    <Menu 
                      anchorEl={anchorEl} 
                      open={Boolean(anchorEl)} 
                      onClose={handleMenuClose} 
                      className="mt-2"
                      PaperProps={{
                        className: "min-w-[200px]",
                        sx: { mt: 1 }
                      }}
                    >
                      <MenuItem onClick={() => handleNavigation('/profile')} className="flex items-center space-x-2">
                        <PersonIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </MenuItem>
                      <MenuItem onClick={() => handleNavigation('/orders')} className="flex items-center space-x-2">
                        <ShoppingCartIcon className="w-4 h-4" />
                        <span>My Orders</span>
                      </MenuItem>
                      <div className="border-t border-beige-200 dark:border-gray-700 my-1"></div>
                      <MenuItem onClick={handleLogout} className="text-red-600">
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <IconButton onClick={handleMenuOpen} className="text-gray-700 dark:text-gray-300">
                    <PersonIcon />
                  </IconButton>
                )}
                {!isAuthenticated && (
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className="mt-2">
                    <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
                    <MenuItem onClick={() => handleNavigation('/register')}>Register</MenuItem>
                  </Menu>
                )}
              </div>

              {/* Mobile Menu Button - Fixed */}
              <button 
                onClick={() => setMobileOpen(true)} 
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-beige-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer 
        anchor="left" 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '280px',
            boxSizing: 'border-box',
          },
        }}
      >
        {mobileDrawer}
      </Drawer>
    </>
  );
};

export default Navbar;