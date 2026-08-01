import React, { useState, useMemo } from 'react';
import { Film, Video, CheckCircle2, Sparkles, Plus, AlertCircle, Zap } from 'lucide-react';
import { PRICING_CONSTANTS, formatARS } from '../data/agencyData';
import { CartItem } from '../types';

interface VideoEditingCalculatorProps {
  onAddToCart: (item: CartItem) => void;
}

export const VideoEditingCalculator: React.FC<VideoEditingCalculatorProps> = ({ onAddToCart }) => {
  const [videoType, setVideoType] = useState<'reels' | 'long'>('reels');

  // Reel State
  const [reelMode, setReelMode] = useState<'monthly' | 'single'>('monthly');
  const [selectedPlanQty, setSelectedPlanQty] = useState<number>(4); // 4, 8, 12, 16
  const [singleReelCount, setSingleReelCount] = useState<number>(1); // 1, 2, 3
  const [editingLevelReel, setEditingLevelReel] = useState<'standard' | 'pro'>('standard');
  const [needsScriptHelp, setNeedsScriptHelp] = useState<boolean>(false);

  // Long Video State
  const [rawFootageDuration, setRawFootageDuration] = useState<number>(60); // minutes: 30, 60, 120, 180
  const [finalVideoDuration, setFinalVideoDuration] = useState<number>(10); // minutes: 5, 10, 20, 30
  const [longEditingLevel, setLongEditingLevel] = useState<'basic' | 'medium' | 'pro'>('medium');
  const [longVideoFrequency, setLongVideoFrequency] = useState<'single' | 'monthly'>('single');
  const [longVideoCount, setLongVideoCount] = useState<number>(1);

  // REEL CALCULATIONS
  const reelCalculation = useMemo(() => {
    if (reelMode === 'monthly') {
      const plan = PRICING_CONSTANTS.REELS.MONTHLY_PLANS.find(p => p.qty === selectedPlanQty) || PRICING_CONSTANTS.REELS.MONTHLY_PLANS[0];
      let basePrice = plan.price;
      
      if (editingLevelReel === 'pro') {
        basePrice *= 1.25; // 25% extra for Alex Hormozi style
      }
      if (needsScriptHelp) {
        basePrice += 10000;
      }

      return {
        unitPrice: Math.round(basePrice / plan.qty),
        totalPrice: Math.round(basePrice),
        qty: plan.qty,
        title: `Plan Mensual ${plan.qty} Reels (${plan.qty / 4} por semana)`,
        subtitle: `${editingLevelReel === 'pro' ? 'Edición Alex Hormozi Style Pro' : 'Edición Estándar Dinámica'}${needsScriptHelp ? ' + Asesoría en Guión' : ''}`,
        details: [
          `${plan.qty} Videos verticales 9:16 al mes`,
          `Precio promedio por video: ${formatARS(Math.round(basePrice / plan.qty))}`,
          `Ahorro directo vs contrataciones individuales`
        ],
        discountNotice: undefined
      };
    } else {
      // Single reel outside plan
      const unitPrice = PRICING_CONSTANTS.REELS.INDIVIDUAL_UNIT_PRICE; // $18.000 ARS
      let basePrice = unitPrice * singleReelCount;

      if (editingLevelReel === 'pro') {
        basePrice *= 1.25;
      }
      if (needsScriptHelp) {
        basePrice += 10000;
      }

      return {
        unitPrice: Math.round(unitPrice * (editingLevelReel === 'pro' ? 1.25 : 1)),
        totalPrice: Math.round(basePrice),
        qty: singleReelCount,
        title: `${singleReelCount} ${singleReelCount === 1 ? 'Reel / Short Suelto' : 'Reels / Shorts Sueltos'} (Puntual)`,
        subtitle: `Tarifa individual fuera de plan mensual`,
        details: [
          `Video vertical 9:16 puntual`,
          `Edición ${editingLevelReel === 'pro' ? 'Avanzada / Pro' : 'Estándar'}`,
          `Precio por video: ${formatARS(Math.round(unitPrice * (editingLevelReel === 'pro' ? 1.25 : 1)))}`
        ],
        discountNotice: singleReelCount >= 3 ? '💡 Consejo: ¡Con 4 videos te conviene el Plan Mensual por $50.000 ARS!' : undefined
      };
    }
  }, [reelMode, selectedPlanQty, singleReelCount, editingLevelReel, needsScriptHelp]);

  // LONG VIDEO CALCULATIONS
  const longVideoCalculation = useMemo(() => {
    let price = PRICING_CONSTANTS.LONG_VIDEO.BASE_PRICE; // $70,000 for 60m raw / 10m final / medium edit

    // Raw Footage factor
    let rawFactor = 1.0;
    if (rawFootageDuration <= 30) rawFactor = 0.8;
    else if (rawFootageDuration === 60) rawFactor = 1.0;
    else if (rawFootageDuration === 120) rawFactor = 1.4;
    else rawFactor = 1.8;

    // Final Duration factor
    let finalFactor = 1.0;
    if (finalVideoDuration <= 5) finalFactor = 0.85;
    else if (finalVideoDuration === 10) finalFactor = 1.0;
    else if (finalVideoDuration === 20) finalFactor = 1.4;
    else finalFactor = 1.8;

    // Level factor
    let levelFactor = 1.0;
    if (longEditingLevel === 'basic') levelFactor = 0.8;
    else if (longEditingLevel === 'medium') levelFactor = 1.0;
    else levelFactor = 1.5;

    let singleUnitPrice = Math.round(price * rawFactor * finalFactor * levelFactor);
    let total = singleUnitPrice * (longVideoFrequency === 'monthly' ? 4 : longVideoCount);
    let discountAmount = 0;
    let discountNotice = undefined;

    if (longVideoFrequency === 'monthly') {
      discountAmount = Math.round(total * 0.15); // 15% desc for monthly 4-pack
      total = total - discountAmount;
      discountNotice = '¡Descuento de 15% aplicado por paquete mensual de 4 videos!';
    }

    return {
      singleUnitPrice,
      totalPrice: total,
      discountAmount,
      discountNotice,
      title: longVideoFrequency === 'monthly'
        ? `Plan 4 Videos Largos (YouTube / Podcast)`
        : `${longVideoCount} Video${longVideoCount > 1 ? 's' : ''} Largo${longVideoCount > 1 ? 's' : ''} (16:9)`,
      subtitle: `Crudo de ~${rawFootageDuration} min | Final ~${finalVideoDuration} min | Edición ${longEditingLevel === 'basic' ? 'Básica' : longEditingLevel === 'medium' ? 'Media' : 'Avanzada Pro'}`,
      details: [
        `Duración del material crudo: ~${rawFootageDuration} min`,
        `Duración final aproximada: ~${finalVideoDuration} min`,
        `Nivel de edición: ${longEditingLevel === 'basic' ? 'Cortes simples & audio' : longEditingLevel === 'medium' ? 'Ritmo dinámico, b-roll & subtítulos' : 'Motion graphics, color grading & sound design'}`
      ]
    };
  }, [rawFootageDuration, finalVideoDuration, longEditingLevel, longVideoFrequency, longVideoCount]);

  const handleAddReelToCart = () => {
    const item: CartItem = {
      id: `reel-${Date.now()}`,
      category: 'video',
      title: reelCalculation.title,
      subtitle: reelCalculation.subtitle,
      details: reelCalculation.details,
      unitPrice: reelCalculation.unitPrice,
      quantity: reelCalculation.qty,
      totalPrice: reelCalculation.totalPrice,
      discountNotice: reelCalculation.discountNotice,
      metadata: { reelMode, selectedPlanQty, singleReelCount, editingLevelReel }
    };
    onAddToCart(item);
  };

  const handleAddLongVideoToCart = () => {
    const item: CartItem = {
      id: `long-video-${Date.now()}`,
      category: 'video',
      title: longVideoCalculation.title,
      subtitle: longVideoCalculation.subtitle,
      details: longVideoCalculation.details,
      unitPrice: longVideoCalculation.singleUnitPrice,
      quantity: longVideoFrequency === 'monthly' ? 4 : longVideoCount,
      totalPrice: longVideoCalculation.totalPrice,
      discountAmount: longVideoCalculation.discountAmount,
      discountNotice: longVideoCalculation.discountNotice,
      metadata: { rawFootageDuration, finalVideoDuration, longEditingLevel, longVideoFrequency }
    };
    onAddToCart(item);
  };

  return (
    <div className="bg-[#121418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl my-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
            <Film className="w-3.5 h-3.5" /> Edición de Video Profesional
          </span>
          <h3 className="text-2xl font-light italic font-serif text-white">
            Edición de Video
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Reels / Shorts (Semanales o Sueltos) y Videos Largos (YouTube & Podcasts).
          </p>
        </div>

        {/* Video Type Toggle */}
        <div className="flex p-1 bg-black/40 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setVideoType('reels')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              videoType === 'reels'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Reels / Shorts (9:16)</span>
          </button>
          <button
            onClick={() => setVideoType('long')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              videoType === 'long'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Videos Largos (16:9)</span>
          </button>
        </div>
      </div>

      {/* REELS CALCULATOR */}
      {videoType === 'reels' && (
        <div className="space-y-6">
          
          {/* Mode selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setReelMode('monthly')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                reelMode === 'monthly'
                  ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-white">Plan Mensual (Recomendado)</span>
                <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                  Mejor Valor
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Paquetes mensuales de 4, 8, 12 o 16 reels. Precio por video reducido.
              </p>
            </button>

            <button
              onClick={() => setReelMode('single')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                reelMode === 'single'
                  ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-white">Videos Sueltos / Puntual</span>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded-full">
                  Sin Contrato
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Para pedir 1, 2 o 3 videos específicos. Tarifa unitaria estándar fuera de plan.
              </p>
            </button>
          </div>

          {/* Configuration depending on mode */}
          {reelMode === 'monthly' ? (
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Seleccioná tu frecuencia mensual de Reels:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PRICING_CONSTANTS.REELS.MONTHLY_PLANS.map((plan) => (
                  <button
                    key={plan.qty}
                    onClick={() => setSelectedPlanQty(plan.qty)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPlanQty === plan.qty
                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold opacity-80">
                      {plan.qty / 4} video{plan.qty / 4 > 1 ? 's' : ''} / semana
                    </div>
                    <div className="text-xl font-extrabold my-1">
                      {formatARS(plan.price)}
                    </div>
                    <div className="text-[11px] opacity-90">
                      ({formatARS(plan.unitPrice)} por video)
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300">
                  Cantidad de videos sueltos (fuera de plan):
                </label>
                <span className="text-xs text-zinc-400 font-medium">
                  {formatARS(PRICING_CONSTANTS.REELS.INDIVIDUAL_UNIT_PRICE)} c/u
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => setSingleReelCount(count)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                      singleReelCount === count
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {count} Video{count > 1 ? 's' : ''} ({formatARS(PRICING_CONSTANTS.REELS.INDIVIDUAL_UNIT_PRICE * count)})
                  </button>
                ))}
              </div>

              {/* Dynamic suggestion rule requested by user */}
              {singleReelCount >= 2 && (
                <div className="p-3 bg-blue-950/50 border border-blue-800/60 rounded-xl text-xs text-blue-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>💡 Recomendación LM Studio:</strong> Con {singleReelCount * 18000} ARS por {singleReelCount} videos sueltos, ¡por un poco más podés tener el <strong>Plan Mensual de 4 videos por $50.000 ARS</strong> ($12.500 ARS c/u)!
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Level of editing */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Nivel de Edición:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setEditingLevelReel('standard')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  editingLevelReel === 'standard'
                    ? 'bg-blue-950/40 border-blue-500 text-white'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-xs text-white">Edición Dinámica Estándar</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Cortes fluidos, música de tendencia, subtítulos simples y ritmo ágil.
                </div>
              </button>

              <button
                onClick={() => setEditingLevelReel('pro')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  editingLevelReel === 'pro'
                    ? 'bg-blue-950/40 border-blue-500 text-white'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-xs text-white flex items-center justify-between">
                  <span>Alex Hormozi Style / High Retention</span>
                  <span className="text-[10px] text-blue-400 font-semibold">+25%</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Subtítulos animados con emojis, sound design avanzado, b-roll y efectos de impacto.
                </div>
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Cotización Selección:</span>
              <span className="text-2xl font-extrabold text-white">
                {formatARS(reelCalculation.totalPrice)}
              </span>
              <span className="text-xs text-zinc-400 ml-2">
                ({reelCalculation.qty} video{reelCalculation.qty > 1 ? 's' : ''})
              </span>
            </div>

            <button
              onClick={handleAddReelToCart}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar a mi Cotización</span>
            </button>
          </div>

        </div>
      )}

      {/* LONG VIDEO CALCULATOR */}
      {videoType === 'long' && (
        <div className="space-y-6">
          
          <div className="p-3.5 bg-blue-950/30 border border-blue-800/40 rounded-xl text-xs text-zinc-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Benchmark Base:</strong> 1 video de 10 min de duración final, grabado a partir de 1 hora de crudo con edición media = <strong>$70.000 ARS</strong>.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Raw Footage Duration */}
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Material de Crudo (Grabación):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { mins: 30, label: 'Hasta 30 min' },
                  { mins: 60, label: 'Hasta 1 Hora (Base)' },
                  { mins: 120, label: 'Hasta 2 Horas' },
                  { mins: 180, label: '3 Horas o más' }
                ].map((item) => (
                  <button
                    key={item.mins}
                    onClick={() => setRawFootageDuration(item.mins)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      rawFootageDuration === item.mins
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Final Video Duration */}
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Duración del Video Final:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { mins: 5, label: 'Hasta 5 min' },
                  { mins: 10, label: 'Hasta 10 min (Base)' },
                  { mins: 20, label: 'Hasta 20 min' },
                  { mins: 30, label: '30 min o más' }
                ].map((item) => (
                  <button
                    key={item.mins}
                    onClick={() => setFinalVideoDuration(item.mins)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      finalVideoDuration === item.mins
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Complexity Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Complejidad y Estilo de Edición:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'basic', name: 'Básica', desc: 'Cortes limpios, reducción de ruido de audio, títulos simples y logo.' },
                { id: 'medium', name: 'Media (Recomendada)', desc: 'Ritmo dinámico, b-roll de stock, transiciones, placas y subtítulos clave.' },
                { id: 'pro', name: 'Avanzada / Pro', desc: 'Motion graphics 2D/3D, animación de elementos, color grading y sound design pro.' }
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => setLongEditingLevel(level.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    longEditingLevel === level.id
                      ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold text-xs text-white mb-1">{level.name}</div>
                  <div className="text-[11px] text-zinc-400 leading-relaxed">{level.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency & Discount */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-zinc-300 block">Frecuencia o Cantidad:</span>
              <p className="text-xs text-zinc-400">
                ¡Elige un plan mensual de 4 videos al mes para obtener un 15% de descuento!
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setLongVideoFrequency('single')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  longVideoFrequency === 'single'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                Video Puntual ({formatARS(longVideoCalculation.singleUnitPrice)})
              </button>
              <button
                onClick={() => setLongVideoFrequency('monthly')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  longVideoFrequency === 'monthly'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                Plan 4 Videos/Mes (-15% Descuento)
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Cotización Video Largo:</span>
              <span className="text-2xl font-extrabold text-white">
                {formatARS(longVideoCalculation.totalPrice)}
              </span>
              {longVideoCalculation.discountNotice && (
                <span className="block text-[11px] font-bold text-emerald-400 mt-0.5">
                  {longVideoCalculation.discountNotice}
                </span>
              )}
            </div>

            <button
              onClick={handleAddLongVideoToCart}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Video Largo a Cotización</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
