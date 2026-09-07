import { ShoppingBag } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-700 text-white shadow-soft">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-gray-900">1Fi</p>
            <p className="text-xs text-gray-500">Marketplace</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
            No-cost EMI
          </span>
          <span className="text-sm text-gray-500">Shop today, pay later</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
