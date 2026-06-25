import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './root-reducers';
import { baseApi } from '@/shared/api';
import { loadCartState } from '@/entities/cart';
import { loadFavoriteState } from '@/entities/favorite';
import { persistListener } from './persist';

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        cart: loadCartState(),
        favorite: loadFavoriteState(),
    },
    middleware: (gdm) =>
        gdm().concat(baseApi.middleware, persistListener.middleware),
});

// Включаем поддержку refetchOnFocus / refetchOnReconnect
setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
