import React from 'react';
import { ShoppingBag, Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#121418]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
              LM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tighter text-white">
                  LM STUDIO<span className="text-blue-500">.</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Agencia Digital
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono uppercase tracking-wider mt-0.5">
                <MapPin className="w-3 h-3 text-blue-500" /> Buenos Aires, AR
              </p>
            </div>
          </a>
        </div>

        {/* Social Badges & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-4 text-[11px] font-medium tracking-widest uppercase text-zinc-300 border-r border-white/10 pr-4">
            <a
              href={AGENCY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>{AGENCY_INFO.instagram}</span>
            </a>
            <a
              href={AGENCY_INFO.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
            >
              <Twitter className="w-3.5 h-3.5 text-blue-400" />
              <span>{AGENCY_INFO.twitter}</span>
            </a>
            <a
              href={`mailto:${AGENCY_INFO.email}`}
              className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity px-2 py-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{AGENCY_INFO.email}</span>
            </a>
          </div>

          {/* Cart Button */}
          <button
            id="cart-button-header"
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Mi Cotización</span>
            {cartCount > 0 && (
              <span className="bg-white text-blue-600 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
