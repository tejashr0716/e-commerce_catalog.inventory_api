import React, { useState } from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  ShieldCheck, 
  RotateCcw, 
  Save, 
  DollarSign, 
  AlertTriangle,
  Database,
  Check
} from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  onToggleTheme,
  onResetData
}) => {
  const [storeName, setStoreName] = useState('ProductHub Global Enterprise');
  const [currency, setCurrency] = useState('USD ($)');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSku, setAutoSku] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200 max-w-4xl pb-12">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Store Settings
        </h1>
        <p className="text-xs lg:text-sm text-[#88888C] mt-1">
          Configure general store preferences, alert triggers, and theme configurations
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span>Visual Theme & Appearance</span>
          </h2>

          <div className="flex items-center justify-between p-4 bg-[#16161C] border border-[#26262C] rounded-xl">
            <div>
              <p className="text-xs font-semibold text-white">Sophisticated Dark Theme</p>
              <p className="text-[11px] text-[#88888C] mt-0.5">
                High contrast dark palette with gold accent highlights
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              className="px-4 py-2 bg-[#1C1C24] hover:bg-[#22222A] text-white text-xs font-medium rounded-xl border border-[#2E2E38] flex items-center gap-2 transition-colors"
            >
              {isDarkMode ? <Moon className="w-4 h-4 text-[#D4AF37]" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>{isDarkMode ? 'Dark Mode (Active)' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* General Store Settings */}
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-white mb-4">
            Store & Inventory Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                Store Instance Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#4f46e5]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Base Catalog Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#4f46e5]"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                  <option value="CAD ($)">CAD ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Low Stock Trigger Threshold (Units)
                </label>
                <input
                  type="number"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                  className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#4f46e5]"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="accent-[#4f46e5] w-4 h-4 rounded"
                />
                <span className="text-xs text-[#E0E0E0]">
                  Send automated alerts when items drop below stock threshold
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSku}
                  onChange={(e) => setAutoSku(e.target.checked)}
                  className="accent-[#4f46e5] w-4 h-4 rounded"
                />
                <span className="text-xs text-[#E0E0E0]">
                  Auto-generate compliant SKUs for new products based on brand & category
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Database & Reset Options */}
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-white mb-2">
            Data Management
          </h2>
          <p className="text-xs text-[#88888C] mb-4">
            Reset demo products and restore initial high-resolution catalog seed data.
          </p>

          <button
            type="button"
            onClick={onResetData}
            className="px-4 py-2.5 bg-[#1C1C24] hover:bg-rose-950/30 text-rose-300 hover:text-rose-200 border border-rose-500/20 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restore Initial Catalog Sample Data
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          {saved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-4 h-4" />
              Settings Saved Successfully
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-xs font-semibold text-white rounded-xl shadow-lg shadow-[#4f46e5]/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
