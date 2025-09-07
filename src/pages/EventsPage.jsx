import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

const EventsPage = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" sx={{ mb: 3 }}>Events</Typography>
    <Card><CardContent><Typography>Events management will be implemented here.</Typography></CardContent></Card>
  </Container>
);

export default EventsPage;
