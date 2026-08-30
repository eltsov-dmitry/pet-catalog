import type { Product } from '@/shared/api/products';
import { Button, IconButton, Typography } from '@mui/material';
import { IconHeart, IconHeartFilled, IconPlus } from '@tabler/icons-react';
import { type FC, type ReactNode } from 'react';
import { Link } from 'react-router';
import { useUiStore } from '@/entities/ui';

interface ProductCardProps {
    isFavorite: boolean;
    product: Product;
    onAddCart: VoidFunction;
    onToggleFavorite: VoidFunction;
    /** кнопки из features: shared их не импортирует */
    actions?: ReactNode;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onAddCart, onToggleFavorite, isFavorite, actions }) => {
    const { view } = useUiStore();
    const isGrid = view === 'grid';

    return (
        <div className={`p-4 border rounded-[8px] relative flex gap-4 ${isGrid ? 'flex-col' : 'flex-row'}`}>
            <div
                className={
                    isGrid
                        ? 'w-full max-w-[200px] aspect-square m-auto'
                        : 'w-[96px] sm:w-[160px] shrink-0 aspect-square'
                }
            >
                <img className="w-full h-full object-cover" src={product.images[0]} alt={product.title} />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2 flex-1">
                    <Typography variant="body1">{product.title}</Typography>
                    <Typography variant="body2" color="textDisabled">
                        {product.description}
                    </Typography>
                    <Typography>{product.price}</Typography>
                </div>
                <div className="flex gap-4 justify-between">
                    <Button
                        variant="contained"
                        startIcon={<IconPlus size={18} />}
                        onClick={onAddCart}
                        className="relative z-10"
                    >
                        Добавить в корзину
                    </Button>
                    <div className="flex items-center">
                        <IconButton onClick={onToggleFavorite} className="relative z-10">
                            {isFavorite ? <IconHeartFilled /> : <IconHeart />}
                        </IconButton>
                        {actions}
                    </div>
                </div>
            </div>
            <Link className="absolute top-0 left-0 w-full h-full" to={`/product/${product.id}`} />
        </div>
    );
};
