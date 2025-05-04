import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

// Mock dáta – neskôr nahradíš fetchnutím zo Supabase
const events = [
  {
    id: 1,
    title: 'Festival piva',
    date: '2025-06-15',
    location: 'Námestie SNP',
    description: 'Ochutnávka lokálnych pivovarov a koncerty.',
    image: 'https://source.unsplash.com/400x300/?beer-festival',
  },
  {
    id: 2,
    title: 'Letné kino',
    date: '2025-06-20',
    location: 'Amfiteáter Nitra',
    description: 'Večerné premietanie filmov pod holým nebom.',
    image: 'https://source.unsplash.com/400x300/?outdoor-movie',
  },
  {
    id: 3,
    title: 'Beh Nitrou',
    date: '2025-07-01',
    location: 'Park Sihoť',
    description: 'Charitatívny beh pre rodiny a športovcov.',
    image: 'https://source.unsplash.com/400x300/?running-event',
  },
];

const EventsPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Udalosti v Nitre
      </Typography>

      {events.length === 0 ? (
        <Typography variant="body1">Momentálne nie sú žiadne udalosti.</Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardMedia component="img" height="180" image={event.image} alt={event.title} />
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EventsPage;
