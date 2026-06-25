import { LinkBehavior } from '@/shared/ui';
import type { Theme } from '@mui/material';

const buttonBase: Theme['components'] = {
    MuiButtonBase: {
        defaultProps: {
            LinkComponent: LinkBehavior,
        },
    },
};

export default buttonBase;
