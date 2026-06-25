import { ProductPage } from '@/pages/product';
import { HomePage } from '@/pages/home';
import type { RouteObject } from 'react-router';
import App from '../App';
import { FavoritesPage } from '@/pages/favorites';

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: 'product/:id', Component: ProductPage },
            { path: 'favorites', Component: FavoritesPage },
        ],
    },
];
