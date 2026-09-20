import { ROUTES } from '@/Consts';
import { DefaultLayout, PlainLayout } from '@/Layouts';
import DetailPage from '@/Pages/DetailPage';
import FavoritesPage from '@/Pages/FavoritesPage';
import HomePage from '@/Pages/HomePage';
import ListPage from '@/Pages/ListPage';
import LoginPage from '@/Pages/LoginPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.LIST, element: <ListPage /> },
      { path: ROUTES.DETAIL, element: <DetailPage /> },
    ],
  },
  {
    element: <PlainLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.FAVORITES, element: <FavoritesPage /> },
    ],
  },
]);
