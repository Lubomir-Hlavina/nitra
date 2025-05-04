import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import BusinessesPage from "../features/businesses/BusinessesPage";
import EventsPage from "../features/events/EventsPage"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "podniky/:category", element: <BusinessesPage /> }, // dynamická kategória
      { path: "udalosti", element: <EventsPage /> }, // premenované z "eventy" na "udalosti"
    ],
  },
]);

export default router;
