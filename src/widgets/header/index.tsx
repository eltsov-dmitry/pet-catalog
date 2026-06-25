import { Cart } from '@/features/cart';
import { Button, Grow, Paper, Popper } from '@mui/material';
import { IconGardenCart } from '@tabler/icons-react';
import { useRef, useState, type FC } from 'react';
import { Link } from 'react-router';

export const HeaderWidget: FC = () => {
    const [openCart, setOpenCart] = useState(false);
    const cartButtonRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpenCart((val) => !val);
    };

    return (
        <header>
            <div className="flex items-center justify-between py-4">
                <Link to="/" className="text-shadow-blue-600">
                    LOGO
                </Link>
                <Button
                    ref={cartButtonRef}
                    variant="outlined"
                    startIcon={<IconGardenCart />}
                    onClick={handleToggle}
                >
                    Корзина
                </Button>
                <Popper
                    open={openCart}
                    anchorEl={cartButtonRef.current}
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
                                transformOrigin:
                                    placement === 'bottom-end'
                                        ? 'right top'
                                        : 'right bottom',
                            }}
                        >
                            <Paper>
                                <Cart />
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </header>
    );
};
