import {
    useCreateProductMutation,
    useGetProductsCategoryListQuery,
    useUpdateProductMutation,
    type Product,
} from '@/shared/api/products';
import { useNotify } from '@/shared/lib/notify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { useEffect, useState, type FC, type FormEvent } from 'react';

interface ProductFormDialogProps {
    open: boolean;
    /** Передан — режим редактирования, нет — создание. */
    product?: Product;
    onClose: VoidFunction;
}

interface FormState {
    title: string;
    price: string;
    category: string;
    description: string;
}

const emptyForm: FormState = {
    title: '',
    price: '',
    category: '',
    description: '',
};

const toFormState = (product?: Product): FormState =>
    product
        ? {
              title: product.title,
              price: String(product.price),
              category: product.category,
              description: product.description,
          }
        : emptyForm;

export const ProductFormDialog: FC<ProductFormDialogProps> = ({ open, product, onClose }) => {
    const notify = useNotify();
    const isEdit = product !== undefined;

    const { data: categories } = useGetProductsCategoryListQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const [form, setForm] = useState<FormState>(() => toFormState(product));
    const [titleError, setTitleError] = useState('');

    // Диалог не размонтируется между открытиями, поэтому поля синхронизируются с товаром вручную.
    useEffect(() => {
        if (open) {
            setForm(toFormState(product));
            setTitleError('');
        }
    }, [open, product]);

    const isPending = isCreating || isUpdating;

    const setField = (field: keyof FormState) => (value: string) =>
        setForm((current) => ({ ...current, [field]: value }));

    const submit = async (event: FormEvent) => {
        event.preventDefault();

        const title = form.title.trim();

        if (!title) {
            setTitleError('Без названия товар не создать');
            return;
        }

        const payload = {
            title,
            price: Number(form.price) || 0,
            category: form.category,
            description: form.description.trim(),
        };

        try {
            if (isEdit) {
                await updateProduct({ id: product.id, ...payload }).unwrap();
                notify(
                    `Товар ${product.id} обновлён. Тег товара инвалидирован, карточка и список ` +
                        `перезапрошены - но dummyjson изменения не хранит, вернулись исходные данные.`,
                );
            } else {
                const created = await createProduct(payload).unwrap();
                notify(
                    `Товар создан, id ${created.id}. Тег LIST инвалидирован и список перезапрошен - ` +
                        `в выдаче его нет, dummyjson создание только имитирует.`,
                );
            }

            onClose();
        } catch {
            notify('Запрос не прошёл. Проверь сеть и попробуй ещё раз', 'error');
        }
    };

    return (
        <Dialog open={open} onClose={isPending ? undefined : onClose} fullWidth maxWidth="sm">
            <form onSubmit={submit}>
                <DialogTitle>{isEdit ? `Редактирование товара ${product.id}` : 'Новый товар'}</DialogTitle>
                {/* Обёртка нужна из-за правила MUI: DialogContent сразу после DialogTitle
                    получает padding-top: 0, и метка outlined-поля обрезается. */}
                <DialogContent>
                    <div className="flex flex-col gap-4 pt-2">
                        <TextField
                            label="Название"
                            value={form.title}
                            onChange={(event) => setField('title')(event.target.value)}
                            error={titleError !== ''}
                            helperText={titleError}
                            autoFocus
                            fullWidth
                        />
                        <TextField
                            label="Цена"
                            type="number"
                            value={form.price}
                            onChange={(event) => setField('price')(event.target.value)}
                            slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                            fullWidth
                        />
                        <TextField
                            select
                            label="Категория"
                            value={categories?.includes(form.category) ? form.category : ''}
                            onChange={(event) => setField('category')(event.target.value)}
                            fullWidth
                        >
                            {categories?.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Описание"
                            value={form.description}
                            onChange={(event) => setField('description')(event.target.value)}
                            multiline
                            minRows={3}
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={isPending}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" loading={isPending}>
                        {isEdit ? 'Сохранить' : 'Создать'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
