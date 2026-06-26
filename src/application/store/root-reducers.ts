import { cartReducer } from '@/entities/cart';
import { favoriteReducer } from '@/entities/favorite';
import { filtersReducer } from '@/entities/filters';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    cart: cartReducer,
    favorite: favoriteReducer,
    filters: filtersReducer,
    // Редьюсер базового API-слайса RTK Query
    [baseApi.reducerPath]: baseApi.reducer,
});
