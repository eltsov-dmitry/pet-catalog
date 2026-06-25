import { addToCart } from '@/entities/cart';
import { useGetProductsSingleQuery } from '@/shared/api/products';
import { useAppDispatch } from '@/shared/lib/store';
import { Spacing } from '@/shared/ui';
import { Button, CircularProgress, Typography } from '@mui/material';
import { IconInfoCircle, IconPlus } from '@tabler/icons-react';
import { type FC } from 'react';
import { useParams } from 'react-router';

export const ProductPage: FC = () => {
    const params = useParams<'id'>();
    const dispatch = useAppDispatch();
    const { isLoading, data, isError } = useGetProductsSingleQuery(
        Number(params.id),
    );

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
        <div className="flex gap-8">
            <div className="w-[600px]">
                <img src={data.images[0]} />
            </div>
            <div className="flex-1">
                <Typography variant="h1">{data.title}</Typography>
                <Spacing spacing={1} />
                <Typography variant="body1">{data.description}</Typography>
                <Spacing spacing={2} />
                <Typography variant="h5">{data.price}</Typography>
                <Spacing spacing={3} />
                <Button
                    variant="contained"
                    startIcon={<IconPlus size={18} />}
                    onClick={() => dispatch(addToCart(data))}
                >
                    Добавить в корзину
                </Button>
            </div>
        </div>
    );
};
