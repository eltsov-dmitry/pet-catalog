import { useFiltersStore } from '@/entities/filters';
import { useGetProductsCategoryListQuery } from '@/shared/api/products';
import { Spacing } from '@/shared/ui';
import { Chip, TextField } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { type FC } from 'react';

export const HomePageFilters: FC = () => {
    const { search, setSearch, category, setCategory } = useFiltersStore();
    const { data: categories } = useGetProductsCategoryListQuery();

    const resetCategory = () => setCategory('');

    return (
        <div>
            <TextField
                value={search}
                onChange={(val) => setSearch(val.target.value)}
                className="w-full"
                slotProps={{
                    input: {
                        startAdornment: <IconSearch className="mr-4" />,
                    },
                }}
            />
            <Spacing spacing={2} />
            <div className="flex flex-wrap gap-1">
                {categories?.map((categoryItem) => (
                    <Chip
                        key={categoryItem}
                        label={categoryItem}
                        onClick={() => setCategory(categoryItem)}
                        onDelete={
                            category === categoryItem
                                ? resetCategory
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
};
