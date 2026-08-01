import React from 'react';
import { Film, Image, Globe, Sparkles, Instagram, ArrowUpRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const PortfolioSection: React.FC = () => {
  return (
    <section className="my-16 bg-[#121418] border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
      
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Trabajos & Casos de Éxito
          </span>
          <h3 className="text-2xl sm:text-3xl font-light italic font-serif text-white">
            Portfolio LM Studio
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed font-mono">
            Consultá por privado en nuestro Instagram <strong className="text-white">@lmstudio.ar</strong> para ver reels, marcas y webs recientes que realizamos en Buenos Aires.
          </p>
        </div>

        <a
          href={AGENCY_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl border border-white/10 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Instagram className="w-4 h-4 text-pink-400" />
          <span>Ver Trabajos en Instagram</span>
          <ArrowUpRight className="w-4 h-4 text-zinc-400" />
        </a>
      </div>

      {/* Placeholder visual grids */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 bg-gradient-to-br from-[#0F1115] to-[#15181E] border border-white/10 rounded-xl space-y-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-blue-400">
            <Film className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">Edición de Video & Reels</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Edición de alto impacto para creadores, canales de YouTube, marcas de ropa y empresas en Buenos Aires.
          </p>
        </div>

        <div className="p-5 bg-gradient-to-br from-[#0F1115] to-[#15181E] border border-white/10 rounded-xl space-y-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-blue-400">
            <Image className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">Branding & Social Media</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Identidades de marca con logos vectoriales, plantillas de Canva/Photoshop y grillas para feed de Instagram.
          </p>
        </div>

        <div className="p-5 bg-gradient-to-br from-[#0F1115] to-[#15181E] border border-white/10 rounded-xl space-y-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-blue-400">
            <Globe className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">Desarrollo Web & Landing Pages</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Páginas corporativas modernas hechas a medida, ultra rápidas y listas para hospedar en GitHub Pages.
          </p>
        </div>

      </div>

    </section>
  );
};
