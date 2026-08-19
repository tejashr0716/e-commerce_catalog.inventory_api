export type ProductStatus = 'active' | 'draft' | 'archived';
export type StockStatusType = 'in' | 'low' | 'out';

export interface ProductSpecs {
  sku?: string;
  weight?: string;
  dimensions?: string;
  processor?: string;
  memory?: string;
  storage?: string;
  display?: string;
  material?: string;
  connectivity?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandSlug: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  specs: ProductSpecs;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  productCount: number;
  status: 'active' | 'inactive' | 'draft';
  parentCategory: string;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
  status: 'active' | 'draft' | 'archived';
  isSpotlight?: boolean;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: 'add' | 'update' | 'warning' | 'delete' | 'stock';
  title: string;
  targetName: string;
  actor: string;
  timeAgo: string;
  timestamp: string;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  stockStatus: string;
  minPrice: string;
  maxPrice: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'stock-desc';
}

export type ViewMode = 'table' | 'grid';

export type NavTab = 'dashboard' | 'products' | 'categories' | 'brands' | 'add-product' | 'product-detail' | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}
