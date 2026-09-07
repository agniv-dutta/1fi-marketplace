import { useState } from 'react';
import Header from '../Common/Header';
import BottomNavigation from '../Common/BottomNavigation';
import ShopTabs from './ShopTabs';

type TabType = 'top-brands' | 'nearby-stores' | '1fi-marketplace';

const ShopLayout = () => {
  const [activeTab, setActiveTab] = useState<TabType>('1fi-marketplace');

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-gray-900">
      <Header />

      <main className="relative overflow-hidden">
        <section className="bg-hero-glow px-4 pb-14 pt-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                No-cost EMIs
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Shop today, pay later using your mutual funds.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Browse products, compare EMI plans, and move through checkout without losing the
                clean 1Fi feel from the reference screens.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto -mt-8 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ShopLayout;
