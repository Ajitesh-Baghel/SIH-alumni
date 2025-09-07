import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
const AdminPage = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" sx={{ mb: 3 }}>Admin Panel</Typography>
    <Card><CardContent><Typography>Admin functionality will be implemented here.</Typography></CardContent></Card>
  </Container>
);
export default AdminPage;
