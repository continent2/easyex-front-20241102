import { useMutation } from '@tanstack/react-query';

import AuthJoinForm, {
  AuthJoinFormValues,
} from '@/components/auth/AuthJoinForm/AuthJoinForm';

import { sendPhoneVerifyCode } from '@/lib/api/auth';

export default function AuthJoinPage() {
  const { mutate: sendPhoneVerifyCodeMutate } = useMutation({
    mutationFn: sendPhoneVerifyCode,
  });

  const onSubmitPhoneVerifyCodeSendForm = ({
    phonecountrycode2letter,
    phonenationalnumber,
  }: AuthJoinFormValues) => {
    sendPhoneVerifyCodeMutate({ phonecountrycode2letter, phonenationalnumber });
  };

  return (
    <>
      <AuthJoinForm
        onSubmitPhoneVerifyCodeSendForm={onSubmitPhoneVerifyCodeSendForm}
      />
    </>
  );
}
