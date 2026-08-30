import { useTheme } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes } from 'react';

export type SpacingProps = HTMLAttributes<HTMLDivElement> & {
    /** В относительных единицах из theme->spacing (value * 8px) */
    spacing: number;
};

export const Spacing: FC<SpacingProps> = ({ spacing, className, style = {}, ...otherProps }) => {
    const theme = useTheme();
    const spacingSize = theme.spacing(spacing);

    return (
        <div
            className={classNames(className, 'relative box-border pt-(--spacing-size)')}
            style={{ '--spacing-size': spacingSize, ...style }}
            {...otherProps}
        />
    );
};
