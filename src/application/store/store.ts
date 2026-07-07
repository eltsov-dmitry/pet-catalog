import { configureStore, type ListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './root-reducers';
import { baseApi } from '@/shared/api';
import { loadCartState } from '@/entities/cart';
import { loadFavoriteState } from '@/entities/favorite';
import { persistListener } from './persist';
import { loadUiState } from '@/entities/ui';

const customMiddleware: ListenerMiddleware = (store) => {
    console.log('1', store.getState());

    return (next) => {
        console.log('2');
        return (action) => {
            console.log('action', action);
            const result = next(action);
            console.log('next state', store.getState());
            return result;
        };
    };
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        cart: loadCartState(),
        favorite: loadFavoriteState(),
        ui: loadUiState(),
    },
    middleware: (gdm) =>
        gdm().concat(
            baseApi.middleware,
            persistListener.middleware,
            customMiddleware,
        ),
});

// Включаем поддержку refetchOnFocus / refetchOnReconnect
setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
