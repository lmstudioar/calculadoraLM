import React, { useState } from 'react';
import { Share2, CheckCircle2, Plus, Users, Calendar, MessageSquare } from 'lucide-react';
import { PRICING_CONSTANTS, formatARS } from '../data/agencyData';
import { CartItem } from '../types';

interface CommunityManagerCalculatorProps {
  onAddToCart: (item: CartItem) => void;
}

export const CommunityManagerCalculator: React.FC<CommunityManagerCalculatorProps> = ({ onAddToCart }) => {
  const [selectedPlan, setSelectedPlan] = useState<'inicial' | 'pro' | 'full'>('pro');

  const plans = [
    {
      id: 'inicial',
      name: 'Plan Inicial Social',
      price: PRICING_CONSTANTS.COMMUNITY_MANAGER.PLAN_INICIAL,
      tagline: 'Para negocios que necesitan mantener presencia constante en 1 red social principal.',
      details: [
        'Gestión de 1 Red Social (Instagram o TikTok)',
        '3 Publicaciones por semana (Feed/Reels)',
        'Calendarización mensual de contenidos',
        'Redacción de copys estratégicos y hashtags'
      ]
    },
    {
      id: 'pro',
      name: 'Plan Crecimiento Pro',
      price: PRICING_CONSTANTS.COMMUNITY_MANAGER.PLAN_PRO,
      tagline: 'Ideal para pymes y creadores que buscan interactuar y hacer crecer su comunidad.',
      popular: true,
      details: [
        'Gestión de 2 Redes Sociales (Instagram + Facebook/TikTok)',
        '4 Publicaciones semanales + Stories periódicas',
        'Moderación de comentarios y respuestas a DMs',
        'Informe de rendimiento y métricas mensual'
      ]
    },
    {
      id: 'full',
      name: 'Plan Full Management 360°',
      price: PRICING_CONSTANTS.COMMUNITY_MANAGER.PLAN_FULL,
      tagline: 'Estrategia integral completa de contenidos, atención y campañas para marcas líderes.',
      details: [
        'Gestión integral en hasta 3 canales',
        'Publicaciones e historias diarias',
        'Gestión directa de comunidad e interacción proactiva',
        'Estrategia de lanzamientos, sorteos y colaboraciones'
      ]
    }
  ];

  const handleAddPlanToCart = (planObj: typeof plans[0]) => {
    const item: CartItem = {
      id: `cm-${planObj.id}-${Date.now()}`,
      category: 'community',
      title: `Community Manager: ${planObj.name}`,
      subtitle: `Gestión mensual de redes sociales en Buenos Aires`,
      details: planObj.details,
      unitPrice: planObj.price,
      quantity: 1,
      totalPrice: planObj.price,
      metadata: { planId: planObj.id }
    };
    onAddToCart(item);
  };

  return (
    <div className="bg-[#121418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl my-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
          <Share2 className="w-3.5 h-3.5" /> Community Manager & Estrategia Social
        </span>
        <h3 className="text-2xl font-light italic font-serif text-white">
          Community Manager (Planes Mensuales)
        </h3>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Planes a medida según cantidad de posteos, moderación y estrategias de crecimiento requeridas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col justify-between p-6 rounded-2xl border transition-all ${
              plan.popular
                ? 'bg-blue-600/10 border-blue-500 shadow-xl shadow-blue-600/10'
                : 'bg-gradient-to-br from-[#0F1115] to-[#15181E] border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              {plan.popular && (
                <span className="absolute -top-3 right-4 text-[9px] uppercase font-bold tracking-widest px-3 py-0.5 rounded bg-blue-600 text-white shadow-md font-mono">
                  Más Elegido
                </span>
              )}

              <h4 className="text-lg font-bold text-white mb-1">{plan.name}</h4>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{plan.tagline}</p>

              <div className="text-3xl font-bold font-mono text-blue-400 mb-4">
                {formatARS(plan.price)}
                <span className="text-xs text-zinc-400 font-normal font-sans"> / mes</span>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-300 border-t border-white/10 pt-4 mb-6">
                {plan.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleAddPlanToCart(plan)}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Agregar {plan.name}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
