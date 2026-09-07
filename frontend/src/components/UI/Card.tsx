import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-gray-200 bg-white shadow-soft',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
