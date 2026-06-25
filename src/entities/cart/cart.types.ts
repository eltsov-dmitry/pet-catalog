import type { Product } from '@/shared/api/products';

export interface CartState {
    cartItems: Product[];
}
