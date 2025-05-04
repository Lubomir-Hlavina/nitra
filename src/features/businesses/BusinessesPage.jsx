import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  ButtonGroup,
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

const businesses = [
  {
    id: 1,
    name: 'Kaviareň Dolce',
    category: 'gastro',
    subCategory: 'kaviaren',
    description:
      'Domáca káva, pečené croissanty a útulné prostredie v centre Nitry.',
    image: '../../assets/pancakes.jpg',
    rating: 4.6,
    openingHours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '09:00', close: '14:00' },
      sunday: null,
    },
  },
  {
    id: 2,
    name: 'Reštaurácia U Vlka',
    category: 'gastro',
    subCategory: 'restauracia',
    description:
      'Tradičná slovenská kuchyňa pripravená s láskou a domácimi surovinami.',
    image: '../../assets/pancakes.jpg',
    rating: 4.3,
    openingHours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '21:00' },
    },
  },
  {
    id: 3,
    name: 'Pizza Express',
    category: 'gastro',
    subCategory: 'fastfood',
    description: 'Čerstvá pizza z pece, rýchle donášky až k vám domov.',
    image: '../../assets/pancakes.jpg',
    rating: 4.0,
    openingHours: {
      monday: { open: '10:00', close: '22:00' },
      tuesday: { open: '10:00', close: '22:00' },
      wednesday: { open: '10:00', close: '22:00' },
      thursday: { open: '10:00', close: '22:00' },
      friday: { open: '10:00', close: '23:00' },
      saturday: { open: '11:00', close: '23:00' },
      sunday: { open: '11:00', close: '21:00' },
    },
  },
  {
    id: 4,
    name: 'Pub U Medveďa',
    category: 'gastro',
    subCategory: 'pub',
    description: 'Široký výber remeselných pív a skvelá atmosféra.',
    image: '../../assets/pancakes.jpg',
    rating: 4.7,
    openingHours: {
      monday: { open: '16:00', close: '00:00' },
      tuesday: { open: '16:00', close: '00:00' },
      wednesday: { open: '16:00', close: '00:00' },
      thursday: { open: '16:00', close: '01:00' },
      friday: { open: '16:00', close: '02:00' },
      saturday: { open: '18:00', close: '02:00' },
      sunday: null,
    },
  },
  {
    id: 5,
    name: 'Barber Nitra',
    category: 'sluzby',
    subCategory: 'barberi',
    description: 'Profesionálne strihanie a starostlivosť o bradu.',
    image: 'https://source.unsplash.com/random/400x300?barber-shop',
    rating: 4.2,
    openingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '09:00', close: '13:00' },
      sunday: null,
    },
  },
  {
    id: 6,
    name: 'Realitný maklér Peter',
    category: 'sluzby',
    subCategory: 'makleri',
    description: 'Predaj a prenájom nehnuteľností s osobným prístupom.',
    image: 'https://source.unsplash.com/random/400x300?real-estate',
    rating: 3.9,
    openingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: null,
      sunday: null,
    },
  },
];

const subCategoriesMap = {
  gastro: ['všetko', 'kaviaren', 'restauracia', 'fastfood', 'pub'],
  sluzby: ['všetko', 'barberi', 'makleri'],
  remesla: ['všetko'],
};

const BusinessesPage = () => {
  const { category } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState('všetko');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('rating');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const filteredByCategory = businesses.filter((b) => b.category === category);
  const filtered = filteredByCategory
    .filter((b) =>
      selectedSubCategory === 'všetko'
        ? true
        : b.subCategory === selectedSubCategory
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
  const availableSubCategories = subCategoriesMap[category] || ['všetko'];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Podniky – {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>

      {availableSubCategories.length > 1 && (
        <Box mb={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="subcategory-select-label">
                  Typ podniku
                </InputLabel>
                <Select
                  labelId="subcategory-select-label"
                  value={selectedSubCategory}
                  label="Typ podniku"
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                  {availableSubCategories.map((subCat) => (
                    <MenuItem key={subCat} value={subCat}>
                      {subCat === 'všetko'
                        ? 'Všetko'
                        : subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

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
                  Len otvorené
                </label>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      )}

      {sortedBusinesses.length === 0 ? (
        <Typography variant="body1">
          Žiadne podniky v tejto kategórii/subkategórii.
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {biz.name}
                  </Typography>

                  <RatingStars rating={biz.rating} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {biz.description}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    color={
                      isBusinessOpen(biz.openingHours) ? 'success' : 'error'
                    }
                    sx={{
                      mt: 1,
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

export default BusinessesPage;
