import { createBrowserRouter } from 'react-router-dom';

import AuthJoinPage from '@/pages/auth/AuthJoinPage';
import AuthLoginPage from '@/pages/auth/AuthLoginPage';
import DepositPage from '@/pages/DepositPage';
import ExchangeCryptoPage from '@/pages/ExchangeCryptoPage';
import ExchangeFiatPage from '@/pages/ExchangeFiatPage';
import HomePage from '@/pages/HomePage';
import MyActivityPage from '@/pages/my/MyActivityPage';
import MyBalancesPage from '@/pages/my/MyBalancesPage';
import WithdrawPage from '@/pages/WithdrawPage';

import AuthLayout from '@/components/layouts/AuthLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/exchange-crypto', element: <ExchangeCryptoPage /> },
      { path: '/exchange-fiat', element: <ExchangeFiatPage /> },
      { path: '/deposit', element: <DepositPage /> },
      { path: '/withdraw', element: <WithdrawPage /> },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      { path: '/my/activity', element: <MyActivityPage /> },
      { path: '/my/balances', element: <MyBalancesPage /> },
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
