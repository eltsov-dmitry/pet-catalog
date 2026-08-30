import { Button } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { ProductFormDialog } from './product-form-dialog';

export const CreateProductButton: FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="outlined" startIcon={<IconPlus size={18} />} onClick={() => setOpen(true)}>
                Добавить товар
            </Button>
            <ProductFormDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};
