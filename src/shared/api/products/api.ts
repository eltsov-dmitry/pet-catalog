import { baseApi } from '@/shared/api/baseApi';
import type { CreateProductDto, Product, ProductsResponse, UpdateProductDto } from './types';
import { useMemo } from 'react';
import type { TagDescription } from '@reduxjs/toolkit/query';

interface ProductListParams {
    search: string;
    category: string;
}

type ProductTag = TagDescription<'Products'>;

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductsList: builder.infiniteQuery<ProductsResponse, ProductListParams, number>({
            infiniteQueryOptions: {
                initialPageParam: 0,
                getNextPageParam: (lastPage, _allPages, lastPageParam) => {
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
            providesTags: (data) => {
                const tags: ProductTag[] =
                    data?.pages
                        ?.flatMap((page) => page.products)
                        .map((product) => ({
                            type: 'Products',
                            id: product.id,
                        })) ?? [];

                tags.push({ type: 'Products', id: 'LIST' });

                return tags;
            },
        }),
        getProductsSingle: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: (_data, _error, id) => [{ type: 'Products', id }],
        }),
        getProductsCategoryList: builder.query<string[], void>({
            query: () => 'products/category-list',
        }),
        createProduct: builder.mutation<Product, CreateProductDto>({
            query: (body) => ({
                url: 'products/add',
                method: 'POST',
                body,
            }),
            invalidatesTags: () => [{ type: 'Products', id: 'LIST' }],
        }),
        updateProduct: builder.mutation<Product, UpdateProductDto>({
            query: ({ id, ...body }) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_data, _error, body) => [{ type: 'Products', id: body.id }],
        }),
        deleteProduct: builder.mutation<Product, number>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_data, _error, id) => [
                { type: 'Products', id },
                { type: 'Products', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetProductsSingleQuery,
    useGetProductsCategoryListQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;

export const useGetProductsListInfiniteQuery = (params: ProductListParams) => {
    const result = productsApi.useGetProductsListInfiniteQuery(params);
    const products = useMemo(() => result.data?.pages?.flatMap((page) => page.products) || [], [result.data]);

    return { ...result, products };
};
