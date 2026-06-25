import type { RootState } from '@/application/store';
import type { Product } from '@/shared/api/products';
import { createActionsHook } from '@/shared/lib/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
    favoriteItems: Product[];
}

const initialState: FavoriteState = {
    favoriteItems: [],
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<Product>) => {
            state.favoriteItems.push(action.payload);
        },
        removeById: (state, action: PayloadAction<number>) => {
            state.favoriteItems = state.favoriteItems.filter(
                ({ id }) => id !== action.payload,
            );
        },
    },
});

export const favoriteReducer = favoriteSlice.reducer;
export const useFavoriteActions = createActionsHook(favoriteSlice.actions);

export const selectFavoriteItems = (state: RootState) =>
    state.favorite.favoriteItems;
