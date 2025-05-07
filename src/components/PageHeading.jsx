import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeading = ({ children }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          display: 'inline-block',
          color: 'primary.main',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default PageHeading;
