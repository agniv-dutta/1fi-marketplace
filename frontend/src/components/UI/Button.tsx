import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-700 text-white shadow-soft hover:bg-brand-800 disabled:bg-gray-300 disabled:text-gray-500',
  secondary:
    'bg-white text-brand-700 border border-brand-200 hover:border-brand-300 hover:bg-brand-50 disabled:bg-gray-100 disabled:text-gray-400',
  ghost: 'bg-transparent text-brand-700 hover:bg-brand-50 disabled:text-gray-400',
  danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500',
};

const Button = ({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 disabled:cursor-not-allowed',
        variantStyles[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
