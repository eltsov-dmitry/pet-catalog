import { describe, expect, test } from 'vitest';
import { makeProduct } from '@/shared/lib/testing/make-product';
import { cartActions, cartReducer } from './cart.slice';
import type { CartState } from './cart.types';

const empty: CartState = { cartItems: [] };
const withItem = (id: number, quantity: number): CartState => ({
    cartItems: [{ product: makeProduct({ id }), quantity }],
});

describe('корзина', () => {
    test('товар добавляется с количеством один', () => {
        const state = cartReducer(empty, cartActions.addToCart(makeProduct({ id: 7 })));

        expect(state.cartItems).toEqual([expect.objectContaining({ quantity: 1 })]);
    });

    test('повторное добавление увеличивает количество, а не плодит копии', () => {
        const state = cartReducer(withItem(7, 1), cartActions.addToCart(makeProduct({ id: 7 })));

        expect(state.cartItems).toHaveLength(1);
        expect(state.cartItems[0].quantity).toBe(2);
    });

    test('decreaseQuantity уменьшает количество', () => {
        const state = cartReducer(withItem(7, 3), cartActions.decreaseQuantity(7));

        expect(state.cartItems[0].quantity).toBe(2);
    });

    test('уменьшение последней единицы убирает товар из корзины', () => {
        const state = cartReducer(withItem(7, 1), cartActions.decreaseQuantity(7));

        expect(state.cartItems).toEqual([]);
    });

    test('removeFromCartById убирает товар независимо от количества', () => {
        const state = cartReducer(withItem(7, 5), cartActions.removeFromCartById(7));

        expect(state.cartItems).toEqual([]);
    });

    test('действия над отсутствующим товаром ничего не ломают', () => {
        const state = cartReducer(withItem(7, 1), cartActions.decreaseQuantity(42));

        expect(state.cartItems).toHaveLength(1);
    });
});
