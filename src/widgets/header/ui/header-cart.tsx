import { Cart } from '@/features/cart';
import { ClickAwayListener, Grow, Paper, Popper } from '@mui/material';
import { useEffect, type FC } from 'react';

interface HeaderCartProps {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    onClose: VoidFunction;
}

const HeaderCart: FC<HeaderCartProps> = ({ open, anchorEl, onClose }) => {
    useEffect(() => {
        if (!open) {
            return;
        }

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', closeOnEscape);

        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [open, onClose]);

    // Клик по самой кнопке пропускаем: она переключает попап сама, иначе закрытие и открытие погасят друг друга
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        if (anchorEl?.contains(event.target as Node)) {
            return;
        }

        onClose();
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
                open={open}
                anchorEl={anchorEl}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal
                className="z-10"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
                        }}
                    >
                        <Paper className="w-[320px] max-w-[calc(100vw-2rem)]">
                            <Cart />
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </ClickAwayListener>
    );
};

export default HeaderCart;
