import { type FC } from 'react';
import { useCartStore } from '@/entities/cart';
import { IconButton, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router';

export const Cart: FC = () => {
    const { cartItems, removeFromCartById } = useCartStore();

    if (cartItems.length === 0) {
        return <div className="p-4">Корзина пуста</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="relative p-2 flex gap-2 items-center"
                >
                    <img
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        src={item.images[0]}
                    />
                    <Typography variant="body2" className="flex-1">
                        {item.title}
                    </Typography>
                    <Typography variant="caption">{item.price}</Typography>
                    <IconButton
                        className="relative z-10"
                        onClick={() => removeFromCartById(item.id)}
                    >
                        <IconTrash size={18} />
                    </IconButton>
                    <Link
                        to={`/product/${item.id}`}
                        className="absolute top-0 left-0 w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
};
