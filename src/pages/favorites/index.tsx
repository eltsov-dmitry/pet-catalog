import { useFavoriteStore } from '@/entities/favorite';
import { IconButton, Typography } from '@mui/material';
import { IconHeartCancel, IconInfoCircle } from '@tabler/icons-react';
import { type FC } from 'react';

export const FavoritesPage: FC = () => {
    const { favoriteItems, removeById } = useFavoriteStore();

    if (favoriteItems.length === 0) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <IconInfoCircle size={48} />
                    <Typography variant="h4">Список избранного пуст</Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {favoriteItems.map((favorite) => (
                <div
                    key={favorite.id}
                    className="flex gap-4 border-[0.5px] items-center rounded-[8px]"
                >
                    <img
                        src={favorite.images[0]}
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                    <Typography className="flex-1">{favorite.title}</Typography>
                    <IconButton
                        className="w-[48px]"
                        onClick={() => removeById(favorite.id)}
                    >
                        <IconHeartCancel size={18} />
                    </IconButton>
                </div>
            ))}
        </div>
    );
};
