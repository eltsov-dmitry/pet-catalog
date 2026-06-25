import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductsResponse } from './types';
import { useMemo } from 'react';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductsAll: builder.infiniteQuery<ProductsResponse, void, number>({
            infiniteQueryOptions: {
                initialPageParam: 0,
                getNextPageParam: (lastPage, allPages, lastPageParam) => {
                    const nextSkip = lastPageParam + lastPage.limit;
                    return nextSkip < lastPage.total ? nextSkip : undefined;
                },
            },
            query: ({ pageParam }) => `products?limit=12&skip=${pageParam}`,
            providesTags: ['Products'],
        }),
        getProductsSingle: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsSingleQuery } = productsApi;

export const useGetProductsAllInfiniteQuery = () => {
    const result = productsApi.useGetProductsAllInfiniteQuery();
    const products = useMemo(
        () => result.data?.pages?.flatMap((page) => page.products) || [],
        [result.data],
    );

    return { ...result, products };
};
