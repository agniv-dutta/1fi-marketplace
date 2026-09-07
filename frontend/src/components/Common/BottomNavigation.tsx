import { Home, ShoppingBag, User } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-xl sm:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-3 px-3 py-2">
        <button className="flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium text-brand-700">
          <Home className="h-5 w-5" />
          Home
        </button>
        <button className="flex flex-col items-center gap-1 rounded-2xl bg-brand-50 py-2 text-xs font-medium text-brand-700">
          <ShoppingBag className="h-5 w-5" />
          Shop
        </button>
        <button className="flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium text-gray-500">
          <User className="h-5 w-5" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
