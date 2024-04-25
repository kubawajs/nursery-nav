import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PathConstants from './shared/pathConstants';
import React from 'react';

const ListPage = React.lazy(() => import("./pages/ListPage"));
const InstitutionDetailsPage = React.lazy(() => import("./pages/InstitutionDetailsPage"));

const routes = [
  {
    path: PathConstants.HOME,
    element: <ListPage />
  },
  {
    path: PathConstants.INSTITUTION_DETAILS,
    element: <InstitutionDetailsPage />
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
