import { forwardRef } from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

type Props = {
  options?: { value: any; label?: string; img?: string; disabled?: boolean }[];
  isVisibleLabel: boolean;
} & SelectProps;

const ImageSelect = forwardRef<SelectProps, Props>(
  ({ isVisibleLabel, options, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        sx={{
          padding: 0,
          '.MuiSelect-select': {
            whiteSpace: 'normal !important',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(228, 219, 233, 0)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(228, 219, 233, 0)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(228, 219, 233, 0)',
          },
        }}
        renderValue={(value) => {
          const data = options?.find((option) => option.value === value);
          return (
            <ListItemIcon
              sx={{
                minWidth: 0,
                gap: 1,
                alignItems: 'center',
              }}
            >
              <img src={data?.img} height={'25px'} alt={data?.label} />
              {isVisibleLabel && data?.label}
            </ListItemIcon>
          );
        }}
        {...props}
      >
        {options?.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            sx={{ display: 'flex', width: '100%', height: '30px' }}
            disabled={item.disabled}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={item.img}
                width={'auto'}
                height={'25px'}
                alt={item.label}
              />
            </ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    );
  },
);

ImageSelect.displayName = 'ImageSelect';

export default ImageSelect;
