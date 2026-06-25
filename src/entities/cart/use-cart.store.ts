import { useAppSelector } from '@/shared/lib/store';
import { selectCartItems, useCartActions } from './cart.slice';

export const useCartStore = () => {
    const cartItems = useAppSelector(selectCartItems);
    const actions = useCartActions();

    return { cartItems, ...actions };
};
