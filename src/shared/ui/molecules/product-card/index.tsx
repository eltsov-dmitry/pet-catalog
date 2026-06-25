import type { Product } from '@/shared/api/products';
import { Button, IconButton, Typography } from '@mui/material';
import { IconHeart, IconHeartFilled, IconPlus } from '@tabler/icons-react';
import { type FC } from 'react';
import { Spacing } from '../../atoms';
import { Link } from 'react-router';

interface ProductCardProps {
    isFavorite: boolean;
    product: Product;
    onAddCart: VoidFunction;
    onToggleFavorite: VoidFunction;
}

export const ProductCard: FC<ProductCardProps> = ({
    product,
    onAddCart,
    onToggleFavorite,
    isFavorite,
}) => {
    return (
        <div className="p-4 border rounded-[8px] relative">
            <img src={product.images[0]} />
            <Typography variant="body1">{product.title}</Typography>
            <Spacing spacing={1} />
            <Typography variant="body2" color="textDisabled">
                {product.description}
            </Typography>
            <Spacing spacing={2} />
            <Typography>{product.price}</Typography>
            <Spacing spacing={2} />
            <div className="flex gap-4 justify-between">
                <Button
                    variant="contained"
                    startIcon={<IconPlus size={18} />}
                    onClick={onAddCart}
                    className="relative z-10"
                >
                    Добавить в корзину
                </Button>
                <IconButton
                    onClick={onToggleFavorite}
                    className="relative z-10"
                >
                    {isFavorite ? <IconHeartFilled /> : <IconHeart />}
                </IconButton>
            </div>
            <Link
                className="absolute top-0 left-0 w-full h-full"
                to={`/product/${product.id}`}
            />
        </div>
    );
};
