import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField } from '@mui/material';

import { JoinFormValue } from '@/pages/auth/JoinPage';

import SnsLogin from '@/components/auth/SnsLogin';
import PasswordInput from '@/components/common/PasswordInput';

import { countries } from '@/constants/countries';

type Props = {
  isVerifyEmail: boolean;
  isVerifyPhone: boolean;
  onSendEmailVerifyCode: () => void;
  onVerifyEmailVerifyCode: () => void;
  onSendPhoneVerifyCode: () => void;
  onVerifyPhoneVerifyCode: () => void;
};

export default function JoinForm({
  isVerifyEmail,
  isVerifyPhone,
  onSendEmailVerifyCode,
  onVerifyEmailVerifyCode,
  onSendPhoneVerifyCode,
  onVerifyPhoneVerifyCode,
}: Props) {
  const {
    register,
    watch,
    setValue,
    // getFieldState,
    formState: { errors, isValid },
  } = useFormContext<JoinFormValue>();

  // const emailState = getFieldState('email');
  // const emailVerifyCodeState = getFieldState('emailVerifyCode');
  // const phonecountrycode2letterState = getFieldState('phonecountrycode2letter');
  // const phonenationalnumberState = getFieldState('phonenationalnumber');
  // const phoneVerifyCodeState = getFieldState('phoneVerifyCode');

  return (
    <div className="auth-box m-column">
      <div className="cont_box_wrp join-cont-box-wrap">
        <div className="join-inp-wrap">
          <div className="join-inp-grp02">
            <div className="money_inp">
              <i className="label">Email</i>
              <input
                readOnly={isVerifyEmail}
                disabled={isVerifyEmail}
                className="inp_style"
                {...register('email', {
                  required: 'Please Enter email',
                  pattern: {
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
              // disabled={!emailState.isDirty || emailState.invalid}
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              type="button"
              onClick={onSendEmailVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02">
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
                  required: 'Please Enter email verify code',
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
              // disabled={
              //   !emailVerifyCodeState.isDirty || emailVerifyCodeState.invalid
              // }
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              type="button"
              onClick={onVerifyEmailVerifyCode}
            >
              Verify code
            </button>
          </div>
          <div className="join-inp-grp01">
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
                  renderInput={(params) => {
                    const selectedCountry = countries.find(
                      (country) =>
                        country.code === watch('phonecountrycode2letter'),
                    );
                    return (
                      <TextField
                        {...params}
                        {...register('phonecountrycode2letter', {
                          required: isVerifyPhone
                            ? false
                            : 'Please enter country code',
                        })}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: selectedCountry && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                pl: 10,
                              }}
                            >
                              <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                alt=""
                              />
                            </Box>
                          ),
                        }}
                        inputProps={{
                          ...params.inputProps,
                          className: clsx('', params.inputProps.className),
                          style: {
                            paddingLeft: selectedCountry ? '0px' : '80px',
                          },
                        }}
                        disabled={isVerifyPhone}
                      />
                    );
                  }}
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
                placeholder="Numbers only"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.target.value = event.target.value.replace(
                    /[^0-9]/g,
                    '',
                  );
                }}
                {...register('phonenationalnumber', {
                  required: 'Please enter phon number',
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
              // disabled={
              //   !watch('phonecountrycode2letter') ||
              //   phonecountrycode2letterState.invalid ||
              //   !phonenationalnumberState.isDirty ||
              //   phonenationalnumberState.invalid
              // }
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              onClick={onSendPhoneVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02">
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
                  required: 'Please Enter phone verify code',
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
              // disabled={
              //   phoneVerifyCodeState.invalid || !phoneVerifyCodeState.isDirty
              // }
              className="mini-btn disabled:!bg-gray-300 disabled:!text-white"
              onClick={onVerifyPhoneVerifyCode}
            >
              Verify code
            </button>
          </div>

          <div className="money_inp password_inp">
            <i className="label">Password</i>
            <PasswordInput
              {...register('pw', {
                required: 'Please Enter password',
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
        </div>
        <div className="btn_box">
          <button
            className="w100-btn disabled:!bg-gray-300"
            disabled={!isValid}
          >
            Join
          </button>
          <div className="opt-btns flex !justify-center items-center">
            <a href="/login" className="text-[18px]">
              Login
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
  );
}
