import type { Product } from '@/shared/api/products';
import type { FavoriteState } from './favorite.types';
import { storage } from '@/shared/lib/storage';
import { STORAGE_KEYS } from '@/shared/config';

export const loadFavoriteState = (): FavoriteState => ({
    favoriteItems: storage.get<Product[]>(STORAGE_KEYS.favorite) ?? [],
});
