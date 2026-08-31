import { useCartStore } from '@/entities/cart';
import { useFavoriteStore } from '@/entities/favorite';
import { useUiStore } from '@/entities/ui';
import type { Product } from '@/shared/api/products';
import { ProductActions } from '@/features/product-actions';
import { InfiniteScroll, ProductCard, StateView } from '@/shared/ui/molecules';
import { CircularProgress, LinearProgress } from '@mui/material';
import { type FC } from 'react';

interface HomePageListProps {
    isFetching: boolean;
    hasNextPage: boolean;
    products: Product[];
    fetchNextPage: VoidFunction;
}

export const HomePageList: FC<HomePageListProps> = ({ products, isFetching, hasNextPage, fetchNextPage }) => {
    const { view } = useUiStore();
    const { addToCart } = useCartStore();
    const { checkFavorite, toggleFavorite } = useFavoriteStore();

    if (products.length === 0) {
        return isFetching ? (
            <div className="flex flex-1 flex-col justify-center items-center">
                <CircularProgress />
            </div>
        ) : (
            <StateView title="Список пуст" />
        );
    }

    // Список не размонтируется на время обновления: иначе высота страницы схлопывается
    // и браузер теряет позицию прокрутки
    return (
        <div className="relative">
            {isFetching && <LinearProgress className="absolute top-0 left-0 w-full" />}
            <div
                className={`grid gap-4 transition-opacity ${isFetching ? 'opacity-60' : ''} ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddCart={() => addToCart(product)}
                        onToggleFavorite={() => toggleFavorite(product)}
                        isFavorite={checkFavorite(product.id)}
                        actions={<ProductActions product={product} />}
                    />
                ))}
            </div>
            <InfiniteScroll hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        </div>
    );
};
