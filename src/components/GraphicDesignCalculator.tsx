import React, { useState, useMemo } from 'react';
import { Palette, Layers, Plus, Sparkles, Check, CheckCircle2, Sliders } from 'lucide-react';
import { PRICING_CONSTANTS, formatARS } from '../data/agencyData';
import { CartItem } from '../types';

interface GraphicDesignCalculatorProps {
  onAddToCart: (item: CartItem) => void;
}

export const GraphicDesignCalculator: React.FC<GraphicDesignCalculatorProps> = ({ onAddToCart }) => {
  // Logo state
  const [logoOption, setLogoOption] = useState<boolean>(true);

  // Template Slider state
  const [templateCount, setTemplateCount] = useState<number>(6); // Default starting at 6 so user sees discount active, but can slide 1-20
  const [templateType, setTemplateType] = useState<'editable' | 'final'>('editable'); // Canva/PSD vs Final PNG
  const [selectedFormat, setSelectedFormat] = useState<string>('ig-feed-story');

  // TEMPLATES CALCULATION LOGIC ACCORDING TO SPEC
  const templateCalculation = useMemo(() => {
    const baseUnitPrice = PRICING_CONSTANTS.GRAPHIC_DESIGN.TEMPLATE_BASE_PRICE; // $8.000 ARS
    const discountUnitPrice = PRICING_CONSTANTS.GRAPHIC_DESIGN.TEMPLATE_DISCOUNT_PRICE; // $7.000 ARS
    const threshold = PRICING_CONSTANTS.GRAPHIC_DESIGN.TEMPLATE_DISCOUNT_THRESHOLD; // 6 plantillas

    const isDiscountActive = templateCount >= threshold;
    const effectiveUnitPrice = isDiscountActive ? discountUnitPrice : baseUnitPrice;
    const totalPrice = templateCount * effectiveUnitPrice;

    const originalPrice = templateCount * baseUnitPrice;
    const discountAmount = isDiscountActive ? (originalPrice - totalPrice) : 0;

    const itemsNeededForDiscount = Math.max(0, threshold - templateCount);

    return {
      templateCount,
      effectiveUnitPrice,
      totalPrice,
      originalPrice,
      discountAmount,
      isDiscountActive,
      itemsNeededForDiscount,
      discountNotice: isDiscountActive
        ? `¡Descuento aplicado! $7.000 ARS c/u por alcanzar ${threshold} o más plantillas (Ahorrás ${formatARS(discountAmount)})`
        : undefined
    };
  }, [templateCount]);

  const handleAddLogoToCart = () => {
    const item: CartItem = {
      id: `logo-${Date.now()}`,
      category: 'design',
      title: 'Diseño de Logo & Identidad Visual',
      subtitle: 'Diseño vectorial completo de isotipo/logotipo',
      details: [
        'Entrega en formatos vectoriales AI, SVG, PDF, PNG sin fondo',
        'Definición de paleta de colores de marca y tipografías corporativas',
        'Derechos comerciales de uso'
      ],
      unitPrice: PRICING_CONSTANTS.GRAPHIC_DESIGN.LOGO_PRICE,
      quantity: 1,
      totalPrice: PRICING_CONSTANTS.GRAPHIC_DESIGN.LOGO_PRICE,
      metadata: { type: 'logo' }
    };
    onAddToCart(item);
  };

  const handleAddTemplatesToCart = () => {
    const formatLabel = selectedFormat === 'ig-feed-story'
      ? 'Feed & Stories de Instagram'
      : selectedFormat === 'stories'
      ? 'Stories & Coberturas Verticales'
      : 'Banners Web & Redes';

    const typeLabel = templateType === 'editable'
      ? 'Editables en Canva / Photoshop'
      : 'Diseños Finales Exportados (PNG/JPG)';

    const item: CartItem = {
      id: `templates-${Date.now()}`,
      category: 'design',
      title: `${templateCount} Plantillas para Redes Sociales`,
      subtitle: `${formatLabel} • ${typeLabel}`,
      details: [
        `Cantidad: ${templateCount} plantillas`,
        `Precio por plantilla: ${formatARS(templateCalculation.effectiveUnitPrice)}`,
        `Adaptadas a la estética y paleta de la marca`
      ],
      unitPrice: templateCalculation.effectiveUnitPrice,
      quantity: templateCount,
      totalPrice: templateCalculation.totalPrice,
      discountAmount: templateCalculation.discountAmount,
      discountNotice: templateCalculation.discountNotice,
      metadata: { templateCount, templateType, selectedFormat }
    };
    onAddToCart(item);
  };

  return (
    <div className="bg-[#121418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl my-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
          <Palette className="w-3.5 h-3.5" /> Diseño Gráfico & Branding
        </span>
        <h3 className="text-2xl font-light italic font-serif text-white">
          Diseño Gráfico & Plantillas
        </h3>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Identidad visual / Logo $40.000 ARS y plantillas adaptables para redes con descuento automático.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LOGO DESIGN CARD (FIXED $40,000 ARS) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0F1115] to-[#15181E] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500">
                Diseño de Logo
              </span>
              <span className="text-[10px] bg-white/5 text-zinc-300 font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-white/10">
                Precio Fijo
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">
              Identidad Visual / Logo
            </h4>

            <div className="text-3xl font-bold font-mono text-blue-400 mb-4">
              {formatARS(PRICING_CONSTANTS.GRAPHIC_DESIGN.LOGO_PRICE)}
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-300 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Vectorial en AI, SVG, PDF e imágenes HD</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Paleta de colores oficial & guía tipográfica</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Variantes para fondo claro y oscuro</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Revisión y ajustes colaborativos</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleAddLogoToCart}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Logo por $40.000 ARS</span>
          </button>
        </div>

        {/* TEMPLATES SLIDER CARD WITH DYNAMIC DISCOUNT MESSAGE */}
        <div className="lg:col-span-7 bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Plantillas para Redes
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                Tarifa base: {formatARS(PRICING_CONSTANTS.GRAPHIC_DESIGN.TEMPLATE_BASE_PRICE)} c/u
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-1">
              Plantillas Editables o Diseños Finales
            </h4>
            <p className="text-xs text-zinc-400 mb-6">
              Mové el slider para elegir la cantidad. A partir de 6 plantillas el precio baja a $7.000 ARS c/u.
            </p>

            {/* DYNAMIC DISCOUNT PROMPT BANNER (as specifically requested!) */}
            <div
              className={`p-4 rounded-xl border text-xs transition-all mb-6 ${
                templateCalculation.isDiscountActive
                  ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300'
                  : 'bg-blue-950/40 border-blue-600/60 text-blue-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${templateCalculation.isDiscountActive ? 'text-emerald-400' : 'text-blue-400'}`} />
                <div>
                  {templateCalculation.isDiscountActive ? (
                    <div>
                      <strong className="text-white block font-bold text-sm mb-0.5">
                        🎉 ¡DESCUENTO ACTIVADO POR 6+ PLANTILLAS!
                      </strong>
                      <span>
                        Pasaste de $8.000 a <strong>$7.000 ARS por plantilla</strong>. Estás ahorrando{' '}
                        <strong>{formatARS(templateCalculation.discountAmount)}</strong> en esta selección.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong className="text-white block font-bold text-sm mb-0.5">
                        💡 Mensaje de Promoción:
                      </strong>
                      <span>
                        Estás a <strong>{templateCalculation.itemsNeededForDiscount}</strong> {templateCalculation.itemsNeededForDiscount === 1 ? 'plantilla' : 'plantillas'} para desbloquear el precio promocional de <strong>$7.000 ARS cada una</strong> (Ahorrás $6.000 en total al llegar a 6).
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SLIDER CONTROLLER */}
            <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> Cantidad de Plantillas:
                </span>
                <span className="text-lg font-black text-white px-3 py-0.5 bg-blue-600 rounded-lg">
                  {templateCount} {templateCount === 1 ? 'Plantilla' : 'Plantillas'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={templateCount}
                onChange={(e) => setTemplateCount(parseInt(e.target.value))}
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />

              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>1 ($8k c/u)</span>
                <span className={`font-bold ${templateCount >= 6 ? 'text-emerald-400 font-extrabold' : 'text-blue-400'}`}>
                  6 ($7k c/u PROMO)
                </span>
                <span>20 ($7k c/u)</span>
              </div>
            </div>

            {/* OPTIONS FOR FORMAT AND EDITABILITY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Tipo de Entregables:
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setTemplateType('editable')}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      templateType === 'editable'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Editables en Canva / Photoshop
                  </button>
                  <button
                    onClick={() => setTemplateType('final')}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      templateType === 'final'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Diseños Finales Exportados (PNG)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Formato Principal:
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg p-2.5 focus:border-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="ig-feed-story">Posts Feed Instagram & Stories</option>
                  <option value="stories">Solo Stories & Cobertura Vertical</option>
                  <option value="banners">Banners Web & Banners LinkedIn</option>
                </select>
              </div>
            </div>

          </div>

          {/* Action Footer for Templates */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Cotización Plantillas:</span>
              <div className="flex items-baseline gap-2">
                {templateCalculation.isDiscountActive && (
                  <span className="text-xs text-zinc-500 line-through font-semibold">
                    {formatARS(templateCalculation.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-extrabold text-white">
                  {formatARS(templateCalculation.totalPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddTemplatesToCart}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar {templateCount} Plantillas</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
