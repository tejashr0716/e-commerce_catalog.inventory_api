import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X, 
  UploadCloud, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Sparkles, 
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { Product, Category, Brand, ProductStatus } from '../types';

interface AddProductViewProps {
  initialProduct?: Product | null;
  categories: Category[];
  brands: Brand[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const AddProductView: React.FC<AddProductViewProps> = ({
  initialProduct,
  categories,
  brands,
  onSave,
  onCancel
}) => {
  const isEditing = !!initialProduct;

  const [name, setName] = useState(initialProduct?.name || '');
  const [sku, setSku] = useState(initialProduct?.sku || '');
  const [brand, setBrand] = useState(initialProduct?.brand || (brands[0]?.name || 'Apple'));
  const [category, setCategory] = useState(initialProduct?.category || (categories[0]?.name || 'Electronics'));
  const [price, setPrice] = useState<string>(initialProduct ? initialProduct.price.toString() : '');
  const [stock, setStock] = useState<string>(initialProduct ? initialProduct.stock.toString() : '0');
  const [status, setStatus] = useState<ProductStatus>(initialProduct?.status || 'active');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [imageUrl, setImageUrl] = useState(initialProduct?.image || '');
  const [highlights, setHighlights] = useState<string[]>(
    initialProduct?.highlights || ['Premium ergonomic build quality', 'High fidelity audio drivers']
  );
  const [newHighlight, setNewHighlight] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const sampleImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAaCU6erEmZq3gWgkFpmild6rRMFcWL-x-9N063RDeKzzGsJ8o0DZadb8CAIhCFLkDl2I_YfionGNO-hItQ7a_4hoAaH7KwpzKK6mN861h0HzzBCUlifoooqc9cOCvys2lLyEgNffZVoVtXAEIGOF1fbmOrsapDhWEBULsrHtrBsfuE0nw8nQqxPMAuGu3FvQ0WBz0iSCsO_2ugOBUSz1RS2yGj8ilO2wZ6AhER4n79GEe113M_fZQb',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCGaKG8T4OWIiVfnGhMl4FDwYFvOEFQi2F6Z763eHMFnHH6caJcZNbSVt1k-Y69jMnBfkD9vMEv9XHLRCp0ga1MCWYVFw5Ai8-hzSl9sjuCKUSIxMaeP7Hhw1lm1skSkeByWvaPWLOKlYNZs0jj2DnOWYLAWnmSGkjR8JQnvp26FyPLvmyVSw6rWYkqMSTKFXG3WQGSblsw3bM2PRS0napZMzZDvB1aHCVbnqyK35ctbi6t4cXVDMTc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuByF-XgTULDeryhfuXCTltIZCvSjnlNhvINNYRaRfEubqIJCkQDGpxmr50JYCvyid7XbuRwEW3KE_Liyo7I9nO0wPr5s0XpWN_epndk1Rtvu79LOMXmaFYIeH13uBubqh9UpjpP1Si9iXQX1wBkRYrkHPEw1pdC00UX8eYCVDXELxIgw4y437ziph0G8lfjmDGcDEObvPQRDm3eZXy5PyltB34tQGfkrsIJXad45Ub8J3gtJVwdEPfA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA9X4X95QTUkuoaAQ8WOsid-RhHAJbzDA9HMkryLJAmcsHA7OQbpdIVr9pNoRTSNCzNzWDbLVL7AsnEMht3RvOzI2TjJznzCH5xZjFHmH7AIpjXE7WyEu1iO0f2tz1B4xup6T0WESuJnN6hTCZWZM14g0nQ6e3lIrntwhtxapp9mctPGqIHEayqI0cSg1U9hnMMXhtdJW9Tyk6hWPYkrdX3gZQBD9ELEWf_gQQRjUrZID1RtKAAvrhg'
  ];

  // Auto-generate SKU when name changes if empty
  const handleGenerateSku = () => {
    const brandPrefix = (brand.substring(0, 3) || 'PRD').toUpperCase();
    const namePart = name ? name.substring(0, 3).toUpperCase() : 'ITM';
    const randNum = Math.floor(100 + Math.random() * 900);
    setSku(`${brandPrefix}-${namePart}-${randNum}`);
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Product name is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) errs.price = 'Valid price is required';
    if (!sku.trim()) errs.sku = 'SKU is required';
    if (!imageUrl.trim()) errs.image = 'Product image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const brandObj = brands.find(b => b.name === brand);

    const productPayload: Product = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      name: name.trim(),
      brand: brand,
      brandSlug: brandObj?.slug || brand.toLowerCase().replace(/\s+/g, '-'),
      sku: sku.trim().toUpperCase(),
      category: category,
      price: parseFloat(price),
      stock: parseInt(stock, 10) || 0,
      status: status,
      rating: initialProduct?.rating || 5.0,
      reviewsCount: initialProduct?.reviewsCount || 1,
      image: imageUrl.trim(),
      galleryImages: [imageUrl.trim()],
      description: description.trim() || 'No detailed description provided.',
      highlights: highlights,
      specs: initialProduct?.specs || {
        sku: sku.trim().toUpperCase(),
        warranty: '1 Year Manufacturer Warranty'
      },
      createdAt: initialProduct?.createdAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onSave(productPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full animate-in fade-in duration-200 pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[#88888C] hover:text-white flex items-center gap-1.5 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Catalog
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-xs text-[#88888C] mt-0.5">
            Configure product catalog entry, pricing, media, and inventory specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-[#2B2B32] text-xs font-semibold text-[#88888C] hover:text-white hover:bg-[#181820] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-xs font-semibold text-white shadow-lg shadow-[#4f46e5]/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Basic Info & Pricing */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>Basic Information</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Product Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="product-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className={`w-full bg-[#16161C] border rounded-xl py-2.5 px-4 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5] ${
                    errors.name ? 'border-rose-500/80 ring-1 ring-rose-500/50' : 'border-[#26262C]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-[#C0C0C8]">
                    Description
                  </label>
                  <span className="text-[10px] text-[#66666D]">
                    {description.length}/1000
                  </span>
                </div>
                <textarea
                  id="product-description-input"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed description of features, materials, and capabilities..."
                  className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-4 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5] leading-relaxed resize-none"
                />
              </div>

              {/* Highlights bullets */}
              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Feature Highlights
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
                    placeholder="Add a bullet point highlight..."
                    className="flex-1 bg-[#16161C] border border-[#26262C] rounded-xl py-2 px-3.5 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5]"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 bg-[#1C1C24] hover:bg-[#252530] text-white text-xs font-medium rounded-xl border border-[#2E2E38]"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-[#16161C] border border-[#24242A] rounded-xl text-xs text-[#D0D0D8]">
                      <span className="truncate mr-2">• {item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="text-[#66666D] hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-white mb-4">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Base Retail Price ($) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88888C] text-xs font-bold">$</span>
                  <input
                    id="product-price-input"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="299.00"
                    className={`w-full bg-[#16161C] border rounded-xl py-2.5 pl-8 pr-4 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5] ${
                      errors.price ? 'border-rose-500/80 ring-1 ring-rose-500/50' : 'border-[#26262C]'
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Stock Units Quantity <span className="text-rose-400">*</span>
                </label>
                <input
                  id="product-stock-input"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="45"
                  className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-4 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Media, Status, Organization */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Visibility */}
          <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white mb-3">
              Listing Status
            </h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-[#16161C] border border-[#26262C] rounded-xl cursor-pointer hover:border-[#383842] transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Active</span>
                  <span className="text-[11px] text-[#88888C]">Visible in product catalog</span>
                </div>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="accent-[#4f46e5] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#16161C] border border-[#26262C] rounded-xl cursor-pointer hover:border-[#383842] transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Draft</span>
                  <span className="text-[11px] text-[#88888C]">Hidden from store channels</span>
                </div>
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={() => setStatus('draft')}
                  className="accent-[#4f46e5] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#16161C] border border-[#26262C] rounded-xl cursor-pointer hover:border-[#383842] transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Archived</span>
                  <span className="text-[11px] text-[#88888C]">Decommissioned product</span>
                </div>
                <input
                  type="radio"
                  name="status"
                  value="archived"
                  checked={status === 'archived'}
                  onChange={() => setStatus('archived')}
                  className="accent-[#4f46e5] w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white mb-4">
              Organization & SKU
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#4f46e5] cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C0C0C8] mb-1.5">
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#16161C] border border-[#26262C] rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#4f46e5] cursor-pointer"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#C0C0C8]">
                    Stock Keeping Unit (SKU) <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateSku}
                    className="text-[10px] text-[#818cf8] hover:underline font-mono"
                  >
                    Auto Generate
                  </button>
                </div>
                <input
                  id="product-sku-input"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. MBP-14-M3P-512"
                  className={`w-full bg-[#16161C] border rounded-xl py-2.5 px-4 text-xs font-mono text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5] ${
                    errors.sku ? 'border-rose-500/80 ring-1 ring-rose-500/50' : 'border-[#26262C]'
                  }`}
                />
                {errors.sku && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.sku}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Media */}
          <div className="bg-[#111114] border border-[#222226] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white mb-3">
              Product Image <span className="text-rose-400">*</span>
            </h2>

            {/* Preview Box */}
            {imageUrl ? (
              <div className="relative aspect-video rounded-xl bg-[#16161C] border border-[#26262C] overflow-hidden mb-3 group">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="aspect-video rounded-xl border border-dashed border-[#33333A] bg-[#16161C] flex flex-col items-center justify-center p-4 text-center mb-3">
                <UploadCloud className="w-8 h-8 text-[#66666D] mb-2" />
                <p className="text-xs text-[#C0C0C8] font-medium">Select an image below</p>
                <p className="text-[10px] text-[#66666D] mt-0.5">or paste direct image URL</p>
              </div>
            )}

            <div className="space-y-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste Image URL (https://...)"
                className={`w-full bg-[#16161C] border rounded-xl py-2 px-3 text-xs text-white placeholder-[#55555C] focus:outline-none focus:border-[#4f46e5] ${
                  errors.image ? 'border-rose-500' : 'border-[#26262C]'
                }`}
              />

              {/* Sample Quick Select */}
              <div>
                <p className="text-[10px] uppercase font-semibold text-[#88888C] mb-1.5">
                  Or pick sample asset:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {sampleImages.map((sImg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(sImg)}
                      className={`aspect-square rounded-lg bg-[#181820] border p-1 overflow-hidden transition-all ${
                        imageUrl === sImg ? 'border-[#4f46e5] ring-2 ring-[#4f46e5]/40' : 'border-[#26262C] hover:border-[#444]'
                      }`}
                    >
                      <img src={sImg} alt={`Sample ${i}`} className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
