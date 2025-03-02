import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PathConstants from './shared/pathConstants';
import PageNotFoundPage from './pages/PageNotFoundPage';
import MapPage from './pages/MapPage';
import ComparisonPage from './pages/ComparisonPage';
import ListPage from './pages/ListPage';

const routes = [
  {
    path: PathConstants.HOME,
    element: <ListPage />,
  },
  {
    path: PathConstants.COMPARISON,
    element: <ComparisonPage />
  },
  {
    path: PathConstants.INSTITUTION_BY_VOIVODESHIP,
    element: <ListPage />
  },
  {
    path: PathConstants.INSTITUTION_BY_CITY,
    element: <ListPage />
  },
  {
    path: PathConstants.MAP,
    element: <MapPage />
  },
  {
    path: '*',
    element: <PageNotFoundPage />
  }
];

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes
    }]);

  return (
    <RouterProvider router={router} />
  );
}
