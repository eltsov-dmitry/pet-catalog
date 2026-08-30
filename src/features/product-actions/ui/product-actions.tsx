import type { Product } from '@/shared/api/products';
import { IconButton, Tooltip } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { ProductDeleteDialog } from './product-delete-dialog';
import { ProductFormDialog } from './product-form-dialog';

interface ProductActionsProps {
    product: Product;
    size?: number;
}

export const ProductActions: FC<ProductActionsProps> = ({ product, size = 18 }) => {
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <Tooltip title="Редактировать">
                <IconButton className="relative z-10" onClick={() => setOpenForm(true)}>
                    <IconPencil size={size} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
                <IconButton className="relative z-10" color="error" onClick={() => setOpenDelete(true)}>
                    <IconTrash size={size} />
                </IconButton>
            </Tooltip>

            <ProductFormDialog open={openForm} product={product} onClose={() => setOpenForm(false)} />
            <ProductDeleteDialog open={openDelete} product={product} onClose={() => setOpenDelete(false)} />
        </>
    );
};
