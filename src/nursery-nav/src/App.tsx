import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PathConstants from './shared/pathConstants';
import ListPage from './pages/ListPage';
import InstitutionDetailsPage from './pages/InstitutionDetailsPage';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: PathConstants.HOME,
          element: <ListPage />
        },
        {
          path: PathConstants.INSTITUTION_DETAILS,
          element: <InstitutionDetailsPage />
        }
      ]
    }]);

  return (
    <RouterProvider router={router} />
  );
}
