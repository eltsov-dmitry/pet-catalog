import { useCartStore } from '@/entities/cart';
import { useFavoriteStore } from '@/entities/favorite';
import { useGetProductsAllInfiniteQuery } from '@/shared/api/products';
import { useDebouncedValue } from '@/shared/lib/hooks';
import { Spacing } from '@/shared/ui';
import { InfiniteScroll, ProductCard } from '@/shared/ui/molecules';
import { CircularProgress, TextField, Typography } from '@mui/material';
import { IconInfoCircle, IconSearch } from '@tabler/icons-react';
import { useState, type FC } from 'react';

export const HomePage: FC = () => {
    const { addToCart } = useCartStore();
    const { checkFavorite, addToFavorite, removeById } = useFavoriteStore();

    const [search, setSearch] = useState('');
    const debouncedValue = useDebouncedValue(search);

    const {
        isLoading,
        isError,
        products,
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = useGetProductsAllInfiniteQuery(debouncedValue);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <IconInfoCircle size={48} />
                    <Typography variant="h4">Что-то пошло не так</Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <TextField
                value={search}
                onChange={(val) => setSearch(val.target.value)}
                slotProps={{
                    input: {
                        startAdornment: <IconSearch className="mr-4" />,
                        endAdornment:
                            search && isFetching ? (
                                <CircularProgress size={18} />
                            ) : null,
                    },
                }}
            />
            <Spacing spacing={4} />
            {products.length > 0 ? (
                <>
                    <div className="grid grid-cols-3 gap-4">
                        {products.map((product) => {
                            const isFavorite = checkFavorite(product.id);
                            const onAdd = () => addToFavorite(product);
                            const onRemove = () => removeById(product.id);
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddCart={() => addToCart(product)}
                                    onToggleFavorite={
                                        isFavorite ? onRemove : onAdd
                                    }
                                    isFavorite={isFavorite}
                                />
                            );
                        })}
                    </div>
                    <InfiniteScroll
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                </>
            ) : (
                <div className="flex flex-1 flex-col gap-1 justify-center items-center">
                    <IconInfoCircle size={48} />
                    <Typography variant="h4">Список пуст</Typography>
                </div>
            )}
        </div>
    );
};
