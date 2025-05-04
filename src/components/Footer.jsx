// src/components/Footer.jsx
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ p: 2, textAlign: "center", bgcolor: "grey.100" }}>
      <Typography variant="body2">© {new Date().getFullYear()} Kam v Nitre</Typography>
    </Box>
  );
}
