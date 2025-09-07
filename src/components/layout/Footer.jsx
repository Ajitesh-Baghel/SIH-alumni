import React from 'react';
import { Box, Typography, Container, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { text: 'About Us', path: '/about' },
    { text: 'Contact', path: '/contact' },
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms of Service', path: '/terms' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        backgroundColor: 'grey.100',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            © {currentYear} Alumni Management System. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 1, sm: 3 },
            }}
          >
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.text}>
                <Link
                  component="button"
                  variant="body2"
                  color="text.secondary"
                  underline="hover"
                  onClick={() => navigate(link.path)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.text}
                </Link>
                {index < footerLinks.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      height: '16px',
                      alignSelf: 'center',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
