import { cartReducer } from '@/entities/cart';
import { favoriteReducer } from '@/entities/favorite';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    cart: cartReducer,
    favorite: favoriteReducer,
});
