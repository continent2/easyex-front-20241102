import { createBrowserRouter } from 'react-router-dom';

import AuthJoinPage from '@/pages/auth/AuthJoinPage';
import AuthLoginPage from '@/pages/auth/AuthLoginPage';
import DepositPage from '@/pages/DepositPage';
import HomePage from '@/pages/HomePage';
import MyActivityPage from '@/pages/my/MyActivityPage';
import MyBalancesPage from '@/pages/my/MyBalancesPage';
import WithdrawPage from '@/pages/WithdrawPage';

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
          { path: '/my/activity', element: <MyActivityPage /> },
          { path: '/my/balances', element: <MyBalancesPage /> },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/join', element: <AuthJoinPage /> },
      { path: '/login', element: <AuthLoginPage /> },
    ],
  },
]);

export default router;