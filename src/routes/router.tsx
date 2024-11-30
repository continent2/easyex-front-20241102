import { createBrowserRouter } from 'react-router-dom';

import JoinPage from '@/pages/auth/JoinPage';
import LoginPage from '@/pages/auth/LoginPage';
import DepositPage from '@/pages/DepositPage';
import HomePage from '@/pages/HomePage';
import ActivityPage from '@/pages/my/ActivityPage';
import BalancesPage from '@/pages/my/BalancesPage';
import InfoPage from '@/pages/my/infoPage';
import WithdrawPage from '@/pages/WithdrawPage';
import ExchangePage from '@/pages/ExchangePage';

import AuthLayout from '@/components/layouts/AuthLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';

import AuthRoute from '@/routes/AuthRoute';

const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/deposit', element: <DepositPage /> },
          { path: '/withdraw', element: <WithdrawPage /> },
          { path: '/my/activity', element: <ActivityPage /> },
          { path: '/my/balances', element: <BalancesPage /> },
          { path: '/my/info', element: <InfoPage /> },
          { path: '/exchange', element: <ExchangePage /> },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/join', element: <JoinPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
]);

export default router;
