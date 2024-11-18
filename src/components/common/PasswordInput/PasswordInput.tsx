import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  disabled?: boolean;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, disabled, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const onTogglePasswordVisibility = () => {
      setIsShowPassword((prev) => !prev);
    };

    return (
      <div className="flex w-full gap-2 items-center">
        <input
          type={isShowPassword ? 'text' : 'password'}
          className={clsx(
            'z-10 flex-1 border-0 outline-none text-[#4e4e4e]',
            className,
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {isShowPassword ? (
          <BsEye
            className="z-10 cursor-pointer w-5 h-5"
            onClick={disabled ? undefined : onTogglePasswordVisibility}
          />
        ) : (
          <BsEyeSlash
            className="z-10 cursor-pointer w-5 h-5"
            onClick={disabled ? undefined : onTogglePasswordVisibility}
          />
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
