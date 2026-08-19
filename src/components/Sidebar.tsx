import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ListOrdered, 
  Tags, 
  PlusCircle, 
  Settings, 
  X,
  Boxes
} from 'lucide-react';
import { NavTab } from '../types';
import { LOGO_URL } from '../data/initialData';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalProductsCount: number;
  lowStockCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  totalProductsCount,
  lowStockCount
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as NavTab, label: 'Products', icon: Package, badge: totalProductsCount },
    { id: 'categories' as NavTab, label: 'Categories', icon: ListOrdered },
    { id: 'brands' as NavTab, label: 'Brands', icon: Tags },
    { id: 'add-product' as NavTab, label: 'Add Product', icon: PlusCircle, isAction: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="app-sidebar"
        className={`fixed left-0 top-0 h-full w-[260px] bg-[#0E0E12] border-r border-[#222226] z-50 flex flex-col transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#222226]">
          <button 
            id="brand-logo-btn"
            onClick={() => {
              onSelectTab('dashboard');
              onCloseMobile();
            }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4f46e5]/10 border border-[#4f46e5]/30 flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={LOGO_URL} 
                alt="ProductHub Logo" 
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Boxes className="w-5 h-5 text-[#818cf8] hidden only:block" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight uppercase flex items-center gap-1.5">
                Product<span className="text-[#818cf8]">Hub</span>
              </span>
              <span className="text-[10px] text-[#88888C] font-mono tracking-wider">v2.4 Pro</span>
            </div>
          </button>

          {/* Close button on mobile */}
          <button 
            id="close-sidebar-btn"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[#88888C] hover:text-white hover:bg-[#1C1C22] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#55555A]">
            Core Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'products' && currentTab === 'product-detail');

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all font-medium text-sm text-left group ${
                  isActive
                    ? 'bg-[#4f46e5] text-white shadow-lg shadow-[#4f46e5]/25'
                    : 'text-[#9A9AA2] hover:text-white hover:bg-[#16161C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-[18px] h-[18px] transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-[#88888C] group-hover:text-white'
                  }`} />
                  <span className="text-sm tracking-tight">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[#222226] text-[#88888C] group-hover:text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {lowStockCount > 0 && (
            <div className="pt-4 px-1">
              <div 
                onClick={() => {
                  onSelectTab('products');
                  onCloseMobile();
                }}
                className="p-3.5 rounded-xl bg-[#16161A] border border-[#FFB95F]/20 hover:border-[#FFB95F]/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#FFB95F] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FFB95F] animate-pulse"></span>
                    Low Stock Notice
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFB95F]/15 text-[#FFB95F]">
                    {lowStockCount} items
                  </span>
                </div>
                <p className="text-[11px] text-[#88888C] leading-relaxed">
                  Items requiring immediate replenishment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Settings & Bottom Profile link */}
        <div className="p-3 border-t border-[#222226] space-y-1">
          <button
            id="nav-settings"
            onClick={() => {
              onSelectTab('settings');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-sm font-medium text-left ${
              currentTab === 'settings'
                ? 'bg-[#4f46e5] text-white shadow-lg shadow-[#4f46e5]/25'
                : 'text-[#9A9AA2] hover:text-white hover:bg-[#16161C]'
            }`}
          >
            <Settings className="w-[18px] h-[18px] text-[#88888C] group-hover:text-white" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};
