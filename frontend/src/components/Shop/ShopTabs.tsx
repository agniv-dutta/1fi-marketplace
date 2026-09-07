import clsx from 'clsx';
import MarketplaceContainer from '../Marketplace/MarketplaceContainer';
import ShopTabContent from './ShopTabContent';

type TabType = 'top-brands' | 'nearby-stores' | '1fi-marketplace';

interface ShopTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: Array<{ id: TabType; label: string }> = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: '1fi-marketplace', label: '1Fi Marketplace' },
];

const ShopTabs = ({ activeTab, onTabChange }: ShopTabsProps) => {
  return (
    <div className="space-y-5">
      <div className="rounded-full border border-white/50 bg-white/80 p-1 shadow-soft backdrop-blur">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'rounded-full px-3 py-3 text-sm font-semibold transition sm:px-6',
                activeTab === tab.id
                  ? 'bg-brand-700 text-white shadow-soft'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ShopTabContent>
        {activeTab === 'top-brands' ? (
          <div className="grid min-h-[420px] place-items-center rounded-3xl bg-gradient-to-br from-brand-50 to-white p-10 text-center">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Coming soon
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-gray-900">
                Top brands will live here
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                This tab is kept as a placeholder to match the existing shop navigation while the
                marketplace is fully functional.
              </p>
            </div>
          </div>
        ) : null}

        {activeTab === 'nearby-stores' ? (
          <div className="grid min-h-[420px] place-items-center rounded-3xl bg-gradient-to-br from-brand-50 to-white p-10 text-center">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Coming soon
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-gray-900">
                Nearby stores will appear here
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                We leave room for the existing shop experience while focusing this implementation on
                the marketplace flow from the prompt.
              </p>
            </div>
          </div>
        ) : null}

        {activeTab === '1fi-marketplace' ? <MarketplaceContainer /> : null}
      </ShopTabContent>
    </div>
  );
};

export default ShopTabs;
