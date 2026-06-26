import { storage } from '@/shared/lib/storage';
import { STORAGE_KEYS } from '@/shared/config';
import type { UiState } from './ui.types';

export const loadUiState = (): UiState => ({
    view: storage.get<UiState['view']>(STORAGE_KEYS.view) ?? 'grid',
});
