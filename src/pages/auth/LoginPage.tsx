import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import LoginForm from '@/components/auth/LoginForm';

import {
  login,
  sendEmailVerifyCode,
  sendPhoneVerifyCode,
} from '@/lib/api/auth';
import useModal from '@/lib/hooks/useModal';
import storage from '@/lib/storage';

export type LoginFormValues = {
  email: string;
  emailVerifyCode: string;
  emailPw: string;
  phonecountrycode2letter: string;
  phonenationalnumber: string;
  phoneVerifyCode: string;
  phonePw: string;
};

export default function LoginPage() {
  const loginFrom = useForm<LoginFormValues>({
    mode: 'onChange',
  });

  const { openModal } = useModal();
  const { handleSubmit, watch, trigger } = loginFrom;

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
    email,
    emailVerifyCode,
    emailPw,
    phonecountrycode2letter,
    phonenationalnumber,
    phoneVerifyCode,
    phonePw,
  }: LoginFormValues) => {
    if (email || emailVerifyCode || emailPw) {
      if (emailPw) {
        loginMutate({
          email,
          pw: emailPw,
        });
        return;
      }

      if (emailVerifyCode) {
        loginMutate({
          email,
          code: emailVerifyCode,
        });
        return;
      }
    }

    if (
      phonecountrycode2letter ||
      phonenationalnumber ||
      phoneVerifyCode ||
      phonePw
    ) {
      if (phoneVerifyCode) {
        loginMutate({
          phonecountrycode2letter,
          phonenationalnumber,
          code: phoneVerifyCode,
        });
        return;
      }
    }
    if (phonePw) {
      loginMutate({
        phonecountrycode2letter,
        phonenationalnumber,
        pw: phonePw,
      });
      return;
    }

    if (phoneVerifyCode) {
      loginMutate({
        phonecountrycode2letter,
        phonenationalnumber,
        code: phoneVerifyCode,
      });
      return;
    }
  };

  const { mutate: sendEmailVerifyCodeMutate } = useMutation({
    mutationFn: sendEmailVerifyCode,
    onSuccess: (response: any) => {
      if (response?.data?.status === 'OK') {
        openModal({
          title: 'Success',
          content: 'ENTER VERIFY CODE YOU RECEIVED',
          isVisibleOkBtn: true,
        });
      }
    },
  });

  const onSendEmailVerifyCode = async () => {
    if (await trigger('email')) {
      const email = watch('email');
      sendEmailVerifyCodeMutate(email);
    }
  };

  const { mutate: sendPhoneVerifyCodeMutate } = useMutation({
    mutationFn: sendPhoneVerifyCode,
    onSuccess: (response: any) => {
      if (response?.data?.status === 'OK') {
        openModal({
          title: 'Success',
          content: 'ENTER VERIFY CODE YOU RECEIVED',
          isVisibleOkBtn: true,
        });
      }
    },
  });

  const onSendPhoneVerifyCode = async () => {
    if (
      (await trigger('phonecountrycode2letter')) &&
      (await trigger('phonenationalnumber'))
    ) {
      const phonecountrycode2letter = watch('phonecountrycode2letter');
      const phonenationalnumber = watch('phonenationalnumber');

      sendPhoneVerifyCodeMutate({
        phonecountrycode2letter,
        phonenationalnumber,
      });
    }
  };

  return (
    <FormProvider {...loginFrom}>
      <form onSubmit={handleSubmit(onSubmitLoginForm)}>
        <LoginForm
          onSendEmailVerifyCode={onSendEmailVerifyCode}
          onSendPhoneVerifyCode={onSendPhoneVerifyCode}
        />
      </form>
    </FormProvider>
  );
}
