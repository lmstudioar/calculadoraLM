import { AgencyInfo, PresetPackage } from '../types';

export const AGENCY_INFO: AgencyInfo = {
  name: 'LM Studio',
  location: 'Buenos Aires, Argentina',
  instagram: '@lmstudio.ar',
  instagramUrl: 'https://instagram.com/lmstudio.ar',
  twitter: '@LMstudioEN',
  twitterUrl: 'https://x.com/LMstudioEN',
  email: 'lmstudio.ar@gmail.com',
};

export const PRICING_CONSTANTS = {
  REELS: {
    INDIVIDUAL_UNIT_PRICE: 18000, // $18.000 ARS por video suelto fuera de plan
    MONTHLY_PLANS: [
      { qty: 4, name: 'Plan 1 Reel / semana (4/mes)', price: 50000, unitPrice: 12500 },
      { qty: 8, name: 'Plan 2 Reels / semana (8/mes)', price: 90000, unitPrice: 11250 },
      { qty: 12, name: 'Plan 3 Reels / semana (12/mes)', price: 125000, unitPrice: 10416 },
      { qty: 16, name: 'Plan 4 Reels / semana (16/mes)', price: 150000, unitPrice: 9375 },
    ],
  },
  LONG_VIDEO: {
    BASE_PRICE: 70000, // $70.000 ARS para 1 video 10min final / 1h crudo / edición media
  },
  GRAPHIC_DESIGN: {
    LOGO_PRICE: 40000, // $40.000 ARS
    TEMPLATE_BASE_PRICE: 8000, // $8.000 ARS
    TEMPLATE_DISCOUNT_PRICE: 7000, // $7.000 ARS a partir de 6 plantillas
    TEMPLATE_DISCOUNT_THRESHOLD: 6, // 6 plantillas
  },
  WEB_DEV: {
    BASE_WEBSITE_PRICE: 100000, // $100.000 ARS
  },
  COMMUNITY_MANAGER: {
    PLAN_INICIAL: 60000,
    PLAN_PRO: 100000,
    PLAN_FULL: 150000,
  }
};

export const PRESET_PACKAGES: PresetPackage[] = [
  {
    id: 'pack-creador-reels',
    name: 'Pack Creador Social',
    tagline: 'Ideal para la presencia semanal constante en Reels, TikTok y YouTube Shorts.',
    badge: 'Más Popular',
    iconName: 'Video',
    priceEstimate: 92000,
    originalPriceEstimate: 98000,
    items: [
      {
        category: 'video',
        title: 'Plan Mensual 4 Reels / Shorts (1 por semana)',
        subtitle: 'Edición dinámica optimizada para retención',
        details: ['4 Videos verticales 9:16', 'Subtítulos e íconos dinámicos', 'Audio limpio y efectos'],
        unitPrice: 12500,
        quantity: 1,
        totalPrice: 50000,
        metadata: { type: 'reel-monthly', qty: 4 }
      },
      {
        category: 'design',
        title: '6 Plantillas para Redes (Editables Canva/PSD)',
        subtitle: 'Con descuento promocional activado por 6 unidades ($7.000 c/u)',
        details: ['Formatos Post & Stories', 'Editables en Canva / Photoshop', 'Paleta y tipografías de marca'],
        unitPrice: 7000,
        quantity: 6,
        totalPrice: 42000,
        discountAmount: 6000,
        discountNotice: '¡Descuento aplicado! ($7.000 c/u por alcanzar 6 plantillas)',
        metadata: { type: 'templates', qty: 6 }
      }
    ]
  },
  {
    id: 'pack-marca-completa',
    name: 'Pack Identidad + Web + Redes',
    tagline: 'Todo lo que necesita una marca o negocio en Buenos Aires para lanzar con todo.',
    badge: 'Solución Integral',
    iconName: 'Globe',
    priceEstimate: 182000,
    originalPriceEstimate: 188000,
    items: [
      {
        category: 'design',
        title: 'Diseño de Logo & Identidad Visual',
        subtitle: 'Vectorial completo, isotipo y manual básico',
        details: ['Entrega de archivos en AI/SVG/PNG', 'Paleta de colores y fuentes'],
        unitPrice: 40000,
        quantity: 1,
        totalPrice: 40000,
        metadata: { type: 'logo' }
      },
      {
        category: 'design',
        title: '6 Plantillas para Redes (Promocional)',
        subtitle: 'Diseños listos con tu nueva marca',
        details: ['6 Plantillas editables $7.000 c/u'],
        unitPrice: 7000,
        quantity: 6,
        totalPrice: 42000,
        discountAmount: 6000,
        discountNotice: 'Descuento $1.000 por plantilla',
        metadata: { type: 'templates', qty: 6 }
      },
      {
        category: 'web',
        title: 'Página Web / Landing Page Corporativa',
        subtitle: 'Diseño responsive rápido adaptado a GitHub Pages o Servidor propio',
        details: ['100% Adaptada a móviles', 'Botones directos a WhatsApp/Redes', 'SEO On-Page básico'],
        unitPrice: 100000,
        quantity: 1,
        totalPrice: 100000,
        metadata: { type: 'website' }
      }
    ]
  },
  {
    id: 'pack-youtube-master',
    name: 'Pack YouTube & Podcast',
    tagline: 'Ideal para canales de contenido largo, entrevistas y videos educativos.',
    badge: 'Edición Pro',
    iconName: 'Film',
    priceEstimate: 238000,
    originalPriceEstimate: 280000,
    items: [
      {
        category: 'video',
        title: '4 Videos Largos (10 min final / 1h crudo)',
        subtitle: 'Edición media con ritmo dinámico y placas',
        details: ['4 Ediciones de videos largos', 'Cortes de muletillas, b-roll y subtítulos clave'],
        unitPrice: 59500,
        quantity: 4,
        totalPrice: 238000,
        discountAmount: 42000,
        discountNotice: 'Descuento 15% por paquete mensual de 4 videos',
        metadata: { type: 'long-video-plan' }
      }
    ]
  }
];

export function formatARS(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateQuoteText(cartItems: any[], totalPrice: number): string {
  const dateStr = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  let text = `📌 COTIZACIÓN DE SERVICIOS - LM STUDIO\n`;
  text += `📅 Fecha: ${dateStr}\n`;
  text += `📍 Buenos Aires, Argentina\n`;
  text += `📧 Contacto: ${AGENCY_INFO.email}\n`;
  text += `----------------------------------------------\n\n`;
  text += `📋 DETALLE DE SERVICIOS SOLICITADOS:\n\n`;

  cartItems.forEach((item, index) => {
    text += `${index + 1}. ${item.title}\n`;
    if (item.subtitle) text += `   • ${item.subtitle}\n`;
    if (item.quantity > 1) {
      text += `   • Cantidad: ${item.quantity}\n`;
    }
    text += `   • Precio: ${formatARS(item.totalPrice)}\n`;
    if (item.discountNotice) {
      text += `   • (${item.discountNotice})\n`;
    }
    text += `\n`;
  });

  text += `----------------------------------------------\n`;
  text += `💰 COTIZACIÓN TOTAL ESTIMADA: ${formatARS(totalPrice)}\n`;
  text += `----------------------------------------------\n\n`;
  text += `Hola equipo de LM Studio (@lmstudio.ar)! 👋\n`;
  text += `Armé esta cotización personalizada en su sitio web y me gustaría ponerme en contacto para coordinar los detalles y arrancar el proyecto.\n\n`;
  text += `¡Quedo a la espera de su respuesta!`;

  return text;
}
