import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField } from '@mui/material';

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
    formState: { errors },
  } = useFormContext();

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
              disabled={isVerifyEmail}
              className="mini-btn"
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
                {...register('emailVerifyCode', {
                  required: 'Please Enter email verify code',
                })}
              />
              <ErrorMessage
                name="emailVerifyCode"
                errors={errors}
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </div>
            <button
              disabled={isVerifyEmail}
              className="mini-btn"
              type="button"
              onClick={onVerifyEmailVerifyCode}
            >
              Verify code
            </button>
          </div>

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
                  disabled={isVerifyPhone}
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
                        required: 'Please enter country',
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
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </Box>
            <div className="money_inp">
              <i className="label">Phone number</i>
              <input
                type="text"
                className="inp_style"
                readOnly={isVerifyPhone}
                disabled={isVerifyPhone}
                {...register('phonenationalnumber', {
                  required: 'Please enter phon number',
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
              disabled={isVerifyPhone}
              onClick={onSendPhoneVerifyCode}
            >
              Request code
            </button>
          </div>
          <div className="join-inp-grp02">
            <div className="money_inp">
              <input
                readOnly={isVerifyPhone}
                disabled={isVerifyPhone}
                className="inp_style"
                {...register('phoneVerifyCode', {
                  required: 'Please Enter phone verify code',
                })}
              />
              <ErrorMessage
                name="phoneVerifyCode"
                errors={errors}
                render={({ message }) => <p className="red_alert">{message}</p>}
              />
            </div>
            <button
              disabled={isVerifyPhone}
              className="mini-btn"
              type="button"
              onClick={onVerifyPhoneVerifyCode}
            >
              Verify code
            </button>
          </div>

          <div className="money_inp password_inp">
            <i className="label">Password</i>
            <input
              type="password"
              className="inp_style"
              {...register('pw', {
                required: 'Please Enter password',
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{7,30}$/,
                  message:
                    'Password must be between 7 and 30 characters long and include at least one letter and one number.',
                },
              })}
            />
            <ErrorMessage
              name="pw"
              errors={errors}
              render={({ message }) => <p className="red_alert">{message}</p>}
            />
          </div>
        </div>

        <div className="btn_box">
          <button className="w100-btn">Join</button>
          <div className="opt-btns">
            <button type="button" className="opt-btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
