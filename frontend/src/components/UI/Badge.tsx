import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: 'brand' | 'success' | 'warning' | 'neutral' | 'danger';
}

const toneStyles: Record<NonNullable<BadgeProps['tone']>, string> = {
  brand: 'bg-brand-100 text-brand-800',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-800',
  neutral: 'bg-gray-100 text-gray-700',
  danger: 'bg-red-100 text-red-700',
};

const Badge = ({ tone = 'neutral', className, children, ...props }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
