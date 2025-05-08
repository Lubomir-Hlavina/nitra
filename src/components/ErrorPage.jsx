import { useRouteError } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Box p={4}>
      <Typography variant="h4" color="error" gutterBottom>
        Nastala chyba!
      </Typography>
      <Typography variant="body1">
        {error?.message || 'Niečo sa pokazilo.'}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
