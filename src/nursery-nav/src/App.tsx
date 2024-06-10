import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PathConstants from './shared/pathConstants';
import React from 'react';
import AboutPage from './pages/AboutPage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import MapPage from './pages/MapPage';
import ComparisonPage from './pages/ComparisonPage';

const ListPage = React.lazy(() => import("./pages/ListPage"));
const InstitutionDetailsPage = React.lazy(() => import("./pages/InstitutionDetailsPage"));

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
    path: PathConstants.INSTITUTION_DETAILS,
    element: <InstitutionDetailsPage />
  },
  {
    path: PathConstants.ABOUT,
    element: <AboutPage />
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
