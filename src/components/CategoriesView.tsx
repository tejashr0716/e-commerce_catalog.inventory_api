import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Smartphone, 
  Keyboard, 
  Armchair, 
  Shirt, 
  Gamepad2, 
  Monitor, 
  Headphones, 
  Home, 
  Layers, 
  TrendingUp, 
  Package, 
  Edit3, 
  Trash2, 
  X,
  Check,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Category } from '../types';

interface CategoriesViewProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onSelectCategoryFilter: (categoryName: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onSelectCategoryFilter
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Modal Form State
  const [modalName, setModalName] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [modalParent, setModalParent] = useState('None (Top Level)');
  const [modalStatus, setModalStatus] = useState<'active' | 'inactive'>('active');

  const openAddModal = () => {
    setEditingCategory(null);
    setModalName('');
    setModalDesc('');
    setModalParent('None (Top Level)');
    setModalStatus('active');
    setShowModal(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setModalName(cat.name);
    setModalDesc(cat.description);
    setModalParent(cat.parentCategory);
    setModalStatus(cat.status === 'active' ? 'active' : 'inactive');
    setShowModal(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim()) return;

    if (editingCategory) {
      onUpdateCategory({
        ...editingCategory,
        name: modalName.trim(),
        description: modalDesc.trim(),
        parentCategory: modalParent,
        status: modalStatus
      });
    } else {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: modalName.trim(),
        description: modalDesc.trim() || 'No description available.',
        iconName: 'tag',
        productCount: 0,
        status: modalStatus,
        parentCategory: modalParent,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      onAddCategory(newCat);
    }
    setShowModal(false);
  };

  const getCategoryIcon = (iconName: string, name: string) => {
    const n = name.toLowerCase();
    if (n.includes('electro') || n.includes('phone')) return <Smartphone className="w-4 h-4 text-[#818cf8]" />;
    if (n.includes('access') || n.includes('keyboard')) return <Keyboard className="w-4 h-4 text-emerald-400" />;
    if (n.includes('furnit') || n.includes('chair')) return <Armchair className="w-4 h-4 text-amber-400" />;
    if (n.includes('apparel') || n.includes('cloth')) return <Shirt className="w-4 h-4 text-pink-400" />;
    if (n.includes('game')) return <Gamepad2 className="w-4 h-4 text-violet-400" />;
    if (n.includes('display') || n.includes('monitor')) return <Monitor className="w-4 h-4 text-cyan-400" />;
    if (n.includes('audio') || n.includes('headphone')) return <Headphones className="w-4 h-4 text-rose-400" />;
    if (n.includes('home')) return <Home className="w-4 h-4 text-teal-400" />;
    return <Tag className="w-4 h-4 text-[#818cf8]" />;
  };

  const filteredCategories = categories.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && c.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Categories
          </h1>
          <p className="text-xs lg:text-sm text-[#88888C] mt-1">
            Organize and classify your product inventory hierarchy
          </p>
        </div>
        <button
          id="add-category-btn"
          onClick={openAddModal}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-semibold text-xs transition-all shadow-lg shadow-[#4f46e5]/25 hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* KPI Cards (matching Image 11) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-1.5">
                Total Categories
              </p>
              <h3 className="text-3xl font-bold text-white">24</h3>
            </div>
            <div className="p-3 bg-[#4f46e5]/15 border border-[#4f46e5]/30 rounded-xl text-[#818cf8]">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +3 new this quarter
          </p>
        </div>

        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-1.5">
                Mapped Products
              </p>
              <h3 className="text-3xl font-bold text-white">1,248</h3>
            </div>
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#88888C]">
            98% catalog successfully classified
          </p>
        </div>

        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-1.5">
                Top Category
              </p>
              <h3 className="text-3xl font-bold text-white">Electronics</h3>
            </div>
            <div className="p-3 bg-[#FFB95F]/15 border border-[#FFB95F]/30 rounded-xl text-[#FFB95F]">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#FFB95F] font-medium">
            452 products (36% of catalog)
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111114] border border-[#222226] rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66666D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-[#66666D] focus:outline-none focus:border-[#4f46e5]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#16161C] border border-[#26262C] rounded-xl py-2 px-3.5 text-xs text-[#E0E0E0] focus:outline-none focus:border-[#4f46e5] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-[#111114] rounded-2xl shadow-sm border border-[#222226] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0A0A0C]/50 border-b border-[#222226] text-[11px] uppercase tracking-wider text-[#88888C]">
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">Parent Category</th>
                <th className="py-4 px-6 font-semibold text-center">Products</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
                <th className="py-4 px-6 font-semibold">Created Date</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C22]">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#16161C] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#2A2A32] flex items-center justify-center shrink-0">
                        {getCategoryIcon(cat.iconName, cat.name)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#818cf8] transition-colors">
                          {cat.name}
                        </p>
                        <p className="text-[11px] text-[#88888C] mt-0.5 line-clamp-1 max-w-[260px]">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-xs text-[#A0A0A8]">
                    {cat.parentCategory}
                  </td>

                  <td className="py-4 px-6 text-center text-xs font-mono font-semibold text-white">
                    {cat.productCount}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                      cat.status === 'active'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {cat.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-xs text-[#88888C]">
                    {cat.createdAt}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onSelectCategoryFilter(cat.name)}
                        className="p-1.5 rounded-lg text-[#88888C] hover:text-white hover:bg-[#222228] transition-colors"
                        title="View products in category"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 rounded-lg text-[#88888C] hover:text-[#818cf8] hover:bg-[#222228] transition-colors"
                        title="Edit category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteCategory(cat.id)}
                        className="p-1.5 rounded-lg text-[#88888C] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#141419] border border-[#2B2B32] rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#88888C] hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="e.g. Photography & Video"
                  className="w-full bg-[#1A1A22] border border-[#2B2B32] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={modalDesc}
                  onChange={(e) => setModalDesc(e.target.value)}
                  placeholder="Brief summary of items in this classification..."
                  className="w-full bg-[#1A1A22] border border-[#2B2B32] rounded-xl py-2 px-3.5 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Parent Hierarchy
                </label>
                <select
                  value={modalParent}
                  onChange={(e) => setModalParent(e.target.value)}
                  className="w-full bg-[#1A1A22] border border-[#2B2B32] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#4f46e5]"
                >
                  <option value="None (Top Level)">None (Top Level)</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Apparel">Apparel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Status
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="radio"
                      checked={modalStatus === 'active'}
                      onChange={() => setModalStatus('active')}
                      className="accent-[#4f46e5]"
                    />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#88888C] cursor-pointer">
                    <input
                      type="radio"
                      checked={modalStatus === 'inactive'}
                      onChange={() => setModalStatus('inactive')}
                      className="accent-[#4f46e5]"
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222228]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#88888C] hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-xs font-semibold text-white rounded-xl shadow-lg shadow-[#4f46e5]/25"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
