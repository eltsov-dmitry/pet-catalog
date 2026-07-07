import type { RootState } from '@/application/store';
import type { Product } from '@/shared/api/products';
import { createActionsHook } from '@/shared/lib/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteState } from './favorite.types';

const initialState: FavoriteState = {
    favoriteItems: [],
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        removeFromFavoriteById: (state, action: PayloadAction<number>) => {
            state.favoriteItems = state.favoriteItems.filter(
                ({ id }) => id !== action.payload,
            );
        },
        toggleFavorite: (state, action: PayloadAction<Product>) => {
            const favoriteIndex = state.favoriteItems.findIndex(
                ({ id }) => id === action.payload.id,
            );
            if (favoriteIndex === -1) {
                state.favoriteItems.push(action.payload);
            } else {
                state.favoriteItems.splice(favoriteIndex, 1);
            }
        },
    },
});

export const favoriteActions = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
export const useFavoriteActions = createActionsHook(favoriteSlice.actions);

export const selectFavoriteItems = (state: RootState) =>
    state.favorite.favoriteItems;
