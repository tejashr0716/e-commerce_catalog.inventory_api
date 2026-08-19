import React, { useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_BRANDS, 
  INITIAL_ACTIVITIES 
} from './data/initialData';
import { 
  Product, 
  Category, 
  Brand, 
  ActivityItem, 
  NavTab, 
  ToastMessage 
} from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ProductsView } from './components/ProductsView';
import { ProductDetailView } from './components/ProductDetailView';
import { AddProductView } from './components/AddProductView';
import { CategoriesView } from './components/CategoriesView';
import { BrandsView } from './components/BrandsView';
import { SettingsView } from './components/SettingsView';
import { ToastContainer } from './components/Toast';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export function App() {
  // State Initialization from LocalStorage or Initial Seed
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ph_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('ph_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    const saved = localStorage.getItem('ph_brands');
    return saved ? JSON.parse(saved) : INITIAL_BRANDS;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('ph_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('ph_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ph_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ph_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('ph_activities', JSON.stringify(activities));
  }, [activities]);

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Switch tabs
  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'add-product') {
      setEditingProduct(null);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View Product Details
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Edit Product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setCurrentTab('add-product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (savedProduct: Product) => {
    const exists = products.some(p => p.id === savedProduct.id);

    if (exists) {
      setProducts(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
      addToast('success', 'Product Updated', `${savedProduct.name} has been updated.`);

      // Log activity
      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'update',
        title: 'Product updated:',
        targetName: savedProduct.name,
        actor: 'By admin user',
        timeAgo: 'Just now',
        timestamp: new Date().toISOString()
      };
      setActivities(prev => [newActivity, ...prev]);

      if (selectedProduct && selectedProduct.id === savedProduct.id) {
        setSelectedProduct(savedProduct);
      }
    } else {
      setProducts(prev => [savedProduct, ...prev]);
      addToast('success', 'Product Created', `${savedProduct.name} added to catalog.`);

      // Log activity
      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'add',
        title: 'New product added:',
        targetName: savedProduct.name,
        actor: 'By admin user',
        timeAgo: 'Just now',
        timestamp: new Date().toISOString()
      };
      setActivities(prev => [newActivity, ...prev]);
    }

    setEditingProduct(null);
    setCurrentTab('products');
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    addToast('info', 'Product Removed', `${productToDelete.name} has been deleted.`);

    // Log activity
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'delete',
      title: 'Product deleted from inventory:',
      targetName: productToDelete.name,
      actor: 'By admin user',
      timeAgo: 'Just now',
      timestamp: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);

    setProductToDelete(null);
    if (currentTab === 'product-detail') {
      setCurrentTab('products');
    }
  };

  // Category Actions
  const handleAddCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
    addToast('success', 'Category Created', `${cat.name} added.`);
  };

  const handleUpdateCategory = (cat: Category) => {
    setCategories(prev => prev.map(c => c.id === cat.id ? cat : c));
    addToast('success', 'Category Updated', `${cat.name} updated.`);
  };

  const handleDeleteCategory = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    setCategories(prev => prev.filter(c => c.id !== catId));
    addToast('info', 'Category Removed', `${cat?.name || 'Category'} removed.`);
  };

  // Brand Actions
  const handleAddBrand = (brand: Brand) => {
    setBrands(prev => [...prev, brand]);
    addToast('success', 'Brand Registered', `${brand.name} added.`);
  };

  const handleUpdateBrand = (brand: Brand) => {
    setBrands(prev => prev.map(b => b.id === brand.id ? brand : b));
    addToast('success', 'Brand Updated', `${brand.name} updated.`);
  };

  const handleDeleteBrand = (brandId: string) => {
    const b = brands.find(brand => brand.id === brandId);
    setBrands(prev => prev.filter(brand => brand.id !== brandId));
    addToast('info', 'Brand Removed', `${b?.name || 'Brand'} removed.`);
  };

  // Reset demo data
  const handleResetData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBrands(INITIAL_BRANDS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.removeItem('ph_products');
    localStorage.removeItem('ph_categories');
    localStorage.removeItem('ph_brands');
    localStorage.removeItem('ph_activities');
    addToast('info', 'Database Reset', 'Initial high-resolution sample catalog restored.');
  };

  const lowStockProductsCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A0A0C] text-[#E0E0E0]' : 'bg-[#F4F5F7] text-[#1E1E24]'}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        totalProductsCount={products.length}
        lowStockCount={lowStockProductsCount}
      />

      {/* Header Topbar */}
      <Header
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        products={products}
        onSelectProduct={handleSelectProduct}
        activities={activities}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onNavigate={handleSelectTab}
      />

      {/* Main Content Area */}
      <main className="lg:pl-[260px] pt-16 min-h-screen flex flex-col">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              products={products}
              categories={categories}
              activities={activities}
              onNavigateToProducts={() => handleSelectTab('products')}
              onSelectProduct={handleSelectProduct}
              onEditProduct={handleEditProduct}
              onOpenAddProduct={() => {
                setEditingProduct(null);
                setCurrentTab('add-product');
              }}
            />
          )}

          {currentTab === 'products' && (
            <ProductsView
              products={products}
              categories={categories}
              brands={brands}
              onOpenAddProduct={() => {
                setEditingProduct(null);
                setCurrentTab('add-product');
              }}
              onSelectProduct={handleSelectProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={(prod) => setProductToDelete(prod)}
            />
          )}

          {currentTab === 'product-detail' && (
            selectedProduct ? (
              <ProductDetailView
                product={selectedProduct}
                onBack={() => setCurrentTab('products')}
                onEdit={handleEditProduct}
                onDelete={(prod) => setProductToDelete(prod)}
              />
            ) : (
              <div className="text-center py-20">
                <p className="text-sm text-[#88888C] mb-4">No product selected</p>
                <button
                  onClick={() => setCurrentTab('products')}
                  className="px-4 py-2 bg-[#4f46e5] text-white text-xs font-semibold rounded-xl"
                >
                  Return to Products
                </button>
              </div>
            )
          )}

          {currentTab === 'add-product' && (
            <AddProductView
              initialProduct={editingProduct}
              categories={categories}
              brands={brands}
              onSave={handleSaveProduct}
              onCancel={() => setCurrentTab('products')}
            />
          )}

          {currentTab === 'categories' && (
            <CategoriesView
              categories={categories}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
              onSelectCategoryFilter={(catName) => {
                setCurrentTab('products');
              }}
            />
          )}

          {currentTab === 'brands' && (
            <BrandsView
              brands={brands}
              onAddBrand={handleAddBrand}
              onUpdateBrand={handleUpdateBrand}
              onDeleteBrand={handleDeleteBrand}
              onSelectBrandFilter={(brandName) => {
                setCurrentTab('products');
              }}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode(!isDarkMode)}
              onResetData={handleResetData}
            />
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#141419] border border-rose-500/30 rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Product</h3>
                <p className="text-xs text-[#88888C]">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-xs text-[#C0C0C8] leading-relaxed mb-6">
              Are you sure you want to permanently remove <span className="font-semibold text-white">"{productToDelete.name}"</span> (SKU: {productToDelete.sku}) from your inventory catalog?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-[#88888C] hover:text-white rounded-xl hover:bg-[#1C1C24] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white rounded-xl shadow-lg shadow-rose-600/25 flex items-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
