import { useGetProductsCategoryListQuery } from '@/shared/api/products';
import { Spacing } from '@/shared/ui';
import { Chip, TextField } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { type FC } from 'react';

interface HomePageFiltersProps {
    search: string;
    category: string;
    onChangeCategory: (val: string) => void;
    onChangeSearch: (val: string) => void;
}

export const HomePageFilters: FC<HomePageFiltersProps> = ({
    search,
    category,
    onChangeCategory,
    onChangeSearch,
}) => {
    const { data: categories } = useGetProductsCategoryListQuery();

    const onCleanCategory = () => onChangeCategory('');

    return (
        <div>
            <TextField
                value={search}
                onChange={(val) => onChangeSearch(val.target.value)}
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
                        onClick={() => onChangeCategory(categoryItem)}
                        onDelete={
                            category === categoryItem
                                ? onCleanCategory
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
};
