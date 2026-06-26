import { useAppSelector } from '@/shared/lib/store';
import {
    selectFiltersSearch,
    selectFiltersCategory,
    useFiltersActions,
} from './filters.slice';

export const useFiltersStore = () => {
    const search = useAppSelector(selectFiltersSearch);
    const category = useAppSelector(selectFiltersCategory);
    const actions = useFiltersActions();

    return { search, category, ...actions };
};
