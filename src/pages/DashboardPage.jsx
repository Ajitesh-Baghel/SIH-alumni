import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { DashboardOutlined } from '@mui/icons-material';

const DashboardPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardOutlined /> Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your alumni dashboard
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Quick Stats</Typography>
              <Typography variant="body2">Dashboard content will be implemented here.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <Typography variant="body2">Activity feed will be shown here.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
