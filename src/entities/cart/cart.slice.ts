import type { RootState } from '@/application/store';
import type { Product } from '@/shared/api/products';
import { createActionsHook } from '@/shared/lib/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from './cart.types';

const initialState: CartState = { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cartItems.push(action.payload);
        },
        removeFromCartById: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(({ id }) => id !== action.payload);
        },
    },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const useCartActions = createActionsHook(cartSlice.actions);

export const selectCartItems = (state: RootState) => state.cart.cartItems;
