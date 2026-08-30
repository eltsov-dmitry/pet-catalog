import { describe, expect, test } from 'vitest';
import { makeProduct } from '@/shared/lib/testing/make-product';
import { favoriteActions, favoriteReducer } from './favorite.slice';

const empty = { favoriteItems: [] };

describe('избранное', () => {
    test('toggleFavorite добавляет товар, которого не было', () => {
        const state = favoriteReducer(empty, favoriteActions.toggleFavorite(makeProduct({ id: 3 })));

        expect(state.favoriteItems.map(({ id }) => id)).toEqual([3]);
    });

    test('повторный toggleFavorite убирает товар', () => {
        const product = makeProduct({ id: 3 });
        const added = favoriteReducer(empty, favoriteActions.toggleFavorite(product));

        const state = favoriteReducer(added, favoriteActions.toggleFavorite(product));

        expect(state.favoriteItems).toEqual([]);
    });

    test('toggleFavorite не задевает соседние товары', () => {
        const filled = { favoriteItems: [makeProduct({ id: 1 }), makeProduct({ id: 2 })] };

        const state = favoriteReducer(filled, favoriteActions.toggleFavorite(makeProduct({ id: 1 })));

        expect(state.favoriteItems.map(({ id }) => id)).toEqual([2]);
    });

    test('removeFromFavoriteById удаляет по идентификатору', () => {
        const filled = { favoriteItems: [makeProduct({ id: 5 })] };

        const state = favoriteReducer(filled, favoriteActions.removeFromFavoriteById(5));

        expect(state.favoriteItems).toEqual([]);
    });
});
