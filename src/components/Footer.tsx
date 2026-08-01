import React from 'react';
import { MapPin, Instagram, Twitter, Mail, ArrowUp } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121418] border-t border-white/10 text-zinc-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm text-white shadow-md">
                LM
              </div>
              <span className="font-bold text-xl text-white tracking-tighter">
                LM STUDIO<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Agencia especializada en Edición de Video, Community Manager, Diseño Gráfico y Desarrollo Web. Buenos Aires, AR.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider">
            <a
              href={AGENCY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>{AGENCY_INFO.instagram}</span>
            </a>

            <a
              href={AGENCY_INFO.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
            >
              <Twitter className="w-3.5 h-3.5 text-blue-400" />
              <span>{AGENCY_INFO.twitter}</span>
            </a>

            <a
              href={`mailto:${AGENCY_INFO.email}`}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{AGENCY_INFO.email}</span>
            </a>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span>Buenos Aires, Argentina • Precios expresados en ARS</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer border border-white/10 uppercase tracking-wider text-[10px]"
              title="Volver arriba"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Decorative Bar from Sophisticated Dark theme */}
      <div className="h-6 bg-blue-600 flex items-center justify-between px-4 sm:px-10">
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          <span className="text-[9px] font-bold text-white uppercase tracking-widest font-mono">
            Sistema de Cotización en Tiempo Real v2.1 • LM STUDIO AR
          </span>
        </div>
        <span className="text-[9px] text-white/80 font-mono uppercase tracking-widest hidden sm:inline">
          BUENOS AIRES, AR
        </span>
      </div>
    </footer>
  );
};
