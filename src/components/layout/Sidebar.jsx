import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
} from '@mui/material';
import {
  DashboardOutlined,
  PeopleOutlined,
  EventOutlined,
  WorkOutlined,
  PhotoLibraryOutlined,
  ForumOutlined,
  PersonOutlined,
  AdminPanelSettingsOutlined,
  SettingsOutlined,
  ContactSupportOutlined,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardOutlined />,
      path: '/dashboard',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Alumni Directory',
      icon: <PeopleOutlined />,
      path: '/directory',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Events',
      icon: <EventOutlined />,
      path: '/events',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Jobs & Internships',
      icon: <WorkOutlined />,
      path: '/jobs',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Gallery',
      icon: <PhotoLibraryOutlined />,
      path: '/gallery',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Forum',
      icon: <ForumOutlined />,
      path: '/forum',
      roles: ['student', 'alumni', 'admin'],
    },
  ];

  const secondaryMenuItems = [
    {
      text: 'Profile',
      icon: <PersonOutlined />,
      path: '/profile',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Settings',
      icon: <SettingsOutlined />,
      path: '/settings',
      roles: ['student', 'alumni', 'admin'],
    },
    {
      text: 'Contact Support',
      icon: <ContactSupportOutlined />,
      path: '/contact',
      roles: ['student', 'alumni', 'admin'],
    },
  ];

  const adminMenuItems = [
    {
      text: 'Admin Panel',
      icon: <AdminPanelSettingsOutlined />,
      path: '/admin',
      roles: ['admin'],
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const filterMenuItems = (items) => {
    return items.filter((item) => item.roles.includes(role));
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {filterMenuItems(menuItems).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
                '&:hover': {
                  backgroundColor: 'primary.light',
                  opacity: 0.8,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Admin Section */}
        {role === 'admin' && (
          <>
            <Divider sx={{ my: 1 }} />
            {filterMenuItems(adminMenuItems).map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'secondary.light',
                      color: 'secondary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'secondary.contrastText',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'secondary.light',
                      opacity: 0.8,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>

      <Divider sx={{ mt: 2 }} />
      
      {/* Secondary Menu Items */}
      <List>
        {filterMenuItems(secondaryMenuItems).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'grey.200',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
