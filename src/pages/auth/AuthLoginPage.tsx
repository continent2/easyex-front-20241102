import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import AuthLoginForm from '@/components/auth/AuthLoginForm';
import { LoginFormValues } from '@/components/auth/AuthLoginForm/AuthLoginForm';

import { login } from '@/lib/api/auth';
import storage from '@/lib/storage';

export default function AuthLoginPage() {
  const navigate = useNavigate();
  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.data?.status === 'OK') {
        storage.setItem('token', response.data?.payload?.token?.token);
        navigate({
          pathname: '/',
        });
      }
    },
  });

  const onSubmitLoginForm = ({
    phonecountrycode2letter,
    phonenationalnumber,
    pw,
  }: LoginFormValues) => {
    loginMutate({
      phonecountrycode2letter,
      phonenationalnumber,
      pw,
    });
  };

  return <AuthLoginForm onSubmitLoginForm={onSubmitLoginForm} />;
}
