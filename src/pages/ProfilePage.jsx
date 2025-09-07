import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>Profile</Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            Profile management functionality will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
