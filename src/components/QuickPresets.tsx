import React from 'react';
import { PRESET_PACKAGES, formatARS } from '../data/agencyData';
import { CartItem, PresetPackage } from '../types';
import { Video, Globe, Film, PlusCircle, Check } from 'lucide-react';

interface QuickPresetsProps {
  onAddPreset: (preset: PresetPackage) => void;
  addedPresetIds: string[];
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onAddPreset, addedPresetIds }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Film':
        return <Film className="w-5 h-5 text-blue-400" />;
      default:
        return <Video className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🚀 Packs Pre-Armados en 1 Clic
          </h2>
          <p className="text-xs text-zinc-400">
            Combinaciones frecuentes optimizadas con precios promocionales
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESET_PACKAGES.map((preset) => {
          const isAdded = addedPresetIds.includes(preset.id);

          return (
            <div
              key={preset.id}
              className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                isAdded
                  ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-600/10'
                  : 'bg-[#121418] border-white/10 hover:border-blue-500/50 hover:bg-[#15181E]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                    {getIcon(preset.iconName)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] px-2.5 py-1 rounded bg-blue-600 text-white shadow-sm">
                    {preset.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{preset.name}</h3>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{preset.tagline}</p>

                <div className="space-y-2 mb-4 bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-xs">
                  <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest block mb-1">
                    Incluye:
                  </span>
                  {preset.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between pt-3 border-t border-white/10 mb-4">
                  <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Estimado Pack:</span>
                  <div className="text-right font-mono">
                    {preset.originalPriceEstimate && (
                      <span className="text-xs text-zinc-500 line-through mr-2">
                        {formatARS(preset.originalPriceEstimate)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-blue-400">
                      {formatARS(preset.priceEstimate)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onAddPreset(preset)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Pack Agregado
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" /> Cargar Pack al Carrito
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
