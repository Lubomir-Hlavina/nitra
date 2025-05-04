import { Tooltip, Box } from '@mui/material';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <Tooltip
      title={`Hodnotenie: ${rating.toFixed(1)} / 5`}
      placement="bottom-start"
      arrow
    >
      <Box
        sx={{
          display: 'inline-block',
          color: '#FFD700',
          mt: 1,
          cursor: 'default',
          lineHeight: 1,
        }}
      >
        {'★'.repeat(fullStars)}
        {'☆'.repeat(emptyStars)}
      </Box>
    </Tooltip>
  );
};

export default RatingStars;
