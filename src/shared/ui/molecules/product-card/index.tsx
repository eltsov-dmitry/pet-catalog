import type { Product } from '@/shared/api/products';
import { Button, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { type FC } from 'react';
import { Spacing } from '../../atoms';
import { Link } from 'react-router';

interface ProductCardProps {
    product: Product;
    onAddCart: VoidFunction;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onAddCart }) => {
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
            <Button
                variant="contained"
                startIcon={<IconPlus size={18} />}
                onClick={onAddCart}
                className="relative z-10"
            >
                Добавить в корзину
            </Button>
            <Link
                className="absolute top-0 left-0 w-full h-full"
                to={`/product/${product.id}`}
            />
        </div>
    );
};
