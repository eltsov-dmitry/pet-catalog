import { type FC } from 'react';
import { Cart } from '@/features/cart';
import { useAppDispatch } from '@/shared/lib/store';
import { addToCart } from '@/entities/cart';

export const HomePage: FC = () => {
    const dispatch = useAppDispatch();

    const addToCartHandler = () => {
        const id = Date.now();
        dispatch(addToCart({ id, name: `Товар ${id}` }));
    };

    return (
        <div>
            <Cart />
            <button onClick={addToCartHandler}>Add</button>
            HomePage
        </div>
    );
};
