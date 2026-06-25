import { createTheme, ThemeProvider, type ThemeOptions } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { overrides } from '../theme';

export const WithTheme: FC<PropsWithChildren> = ({ children }) => {
    const theme = useMemo(() => {
        const themeOptions: ThemeOptions = {
            components: overrides(),
        };

        return createTheme(themeOptions);
    }, []);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
