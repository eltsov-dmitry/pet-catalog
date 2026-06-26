import { useFilters } from '@/entities/filters';
import { useUiStore } from '@/entities/ui';
import { useGetProductsCategoryListQuery } from '@/shared/api/products';
import { Spacing } from '@/shared/ui';
import {
    Chip,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { IconGridDots, IconList, IconSearch } from '@tabler/icons-react';
import { type FC } from 'react';

export const HomePageFilters: FC = () => {
    const { view, setView } = useUiStore();
    const { search, setSearch, category, setCategory } = useFilters();
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
            <Spacing spacing={2} />
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_e, value) => setView(value)}
                aria-label="view-mode"
                size="small"
            >
                <ToggleButton value="grid" aria-label="grid">
                    <IconGridDots />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list">
                    <IconList />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};
