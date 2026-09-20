import { ROUTES } from '@/Consts';
import DetailPage from '@/Pages/DetailPage';
import FavoritesPage from '@/Pages/FavoritesPage';
import HomePage from '@/Pages/HomePage';
import ListPage from '@/Pages/ListPage';
import LoginPage from '@/Pages/LoginPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LIST,
    element: <ListPage />,
  },
  {
    path: ROUTES.DETAIL,
    element: <DetailPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.FAVORITES,
    element: <FavoritesPage />,
  },
]);
