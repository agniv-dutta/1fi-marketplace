import type { ReactNode } from 'react';

interface ShopTabContentProps {
  children: ReactNode;
}

const ShopTabContent = ({ children }: ShopTabContentProps) => {
  return <div className="rounded-[2rem] bg-white/90 p-4 shadow-soft sm:p-6">{children}</div>;
};

export default ShopTabContent;
