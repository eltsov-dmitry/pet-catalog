import { cartReducer } from '@/entities/cart';
import { favoriteReducer } from '@/entities/favorite';
import { uiReducer } from '@/entities/ui';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    cart: cartReducer,
    favorite: favoriteReducer,
    ui: uiReducer,
    // Редьюсер базового API-слайса RTK Query
    [baseApi.reducerPath]: baseApi.reducer,
});
