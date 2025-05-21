import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/registration/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import CalendarPage from '../pages/CalendarPage';
import QuotationsPage from '../pages/QuotationsPage';
import ChannelPartnerPage from '../pages/ChannelPartnerPage';
import CustomersPage from '../pages/CustomersPage';
import LeadsPage from '../pages/LeadsPage';
import Layout from '../components/common/Layout';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/calendar',
        element: <CalendarPage />,
      },
      {
        path: '/quotations',
        element: <QuotationsPage />,
      },
      {
        path: '/channel-partner',
        element: <ChannelPartnerPage />,
      },
      {
        path: '/customers',
        element: <CustomersPage />,
      },
      {
        path: '/leads',
        element: <LeadsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;