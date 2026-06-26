import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductsResponse } from './types';
import { useMemo } from 'react';

interface ProductListParams {
    search: string;
    category: string;
}

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductsList: builder.infiniteQuery<
            ProductsResponse,
            ProductListParams,
            number
        >({
            infiniteQueryOptions: {
                initialPageParam: 0,
                getNextPageParam: (lastPage, allPages, lastPageParam) => {
                    const nextSkip = lastPageParam + lastPage.limit;
                    return nextSkip < lastPage.total ? nextSkip : undefined;
                },
            },
            query: ({ pageParam, queryArg }) => {
                const params = new URLSearchParams({
                    limit: '12',
                    skip: String(pageParam),
                });

                if (queryArg.category) {
                    return `products/category/${queryArg.category}?${params.toString()}`;
                }

                if (queryArg.search) {
                    params.set('q', queryArg.search);
                    return `products/search?${params.toString()}`;
                }

                return `products?${params.toString()}`;
            },
            providesTags: ['Products'],
        }),
        getProductsSingle: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ['Products'],
        }),
        getProductsCategoryList: builder.query<string[], void>({
            query: () => 'products/category-list',
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsSingleQuery, useGetProductsCategoryListQuery } =
    productsApi;

export const useGetProductsListInfiniteQuery = (params: ProductListParams) => {
    const result = productsApi.useGetProductsListInfiniteQuery(params);
    const products = useMemo(
        () => result.data?.pages?.flatMap((page) => page.products) || [],
        [result.data],
    );

    return { ...result, products };
};
