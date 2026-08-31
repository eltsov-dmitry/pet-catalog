import type { Product } from '@/shared/api/products';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
}
