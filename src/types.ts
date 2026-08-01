export type ServiceCategory = 'video' | 'design' | 'web' | 'community';

export interface CartItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle?: string;
  details: string[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  discountAmount?: number;
  discountNotice?: string;
  metadata?: Record<string, any>;
}

export interface PresetPackage {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  priceEstimate: number;
  originalPriceEstimate?: number;
  iconName: string;
  items: Omit<CartItem, 'id'>[];
}

export interface AgencyInfo {
  name: string;
  location: string;
  instagram: string;
  instagramUrl: string;
  twitter: string;
  twitterUrl: string;
  email: string;
  whatsappPlaceholder?: string;
}
