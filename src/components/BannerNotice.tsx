import React from 'react';
import { MapPin, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const BannerNotice: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-6 border-b border-white/10 bg-gradient-to-b from-[#121418] via-[#0F1115] to-[#0F1115]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-gradient-to-br from-[#121418] to-[#15181E] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> Calculadora Interactiva de Servicios 2026
              </span>
              <span className="inline-flex items-center gap-1 text-zinc-400 text-xs font-mono uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" /> {AGENCY_INFO.location}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Precios Transparentes en ARS ($)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Diseñá la cotización ideal para tu marca <span className="italic font-serif text-blue-400">en minutos</span>.
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              En <strong className="text-white">LM Studio</strong> transformamos tus proyectos con edición de video profesional, estrategia de community manager, diseño gráfico y desarrollo web. Seleccioná tus servicios o armá tu plan mensual con descuentos automáticos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> Planes Mensuales o Trabajos Puntuales
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> Descuentos por Volumen Automáticos
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> Copiá y Envíalo por Instagram / Email
              </span>
            </div>
          </div>

          <div className="flex lg:flex-col items-center gap-3 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
            <a
              href="#calculadora"
              className="w-full lg:w-48 bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Calcular Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={AGENCY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-48 bg-white/5 hover:bg-white/10 text-zinc-200 font-semibold text-center text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10 uppercase tracking-wider"
            >
              <span>Ver Instagram</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
