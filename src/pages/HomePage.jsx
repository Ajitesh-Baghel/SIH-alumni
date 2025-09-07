import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import {
  PeopleOutlined,
  EventOutlined,
  WorkOutlined,
  ForumOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <PeopleOutlined sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Alumni Directory',
      description: 'Connect with fellow alumni from your batch and department.',
    },
    {
      icon: <EventOutlined sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Events & Reunions',
      description: 'Stay updated with upcoming events and register for reunions.',
    },
    {
      icon: <WorkOutlined sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Job Opportunities',
      description: 'Explore career opportunities shared by the alumni network.',
    },
    {
      icon: <ForumOutlined sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Discussion Forums',
      description: 'Engage in meaningful discussions with your peers.',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 10 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Welcome to Alumni Management System
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Stay connected with your alma mater and fellow alumni. Build lasting
          relationships and advance your career.
        </Typography>
        
        {!isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
            >
              Join Our Network
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        )}
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          What We Offer
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          my: 6,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Join thousands of alumni who are already part of our community.
        </Typography>
        {!isAuthenticated && (
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
            onClick={() => navigate('/signup')}
          >
            Create Your Account
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
