import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import {
  SelectProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getUserWithdrawSettings } from '@/lib/api/user';
import { UserWithdrawSetting } from '@/types/user';

type Props = {
  onChange: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  value: 'C' | 'F';
} & Omit<ToggleButtonGroupProps, 'onChange' | ' value'>;

const CryptoFiatToggleGroup = forwardRef<SelectProps, Props>(
  ({ onChange, ...props }, ref) => {
    const { data: userWithdrawSettings } = useQuery({
      queryKey: ['userWithdrawSettings'],
      queryFn: getUserWithdrawSettings,
      select: (response: any) => response.data.list as UserWithdrawSetting[],
    });

    const enabledCrypto =
      userWithdrawSettings?.find(
        (userWithDrawSetting) =>
          userWithDrawSetting.subkey_ === 'ALLOW-TO-CRYPTO',
      )?.value_ === '1';

    const enabledFiat =
      userWithdrawSettings?.find(
        (userWithDrawSetting) =>
          userWithDrawSetting.subkey_ === 'ALLOW-TO-FIAT',
      )?.value_ === '1';

    const onChangeToggle = (e: React.MouseEvent<HTMLElement>, value: any) => {
      if (value !== null) {
        onChange(e, value);
      }
    };

    const onClickC = (e: React.MouseEvent<HTMLElement>) => {
      if (!enabledCrypto) {
        e.preventDefault();
        toast.warning('COMING SOON');
      }
    };

    const onClickF = (e: React.MouseEvent<HTMLElement>) => {
      if (!enabledFiat) {
        e.preventDefault();
        toast.warning('COMING SOON');
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
          aria-disabled={!enabledCrypto}
          sx={{
            '&[aria-disabled="true"]': {
              color: 'white',
              backgroundColor: 'rgb(209 213 219)',
            },
            '&.Mui-selected': {
              color: '#15a7a5',
              bgcolor: 'rgba(21, 167, 165, 0.08)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(21, 167, 165, 0.12)',
            },
          }}
          value="C"
          onClick={onClickC}
        >
          CRYPTO
        </ToggleButton>
        <ToggleButton
          aria-disabled={!enabledFiat}
          className="w-1/2"
          sx={{
            '&[aria-disabled="true"]': {
              color: 'white',
              backgroundColor: 'rgb(209 213 219)',
            },
            '&.Mui-selected': {
              color: '#15a7a5',
              bgcolor: 'rgba(21, 167, 165, 0.08)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(21, 167, 165, 0.12)',
            },
          }}
          value="F"
          onClick={onClickF}
        >
          FIAT
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
);

CryptoFiatToggleGroup.displayName = 'CryptoFiatToggleGroup';

export default CryptoFiatToggleGroup;
