import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/lib/api/user';
import storage from '@/lib/storage';

const AuthRoute = () => {
  const { pathname } = useLocation();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!storage.getItem('token'),
    select: (response: any) => response?.data?.payload?.myinfo,
  });

  if (isLoadingUser) {
    return <></>;
  }

  if (!user) return <Navigate to="/login" />;

  if (pathname === '/') return <Navigate to="/deposit" />;

  return <Outlet />;
};

export default AuthRoute;
