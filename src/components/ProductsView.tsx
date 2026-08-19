import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  X, 
  Grid, 
  List, 
  Edit3, 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ArrowUpDown,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { Product, FilterState, ViewMode, Category, Brand } from '../types';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  onOpenAddProduct: () => void;
  onSelectProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  categories,
  brands,
  onOpenAddProduct,
  onSelectProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    brand: '',
    stockStatus: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      stockStatus: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
    setCurrentPage(1);
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchSku = prod.sku.toLowerCase().includes(q);
        const matchBrand = prod.brand.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchBrand) return false;
      }

      // Category
      if (filters.category && prod.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Brand
      if (filters.brand && prod.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Stock Status
      if (filters.stockStatus) {
        if (filters.stockStatus === 'in' && prod.stock <= 5) return false;
        if (filters.stockStatus === 'low' && (prod.stock === 0 || prod.stock > 5)) return false;
        if (filters.stockStatus === 'out' && prod.stock > 0) return false;
      }

      // Price Min
      if (filters.minPrice && prod.price < parseFloat(filters.minPrice)) {
        return false;
      }

      // Price Max
      if (filters.maxPrice && prod.price > parseFloat(filters.maxPrice)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'stock-desc') return b.stock - a.stock;
      return 0; // 'newest' default preserves list order
    });
  }, [products, filters]);

  // Pagination calculation
  const totalCount = 1248; // Reflecting the catalog scale
  const displayTotal = filteredProducts.length === products.length ? totalCount : filteredProducts.length;
  const totalPages = Math.ceil(displayTotal / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(0, pageSize);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Top Header & Add Button */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Product Catalog
          </h1>
          <p className="text-xs lg:text-sm text-[#88888C] mt-1">
            Search, filter and manage your inventory
          </p>
        </div>
        <button
          id="catalog-add-product-btn"
          onClick={onOpenAddProduct}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-semibold text-xs transition-all shadow-lg shadow-[#4f46e5]/25 hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filter Control Box */}
      <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 mb-6 shadow-sm">
        {/* Top filter row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search by SKU, Name or Brand */}
          <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66666D]" />
            <input
              id="filter-search-input"
              type="text"
              value={filters.search}
              onChange={(e) => {
                setFilters({ ...filters, search: e.target.value });
                setCurrentPage(1);
              }}
              placeholder="Search by SKU, Name or Brand..."
              className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-[#66666D] focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              id="filter-category-select"
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 pl-4 pr-10 text-xs text-[#E0E0E0] appearance-none focus:outline-none focus:border-[#4f46e5] cursor-pointer"
            >
              <option value="">Category (All)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#66666D] pointer-events-none" />
          </div>

          {/* Brand Dropdown */}
          <div className="relative">
            <select
              id="filter-brand-select"
              value={filters.brand}
              onChange={(e) => {
                setFilters({ ...filters, brand: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 pl-4 pr-10 text-xs text-[#E0E0E0] appearance-none focus:outline-none focus:border-[#4f46e5] cursor-pointer"
            >
              <option value="">Brand (All)</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#66666D] pointer-events-none" />
          </div>

          {/* Stock Status Dropdown */}
          <div className="relative">
            <select
              id="filter-stock-select"
              value={filters.stockStatus}
              onChange={(e) => {
                setFilters({ ...filters, stockStatus: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 pl-4 pr-10 text-xs text-[#E0E0E0] appearance-none focus:outline-none focus:border-[#4f46e5] cursor-pointer"
            >
              <option value="">Stock Status (All)</option>
              <option value="in">In Stock (&gt;5)</option>
              <option value="low">Low Stock (1-5)</option>
              <option value="out">Out of Stock (0)</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#66666D] pointer-events-none" />
          </div>
        </div>

        {/* Bottom filter row: Price & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#222226] pt-4 mt-2">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C]">Price</span>
              <div className="flex items-center gap-1.5">
                <input
                  id="filter-min-price"
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-20 bg-[#16161C] border border-[#26262C] rounded-lg py-1.5 px-3 text-xs text-white text-center focus:outline-none focus:border-[#4f46e5]"
                />
                <span className="text-[#66666D]">-</span>
                <input
                  id="filter-max-price"
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-20 bg-[#16161C] border border-[#26262C] rounded-lg py-1.5 px-3 text-xs text-white text-center focus:outline-none focus:border-[#4f46e5]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              id="filter-clear-btn"
              onClick={handleClearFilters}
              className="text-xs text-[#88888C] hover:text-white transition-colors px-3 py-1.5 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Clear Filters
            </button>

            <div className="w-px h-5 bg-[#26262C] hidden md:block"></div>

            {/* Sort Select */}
            <div className="relative">
              <select
                id="filter-sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="bg-[#16161C] border border-[#26262C] rounded-xl py-1.5 pl-3.5 pr-8 text-xs text-[#E0E0E0] appearance-none focus:outline-none focus:border-[#4f46e5] cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="stock-desc">Stock: Highest</option>
              </select>
              <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#66666D] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Showing count and Grid / Table Switch */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs text-[#88888C]">
          Showing <span className="font-semibold text-white">1-{paginatedProducts.length}</span> of{' '}
          <span className="font-semibold text-white">{displayTotal.toLocaleString()}</span> products
        </p>

        <div className="flex items-center gap-1 bg-[#111114] border border-[#222226] p-1 rounded-xl">
          <button
            id="view-mode-grid-btn"
            onClick={() => setViewMode('grid')}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === 'grid' 
                ? 'bg-[#4f46e5] text-white' 
                : 'text-[#88888C] hover:text-white'
            }`}
            title="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            id="view-mode-table-btn"
            onClick={() => setViewMode('table')}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === 'table' 
                ? 'bg-[#4f46e5] text-white' 
                : 'text-[#88888C] hover:text-white'
            }`}
            title="Table List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-[#111114] rounded-2xl shadow-sm border border-[#222226] overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#0A0A0C]/50 border-b border-[#222226] text-[11px] uppercase tracking-wider text-[#88888C]">
                  <th className="py-4 px-6 font-semibold w-[320px]">Product</th>
                  <th className="py-4 px-6 font-semibold">SKU</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold text-right">Price</th>
                  <th className="py-4 px-6 font-semibold text-center">Stock</th>
                  <th className="py-4 px-6 font-semibold text-center">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C22]">
                {paginatedProducts.map((prod) => {
                  const isLow = prod.stock > 0 && prod.stock <= 5;
                  const isOut = prod.stock === 0;

                  return (
                    <tr
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      className={`hover:bg-[#16161C] transition-colors group cursor-pointer ${
                        isOut ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Product details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#181820] border border-[#2B2B32] shrink-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate group-hover:text-[#818cf8] transition-colors">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-[#88888C] truncate mt-0.5">
                              {prod.brand}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-4 px-6 text-xs text-[#88888C] font-mono">
                        {prod.sku}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] bg-[#1A1A22] text-[#C0C0C8] border border-[#2B2B32]">
                          {prod.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 text-right text-xs font-bold text-white">
                        ${prod.price.toFixed(2)}
                      </td>

                      {/* Stock Badge */}
                      <td className="py-4 px-6 text-center">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FFB95F] bg-[#FFB95F]/10 px-2.5 py-1 rounded-full border border-[#FFB95F]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB95F]"></span>
                            Low Stock ({prod.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            In Stock ({prod.stock})
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider ${
                          prod.status === 'active'
                            ? 'bg-[#4f46e5]/15 text-[#818cf8] border border-[#4f46e5]/30'
                            : 'bg-[#222228] text-[#88888C] border border-[#33333A]'
                        }`}>
                          {prod.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
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
                          <button
                            onClick={() => onDeleteProduct(prod)}
                            className="p-1.5 rounded-lg text-[#88888C] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination bar */}
          <div className="bg-[#0A0A0C]/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#222226]">
            <div className="flex items-center gap-2">
              <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#16161C] border border-[#26262C] rounded-lg py-1 pl-2.5 pr-7 text-xs text-white cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-xs text-[#88888C]">per page</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#88888C] hover:text-white hover:bg-[#1C1C24] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 px-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold ${
                    currentPage === 1 
                      ? 'bg-[#4f46e5] text-white' 
                      : 'text-[#88888C] hover:bg-[#1C1C24]'
                  }`}
                >
                  1
                </button>
                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold ${
                      currentPage === 2 
                        ? 'bg-[#4f46e5] text-white' 
                        : 'text-[#88888C] hover:bg-[#1C1C24]'
                    }`}
                  >
                    2
                  </button>
                )}
                {totalPages > 2 && (
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold ${
                      currentPage === 3 
                        ? 'bg-[#4f46e5] text-white' 
                        : 'text-[#88888C] hover:bg-[#1C1C24]'
                    }`}
                  >
                    3
                  </button>
                )}
                {totalPages > 4 && (
                  <span className="text-[#55555A] text-xs px-1">...</span>
                )}
                {totalPages > 3 && (
                  <button
                    onClick={() => setCurrentPage(52)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold ${
                      currentPage === 52 
                        ? 'bg-[#4f46e5] text-white' 
                        : 'text-[#88888C] hover:bg-[#1C1C24]'
                    }`}
                  >
                    52
                  </button>
                )}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#88888C] hover:text-white hover:bg-[#1C1C24] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {paginatedProducts.map((prod) => {
            const isLow = prod.stock > 0 && prod.stock <= 5;
            const isOut = prod.stock === 0;

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-[#111114] border border-[#222226] hover:border-[#383842] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col"
              >
                <div className="h-44 w-full bg-[#181820] relative overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {prod.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] text-[#88888C] font-medium">{prod.brand}</p>
                    <h3 className="text-sm font-bold text-white mt-0.5 truncate group-hover:text-[#818cf8] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] font-mono text-[#66666D] mt-0.5">SKU: {prod.sku}</p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#222226] flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-white">${prod.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isOut ? 'bg-rose-400' : isLow ? 'bg-[#FFB95F]' : 'bg-emerald-400'
                        }`} />
                        <span className={`text-[10px] ${
                          isOut ? 'text-rose-400' : isLow ? 'text-[#FFB95F]' : 'text-emerald-400'
                        }`}>
                          {isOut ? 'Out of stock' : `${prod.stock} in stock`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onEditProduct(prod)}
                        className="p-1.5 rounded-lg bg-[#181820] hover:bg-[#22222A] text-[#88888C] hover:text-[#818cf8] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(prod)}
                        className="p-1.5 rounded-lg bg-[#181820] hover:bg-rose-500/10 text-[#88888C] hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
