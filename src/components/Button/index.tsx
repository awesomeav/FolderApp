import clx from 'classnames';
import React from 'react';

export enum Variants {
  Primary = 'primary',
  Negative = 'negative',
  PrimaryOutlined = 'primary-outlined',
  Secondary = 'primary-no-outlined',
  Outlined = 'outlined',
  Alert = 'alert',
  SemiPrimary = 'semi-primary',
  Disabled = 'disabled'
}

export enum Size {
  Default = 'default',
  Small = 'small'
}

type AppProps = {
  label: string | React.ReactNode;
  variant?: Variants;
  size?: Size;
  className?: string;
  dataTestId?: string;
  onClick?: (...args: any) => any;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  iconPosition?: string;
  fill?: string;
};

const Button: React.FC<AppProps> = ({
  label,
  variant = Variants.Primary,
  size = Size.Default,
  icon = '',
  className = '',
  dataTestId = '',
  onClick = () => null,
  loading = false,
  disabled = false,
  iconPosition = '',
  fill = ''
}) => {
  const _disabled = disabled || loading;

  const btnStyle = clx(
    `h rounded-lg inline-flex items-center justify-center rounded cursor-pointer ${className}`,
    {
      'bg-background-white bg-white border border-blue-600 rounded-lg lg:hover:bg-blue-800 md:lg:hover:bg-blue-800':
        variant === Variants.Secondary,
      'bg-white border border-primary-light rounded-md focus:bg-blue-600 focus:ring-blue-300':
        variant === Variants.Outlined,
      'bg-red-500 border border-primary-light rounded-md':
        variant === Variants.Alert,
      'bg-primary hover:bg-blue-800 focus:bg-blue-600 focus:ring-blue-300':
        variant === Variants.Primary,
      'bg-blue-50 text-blue-900 text-sm font-semibold leading-tight':
        variant === Variants.SemiPrimary,
      'text-gray-500': variant === Variants.Disabled,
      'bg-white border border-primary hover:bg-primary hover:text-white':
        variant === Variants.Secondary,
      'h-10': size === Size.Small,
      'bg-opacity-40 pointer-events-none': _disabled
    }
  );

  const textStyle = clx(
    'font-medium text-sm flex items-center justify-center py-2.5 px-5 flex',
    {
      'text-primary lg:hover:text-white md:lg:hover:text-white':
        variant === Variants.Secondary || variant === Variants.Outlined,
      'text-white': variant === Variants.Primary || variant === Variants.Alert,
      'text-sm': size === Size.Small
    }
  );

  const btnContent = () => (
    <>
      {iconPosition === 'right' && (
        <div className={textStyle}>
          {label}
          <div className="ml-4">{/* <Icon name={icon} color={fill} /> */}</div>
        </div>
      )}
      {iconPosition === 'left' && (
        <div className={textStyle}>
          <div className="mr-4">{/* <Icon name={icon} color={fill} /> */}</div>
          {label}
        </div>
      )}
      {!iconPosition && (
        <div className={textStyle}>
          {label}
          {icon && <div className="ml-2">{/* <Icon name={icon} /> */}</div>}
        </div>
      )}
    </>
  );

  return (
    <button
      data-testid={dataTestId}
      className={btnStyle}
      onClick={_disabled ? () => null : onClick}
    >
      {btnContent()}
    </button>
  );
};

export default Button;
