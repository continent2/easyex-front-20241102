import { forwardRef } from 'react';
import {
  SelectProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@mui/material';

type Props = {
  onChange: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  value: 'C' | 'F';
} & Omit<ToggleButtonGroupProps, 'onChange' | ' value'>;

const CryptoFiatToggleGroup = forwardRef<SelectProps, Props>(
  ({ onChange, ...props }, ref) => {
    const onChangeToggle = (e: React.MouseEvent<HTMLElement>, value: any) => {
      if (value !== null) {
        onChange(e, value);
      }
    };

    return (
      <ToggleButtonGroup
        ref={ref}
        color="primary"
        exclusive
        className="mb-3 w-full"
        onChange={onChangeToggle}
        {...props}
      >
        <ToggleButton
          className="w-1/2"
          sx={{
            '&.Mui-selected': {
              color: '#15a7a5',
              bgcolor: 'rgba(21, 167, 165, 0.08)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(21, 167, 165, 0.12)',
            },
          }}
          value="C"
        >
          CRYPTO
        </ToggleButton>
        <ToggleButton
          className="w-1/2"
          sx={{
            '&.Mui-selected': {
              color: '#15a7a5',
              bgcolor: 'rgba(21, 167, 165, 0.08)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(21, 167, 165, 0.12)',
            },
          }}
          value="F"
        >
          FIAT
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
);

CryptoFiatToggleGroup.displayName = 'CryptoFiatToggleGroup';

export default CryptoFiatToggleGroup;
