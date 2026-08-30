import { useGetProductsListInfiniteQuery } from '@/shared/api/products';
import { Spacing } from '@/shared/ui';
import { StateView } from '@/shared/ui/molecules';
import { CircularProgress } from '@mui/material';
import { type FC } from 'react';
import { HomePageFilters, HomePageList } from './ui';
import { useFilters } from '@/entities/filters';
import { useDebouncedValue } from '@/shared/lib/hooks';
import { CreateProductButton } from '@/features/product-actions';

export const HomePage: FC = () => {
    const { search, category } = useFilters();
    const searchDebounced = useDebouncedValue(search);

    const { isLoading, isError, products, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
        useGetProductsListInfiniteQuery({ search: searchDebounced, category });

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
                <StateView title="Что-то пошло не так" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex justify-end">
                <CreateProductButton />
            </div>
            <Spacing spacing={2} />
            <HomePageFilters />
            <Spacing spacing={4} />
            <HomePageList
                products={products}
                isFetching={isFetching && !isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
            />
        </div>
    );
};
