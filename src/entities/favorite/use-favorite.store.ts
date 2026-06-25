import { useAppSelector } from '@/shared/lib/store';
import { useCallback } from 'react';
import { selectFavoriteItems, useFavoriteActions } from './favorite.slice';

export const useFavoriteStore = () => {
    const favoriteItems = useAppSelector(selectFavoriteItems);
    const actions = useFavoriteActions();

    const checkFavorite = useCallback(
        (id: number) => favoriteItems.some((item) => item.id === id),
        [favoriteItems],
    );

    return { favoriteItems, checkFavorite, ...actions };
};
