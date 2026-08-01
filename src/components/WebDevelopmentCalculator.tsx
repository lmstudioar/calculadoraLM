import React, { useState } from 'react';
import { Globe, Code2, CheckCircle2, Plus, Server, Layout } from 'lucide-react';
import { PRICING_CONSTANTS, formatARS } from '../data/agencyData';
import { CartItem } from '../types';

interface WebDevelopmentCalculatorProps {
  onAddToCart: (item: CartItem) => void;
}

export const WebDevelopmentCalculator: React.FC<WebDevelopmentCalculatorProps> = ({ onAddToCart }) => {
  const [includeCMS, setIncludeCMS] = useState<boolean>(false);
  const [includeEcommerce, setIncludeEcommerce] = useState<boolean>(false);
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(false);

  const basePrice = PRICING_CONSTANTS.WEB_DEV.BASE_WEBSITE_PRICE; // $100.000 ARS
  const cmsExtra = 25000;
  const ecommerceExtra = 40000;
  const maintenanceExtra = 20000;

  const totalPrice = basePrice + (includeCMS ? cmsExtra : 0) + (includeEcommerce ? ecommerceExtra : 0) + (includeMaintenance ? maintenanceExtra : 0);

  const handleAddWebsiteToCart = () => {
    const details = [
      'Desarrollo 100% Adaptativo a Móviles y Computadoras',
      'Optimizada para alta velocidad de carga y posicionamiento SEO básico',
      'Botón flotante directo a WhatsApp, Instagram y Correo corporativo',
      'Compatibilidad para ser alojada en GitHub Pages (Sin costo) o servidor propio'
    ];

    if (includeCMS) details.push('Panel Autoadministrable para actualizar contenidos (+ $25.000 ARS)');
    if (includeEcommerce) details.push('Módulo de Catálogo / E-commerce básico (+ $40.000 ARS)');
    if (includeMaintenance) details.push('Soporte y mantenimiento técnico mensual (+ $20.000 ARS/mes)');

    const item: CartItem = {
      id: `web-${Date.now()}`,
      category: 'web',
      title: 'Página Web Corporativa / Landing Page',
      subtitle: 'Diseño exclusivo en código moderno ultra rápido',
      details,
      unitPrice: totalPrice,
      quantity: 1,
      totalPrice,
      metadata: { includeCMS, includeEcommerce, includeMaintenance }
    };
    onAddToCart(item);
  };

  return (
    <div className="bg-[#121418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl my-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
          <Code2 className="w-3.5 h-3.5" /> Programación & Desarrollo Web
        </span>
        <h3 className="text-2xl font-light italic font-serif text-white">
          Desarrollo Web (Full)
        </h3>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Sitios corporativos, landing pages y soluciones en código moderno ($100.000 ARS base).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Base Website Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#0F1115] to-[#15181E] p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Desarrollo Web (Base)
            </span>
            <span className="text-[10px] font-mono font-bold bg-blue-600 text-white px-3 py-1 rounded">
              $100.000 ARS
            </span>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-white">Página Web Profesional</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Desarrollada en React / HTML5 adaptado para correr en plataformas libres como GitHub Pages o servidores tradicionales.
            </p>
          </div>

          <div className="text-3xl font-bold font-mono text-blue-400">
            {formatARS(basePrice)}
          </div>

          <div className="space-y-2.5 pt-2 text-xs text-zinc-300 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Diseño 100% responsivo para celulares, tablets y desktop</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Integración de enlaces directos a Instagram, Twitter y Correo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Carga instantánea optimizada para SEO básico</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Compatible con GitHub Pages versión gratuita</span>
            </div>
          </div>
        </div>

        {/* Optional Add-ons */}
        <div className="lg:col-span-5 bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
              Módulos Opcionales:
            </span>

            <div className="space-y-3">
              
              {/* CMS Checkbox */}
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                includeCMS ? 'bg-blue-950/40 border-blue-500' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <input
                  type="checkbox"
                  checked={includeCMS}
                  onChange={(e) => setIncludeCMS(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Panel Autoadministrable (CMS)</span>
                    <span className="text-blue-400 font-extrabold">+ {formatARS(cmsExtra)}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Para editar textos, subir imágenes o artículos sin saber programar.
                  </p>
                </div>
              </label>

              {/* E-Commerce Checkbox */}
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                includeEcommerce ? 'bg-blue-950/40 border-blue-500' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <input
                  type="checkbox"
                  checked={includeEcommerce}
                  onChange={(e) => setIncludeEcommerce(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Catálogo / E-commerce</span>
                    <span className="text-blue-400 font-extrabold">+ {formatARS(ecommerceExtra)}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Módulo para exhibir productos con precios y carrito con envío a WhatsApp.
                  </p>
                </div>
              </label>

              {/* Maintenance Checkbox */}
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                includeMaintenance ? 'bg-blue-950/40 border-blue-500' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <input
                  type="checkbox"
                  checked={includeMaintenance}
                  onChange={(e) => setIncludeMaintenance(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Mantenimiento Mensual</span>
                    <span className="text-blue-400 font-extrabold">+ {formatARS(maintenanceExtra)}/mes</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Actualizaciones continuas, copias de seguridad y soporte técnico prioritario.
                  </p>
                </div>
              </label>

            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-400 font-medium">Cotización Total Web:</span>
              <span className="text-2xl font-black text-white">
                {formatARS(totalPrice)}
              </span>
            </div>

            <button
              onClick={handleAddWebsiteToCart}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Página Web por {formatARS(totalPrice)}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
