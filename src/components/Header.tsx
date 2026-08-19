import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sun, 
  Moon, 
  Check, 
  ExternalLink,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Product, ActivityItem } from '../types';
import { USER_AVATAR } from '../data/initialData';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  activities: ActivityItem[];
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  products,
  onSelectProduct,
  activities,
  isDarkMode,
  onToggleTheme,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <header 
      id="app-header"
      className="fixed top-0 left-0 right-0 lg:left-[260px] h-16 bg-[#0E0E12]/90 backdrop-blur-xl z-30 px-4 lg:px-8 flex items-center justify-between border-b border-[#222226]"
    >
      {/* Left section: Hamburger & Quick Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          id="mobile-menu-toggle-btn"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[#88888C] hover:text-white hover:bg-[#1C1C22] transition-colors focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div ref={searchRef} className="relative w-full max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66666D] w-4 h-4" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search products by SKU, name, or brand..."
              className="w-full bg-[#141418] border border-[#26262C] rounded-full py-2 pl-10 pr-4 text-xs lg:text-sm text-[#E0E0E0] placeholder-[#66666D] focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
            />
          </div>

          {/* Quick Search Popover */}
          {showSearchResults && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#141419] border border-[#2B2B32] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-[#222228] flex items-center justify-between text-xs text-[#88888C]">
                <span>Matching Products ({searchResults.length})</span>
                <span className="text-[10px] text-[#55555A]">Press ESC to close</span>
              </div>
              
              <div className="max-h-72 overflow-y-auto divide-y divide-[#1C1C22]">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="w-full p-3 flex items-center gap-3 hover:bg-[#1C1C24] transition-colors text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#222228] border border-[#33333A] shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate group-hover:text-[#818cf8]">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-[#88888C] mt-0.5">
                          <span className="font-mono">{product.sku}</span>
                          <span>•</span>
                          <span>{product.brand}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#55555A] group-hover:text-white" />
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-[#88888C]">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right section: Theme toggle, Notifications, User profile */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleTheme}
          title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Sophisticated Dark Theme'}
          className="p-2 rounded-xl bg-[#16161C] border border-[#26262C] text-[#88888C] hover:text-white hover:border-[#383842] transition-all flex items-center gap-1.5 text-xs font-medium"
        >
          {isDarkMode ? (
            <>
              <Moon className="w-4 h-4 text-[#FFD4A4]" />
              <span className="hidden sm:inline text-[11px] text-[#D4AF37]">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline text-[11px] text-amber-600">Light</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-[#16161C] border border-[#26262C] text-[#88888C] hover:text-white hover:border-[#383842] transition-all relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4f46e5] ring-2 ring-[#0E0E12]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#141419] border border-[#2B2B32] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="p-4 border-b border-[#222228] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <span className="text-[10px] bg-[#4f46e5]/20 text-[#818cf8] px-2 py-0.5 rounded-full font-mono">
                    {activities.length} new
                  </span>
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#88888C] hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#1C1C22]">
                {activities.slice(0, 4).map((item) => (
                  <div key={item.id} className="p-3.5 hover:bg-[#181820] transition-colors flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#4f46e5]/15 text-[#818cf8] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="text-[#E0E0E0] leading-snug">
                        {item.title} <span className="font-semibold text-white">{item.targetName}</span>
                      </p>
                      <p className="text-[10px] text-[#88888C] mt-1">{item.actor} • {item.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#101014] border-t border-[#222228] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('dashboard');
                  }}
                  className="text-xs text-[#818cf8] hover:underline font-medium"
                >
                  View complete activity audit log
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-[#222226] mx-1"></div>

        {/* User Profile dropdown */}
        <div ref={profileRef} className="relative">
          <button
            id="user-profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 pr-2.5 rounded-xl hover:bg-[#16161C] border border-transparent hover:border-[#26262C] transition-all group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#33333C] group-hover:ring-2 group-hover:ring-[#4f46e5]/50 transition-all shrink-0 bg-[#222228]">
              <img 
                src={USER_AVATAR} 
                alt="Admin User Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <User className="w-4 h-4 text-[#88888C] m-auto mt-2 hidden only:block" />
            </div>
            <div className="text-left hidden md:block leading-tight">
              <p className="text-xs font-semibold text-white">Admin User</p>
              <p className="text-[10px] text-[#88888C]">admin@producthub.com</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#66666D] group-hover:text-white transition-colors" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#141419] border border-[#2B2B32] rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-150">
              <div className="p-3 border-b border-[#222228] mb-1">
                <p className="text-xs font-semibold text-white">Signed in as</p>
                <p className="text-[11px] text-[#D4AF37] font-mono">Store Administrator</p>
              </div>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#C0C0C8] hover:text-white hover:bg-[#1C1C24] rounded-xl transition-colors text-left"
              >
                <ShieldCheck className="w-4 h-4 text-[#818cf8]" />
                Security & Role Permissions
              </button>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#C0C0C8] hover:text-white hover:bg-[#1C1C24] rounded-xl transition-colors text-left"
              >
                <User className="w-4 h-4 text-[#88888C]" />
                Account Preferences
              </button>
              <div className="h-px bg-[#222228] my-1"></div>
              <button 
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
