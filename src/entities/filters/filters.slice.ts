import type { RootState } from '@/application/store';
import { createActionsHook } from '@/shared/lib/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FiltersState } from './filters.types';

const initialState: FiltersState = {
    search: '',
    category: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.category = '';
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
            state.search = '';
        },
        resetFilters: (state) => {
            state.category = '';
            state.search = '';
        },
    },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
export const useFiltersActions = createActionsHook(filtersSlice.actions);

export const selectFiltersSearch = (state: RootState) => state.filters.search;
export const selectFiltersCategory = (state: RootState) =>
    state.filters.category;
