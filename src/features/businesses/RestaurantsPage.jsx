import React, { useState } from 'react';
import PageHeading from '../../components/PageHeading';
import { businesses } from '../../data/businesses';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import RatingStars from '../../components/RatingStars';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

// ✅ Pomocná funkcia na zistenie, či je podnik aktuálne otvorený
const isBusinessOpen = (openingHours) => {
  if (!openingHours) return false;
  const now = new Date();
  const day = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = openingHours[day];

  if (!todayHours) return false;

  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);

  const openTime = new Date(now);
  openTime.setHours(openHour, openMin, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeHour, closeMin, 0);

  return now >= openTime && now <= closeTime;
};

const RestaurantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('rating');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const filtered = businesses
    .filter(
      (b) =>
        b.subCategory
          .split(',')
          .map((s) => s.trim())
          .includes('restauracia') // 🔽 kontrola výskytu medzi subkategóriami
    )
    .filter((b) => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((b) => (showOnlyOpen ? isBusinessOpen(b.openingHours) : true));

  const sortBusinesses = (list, sortBy) => {
    return [...list].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'open') {
        return (
          (isBusinessOpen(b.openingHours) ? 1 : 0) -
          (isBusinessOpen(a.openingHours) ? 1 : 0)
        );
      }
      return 0;
    });
  };

  const sortedBusinesses = sortBusinesses(filtered, sortOrder);

  return (
    <Box p={3}>
      <PageHeading>Reštaurácie</PageHeading>

      <Box mb={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Hľadať podľa mena"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label">Zoradiť podľa</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortOrder}
                label="Zoradiť podľa"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="rating">Podľa hodnotenia</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={showOnlyOpen}
                  onChange={(e) => setShowOnlyOpen(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Otvorené teraz
              </label>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {sortedBusinesses.length === 0 ? (
        <Typography variant="body1">
          Žiadne podniky nezodpovedajú hľadaniu.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {sortedBusinesses.map((biz) => (
            <Grid item key={biz.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  transition: 'transform 0.8s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    width: '100%',
                  }}
                  image={biz.image}
                  alt={biz.name}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {biz.name}
                    </Typography>

                    <Box sx={{ mb: 1 }}>
                      <RatingStars rating={biz.rating} />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 1.5,
                      }}
                    >
                      {biz.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.75rem',
                        opacity: 0.8,
                      }}
                    >
                      📍{biz.address}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color={
                      isBusinessOpen(biz.openingHours) ? 'success' : 'error'
                    }
                    sx={{
                      mt: 2,
                      width: { xs: '100%', sm: 'auto' },
                      '&.Mui-disabled': {
                        backgroundColor: isBusinessOpen(biz.openingHours)
                          ? '#4caf50'
                          : '#f44336',
                        color: 'white',
                      },
                    }}
                    disabled
                  >
                    {isBusinessOpen(biz.openingHours)
                      ? 'Otvorené'
                      : 'Zatvorené'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RestaurantsPage;
