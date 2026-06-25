import { LinkBehavior } from '@/shared/ui';
import type { Theme } from '@mui/material';

const link: Theme['components'] = {
    MuiLink: {
        defaultProps: {
            component: LinkBehavior,
        },
    },
};

export default link;
