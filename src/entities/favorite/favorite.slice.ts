import type { RootState } from '@/application/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteItem {
    id: number;
    name: string;
}

interface FavoriteState {
    items: FavoriteItem[];
}

const initialState: FavoriteState = {
    items: [],
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            state.items.push(action.payload);
        },
        removeById: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(({ id }) => id !== action.payload);
        },
    },
});

export const { addToFavorite, removeById } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;

export const favoriteItems = (state: RootState) => state.favorite.items;
