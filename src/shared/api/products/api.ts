import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductsResponse } from './types';
import { useMemo } from 'react';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductsAll: builder.infiniteQuery<ProductsResponse, string, number>(
            {
                infiniteQueryOptions: {
                    initialPageParam: 0,
                    getNextPageParam: (lastPage, allPages, lastPageParam) => {
                        const nextSkip = lastPageParam + lastPage.limit;
                        return nextSkip < lastPage.total ? nextSkip : undefined;
                    },
                },
                query: ({ pageParam, queryArg: search }) => {
                    const params = new URLSearchParams({
                        limit: '12',
                        skip: String(pageParam),
                    });

                    if (search) {
                        params.set('q', search);
                        return `products/search?${params.toString()}`;
                    }

                    return `products?${params.toString()}`;
                },
                providesTags: ['Products'],
            },
        ),
        getProductsSingle: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsSingleQuery } = productsApi;

export const useGetProductsAllInfiniteQuery = (search: string) => {
    const result = productsApi.useGetProductsAllInfiniteQuery(search);
    const products = useMemo(
        () => result.data?.pages?.flatMap((page) => page.products) || [],
        [result.data],
    );

    return { ...result, products };
};
