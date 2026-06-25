import ButtonBase from './button-base';
import Link from './link';

export const overrides = () => {
    return Object.assign({}, ButtonBase, Link);
};
