import React from 'react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface CoinAndCashSelectorProps {
  options?: { value: any; label: string; img: string }[];
  readOnly?: boolean;
  disabled?: boolean;
  value: any;
  onChange: (event: SelectChangeEvent<string>, value: any) => void;
}

const ImageSelect: React.FC<CoinAndCashSelectorProps> = ({
  options,
  readOnly,
  disabled,
  value,
  onChange,
}) => {
  return (
    <Box>
      <Select
        className="z-10"
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        sx={{
          padding: 0,
          width: '75px',
          color: 'white',
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
          const data = options?.find((item) => item.value === value);
          return (
            <ListItemIcon>
              <img src={data?.img} height={'25px'} alt={data?.label} />
            </ListItemIcon>
          );
        }}
        onChange={(e) => {
          onChange(e, e.target.value);
        }}
      >
        {options?.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            sx={{ display: 'flex', width: '100%', height: '30px' }}
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
    </Box>
  );
};

export default ImageSelect;
