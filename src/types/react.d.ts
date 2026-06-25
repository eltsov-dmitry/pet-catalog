import 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }

    type PropsWithClassName = {
        className?: string;
    };

    type PropsWithStyle = {
        style?: CSSProperties;
    };

    type DefaultProps = PropsWithClassName & PropsWithChildren & PropsWithStyle;
}
