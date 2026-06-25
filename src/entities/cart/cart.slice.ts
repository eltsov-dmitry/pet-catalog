import type { RootState } from '@/application/store';
import type { Product } from '@/shared/api/products';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    items: Product[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
        },
        removeFromCartById: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(({ id }) => id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCartById } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const cartItems = (state: RootState) => state.cart.items;
