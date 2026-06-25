import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { favoriteActions } from '@/entities/favorite';
import { cartActions } from '@/entities/cart';
import type { RootState } from './store';
import { storage } from '@/shared/lib/storage';
import { STORAGE_KEYS } from '@/shared/config';

export const persistListener = createListenerMiddleware();

persistListener.startListening({
    matcher: isAnyOf(
        favoriteActions.addToFavorite,
        favoriteActions.removeFromFavoriteById,
        cartActions.addToCart,
        cartActions.removeFromCartById,
    ),
    effect: (_action, api) => {
        const state = api.getState() as RootState;
        storage.set(STORAGE_KEYS.favorite, state.favorite.favoriteItems);
        storage.set(STORAGE_KEYS.cart, state.cart.cartItems);
    },
});
