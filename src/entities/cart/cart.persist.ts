import { storage } from '@/shared/lib/storage';
import { STORAGE_KEYS } from '@/shared/config';
import type { CartItem, CartState } from './cart.types';

export const loadCartState = (): CartState => ({
    cartItems: storage.get<CartItem[]>(STORAGE_KEYS.cart) ?? [],
});
