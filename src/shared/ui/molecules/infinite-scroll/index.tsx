import { CircularProgress } from '@mui/material';
import { useEffect, type FC } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps {
    fetchNextPage: () => void;
    hasNextPage: boolean;
    rootMargin?: string;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = ({
    fetchNextPage,
    hasNextPage,
    rootMargin = '200px',
}) => {
    const { ref, inView } = useInView({ rootMargin });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div
            className="flex flex-col items-center justify-center p-8"
            ref={ref}
        >
            {hasNextPage && <CircularProgress />}
        </div>
    );
};
