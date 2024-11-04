import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, Box, TextField } from '@mui/material';

import AuthSnsLogin from '@/components/auth/AuthSnsLogin';

import { countries } from '@/constants/countries';

type Props = {
  onSubmitLoginForm: (loginFormValues: LoginFormValues) => void;
};

export type LoginFormValues = {
  phonecountrycode2letter: string;
  phonenationalnumber: string;
  pw: string;
};

export default function AuthLoginForm({ onSubmitLoginForm }: Props) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      phonecountrycode2letter: 'KR',
      phonenationalnumber: '01084978755',
      pw: 'qgjtjcpr59',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitLoginForm)}>
      <div className="auth-box m-column">
        <div className="cont_box_wrp login-cont-box-wrap">
          <div className="login-inp-wrap">
            <div className="login-inp-grp">
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
                          required: 'Please enter country',
                        })}
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
                    <p className="red_alert">{message}</p>
                  )}
                />
              </Box>
              <div className="money_inp">
                <i className="label">Phone number</i>
                <input
                  type="text"
                  className="inp_style"
                  {...register('phonenationalnumber', {
                    required: 'Please enter phon number',
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="phonenationalnumber"
                  render={({ message }) => (
                    <p className="red_alert">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="money_inp password_inp">
              <i className="label">Password</i>
              <input
                type="password"
                className="inp_style"
                autoComplete="current-password"
                {...register('pw', {
                  required: 'Please enter password',
                })}
              />
              <ErrorMessage
                errors={errors}
                name="pw"
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
              <button type="button" className="opt-btn">
                SMS Login
              </button>
            </div>
            <AuthSnsLogin />
          </div>
        </div>
      </div>
    </form>
  );
}
