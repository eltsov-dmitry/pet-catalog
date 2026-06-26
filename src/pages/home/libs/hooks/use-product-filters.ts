import { useDebouncedValue } from '@/shared/lib/hooks';
import { useState } from 'react';

export const useProductFilters = () => {
    const [category, setCategory] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const searchDebounced = useDebouncedValue(search);

    const changeSearch = (val: string) => {
        setCategory('');
        setSearch(val);
    };

    const changeCategory = (val: string) => {
        setSearch('');
        setCategory(val);
    };

    return { category, search, searchDebounced, changeSearch, changeCategory };
};
