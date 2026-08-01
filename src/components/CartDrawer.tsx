import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Copy, Check, Instagram, Mail, Twitter, ArrowRight, Sparkles, Send } from 'lucide-react';
import { CartItem } from '../types';
import { AGENCY_INFO, formatARS, generateQuoteText } from '../data/agencyData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onUpdateQuantity,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showTextPreview, setShowTextPreview] = useState<boolean>(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalDiscounts = cartItems.reduce((sum, item) => sum + (item.discountAmount || 0), 0);

  const quoteFormattedMessage = generateQuoteText(cartItems, totalPrice);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(quoteFormattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const mailtoUrl = `mailto:${AGENCY_INFO.email}?subject=${encodeURIComponent(
    'Cotización Personalizada - LM Studio'
  )}&body=${encodeURIComponent(quoteFormattedMessage)}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#0A0C0F] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121418]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Mi Cotización Final</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {cartItems.length} {cartItems.length === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Tu cotización está vacía</p>
                  <p className="text-zinc-500 text-xs mt-1 max-w-xs mx-auto">
                    Añadí servicios de video, diseño gráfico, desarrollo web o community manager para calcular tu presupuesto.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Desglose de Servicios
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Vaciar
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 relative group font-mono text-xs"
                  >
                    <div className="flex items-start justify-between gap-3 font-sans">
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                        title="Eliminar de cotización"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                      <span className="text-zinc-400">
                        {item.quantity > 1 ? `${item.quantity} x ${formatARS(item.unitPrice)}` : 'Precio'}
                      </span>
                      <span className="font-bold text-blue-400 text-sm">
                        {formatARS(item.totalPrice)}
                      </span>
                    </div>

                    {item.discountNotice && (
                      <p className="text-[11px] text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                        {item.discountNotice}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Cart Footer & Action Center */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0A0C0F] space-y-4">
              
              {/* Total Summary */}
              <div className="space-y-1.5 bg-white/5 p-4 rounded-xl border border-white/10 font-mono">
                {totalDiscounts > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Ahorro en Descuentos:</span>
                    <span>-{formatARS(totalDiscounts)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Total Estimado:
                  </span>
                  <span className="text-2xl font-bold text-blue-400">
                    {formatARS(totalPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 text-right">
                  Precios finales expresados en ARS • Buenos Aires
                </p>
              </div>

              {/* Toast when copied */}
              {copied && (
                <div className="p-3 bg-emerald-600 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 animate-bounce shadow-lg">
                  <Check className="w-4 h-4" /> ¡Cotización copiada al portapapeles! Lista para pegar.
                </div>
              )}

              {/* Copy Quote Button (Main requirement) */}
              <button
                onClick={handleCopyMessage}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>Copiar Cotización para Enviar</span>
              </button>

              {/* Social Action Buttons requested */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={AGENCY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Enviar x Instagram</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors border border-zinc-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Enviar x Email</span>
                </a>
              </div>

              {/* Toggle message format preview */}
              <button
                onClick={() => setShowTextPreview(!showTextPreview)}
                className="w-full text-[11px] text-zinc-400 hover:text-white underline text-center block pt-1 cursor-pointer"
              >
                {showTextPreview ? 'Ocultar formato de mensaje' : 'Ver formato del texto a enviar'}
              </button>

              {showTextPreview && (
                <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-[10px] text-zinc-300 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {quoteFormattedMessage}
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
