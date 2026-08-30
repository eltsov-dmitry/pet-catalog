import { useDeleteProductMutation, type Product } from '@/shared/api/products';
import { useNotify } from '@/shared/lib/notify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { FC } from 'react';

interface ProductDeleteDialogProps {
    open: boolean;
    product: Product;
    onClose: VoidFunction;
}

export const ProductDeleteDialog: FC<ProductDeleteDialogProps> = ({ open, product, onClose }) => {
    const notify = useNotify();
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const confirm = async () => {
        try {
            await deleteProduct(product.id).unwrap();
            notify(
                `Товар ${product.id} удалён. Инвалидированы тег товара и LIST, поэтому список ` +
                    `перезапрошен - но dummyjson удаление имитирует, и товар вернулся.`,
            );
            onClose();
        } catch {
            notify('Удалить не получилось. Проверь сеть и попробуй ещё раз', 'error');
        }
    };

    return (
        <Dialog open={open} onClose={isLoading ? undefined : onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Удалить товар?</DialogTitle>
            <DialogContent>
                <Typography variant="body2">{product.title}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>
                    Отмена
                </Button>
                <Button color="error" variant="contained" onClick={confirm} loading={isLoading}>
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
