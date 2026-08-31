import { type FC } from 'react';
import { useCartStore } from '@/entities/cart';
import { Divider, IconButton, Typography } from '@mui/material';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router';

export const Cart: FC = () => {
    const { cartItems, price, addToCart, decreaseQuantity, removeFromCartById } = useCartStore();

    if (cartItems.length === 0) {
        return <div className="p-4">Корзина пуста</div>;
    }

    return (
        <div className="flex flex-col">
            {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="relative p-2 flex gap-2 items-center">
                    <img width={32} height={32} className="rounded-full object-cover" src={product.images[0]} alt="" />
                    <Link to={`/product/${product.id}`} className="flex-1 no-underline text-inherit">
                        <Typography variant="body2">{product.title}</Typography>
                    </Link>

                    <div className="flex items-center gap-1">
                        <IconButton
                            size="small"
                            aria-label="Уменьшить количество"
                            onClick={() => decreaseQuantity(product.id)}
                        >
                            <IconMinus size={14} />
                        </IconButton>
                        <Typography variant="body2" className="min-w-[16px] text-center">
                            {quantity}
                        </Typography>
                        <IconButton size="small" aria-label="Увеличить количество" onClick={() => addToCart(product)}>
                            <IconPlus size={14} />
                        </IconButton>
                    </div>

                    <Typography variant="caption" className="min-w-[52px] text-right">
                        {(product.price * quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                        size="small"
                        aria-label="Убрать товар из корзины"
                        onClick={() => removeFromCartById(product.id)}
                    >
                        <IconTrash size={16} />
                    </IconButton>
                </div>
            ))}

            <Divider />
            <div className="p-2 flex justify-between items-center">
                <Typography variant="body2">Итого</Typography>
                <Typography variant="subtitle2">{price.toFixed(2)}</Typography>
            </div>
        </div>
    );
};
