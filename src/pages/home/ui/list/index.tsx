import { useCartStore } from '@/entities/cart';
import { useFavoriteStore } from '@/entities/favorite';
import type { Product } from '@/shared/api/products';
import { InfiniteScroll, ProductCard, StateView } from '@/shared/ui/molecules';
import { CircularProgress } from '@mui/material';
import { type FC } from 'react';

interface HomePageListProps {
    isFetching: boolean;
    hasNextPage: boolean;
    products: Product[];
    fetchNextPage: VoidFunction;
}

export const HomePageList: FC<HomePageListProps> = ({
    products,
    isFetching,
    hasNextPage,
    fetchNextPage,
}) => {
    const { addToCart } = useCartStore();
    const { checkFavorite, addToFavorite, removeFromFavoriteById } =
        useFavoriteStore();

    if (products.length === 0) {
        return <StateView title="Список пуст" />;
    }

    if (isFetching) {
        return (
            <div className="flex flex-1 flex-col  justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => {
                    const isFavorite = checkFavorite(product.id);
                    const onAdd = () => addToFavorite(product);
                    const onRemove = () => removeFromFavoriteById(product.id);
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddCart={() => addToCart(product)}
                            onToggleFavorite={isFavorite ? onRemove : onAdd}
                            isFavorite={isFavorite}
                        />
                    );
                })}
            </div>
            <InfiniteScroll
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
            />
        </div>
    );
};
