import React from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sign Up
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Sign up functionality will be implemented here.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignupPage;
