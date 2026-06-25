import { addToCart } from '@/entities/cart';
import { useGetProductsAllInfiniteQuery } from '@/shared/api/products';
import { useAppDispatch } from '@/shared/lib/store';
import { InfiniteScroll, ProductCard } from '@/shared/ui/molecules';
import { CircularProgress, Typography } from '@mui/material';
import { IconInfoCircle } from '@tabler/icons-react';
import { type FC } from 'react';

export const HomePage: FC = () => {
    const { isLoading, isError, products, hasNextPage, fetchNextPage } =
        useGetProductsAllInfiniteQuery();
    const dispatch = useAppDispatch();

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (!products.length || isError) {
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
        <div className="flex-1">
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddCart={() => dispatch(addToCart(product))}
                    />
                ))}
            </div>
            <InfiniteScroll
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
            />
        </div>
    );
};
