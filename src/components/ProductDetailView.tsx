import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Star, 
  CheckCircle, 
  Clock, 
  Layers, 
  Package, 
  ShieldCheck, 
  ChevronRight,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onEdit,
  onDelete
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [copiedSku, setCopiedSku] = useState(false);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleCopySku = () => {
    navigator.clipboard.writeText(product.sku);
    setCopiedSku(true);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-[#88888C]">
          <button 
            onClick={onBack}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Products
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#55555A]" />
          <span>{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#55555A]" />
          <span className="text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(product)}
            className="px-4 py-2 bg-[#1C1C24] hover:bg-[#252530] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2E2E38] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#818cf8]" />
            Edit Product
          </button>
          <button
            onClick={() => onDelete(product)}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Showcase & Gallery */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Main Large Display Image */}
          <div className="aspect-square w-full rounded-2xl bg-[#111114] border border-[#222226] overflow-hidden p-4 flex items-center justify-center relative group">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                product.status === 'active'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-800/80 text-zinc-300 border border-zinc-700'
              }`}>
                {product.status}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl bg-[#141418] border p-1 overflow-hidden transition-all ${
                    selectedImage === img
                      ? 'border-[#4f46e5] ring-2 ring-[#4f46e5]/40 scale-95'
                      : 'border-[#26262C] hover:border-[#3E3E48] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Specs & Meta */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Title & Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#4f46e5]/10 text-[#818cf8] border border-[#4f46e5]/20 text-xs font-semibold uppercase tracking-wider">
                {product.brand}
              </span>
              <button 
                onClick={handleCopySku}
                className="text-[11px] font-mono text-[#88888C] hover:text-white flex items-center gap-1 bg-[#16161C] px-2 py-0.5 rounded border border-[#26262C]"
                title="Click to copy SKU"
              >
                SKU: {product.sku}
                {copiedSku ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#66666D]" />}
              </button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {product.name}
            </h1>

            {/* Reviews / Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-[#FFD4A4]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white">{product.rating}</span>
              <span className="text-xs text-[#88888C]">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#111114] border border-[#222226]">
              <p className="text-[11px] uppercase tracking-wider text-[#88888C] font-semibold">Retail Price</p>
              <p className="text-3xl font-bold text-white mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111114] border border-[#222226]">
              <p className="text-[11px] uppercase tracking-wider text-[#88888C] font-semibold">Stock Quantity</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  product.stock === 0 ? 'bg-rose-400' : product.stock <= 5 ? 'bg-[#FFB95F]' : 'bg-emerald-400'
                }`} />
                <span className="text-lg font-bold text-white">
                  {product.stock} units available
                </span>
              </div>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="p-6 rounded-2xl bg-[#111114] border border-[#222226]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
              Product Overview
            </h3>
            <p className="text-xs lg:text-sm text-[#B0B0B8] leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#222226]">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2.5">
                  Key Highlights
                </h4>
                <ul className="space-y-2 text-xs text-[#C0C0C8]">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Technical Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#222226]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Technical Specifications
              </h3>
              <div className="divide-y divide-[#1C1C22]">
                {Object.entries(product.specs).map(([key, val]) => {
                  if (!val) return null;
                  return (
                    <div key={key} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="text-[#88888C] capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-white font-medium font-mono text-right max-w-[60%]">
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="flex items-center justify-between text-[11px] text-[#66666D] px-2">
            <span>Created on: {product.createdAt}</span>
            <span>Last modified: {product.updatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
