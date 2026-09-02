import { ROUTES } from '@/Consts';
import DetailPage from '@/Pages/DetailPage';
import HomePage from '@/Pages/HomePage';
import ListPage from '@/Pages/ListPage';
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
]);
