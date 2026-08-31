import { useAppSelector } from '@/shared/lib/store';
import { useMemo } from 'react';
import { selectCartItems, useCartActions } from './cart.slice';

export const useCartStore = () => {
    const cartItems = useAppSelector(selectCartItems);
    const actions = useCartActions();

    const totals = useMemo(
        () => ({
            count: cartItems.reduce((sum, { quantity }) => sum + quantity, 0),
            price: cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0),
        }),
        [cartItems],
    );

    return { cartItems, ...totals, ...actions };
};
