import type { Product } from '@/shared/api/products';
import type { CartState } from './cart.types';
import { storage } from '@/shared/lib/storage';
import { STORAGE_KEYS } from '@/shared/config';

export const loadCartState = (): CartState => ({
    cartItems: storage.get<Product[]>(STORAGE_KEYS.cart) ?? [],
});
