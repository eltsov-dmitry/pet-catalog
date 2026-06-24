import type { RootState } from '@/application/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    name: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeById: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(({ id }) => id !== action.payload);
        },
    },
});

export const { addToCart, removeById } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const cartItems = (state: RootState) => state.cart.items;
