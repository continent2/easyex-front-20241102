import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CountryAndCurrency from '@workmate/country-and-currency';

import PasswordInput from '@/components/common/PasswordInput';

import copyImage from '@/assets/img/ico-copy.png';

import { countries } from '@/constants/countries';
import { env } from '@/env';
import {
  sendEmailVerifyCode,
  sendPhoneVerifyCode,
  verifyEmailVerifyCode,
  verifyPhoneVerifyCode,
} from '@/lib/api/auth';
import { getUserInfo, updateUserInfo } from '@/lib/api/user';
import useModal from '@/lib/hooks/useModal';
import { UserInfo } from '@/types/user';

export type infoFormValue = {
  email: string;
  emailVerifyCode: string;
  phonecountrycode2letter: string;
  phonenationalnumber: string;
  phoneVerifyCode: string;
  preferdepositcurrency: string | null;
  preferwithdrawcurrency: string | null;
  username: string;
  pw: string;
};

export default function InfoPage() {
  const { data: userInfo, refetch: refetchUserInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (response: any) => {
      return response.data.payload as UserInfo;
    },
  });

  const { openModal } = useModal();

  const onCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        openModal({
          title: 'Success',
          content: 'Copied to clipboard.',
          isVisibleOkBtn: true,
        });
      })
      .catch((err) => {
        try {
          const textArea = document.createElement('textarea');
          document.body.appendChild(textArea);
          textArea.value = text;
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          openModal({
            title: 'Success',
            content: 'Copied to clipboard.',
            isVisibleOkBtn: true,
          });
        } catch (err) {
          openModal({
            title: 'Copy Fail',
            content: `${err}`,
            isVisibleOkBtn: true,
          });
        }
      });
  };

  const joinForm = useForm<infoFormValue>({
    criteriaMode: 'firstError',
    mode: 'all',
    defaultValues: {
      phonecountrycode2letter: 'KR',
      preferdepositcurrency: 'KRW',
      preferwithdrawcurrency: 'KRW',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    getFieldState,
    formState: { errors },
  } = joinForm;

  useEffect(() => {
    if (userInfo) {
      setValue(
        'phonecountrycode2letter',
        userInfo.myinfo.phonecountrycode2letter,
      );
      setValue('phonenationalnumber', userInfo.myinfo.phonenationalnumber);
      setValue('email', userInfo.myinfo.email);
      setValue('username', userInfo.myinfo.username);
      setValue('preferdepositcurrency', userInfo.myinfo.preferdepositcurrency);
      setValue(
        'preferwithdrawcurrency',
        userInfo.myinfo.preferwithdrawcurrency,
      );
    }
  }, [userInfo]);

  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);

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
    const phonecountrycode2letter = watch('phonecountrycode2letter');
    const phonenationalnumber = watch('phonenationalnumber');

    if (!phonecountrycode2letter) {
      setError('phonecountrycode2letter', {
        message: 'Please enter country',
      });
      return;
    }

    if (!phonenationalnumber) {
      setError('phonenationalnumber', {
        message: 'Please enter phone number',
      });
      return;
    }

    sendPhoneVerifyCodeMutate({
      phonecountrycode2letter,
      phonenationalnumber,
    });
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
    const phonecountrycode2letter = watch('phonecountrycode2letter');
    const phonenationalnumber = watch('phonenationalnumber');
    const phoneVerifyCode = watch('phoneVerifyCode');

    if (!phonecountrycode2letter) {
      setError('phonecountrycode2letter', {
        message: 'Please enter country',
      });
      return;
    }

    if (!phonenationalnumber) {
      setError('phonenationalnumber', {
        message: 'Please enter phone number',
      });
      return;
    }

    if (!phoneVerifyCode) {
      setError('phoneVerifyCode', {
        message: 'Please enter phone verify code',
      });
      return;
    }
    verifyPhoneVerifyCodeMutate({
      phonenationalnumber,
      phonecountrycode2letter,
      code: phoneVerifyCode,
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
    const email = watch('email');
    if (!email) {
      setError('email', {
        message: 'Please enter email',
      });
      return;
    }

    sendEmailVerifyCodeMutate(email);
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
    const email = watch('email');
    const emailVerifyCode = watch('emailVerifyCode');

    if (!email) {
      setError('email', {
        message: 'Please enter email',
      });
      return;
    }

    if (!emailVerifyCode) {
      setError('emailVerifyCode', {
        message: 'Please enter email verify code',
      });
      return;
    }

    verifyEmailVerifyCodeMutate({ email, code: emailVerifyCode });
  };

  const { mutate: updateUserInfoMutate } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      refetchUserInfo().then(() => {
        openModal({
          title: 'Success',
          content: 'Save successfully',
          isVisibleOkBtn: true,
        });
      });
    },
  });

  const onSubmitInfoForm = ({
    email,
    phonecountrycode2letter,
    phonenationalnumber,
    pw,
    username,
    preferdepositcurrency,
    preferwithdrawcurrency,
  }: infoFormValue) => {
    if (
      isVerifyPhone ||
      isVerifyEmail ||
      getFieldState('username').isDirty ||
      getFieldState('pw').isDirty ||
      preferdepositcurrency ||
      preferwithdrawcurrency
    ) {
      updateUserInfoMutate({
        phonecountrycode2letter: isVerifyPhone
          ? phonecountrycode2letter
          : undefined,
        phonenationalnumber: isVerifyPhone ? phonenationalnumber : undefined,
        email: isVerifyEmail ? email : undefined,
        username:
          getFieldState('username').isDirty && username ? username : undefined,
        pw: getFieldState('pw').isDirty && pw ? pw : undefined,
        preferdepositcurrency:
          preferdepositcurrency !== null ? preferdepositcurrency : undefined,
        preferwithdrawcurrency:
          preferwithdrawcurrency !== null ? preferwithdrawcurrency : undefined,
      });
    }
  };

  return (
    <>
      <h2>My Info</h2>
      <div className="cont_box_wrp join-cont-box-wrap border-[1px] border-solid border-[#ddd] rounded-[10px] flex flex-col justify-center items-center p-[30px] gap-[32px]">
        <h3 className="self-start text-[#15a7a5]">My reference code</h3>
        <QRCodeSVG
          value={`${env.appUrl}/join?parentcode=${userInfo?.myinfo.myreferercode}`}
        />
        <div className="flex px-2 items-center h-[45px] rounded-[8px] border-[1px] border-solid border-[#15a7a5] disabled:bg-white">
          <input
            value={userInfo?.myinfo.myreferercode}
            className="rounded-[8px] disabled:bg-white border-none"
            readOnly
            disabled
          ></input>
          <button
            className="copy-btn"
            onClick={() => {
              const copyText = userInfo?.myinfo.myreferercode;
              if (copyText) onCopyText(copyText);
            }}
            type="button"
          >
            <img src={copyImage} alt="Copy" />
          </button>
        </div>
        <div className="text-[#15a7a5]">Share this code with your friends</div>
      </div>
      <form onSubmit={handleSubmit(onSubmitInfoForm)}>
        <div className="cont_box_wrp join-cont-box-wrap join-inp-wrap border-[1px] border-solid border-[#ddd] rounded-[10px] flex flex-col p-[30px] !mt-[12px]">
          {/* phone */}
          <h3 className="self-start text-[#15a7a5] mb-[32px]">
            Change phone number
          </h3>
          <div className="join-inp-grp01 w-full">
            <Box
              className="lg:mb-[15px] sm:!mb-0"
              sx={{
                width: '100%',
                position: 'relative',
                borderRadius: '10px',
                border: '2.5px solid transparent',
                background:
                  'linear-gradient(90deg, #ecfbf8,#4cd4d2) border-box',
                lineHeight: '56px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  background: 'white',
                  borderRadius: '8px',
                }}
              >
                <Box
                  className="label"
                  sx={{
                    position: 'absolute',
                    paddingLeft: 2.2,
                    marginRight: 1,
                    color: '#25adab',
                  }}
                >
                  Country
                </Box>
                <Autocomplete
                  disabled={isVerifyPhone}
                  onChange={(_, value) => {
                    if (value) setValue('phonecountrycode2letter', value.code);
                    else setValue('phonecountrycode2letter', '');
                  }}
                  value={countries.find(
                    (option) =>
                      option.code === watch('phonecountrycode2letter'),
                  )}
                  componentsProps={{
                    paper: {
                      sx: {
                        width: 'fit-content',
                        position: 'absolute',
                        left: 0,
                        top: 3,
                        '@media (max-width: 1024px)': {
                          width: '100%',
                        },
                      },
                    },
                  }}
                  id="country-select"
                  sx={{
                    width: '100%',
                    '& fieldset': { border: 'none' },
                  }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.code}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                      key={option.code}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('phonecountrycode2letter', {
                        // required: 'Please enter country',
                      })}
                      disabled={isVerifyPhone}
                      inputProps={{
                        ...params.inputProps,

                        style: { paddingLeft: '90px' },
                      }}
                    />
                  )}
                />
              </Box>
              <ErrorMessage
                errors={errors}
                name="phonecountrycode2letter"
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </Box>
            <div className="money_inp">
              <i className="label">Phone #</i>
              <input
                type="text"
                className="inp_style"
                readOnly={isVerifyPhone}
                disabled={isVerifyPhone}
                placeholder="NUMBERS ONLY"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.target.value = event.target.value.replace(
                    /[^0-9]/g,
                    '',
                  );
                }}
                {...register('phonenationalnumber', {
                  // required: 'Please enter phon number',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="phonenationalnumber"
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </div>
            <button
              type="button"
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              onClick={onSendPhoneVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02 w-full">
            <div className="money_inp relative">
              <input
                readOnly={isVerifyPhone}
                disabled={isVerifyPhone}
                className="inp_style"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.target.value = event.target.value.replace(
                    /[^0-9]/g,
                    '',
                  );
                }}
                {...register('phoneVerifyCode', {
                  // required: 'Please Enter phone verify code',
                })}
              />
              <ErrorMessage
                name="phoneVerifyCode"
                errors={errors}
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </div>
            <button
              type="button"
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              onClick={onVerifyPhoneVerifyCode}
            >
              Verify code
            </button>
          </div>
          {/* email */}
          <h3 className="self-start text-[#15a7a5] mb-[32px]">Change Email</h3>
          <div className="join-inp-grp02 w-full">
            <div className="money_inp">
              <i className="label">Email</i>
              <input
                readOnly={isVerifyEmail}
                disabled={isVerifyEmail}
                className="inp_style"
                {...register('email', {
                  // required: 'Please Enter email',
                  // pattern: {
                  //   value: /\S+@\S+\.\S+/,
                  //   message: 'Invalid email address',
                  // },
                })}
              />
              <ErrorMessage
                name="email"
                errors={errors}
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </div>
            <button
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              type="button"
              onClick={onSendEmailVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02 w-full">
            <div className="money_inp">
              <input
                readOnly={isVerifyEmail}
                disabled={isVerifyEmail}
                className="inp_style"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.target.value = event.target.value.replace(
                    /[^0-9]/g,
                    '',
                  );
                }}
                {...register('emailVerifyCode', {
                  // required: 'Please Enter email verify code',
                })}
              />
              <ErrorMessage
                name="emailVerifyCode"
                errors={errors}
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </div>
            <button
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              type="button"
              onClick={onVerifyEmailVerifyCode}
            >
              Verify code
            </button>
          </div>
          {/* preferdeposit */}
          <h3 className="self-start text-[#15a7a5] mb-[32px]">
            Preferred deposit currency
          </h3>
          <div className="join-inp-grp01 w-full">
            <Box
              className="lg:mb-[15px] sm:!mb-0"
              sx={{
                width: '100%',
                position: 'relative',
                borderRadius: '10px',
                border: '2.5px solid transparent',
                background:
                  'linear-gradient(90deg, #ecfbf8,#4cd4d2) border-box',
                lineHeight: '56px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  background: 'white',
                  borderRadius: '8px',
                }}
              >
                {/* <Box
                  className="label"
                  sx={{
                    position: 'absolute',
                    paddingLeft: 2.2,
                    marginRight: 1,
                    color: '#25adab',
                  }}
                >
                  PREFERRED DEPOSIT CURRENCY
                </Box> */}
                <Autocomplete
                  onChange={(_, value) => {
                    if (value)
                      setValue('preferdepositcurrency', value.currency.code);
                    else setValue('preferdepositcurrency', null);
                  }}
                  value={CountryAndCurrency.getCountries().find(
                    (option) =>
                      option.currency.code === watch('preferdepositcurrency'),
                  )}
                  componentsProps={{
                    paper: {
                      sx: {
                        width: 'fit-content',
                        position: 'absolute',
                        left: 0,
                        top: 3,
                        '@media (max-width: 1024px)': {
                          width: '100%',
                        },
                      },
                    },
                  }}
                  id="country-select"
                  sx={{
                    width: '100%',
                    '& fieldset': { border: 'none' },
                  }}
                  options={CountryAndCurrency.getCountries()}
                  autoHighlight
                  getOptionLabel={(option) => option.currency.code}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                      key={option.name}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={option.flag}
                        srcSet={option.flag}
                        alt=""
                      />
                      {option.currency.code}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('preferdepositcurrency', {
                        // required: 'Please enter country',
                      })}
                      inputProps={{
                        ...params.inputProps,
                        // style: { paddingLeft: '270px' },
                      }}
                    />
                  )}
                />
              </Box>
              <ErrorMessage
                errors={errors}
                name="preferdepositcurrency"
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </Box>
          </div>
          {/* preferwithdraw */}
          <h3 className="self-start text-[#15a7a5] mb-[32px]">
            Preferred withdraw currency
          </h3>
          <div className="join-inp-grp01 w-full">
            <Box
              className="lg:mb-[15px] sm:!mb-0"
              sx={{
                width: '100%',
                position: 'relative',
                borderRadius: '10px',
                border: '2.5px solid transparent',
                background:
                  'linear-gradient(90deg, #ecfbf8,#4cd4d2) border-box',
                lineHeight: '56px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  background: 'white',
                  borderRadius: '8px',
                }}
              >
                {/* <Box
                  className="label"
                  sx={{
                    position: 'absolute',
                    paddingLeft: 2.2,
                    marginRight: 1,
                    color: '#25adab',
                  }}
                >
                  PREFERRED WITHDRAW CURRENCY
                </Box> */}
                <Autocomplete
                  onChange={(_, value) => {
                    if (value)
                      setValue('preferwithdrawcurrency', value.currency.code);
                    else setValue('preferwithdrawcurrency', null);
                  }}
                  value={CountryAndCurrency.getCountries().find(
                    (option) =>
                      option.currency.code === watch('preferwithdrawcurrency'),
                  )}
                  componentsProps={{
                    paper: {
                      sx: {
                        width: 'fit-content',
                        position: 'absolute',
                        left: 0,
                        top: 3,
                        '@media (max-width: 1024px)': {
                          width: '100%',
                        },
                      },
                    },
                  }}
                  id="country-select"
                  sx={{
                    width: '100%',
                    '& fieldset': { border: 'none' },
                  }}
                  options={CountryAndCurrency.getCountries()}
                  autoHighlight
                  getOptionLabel={(option) => option.currency.code}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                      key={option.name}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={option.flag}
                        srcSet={option.flag}
                        alt=""
                      />
                      {option.currency.code}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('preferwithdrawcurrency', {
                        // required: 'Please enter country',
                      })}
                      inputProps={{
                        ...params.inputProps,
                        // style: { paddingLeft: '298px' },
                      }}
                    />
                  )}
                />
              </Box>
              <ErrorMessage
                errors={errors}
                name="preferwithdrawcurrency"
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </Box>
          </div>
          {/* name */}
          <div className="money_inp">
            <i className="label">Name</i>
            <input
              className="inp_style"
              {...register('username', {
                pattern: {
                  value: /^.{7,40}$/,
                  message: 'username must be between 7 and 40 characters',
                },
                required: 'Please username',
              })}
            />
          </div>
          <div className="text-[13px] leading-[20px]">
            AT LEAST 7 CHARACTERS
          </div>
          <div className="text-[13px] leading-[20px]">
            LESS THAN 40 CHARACTERS
          </div>
          <ErrorMessage
            name="username"
            errors={errors}
            render={({ message }) => (
              <p className="text-red-500 leading-[20px] text-[13px]">
                {message}
              </p>
            )}
          />
          {/* pw */}
          <div className="money_inp password_inp mt-[35px]">
            <i className="label">Password</i>
            <PasswordInput
              {...register('pw', {
                // required: 'Please Enter password',
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{7,30}$/,
                  message:
                    'Password must be between 7 and 30 characters long and include at least one letter and one number.',
                },
              })}
            />
          </div>
          <div className="text-[13px] leading-[20px]">
            AT LEAST 7 CHARACTERS
          </div>
          <div className="text-[13px] leading-[20px]">AT LEAST 1 ALPHABET</div>
          <div className="text-[13px] leading-[20px]">AT LEAST 1 NUMBER</div>
          <ErrorMessage
            name="pw"
            errors={errors}
            render={({ message }) => (
              <p className="text-red-500 leading-[20px] text-[13px]">
                {message}
              </p>
            )}
          />
          <button className="self-center disabled:!bg-gray-300 !w-[500px] lg:!w-full text-[#15a7a5] bg-[#a6e7e6] py-0 px-[15px] h-[60px] rounded-[10px] border-none mt-[80px] lg:h-[50px]">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
