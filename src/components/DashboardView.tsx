import React from 'react';
import { 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  AlertOctagon, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Edit3, 
  Plus, 
  Layers,
  Sparkles,
  Eye
} from 'lucide-react';
import { Product, ActivityItem, Category } from '../types';

interface DashboardViewProps {
  products: Product[];
  categories: Category[];
  activities: ActivityItem[];
  onNavigateToProducts: () => void;
  onSelectProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onOpenAddProduct: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  categories,
  activities,
  onNavigateToProducts,
  onSelectProduct,
  onEditProduct,
  onOpenAddProduct
}) => {
  const totalProducts = 1248; // Scaled catalog count representation
  const activeProducts = products.filter(p => p.status === 'active').length + 1142;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length + 8;
  const outOfStockCount = products.filter(p => p.stock === 0).length + 4;

  const recentProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col w-full gap-8 animate-in fade-in duration-200">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Inventory Dashboard
          </h1>
          <p className="text-xs lg:text-sm text-[#88888C] mt-1">
            Real-time telemetry, inventory levels, and stock movements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="dash-add-product-btn"
            onClick={onOpenAddProduct}
            className="px-4 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#4f46e5]/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-[#111114] border border-[#222226] hover:border-[#383842] rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-2">
                Total Products
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {totalProducts.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-[#4f46e5]/15 border border-[#4f46e5]/30 rounded-xl text-[#818cf8]">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-[#111114] border border-[#222226] hover:border-[#383842] rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-2">
                Active Products
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {activeProducts.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+5% from last month</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-[#111114] border border-[#222226] hover:border-[#383842] rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-2">
                Low Stock
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-[#FFB95F] tracking-tight">
                {lowStockCount}
              </h3>
            </div>
            <div className="p-3 bg-[#FFB95F]/15 border border-[#FFB95F]/30 rounded-xl text-[#FFB95F]">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-[#FFB95F]">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            <span>Requires attention</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-[#111114] border border-[#222226] hover:border-[#383842] rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-2">
                Out of Stock
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-rose-400 tracking-tight">
                {outOfStockCount}
              </h3>
            </div>
            <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400">
              <AlertOctagon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-rose-400">
            <TrendingDown className="w-3.5 h-3.5 mr-1" />
            <span>Critical action needed</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Recently Added Products & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recently Added Products Table */}
        <div className="lg:col-span-8 bg-[#111114] border border-[#222226] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#222226] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Recently Added Products
              </h2>
              <p className="text-xs text-[#88888C] mt-0.5">
                New inventory entries registered across all channels
              </p>
            </div>
            <button
              id="dash-view-all-products-btn"
              onClick={onNavigateToProducts}
              className="text-xs font-semibold text-[#818cf8] hover:text-[#9fa8f9] flex items-center gap-1 transition-colors group"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-[#0A0A0C]/50 border-b border-[#222226] text-[11px] uppercase tracking-wider text-[#88888C]">
                  <th className="py-3.5 px-6 font-semibold">Product</th>
                  <th className="py-3.5 px-6 font-semibold">Category</th>
                  <th className="py-3.5 px-6 font-semibold">Price</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A20] text-xs text-[#E0E0E0]">
                {recentProducts.map((prod) => {
                  const isLow = prod.stock > 0 && prod.stock <= 5;
                  const isOut = prod.stock === 0;

                  return (
                    <tr 
                      key={prod.id} 
                      className="hover:bg-[#16161C] transition-colors group cursor-pointer"
                      onClick={() => onSelectProduct(prod)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#1A1A20] border border-[#2B2B32] shrink-0">
                            <img 
                              src={prod.image} 
                              alt={prod.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate group-hover:text-[#818cf8] transition-colors">
                              {prod.name}
                            </p>
                            <p className="text-[11px] font-mono text-[#88888C] mt-0.5">
                              SKU: {prod.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#A0A0A8]">
                        <span className="px-2.5 py-1 rounded-md bg-[#1C1C22] border border-[#2B2B32] text-[11px]">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-white">
                        ${prod.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        {isOut ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FFB95F]/15 text-[#FFB95F] border border-[#FFB95F]/30">
                            Low Stock ({prod.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectProduct(prod)}
                            className="p-1.5 rounded-lg text-[#88888C] hover:text-white hover:bg-[#222228] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditProduct(prod)}
                            className="p-1.5 rounded-lg text-[#88888C] hover:text-[#818cf8] hover:bg-[#222228] transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="lg:col-span-4 bg-[#111114] border border-[#222226] rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Recent Activity
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                Live Feed
              </span>
            </div>

            <div className="space-y-6 relative">
              {activities.slice(0, 3).map((act, index) => {
                return (
                  <div key={act.id} className="flex gap-4 relative">
                    {/* Vertical connecting line */}
                    {index < 2 && (
                      <div className="absolute left-3.5 top-8 bottom-[-24px] w-[2px] bg-[#222228]" />
                    )}

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ring-4 ring-[#111114] ${
                      act.type === 'add' 
                        ? 'bg-[#4f46e5] text-white' 
                        : act.type === 'stock'
                        ? 'bg-amber-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}>
                      {act.type === 'add' ? (
                        <Plus className="w-3.5 h-3.5" />
                      ) : act.type === 'stock' ? (
                        <Layers className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="text-xs">
                      <p className="text-[#E0E0E0] leading-snug">
                        {act.title} <span className="font-semibold text-white">{act.targetName}</span>
                      </p>
                      <p className="text-[11px] text-[#88888C] mt-1">
                        {act.actor} • {act.timeAgo}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            id="view-complete-log-btn"
            onClick={onNavigateToProducts}
            className="mt-6 w-full py-2.5 bg-[#181820] hover:bg-[#22222A] text-xs font-semibold text-white rounded-xl border border-[#2B2B32] transition-colors"
          >
            View Complete Log
          </button>
        </div>
      </div>

      {/* Bottom Grid: Inventory Status & Products by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Status Progress Bars */}
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white tracking-tight mb-6 flex items-center justify-between">
            <span>Inventory Status</span>
            <span className="text-xs text-[#88888C] font-normal">Health Rate: 92%</span>
          </h2>

          <div className="space-y-5 text-xs">
            {/* In Stock */}
            <div>
              <div className="flex justify-between text-[#E0E0E0] mb-2 font-medium">
                <span>In Stock (Healthy)</span>
                <span className="text-emerald-400 font-semibold">92%</span>
              </div>
              <div className="w-full bg-[#1C1C24] rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Low Stock */}
            <div>
              <div className="flex justify-between text-[#E0E0E0] mb-2 font-medium">
                <span>Low Stock</span>
                <span className="text-[#FFB95F] font-semibold">5%</span>
              </div>
              <div className="w-full bg-[#1C1C24] rounded-full h-2 overflow-hidden">
                <div className="bg-[#FFB95F] h-2 rounded-full transition-all duration-500" style={{ width: '5%' }}></div>
              </div>
            </div>

            {/* Out of Stock */}
            <div>
              <div className="flex justify-between text-[#E0E0E0] mb-2 font-medium">
                <span>Out of Stock</span>
                <span className="text-rose-400 font-semibold">3%</span>
              </div>
              <div className="w-full bg-[#1C1C24] rounded-full h-2 overflow-hidden">
                <div className="bg-rose-500 h-2 rounded-full transition-all duration-500" style={{ width: '3%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Products by Category Grid */}
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white tracking-tight mb-6">
            Products by Category
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#16161C] border border-[#26262C] rounded-xl flex items-center justify-between hover:border-[#383842] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-7 bg-[#4f46e5] rounded-full" />
                <span className="text-xs font-semibold text-white">Electronics</span>
              </div>
              <span className="text-xs font-mono font-medium text-[#88888C]">450</span>
            </div>

            <div className="p-4 bg-[#16161C] border border-[#26262C] rounded-xl flex items-center justify-between hover:border-[#383842] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-7 bg-emerald-500 rounded-full" />
                <span className="text-xs font-semibold text-white">Accessories</span>
              </div>
              <span className="text-xs font-mono font-medium text-[#88888C]">320</span>
            </div>

            <div className="p-4 bg-[#16161C] border border-[#26262C] rounded-xl flex items-center justify-between hover:border-[#383842] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-7 bg-amber-500 rounded-full" />
                <span className="text-xs font-semibold text-white">Furniture</span>
              </div>
              <span className="text-xs font-mono font-medium text-[#88888C]">210</span>
            </div>

            <div className="p-4 bg-[#16161C] border border-[#26262C] rounded-xl flex items-center justify-between hover:border-[#383842] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-7 bg-[#88888C] rounded-full" />
                <span className="text-xs font-semibold text-white">Other</span>
              </div>
              <span className="text-xs font-mono font-medium text-[#88888C]">268</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
