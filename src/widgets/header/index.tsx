import { Button, IconButton, ToggleButton, ToggleButtonGroup, useColorScheme } from '@mui/material';
import { IconGardenCart, IconHeart, IconMoonFilled, IconSunHighFilled } from '@tabler/icons-react';
import { lazy, Suspense, useState, type FC, type MouseEvent } from 'react';
import { Link } from 'react-router';

const HeaderCart = lazy(() => import('./ui/header-cart'));

const preloadCart = () => {
    void import('./ui/header-cart');
};

export const HeaderWidget: FC = () => {
    const { setMode, colorScheme } = useColorScheme();

    // Якорь заодно работает признаком «корзину открывали»: до первого клика попапа нет в дереве
    const [cartAnchor, setCartAnchor] = useState<HTMLButtonElement | null>(null);
    const [openCart, setOpenCart] = useState(false);

    const toggleCart = (event: MouseEvent<HTMLButtonElement>) => {
        setCartAnchor(event.currentTarget);
        setOpenCart((value) => !value);
    };

    return (
        <header>
            <div className="flex items-center justify-between py-4">
                <Link to="/" className="text-shadow-blue-600">
                    LOGO
                </Link>
                <div className="flex items-center gap-1 sm:gap-2">
                    <IconButton href="/favorites">
                        <IconHeart />
                    </IconButton>
                    <Button
                        variant="outlined"
                        startIcon={<IconGardenCart />}
                        onClick={toggleCart}
                        onMouseEnter={preloadCart}
                        onFocus={preloadCart}
                    >
                        Корзина
                    </Button>
                    {cartAnchor && (
                        <Suspense fallback={null}>
                            <HeaderCart open={openCart} anchorEl={cartAnchor} onClose={() => setOpenCart(false)} />
                        </Suspense>
                    )}
                    <ToggleButtonGroup
                        value={colorScheme}
                        exclusive
                        onChange={(_e, value) => setMode(value)}
                        aria-label="color-mode"
                        size="small"
                    >
                        <ToggleButton value="dark" aria-label="dark">
                            <IconMoonFilled />
                        </ToggleButton>
                        <ToggleButton value="light" aria-label="light">
                            <IconSunHighFilled />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </header>
    );
};
