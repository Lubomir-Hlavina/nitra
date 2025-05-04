import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function Home() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFFF33'];

  return (
    <div>
      <h1>Domovská stránka</h1>
      <Grid container spacing={3}>
        {colors.map((color, index) => (
          <Grid item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ backgroundColor: color }}>
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  Karta {index + 1}
                </Typography>
                <Typography variant="body2" color="white">
                  Nejaký text v tejto karte.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
