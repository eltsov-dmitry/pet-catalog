import { useSearchParams } from 'react-router';

const FILTERS = {
    search: 'search',
    category: 'category',
};

export const useFilters = () => {
    const [params, setParams] = useSearchParams();
    const search = params.get(FILTERS.search) ?? '';
    const category = params.get(FILTERS.category) ?? '';

    const setSearch = (v: string) => {
        return setParams(
            (prev) => {
                if (v) {
                    prev.set(FILTERS.search, v);
                    prev.delete(FILTERS.category);
                } else {
                    prev.delete(FILTERS.search);
                }
                return prev;
            },
            { replace: true },
        );
    };

    const setCategory = (v: string) => {
        return setParams(
            (prev) => {
                if (v) {
                    prev.set(FILTERS.category, v);
                    prev.delete(FILTERS.search);
                } else {
                    prev.delete(FILTERS.category);
                }
                return prev;
            },
            { replace: true },
        );
    };

    return { search, category, setCategory, setSearch };
};
