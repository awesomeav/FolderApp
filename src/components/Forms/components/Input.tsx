import React, { useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import clx from 'classnames';

export enum Variant {
  Text = 'text',
  Number = 'number',
  Password = 'password',
  Email = 'email'
}

type InputProps = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  onChange: SubmitHandler<any>;
  disabledPaste?: boolean;
  variant?: Variant;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  dataTestId?: string;
  info?: string;
  showIcon?: boolean;
  onBlur?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      showIcon,
      label = '',
      placeholder = '',
      defaultValue = '',
      onChange,
      disabledPaste = false,
      className = '',
      variant = Variant.Text,
      error = null,
      required = false,
      autoFocus = false,
      disabled = false,
      loading = false,
      dataTestId = '',
      info = '',
      onBlur = () => null
    },
    ref
  ) => {
    const [hide, setHide] = useState(true);

    const options = useMemo(() => {
      if (variant === Variant.Password) {
        return (
          <>
            <div
              className="absolute right-0 mr-4 -mt-8"
              onClick={() => setHide((h) => !h)}
            >
              {/* <Icon name={!hide ? 'password-show' : 'password-hide'} /> */}
            </div>
            <div className="absolute w-6 h-6 -mt-7 left-4">
              {/* <Icon name="password" /> */}
            </div>

            {showIcon && (
              <div className="absolute w-6 h-6 -mt-8 left-4">
                {/* <Icon name="password" /> */}
              </div>
            )}
          </>
        );
      } else if (variant === Variant.Email) {
        return (
          <div className="absolute w-6 h-6 -mt-7 left-4">
            {/* <Icon name="email" /> */}
          </div>
        );
      } else if (name === 'search') {
        return (
          <div className="absolute w-6 h-6 -mt-8 left-4">
            {/* <Icon name="search" /> */}
          </div>
        );
      }
    }, [variant, hide, name]);

    const inputStyle = clx(
      'w-full h-10.5 text-sm border outline-none placeholder:text-text-lighter text-text focus:outline-none focus:ring-0 rounded-lg px-4 py-3',
      {
        'focus:border-error border-error': !!error,
        'focus:border-primary border-border': !error,
        'pr-10 indent-8': name === 'search',
        'indent-8': variant === Variant.Email || variant === Variant.Password,
        'indent-0': !showIcon,
        'bg-red-50': !!error
      }
    );

    return (
      <div className={`space-y-1 mb-6 ${className}`} data-testid={dataTestId}>
        <div className="mb-2 text-sm font-semibold">
          {label}
          {required && <span className="text-error">*</span>}
        </div>
        <div className="relative">
          <input
            className={inputStyle}
            name={name}
            type={hide ? variant : Variant.Text}
            placeholder={placeholder}
            onChange={onChange}
            step="any"
            onPaste={disabledPaste ? (e: any) => e.preventDefault() : () => {}}
            autoFocus={autoFocus}
            ref={ref}
            disabled={loading || disabled}
            defaultValue={defaultValue}
            onWheel={(e) => e.currentTarget.blur()}
            onBlur={onBlur}
          />
          {options}
        </div>
        {error && <div className="text-xs text-error">*{error}</div>}
        {!error && info && (
          <div className="text-xs text-text-light">{info}</div>
        )}
      </div>
    );
  }
);

export default Input;
