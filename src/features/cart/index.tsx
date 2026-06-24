import { type FC } from 'react';
import { useAppSelector } from '@/shared/lib/store';
import { cartItems } from '@/entities/cart';

export const Cart: FC = () => {
    const cart = useAppSelector(cartItems);

    if (cart.length === 0) {
        return <div>Корзина пуста</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {cart.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};
