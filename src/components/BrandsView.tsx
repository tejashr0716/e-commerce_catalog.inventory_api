import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Tag, 
  CheckCircle, 
  Sparkles, 
  TrendingUp, 
  Download, 
  Filter, 
  Edit3, 
  Trash2, 
  X, 
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Brand } from '../types';

interface BrandsViewProps {
  brands: Brand[];
  onAddBrand: (brand: Brand) => void;
  onUpdateBrand: (brand: Brand) => void;
  onDeleteBrand: (brandId: string) => void;
  onSelectBrandFilter: (brandName: string) => void;
}

export const BrandsView: React.FC<BrandsViewProps> = ({
  brands,
  onAddBrand,
  onUpdateBrand,
  onDeleteBrand,
  onSelectBrandFilter
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Modal form
  const [modalName, setModalName] = useState('');
  const [modalLogo, setModalLogo] = useState('');
  const [modalStatus, setModalStatus] = useState<'active' | 'draft' | 'archived'>('active');

  const openAddModal = () => {
    setEditingBrand(null);
    setModalName('');
    setModalLogo('');
    setModalStatus('active');
    setShowModal(true);
  };

  const openEditModal = (brand: Brand) => {
    setEditingBrand(brand);
    setModalName(brand.name);
    setModalLogo(brand.logo);
    setModalStatus(brand.status);
    setShowModal(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim()) return;

    const slug = modalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingBrand) {
      onUpdateBrand({
        ...editingBrand,
        name: modalName.trim(),
        slug: slug,
        logo: modalLogo.trim(),
        status: modalStatus
      });
    } else {
      const newBrand: Brand = {
        id: `brand-${Date.now()}`,
        name: modalName.trim(),
        slug: slug,
        logo: modalLogo.trim(),
        productCount: 0,
        status: modalStatus,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      onAddBrand(newBrand);
    }
    setShowModal(false);
  };

  const toggleSelectAll = () => {
    if (selectedBrandIds.length === brands.length) {
      setSelectedBrandIds([]);
    } else {
      setSelectedBrandIds(brands.map(b => b.id));
    }
  };

  const toggleSelectBrand = (id: string) => {
    if (selectedBrandIds.includes(id)) {
      setSelectedBrandIds(selectedBrandIds.filter(i => i !== id));
    } else {
      setSelectedBrandIds([...selectedBrandIds, id]);
    }
  };

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Slug,Products,Status,Created"].join(",") + "\n"
      + brands.map(b => `"${b.name}","${b.slug}",${b.productCount},"${b.status}","${b.createdAt}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `brands_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBrands = brands.filter(b => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.slug.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && b.status !== statusFilter) {
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
            Brand Management
          </h1>
          <p className="text-xs lg:text-sm text-[#88888C] mt-1">
            Manage registered manufacturers, partner labels, and supplier brands
          </p>
        </div>
        <button
          id="add-brand-btn"
          onClick={openAddModal}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-semibold text-xs transition-all shadow-lg shadow-[#4f46e5]/25 hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </div>

      {/* KPI Cards & Spotlight (matching Image 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-1.5">
                Total Brands
              </p>
              <h3 className="text-3xl font-bold text-white">142</h3>
            </div>
            <div className="p-3 bg-[#4f46e5]/15 border border-[#4f46e5]/30 rounded-xl text-[#818cf8]">
              <Tag className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +8 partners this month
          </p>
        </div>

        <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#88888C] mb-1.5">
                Active Brands
              </p>
              <h3 className="text-3xl font-bold text-white">128</h3>
            </div>
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#88888C]">
            90% active product coverage
          </p>
        </div>

        {/* Featured Brand Spotlight */}
        <div className="bg-[#111114] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-2">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Spotlight Partner
              </span>
              <h3 className="text-xl font-bold text-white">TechNova Global</h3>
              <p className="text-xs text-[#88888C] mt-0.5">1,245 inventory items mapped</p>
            </div>
            <button
              onClick={() => onSelectBrandFilter('TechNova')}
              className="p-2 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-white text-xs border border-[#2E2E38] transition-colors"
              title="Filter by TechNova"
            >
              <ExternalLink className="w-4 h-4 text-[#818cf8]" />
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-[#222228] flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-medium">Top Revenue Driver</span>
            <span className="text-[#88888C]">Tier 1 Certified</span>
          </div>
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
            placeholder="Search brands by name or slug..."
            className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-[#66666D] focus:outline-none focus:border-[#4f46e5]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#16161C] border border-[#26262C] rounded-xl py-2 px-3.5 text-xs text-[#E0E0E0] focus:outline-none focus:border-[#4f46e5] cursor-pointer"
          >
            <option value="all">Status (All)</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-[#16161C] hover:bg-[#202028] border border-[#26262C] text-xs font-semibold text-white rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#88888C]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-[#111114] rounded-2xl shadow-sm border border-[#222226] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0A0A0C]/50 border-b border-[#222226] text-[11px] uppercase tracking-wider text-[#88888C]">
                <th className="py-4 px-6 w-10">
                  <input
                    type="checkbox"
                    checked={selectedBrandIds.length === brands.length && brands.length > 0}
                    onChange={toggleSelectAll}
                    className="accent-[#4f46e5] rounded"
                  />
                </th>
                <th className="py-4 px-6 font-semibold">Brand Partner</th>
                <th className="py-4 px-6 font-semibold">Slug Identifier</th>
                <th className="py-4 px-6 font-semibold text-center">Products</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
                <th className="py-4 px-6 font-semibold">Registration</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C22]">
              {filteredBrands.map((brand) => {
                const isSelected = selectedBrandIds.includes(brand.id);

                return (
                  <tr key={brand.id} className={`hover:bg-[#16161C] transition-colors group ${isSelected ? 'bg-[#4f46e5]/5' : ''}`}>
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectBrand(brand.id)}
                        className="accent-[#4f46e5] rounded"
                      />
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#1A1A22] border border-[#282830] overflow-hidden flex items-center justify-center font-bold text-xs text-[#818cf8] shrink-0">
                          {brand.logo ? (
                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                          ) : (
                            brand.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#818cf8] transition-colors flex items-center gap-1.5">
                            {brand.name}
                            {brand.isSpotlight && (
                              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                            )}
                          </p>
                          <p className="text-[11px] text-[#88888C] font-mono mt-0.5">
                            ID: {brand.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono text-[#88888C]">
                      {brand.slug}
                    </td>

                    <td className="py-4 px-6 text-center text-xs font-mono font-semibold text-white">
                      {brand.productCount}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                        brand.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : brand.status === 'draft'
                          ? 'bg-[#FFB95F]/15 text-[#FFB95F] border border-[#FFB95F]/30'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {brand.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-[#88888C]">
                      {brand.createdAt}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectBrandFilter(brand.name)}
                          className="p-1.5 rounded-lg text-[#88888C] hover:text-white hover:bg-[#222228] transition-colors"
                          title="View catalog items"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(brand)}
                          className="p-1.5 rounded-lg text-[#88888C] hover:text-[#818cf8] hover:bg-[#222228] transition-colors"
                          title="Edit brand"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteBrand(brand.id)}
                          className="p-1.5 rounded-lg text-[#88888C] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete brand"
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
      </div>

      {/* Add / Edit Brand Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#141419] border border-[#2B2B32] rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">
                {editingBrand ? 'Edit Brand' : 'Register New Brand'}
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
                  Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="e.g. Bose Audio"
                  className="w-full bg-[#1A1A22] border border-[#2B2B32] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Logo URL (Optional)
                </label>
                <input
                  type="url"
                  value={modalLogo}
                  onChange={(e) => setModalLogo(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#1A1A22] border border-[#2B2B32] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Brand Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center justify-center p-2.5 bg-[#1A1A22] border border-[#2B2B32] rounded-xl cursor-pointer text-xs text-white">
                    <input
                      type="radio"
                      checked={modalStatus === 'active'}
                      onChange={() => setModalStatus('active')}
                      className="accent-[#4f46e5] mr-1.5"
                    />
                    Active
                  </label>
                  <label className="flex items-center justify-center p-2.5 bg-[#1A1A22] border border-[#2B2B32] rounded-xl cursor-pointer text-xs text-[#88888C]">
                    <input
                      type="radio"
                      checked={modalStatus === 'draft'}
                      onChange={() => setModalStatus('draft')}
                      className="accent-[#4f46e5] mr-1.5"
                    />
                    Draft
                  </label>
                  <label className="flex items-center justify-center p-2.5 bg-[#1A1A22] border border-[#2B2B32] rounded-xl cursor-pointer text-xs text-[#88888C]">
                    <input
                      type="radio"
                      checked={modalStatus === 'archived'}
                      onChange={() => setModalStatus('archived')}
                      className="accent-[#4f46e5] mr-1.5"
                    />
                    Archived
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
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
