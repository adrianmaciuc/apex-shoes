export type ShoeCategory =
  | "sneakers"
  | "running"
  | "casual"
  | "formal"
  | "boots";

export interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: ShoeCategory;
  images: string[];
  sizes: number[];
  colors: string[];
  description: string;
  features: string[];
  featured: boolean;
  inStock: boolean;
}

export interface CartItem {
  shoe: Shoe;
  size: number;
  color: string;
  quantity: number;
}

export interface CategoryInfo {
  id: ShoeCategory;
  name: string;
  description: string;
  image: string;
}

export interface OrderSummary {
  cartItems: CartItem[];
  subtotal: number;
  voucherDiscount: number;
  appliedVoucher: string | null;
  shipping: number;
  tax: number;
  total: number;
  country: string;
}

export interface PaymentFormData {
  paymentMethod: "card" | "cash";
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface CompletedOrder extends OrderSummary {
  paymentMethod: string;
  orderDate: Date;
  orderId: string;
}
