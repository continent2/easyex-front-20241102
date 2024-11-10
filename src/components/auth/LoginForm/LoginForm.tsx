import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField } from '@mui/material';

import { LoginFormValues } from '@/pages/auth/LoginPage';

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
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  const isInputPhone =
    !!watch('phonePw') ||
    !!watch('phoneVerifyCode') ||
    !!watch('phonecountrycode2letter') ||
    !!watch('phonenationalnumber');

  const isInputEmail =
    !!watch('email') || !!watch('emailPw') || !!watch('emailVerifyCode');

  return (
    <div className="auth-box m-column">
      <div className="cont_box_wrp join-cont-box-wrap">
        <div className="join-inp-wrap">
          <div className="join-inp-grp02">
            <div className="money_inp">
              <i className="label">Email</i>
              <input
                className="inp_style"
                disabled={isInputPhone}
                {...register('email', {
                  required: isInputPhone ? false : 'Please Enter email',
                  pattern: isInputPhone
                    ? undefined
                    : {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email',
                      },
                })}
              />
              <ErrorMessage
                name="email"
                errors={errors}
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </div>
            <button
              className="mini-btn"
              type="button"
              onClick={onSendEmailVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02">
            <div className="money_inp">
              <i className="label mr-[15px]">VerifyCode</i>
              <input
                disabled={isInputPhone || !!watch('emailPw')}
                className="inp_style"
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
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </div>
          </div>
          <div className="money_inp password_inp">
            <i className="label">Password</i>
            <input
              type="password"
              className="inp_style"
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
              render={({ message }) => <p className="red_alert">{message}</p>}
            />
          </div>
          <div className="my-[35px] flex items-center justify-center">OR</div>
          {/* 휴대폰 */}
          <div className="join-inp-grp01">
            <Box
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
                  disabled={isInputEmail}
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
                  disableClearable
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
                        required: isInputEmail ? false : 'Please enter country',
                      })}
                      disabled={isInputEmail}
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
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </Box>
            <div className="money_inp">
              <i className="label mr-[15px]">Phone number</i>
              <input
                type="text"
                className="inp_style"
                disabled={isInputEmail}
                {...register('phonenationalnumber', {
                  required: isInputEmail ? false : 'Please enter phon number',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="phonenationalnumber"
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </div>
            <button
              className="mini-btn"
              type="button"
              onClick={onSendPhoneVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02">
            <div className="money_inp">
              <i className="label mr-[15px]">VerifyCode</i>
              <input
                className="inp_style"
                disabled={isInputEmail || !!watch('phonePw')}
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
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </div>
          </div>
          <div className="money_inp password_inp">
            <i className="label">Password</i>
            <input
              type="password"
              className="inp_style"
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
              render={({ message }) => <p className="red_alert">{message}</p>}
            />
          </div>
        </div>

        <div className="btn_box">
          <button className="w100-btn">Login</button>
          <div className="opt-btns">
            <button type="button" className="opt-btn">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
