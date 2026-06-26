import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UiState } from './ui.types';
import { createActionsHook } from '@/shared/lib/store';
import type { RootState } from '@/application/store';

const initialState: UiState = {
    view: 'grid',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<UiState['view']>) => {
            state.view = action.payload;
        },
    },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
export const useUiActions = createActionsHook(uiSlice.actions);

export const selectUiView = (state: RootState) => state.ui.view;
