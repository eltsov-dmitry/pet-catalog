import type { RouteObject } from 'react-router';
import App from '../App';

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { HomePage } = await import(/* webpackChunkName: "home-page" */ '@/pages/home');
                    return { Component: HomePage };
                },
            },
            {
                path: 'product/:id',
                lazy: async () => {
                    const { ProductPage } = await import(/* webpackChunkName: "product-page" */ '@/pages/product');
                    return { Component: ProductPage };
                },
            },
            {
                path: 'favorites',
                lazy: async () => {
                    const { FavoritesPage } = await import(
                        /* webpackChunkName: "favorites-page" */ '@/pages/favorites'
                    );
                    return { Component: FavoritesPage };
                },
            },
        ],
    },
];
