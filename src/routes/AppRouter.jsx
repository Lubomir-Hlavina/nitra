import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import EventsPage from '../features/events/EventsPage';
import HotelsPage from '../features/services/HotelsPage';
import CraftsPage from '../features/services/CraftsPage';
import SelfCarePage from '../features/services/SelfCarePage';
import FitnessPage from '../features/services/FitnessPage';
import HealthPage from '../features/services/HealthPage';
import ErrorPage from '../components/ErrorPage';
import CafesPage from '../features/businesses/CafesPage';
import RestaurantsPage from '../features/businesses/RestaurantsPage';
import FastFoodPage from '../features/businesses/FastFoodPage';
import PubsPage from '../features/businesses/PubsPage';
import ConfectioneriesPage from '../features/businesses/ConfectioneriesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },

      { path: 'podniky/restauracie', element: <RestaurantsPage /> },
      { path: 'podniky/kaviarne', element: <CafesPage /> },
      { path: 'podniky/fastfoody', element: <FastFoodPage /> },
      { path: 'podniky/puby', element: <PubsPage /> },
      { path: 'podniky/cukrarne', element: <ConfectioneriesPage /> },
      { path: 'udalosti', element: <EventsPage /> },
      { path: 'sluzby/ubytovanie', element: <HotelsPage /> },
      { path: 'sluzby/remesla', element: <CraftsPage /> },
      { path: 'sluzby/osobna-starostlivost', element: <SelfCarePage /> },
      { path: 'sluzby/fitness', element: <FitnessPage /> },
      { path: 'sluzby/zdravie', element: <HealthPage /> },
    ],
  },
]);

export default router;
