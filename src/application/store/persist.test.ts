import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, expect, test, vi } from 'vitest';
import { cartActions, loadCartState } from '@/entities/cart';
import { favoriteActions } from '@/entities/favorite';
import { uiActions } from '@/entities/ui';
import { STORAGE_KEYS } from '@/shared/config';
import { makeProduct } from '@/shared/lib/testing/make-product';
import { persistListener } from './persist';
import { rootReducer } from './root-reducers';

const createTestStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistListener.middleware),
    });

beforeEach(() => localStorage.clear());

test('корзина сохраняется в localStorage', async () => {
    const store = createTestStore();

    store.dispatch(cartActions.addToCart(makeProduct({ id: 11 })));

    await vi.waitFor(() => {
        expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) ?? '[]')).toHaveLength(1);
    });
});

test('избранное и режим отображения сохраняются', async () => {
    const store = createTestStore();

    store.dispatch(favoriteActions.toggleFavorite(makeProduct({ id: 12 })));
    store.dispatch(uiActions.setView('list'));

    await vi.waitFor(() => {
        expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorite) ?? '[]')).toHaveLength(1);
        expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.view) ?? '""')).toBe('list');
    });
});

test('сохранённая корзина читается обратно', async () => {
    const store = createTestStore();
    store.dispatch(cartActions.addToCart(makeProduct({ id: 13, title: 'Стул' })));

    await vi.waitFor(() => expect(localStorage.getItem(STORAGE_KEYS.cart)).not.toBeNull());

    expect(loadCartState().cartItems.map(({ product }) => product.title)).toEqual(['Стул']);
});

test('пустое хранилище даёт пустую корзину', () => {
    expect(loadCartState()).toEqual({ cartItems: [] });
});
