// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '@contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2', dark: '#115293', light: '#42a5f5' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 500 },
      },
    },
  },
});

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleDrawerClose = () => setMobileOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onMenuToggle={handleDrawerToggle} isMobileMenuOpen={mobileOpen} />

        <Box sx={{ display: 'flex', flex: 1 }}>
          {isAuthenticated && <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerClose} />}

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              width: { sm: `calc(100% - ${isAuthenticated ? 240 : 0}px)` },
            }}
          >
            <Toolbar />
            <Box
              sx={{
                flex: 1,
                p: { xs: 2, sm: 3 },
                backgroundColor: 'background.default',
                minHeight: 'calc(100vh - 128px)',
              }}
            >
              {/* This renders the nested route content */}
              <Outlet />
            </Box>
          </Box>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
