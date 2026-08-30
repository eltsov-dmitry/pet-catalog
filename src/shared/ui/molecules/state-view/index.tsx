import { Typography } from '@mui/material';
import { IconInfoCircle } from '@tabler/icons-react';
import { type FC, type ReactNode } from 'react';

interface StateViewProps {
    icon?: ReactNode;
    title: ReactNode;
    description?: ReactNode;
}

export const StateView: FC<StateViewProps> = ({ icon = <IconInfoCircle size={48} />, title, description }) => {
    return (
        <div className="flex flex-1 flex-col gap-1 justify-center items-center">
            {icon}
            <Typography variant="h4">{title}</Typography>
            {description && <Typography variant="body1">{description}</Typography>}
        </div>
    );
};
