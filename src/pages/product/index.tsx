import { useCartStore } from '@/entities/cart';
import { ProductActions } from '@/features/product-actions';
import { useGetProductsSingleQuery } from '@/shared/api/products';
import { Spacing } from '@/shared/ui';
import { Button, CircularProgress, Typography } from '@mui/material';
import { IconInfoCircle, IconPlus } from '@tabler/icons-react';
import { type FC } from 'react';
import { useParams } from 'react-router';

export const ProductPage: FC = () => {
    const { addToCart } = useCartStore();
    const params = useParams<'id'>();
    const { isLoading, data, isError } = useGetProductsSingleQuery(Number(params.id));

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (!data || isError) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <IconInfoCircle size={48} />
                    <Typography variant="h4">Что-то пошло не так</Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-[520px] shrink-0">
                <img className="w-full h-auto" src={data.images[0]} alt={data.title} />
            </div>
            <div className="flex-1">
                <Typography variant="h4" component="h1" className="lg:text-5xl">
                    {data.title}
                </Typography>
                <Spacing spacing={1} />
                <Typography variant="body1">{data.description}</Typography>
                <Spacing spacing={2} />
                <Typography variant="h5">{data.price}</Typography>
                <Spacing spacing={3} />
                <div className="flex items-center gap-2">
                    <Button variant="contained" startIcon={<IconPlus size={18} />} onClick={() => addToCart(data)}>
                        Добавить в корзину
                    </Button>
                    <ProductActions product={data} size={20} />
                </div>
            </div>
        </div>
    );
};
