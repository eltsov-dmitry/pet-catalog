import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductsResponse } from './types';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductsAll: builder.query<ProductsResponse, void>({
            query: () => 'products',
            providesTags: ['Products'],
        }),
        getProductsSingle: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsAllQuery, useGetProductsSingleQuery } =
    productsApi;
