import { describe, expect, test } from 'vitest';
import { makeProduct } from '@/shared/lib/testing/make-product';
import { cartActions, cartReducer } from './cart.slice';

const empty = { cartItems: [] };

describe('корзина', () => {
    test('товар добавляется', () => {
        const state = cartReducer(empty, cartActions.addToCart(makeProduct({ id: 7 })));

        expect(state.cartItems.map(({ id }) => id)).toEqual([7]);
    });

    test('удаляется только указанный товар', () => {
        const filled = { cartItems: [makeProduct({ id: 1 }), makeProduct({ id: 2 })] };

        const state = cartReducer(filled, cartActions.removeFromCartById(1));

        expect(state.cartItems.map(({ id }) => id)).toEqual([2]);
    });

    test('удаление несуществующего товара ничего не ломает', () => {
        const filled = { cartItems: [makeProduct({ id: 1 })] };

        const state = cartReducer(filled, cartActions.removeFromCartById(42));

        expect(state.cartItems).toHaveLength(1);
    });
});
