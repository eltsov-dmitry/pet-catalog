import { Cart } from '@/features/cart';
import { Grow, Paper, Popper } from '@mui/material';
import { type FC } from 'react';

interface HeaderCartProps {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
}

const HeaderCart: FC<HeaderCartProps> = ({ open, anchorEl }) => {
    return (
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
                    <Paper>
                        <Cart />
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};

export default HeaderCart;
