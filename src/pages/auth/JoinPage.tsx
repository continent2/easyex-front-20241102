import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import JoinForm from '@/components/auth/JoinForm';

import {
  join,
  sendEmailVerifyCode,
  sendPhoneVerifyCode,
  verifyEmailVerifyCode,
  verifyPhoneVerifyCode,
} from '@/lib/api/auth';
import useModal from '@/lib/hooks/useModal';

export type JoinFormValue = {
  email: string;
  emailVerifyCode: string;
  phonecountrycode2letter: string;
  phonenationalnumber: string;
  phoneVerifyCode: string;
  pw: string;
};

export default function JoinPage() {
  const joinForm = useForm<JoinFormValue>({
    criteriaMode: 'firstError',
    mode: 'all',
  });

  const { handleSubmit, watch, trigger } = joinForm;
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);

  const { openModal } = useModal();

  const { mutate: joinMutate } = useMutation({
    mutationFn: join,
    onSuccess: (response) => {
      if (response?.data?.status === 'OK') {
        openModal({
          title: 'Success',
          content: 'Registration has been completed',
          isVisibleOkBtn: true,
          okBtnCallback: () => {
            window.location.href = '/login';
          },
        });
      }
    },
  });

  const onSubmitJoinFrom = ({
    email,
    phonecountrycode2letter,
    phonenationalnumber,
    pw,
  }: JoinFormValue) => {
    if (!isVerifyEmail) {
      openModal({
        title: 'Error',
        content: 'Please verify your email',
        isVisibleOkBtn: true,
      });
      return;
    }

    if (!isVerifyPhone) {
      openModal({
        title: 'Error',
        content: 'Please verify your phone',
        isVisibleOkBtn: true,
      });
      return;
    }
    joinMutate({
      email,
      phonecountrycode2letter,
      phonenationalnumber,
      pw,
    });
  };

  const { mutate: sendEmailVerifyCodeMutate } = useMutation({
    mutationFn: sendEmailVerifyCode,
    onSuccess: (response: any) => {
      if (response?.data?.status === 'OK') {
        setIsVerifyEmail(false);
        openModal({
          title: 'Success',
          content: ' ENTER VERIFY CODE YOU RECEIVED',
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

  const { mutate: verifyEmailVerifyCodeMutate } = useMutation({
    mutationFn: verifyEmailVerifyCode,
    onSuccess: (response: any) => {
      if (response?.data?.status === 'OK') {
        setIsVerifyEmail(true);
        openModal({
          title: 'Success',
          content: 'Email verification has been completed.',
          isVisibleOkBtn: true,
        });
      }
    },
  });

  const onVerifyEmailVerifyCode = async () => {
    if ((await trigger('emailVerifyCode')) && (await trigger('email'))) {
      const email = watch('email');
      const emailVerifyCode = watch('emailVerifyCode');
      verifyEmailVerifyCodeMutate({ email, code: emailVerifyCode });
    }
  };

  const { mutate: sendPhoneVerifyCodeMutate } = useMutation({
    mutationFn: sendPhoneVerifyCode,
    onSuccess: (response: any) => {
      if (response?.data?.status === 'OK') {
        setIsVerifyPhone(false);
        openModal({
          title: 'Success',
          content: ' ENTER VERIFY CODE YOU RECEIVED',
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

  const { mutate: verifyPhoneVerifyCodeMutate } = useMutation({
    mutationFn: verifyPhoneVerifyCode,
    onSuccess: (response: any) => {
      if (response?.data?.status === 'OK') {
        setIsVerifyPhone(true);
        openModal({
          title: 'Success',
          content: 'Phone verification has been completed.',
          isVisibleOkBtn: true,
        });
      }
    },
  });

  const onVerifyPhoneVerifyCode = async () => {
    if (
      (await trigger('phoneVerifyCode')) &&
      (await trigger('phonenationalnumber'))
    ) {
      const phonenationalnumber = watch('phonenationalnumber');
      const phonecountrycode2letter = watch('phonecountrycode2letter');
      const phoneVerifyCode = watch('phoneVerifyCode');
      verifyPhoneVerifyCodeMutate({
        phonenationalnumber,
        phonecountrycode2letter,
        code: phoneVerifyCode,
      });
    }
  };

  return (
    <FormProvider {...joinForm}>
      <form onSubmit={handleSubmit(onSubmitJoinFrom)}>
        <JoinForm
          isVerifyEmail={isVerifyEmail}
          isVerifyPhone={isVerifyPhone}
          onSendEmailVerifyCode={onSendEmailVerifyCode}
          onVerifyEmailVerifyCode={onVerifyEmailVerifyCode}
          onSendPhoneVerifyCode={onSendPhoneVerifyCode}
          onVerifyPhoneVerifyCode={onVerifyPhoneVerifyCode}
        />
      </form>
    </FormProvider>
  );
}
