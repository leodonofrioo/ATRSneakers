export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  category: 'lavagem' | 'protecao' | 'renovacao' | 'reconstrucao';
}

export interface CartItem {
  service: Service;
  quantity: number;
  turboEnabled: boolean;
}

export interface DeliveryInfo {
  type: 'pickup' | 'delivery';
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface PaymentInfo {
  method: 'pix' | 'link';
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  payment: PaymentInfo;
}