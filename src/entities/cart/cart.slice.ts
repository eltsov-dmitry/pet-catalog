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
            const item = state.cartItems.find(({ product }) => product.id === action.payload.id);

            if (item) {
                item.quantity += 1;
                return;
            }

            state.cartItems.push({ product: action.payload, quantity: 1 });
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(({ product }) => product.id === action.payload);

            if (!item) {
                return;
            }

            if (item.quantity > 1) {
                item.quantity -= 1;
                return;
            }

            state.cartItems = state.cartItems.filter(({ product }) => product.id !== action.payload);
        },
        removeFromCartById: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(({ product }) => product.id !== action.payload);
        },
    },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const useCartActions = createActionsHook(cartSlice.actions);

export const selectCartItems = (state: RootState) => state.cart.cartItems;
