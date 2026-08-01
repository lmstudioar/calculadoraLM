import React, { useState } from 'react';
import { Header } from './components/Header';
import { BannerNotice } from './components/BannerNotice';
import { QuickPresets } from './components/QuickPresets';
import { VideoEditingCalculator } from './components/VideoEditingCalculator';
import { GraphicDesignCalculator } from './components/GraphicDesignCalculator';
import { WebDevelopmentCalculator } from './components/WebDevelopmentCalculator';
import { CommunityManagerCalculator } from './components/CommunityManagerCalculator';
import { PortfolioSection } from './components/PortfolioSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartItem, PresetPackage, ServiceCategory } from './types';
import { formatARS } from './data/agencyData';
import { Video, Palette, Code2, Share2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');
  const [addedPresetIds, setAddedPresetIds] = useState<string[]>([]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Check if exact same item exists to increment quantity or append
      const existingIndex = prev.findIndex((i) => i.title === item.title && i.subtitle === item.subtitle);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentItem = updated[existingIndex];
        const newQty = currentItem.quantity + item.quantity;
        updated[existingIndex] = {
          ...currentItem,
          quantity: newQty,
          totalPrice: currentItem.unitPrice * newQty,
        };
        return updated;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleAddPreset = (preset: PresetPackage) => {
    preset.items.forEach((presetItem) => {
      const fullItem: CartItem = {
        ...presetItem,
        id: `preset-${preset.id}-${Date.now()}-${Math.random()}`,
      };
      setCartItems((prev) => [...prev, fullItem]);
    });

    if (!addedPresetIds.includes(preset.id)) {
      setAddedPresetIds((prev) => [...prev, preset.id]);
    }
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAddedPresetIds([]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#0F1115] text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Banner with Location & Key Features */}
      <BannerNotice />

      <main id="calculadora" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Quick Presets Section */}
        <QuickPresets
          onAddPreset={handleAddPreset}
          addedPresetIds={addedPresetIds}
        />

        {/* Navigation Category Tabs */}
        <div className="sticky top-20 z-30 bg-[#0F1115]/95 backdrop-blur-md py-4 border-y border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#121418] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Todos los Servicios
            </button>

            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#121418] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Edición de Video</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'design'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#121418] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Diseño Gráfico</span>
            </button>

            <button
              onClick={() => setActiveTab('web')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'web'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#121418] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Páginas Web</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeTab === 'community'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#121418] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Community Manager</span>
            </button>
          </div>
        </div>

        {/* SERVICE CALCULATOR MODULES */}
        <div className="space-y-12">
          
          {(activeTab === 'all' || activeTab === 'video') && (
            <VideoEditingCalculator onAddToCart={handleAddToCart} />
          )}

          {(activeTab === 'all' || activeTab === 'design') && (
            <GraphicDesignCalculator onAddToCart={handleAddToCart} />
          )}

          {(activeTab === 'all' || activeTab === 'web') && (
            <WebDevelopmentCalculator onAddToCart={handleAddToCart} />
          )}

          {(activeTab === 'all' || activeTab === 'community') && (
            <CommunityManagerCalculator onAddToCart={handleAddToCart} />
          )}

        </div>

        {/* Portfolio Showcase Note */}
        <PortfolioSection />

      </main>

      {/* Floating Bottom Cart Bar for Quick Mobile Access */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto">
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-blue-400/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-medium text-blue-100 block">
                  {cartItems.length} {cartItems.length === 1 ? 'servicio' : 'servicios'} en tu cotización
                </span>
                <span className="text-lg font-black text-white">
                  {formatARS(totalCartPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <span>Ver Cotización</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
