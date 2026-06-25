import {
    Link as RouterLink,
    type LinkProps as RouterLinkProps,
} from 'react-router';
import type { Ref } from 'react';

type LinkBehaviorProps = Omit<RouterLinkProps, 'to'> & {
    href: RouterLinkProps['to'];
    ref?: Ref<HTMLAnchorElement>;
};

// Обёртка: маппим MUI-проп href на роутерный to; ref — обычный проп (React 19)
export const LinkBehavior = ({ href, ref, ...other }: LinkBehaviorProps) => {
    return <RouterLink ref={ref} to={href} {...other} />;
};
