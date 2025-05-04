// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1} p={2}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
