import React from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h2" sx={{ mb: 2, color: 'error.main' }}>404</Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>Page Not Found</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            The page you're looking for doesn't exist.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFoundPage;
