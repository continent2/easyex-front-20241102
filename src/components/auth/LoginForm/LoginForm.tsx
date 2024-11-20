import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField } from '@mui/material';

import { LoginFormValues } from '@/pages/auth/LoginPage';

import SnsLogin from '@/components/auth/SnsLogin';
import PasswordInput from '@/components/common/PasswordInput';

import { countries } from '@/constants/countries';

type Props = {
  onSendEmailVerifyCode: () => void;
  onSendPhoneVerifyCode: () => void;
};

export default function LoginForm({
  onSendEmailVerifyCode,
  onSendPhoneVerifyCode,
}: Props) {
  const {
    watch,
    register,
    formState: { errors, isValid },
    // getFieldState,
    clearErrors,
    setValue,
  } = useFormContext<LoginFormValues>();

  // const emailState = getFieldState('email');
  // const phonecountrycode2letterState = getFieldState('phonecountrycode2letter');
  // const phonenationalnumberState = getFieldState('phonenationalnumber');

  const isInputPhone =
    !!watch('phonePw') ||
    !!watch('phoneVerifyCode') ||
    !!watch('phonecountrycode2letter') ||
    !!watch('phonenationalnumber');

  const isInputEmail =
    !!watch('email') || !!watch('emailPw') || !!watch('emailVerifyCode');

  useEffect(() => {
    clearErrors(['email', 'emailPw', 'emailVerifyCode']);
  }, [isInputPhone]);

  useEffect(() => {
    clearErrors([
      'phonePw',
      'phoneVerifyCode',
      'phonecountrycode2letter',
      'phonenationalnumber',
    ]);
  }, [isInputEmail]);

  useEffect(() => {
    clearErrors('emailPw');
  }, [watch('emailVerifyCode')]);

  useEffect(() => {
    clearErrors('emailVerifyCode');
  }, [watch('emailPw')]);

  useEffect(() => {
    clearErrors('phoneVerifyCode');
  }, [watch('phonePw')]);

  useEffect(() => {
    clearErrors('phonePw');
  }, [watch('phoneVerifyCode')]);

  return (
    <>
      <div className="min-w-[760px] mx-auto max-w-[700px] lg:max-w-[800px] lg:min-w-[auto] lg:w-[90%] mb-[35px]">
        Log in with either your email or phone
      </div>
      <div className="auth-box m-column">
        <div className="cont_box_wrp join-cont-box-wrap">
          <div className="join-inp-wrap">
            <div className="join-inp-grp02">
              <div className="money_inp" aria-disabled={isInputPhone}>
                <i className="label">Email</i>
                <input
                  className="inp_style disabled:bg-white"
                  disabled={isInputPhone}
                  {...register('email', {
                    required: isInputPhone ? false : 'Please Enter email',
                    pattern: isInputPhone
                      ? undefined
                      : {
                          value: /\S+@\S+\.\S+/,
                          message: 'Invalid email address',
                        },
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
                disabled={isInputPhone}
                // disabled={!emailState.isDirty || emailState.invalid}
              >
                Request code
              </button>
            </div>
            <div className="join-inp-grp02">
              <div
                className="money_inp"
                aria-disabled={isInputPhone || !!watch('emailPw')}
              >
                <i className="label mr-[15px]">VerifyCode</i>
                <input
                  disabled={isInputPhone || !!watch('emailPw')}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      '',
                    );
                  }}
                  className="inp_style disabled:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  {...register('emailVerifyCode', {
                    required:
                      isInputPhone || !!watch('emailPw')
                        ? false
                        : 'Please Enter email verify code',
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
            </div>
            <div
              className="money_inp password_inp"
              aria-disabled={isInputPhone || !!watch('emailVerifyCode')}
            >
              <i className="label">Password</i>
              <PasswordInput
                className="disabled:bg-white"
                autoComplete="current-password"
                disabled={isInputPhone || !!watch('emailVerifyCode')}
                {...register('emailPw', {
                  required:
                    isInputPhone || !!watch('emailVerifyCode')
                      ? false
                      : 'Please enter password',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="emailPw"
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </div>
            <div className="my-[35px] flex items-center justify-center">OR</div>
            {/* 휴대폰 */}
            <div className="join-inp-grp01">
              <Box
                className="lg:mb-[15px] sm:!mb-0"
                aria-disabled={isInputEmail}
                sx={{
                  width: '100%',
                  position: 'relative',
                  borderRadius: '10px',
                  border: '2.5px solid transparent',
                  '&[aria-disabled="true"]': {
                    borderColor: 'rgb(156, 163, 175)',
                  },
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
                    disabled={isInputEmail}
                    onChange={(_, value) => {
                      if (value)
                        setValue('phonecountrycode2letter', value.code);
                      else setValue('phonecountrycode2letter', '');
                    }}
                    value={countries.find(
                      (country) =>
                        country.code === watch('phonecountrycode2letter'),
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
                    // disableClearable
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
                          required: isInputEmail
                            ? false
                            : 'Please enter country',
                        })}
                        inputProps={{
                          ...params.inputProps,
                          className: clsx('', params.inputProps.className),
                          style: { paddingLeft: '90px' },
                        }}
                        disabled={isInputEmail}
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
              <div className="money_inp" aria-disabled={isInputEmail}>
                <i className="label mr-[15px]">Phone number</i>
                <input
                  type="text"
                  className="inp_style disabled:bg-white"
                  disabled={isInputEmail}
                  placeholder="NUMBERS ONLY"
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      '',
                    );
                  }}
                  {...register('phonenationalnumber', {
                    required: isInputEmail ? false : 'Please enter phon number',
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
                className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
                type="button"
                onClick={onSendPhoneVerifyCode}
                disabled={isInputEmail}
                // disabled={
                //   !watch('phonecountrycode2letter') ||
                //   phonecountrycode2letterState.invalid ||
                //   !phonenationalnumberState.isDirty ||
                //   phonenationalnumberState.invalid
                // }
              >
                Request code
              </button>
            </div>
            <div className="join-inp-grp02">
              <div
                className="money_inp"
                aria-disabled={isInputEmail || !!watch('phonePw')}
              >
                <i className="label mr-[15px]">VerifyCode</i>
                <input
                  className="inp_style disabled:bg-white"
                  disabled={isInputEmail || !!watch('phonePw')}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      '',
                    );
                  }}
                  {...register('phoneVerifyCode', {
                    required:
                      isInputEmail || !!watch('phonePw')
                        ? false
                        : 'Please Enter phone verify code',
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
            </div>
            <div
              className="money_inp password_inp"
              aria-disabled={isInputEmail || !!watch('phoneVerifyCode')}
            >
              <i className="label">Password</i>
              <PasswordInput
                className="inp_style disabled:bg-white"
                autoComplete="current-password"
                disabled={isInputEmail || !!watch('phoneVerifyCode')}
                {...register('phonePw', {
                  required:
                    isInputEmail || !!watch('phoneVerifyCode')
                      ? false
                      : 'Please enter password',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="phonePw"
                render={({ message }) => (
                  <p className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px] left-0">
                    {message}
                  </p>
                )}
              />
            </div>
          </div>

          <div className="btn_box">
            <button
              className="w100-btn disabled:!bg-gray-300"
              disabled={!isValid}
            >
              Login
            </button>
            <div className="opt-btns flex !justify-center items-center">
              <a href="/join" className="text-[18px] underline">
                Join
              </a>
              {/* <button type="button" className="opt-btn">
              </button> */}
            </div>
          </div>
          <div className="btn_box">
            <SnsLogin />
          </div>
        </div>
      </div>
    </>
  );
}
