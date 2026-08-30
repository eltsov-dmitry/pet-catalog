import { Alert, Snackbar } from '@mui/material';
import { createContext, use, useCallback, useMemo, useState, type FC, type PropsWithChildren } from 'react';

type NoticeSeverity = 'success' | 'error' | 'info';

interface Notice {
    message: string;
    severity: NoticeSeverity;
}

type NotifyFn = (message: string, severity?: NoticeSeverity) => void;

const NotifyContext = createContext<{ notify: NotifyFn } | null>(null);

export const NotifyProvider: FC<PropsWithChildren> = ({ children }) => {
    const [notice, setNotice] = useState<Notice | null>(null);

    const notify = useCallback<NotifyFn>((message, severity = 'success') => {
        setNotice({ message, severity });
    }, []);

    // Значение контекста мемоизируется: без этого каждый рендер провайдера
    // перерисовывал бы всех потребителей.
    const value = useMemo(() => ({ notify }), [notify]);

    const close = () => setNotice(null);

    return (
        <NotifyContext value={value}>
            {children}
            <Snackbar
                open={notice !== null}
                autoHideDuration={7000}
                onClose={close}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={notice?.severity ?? 'info'} variant="filled" onClose={close} className="max-w-[440px]">
                    {notice?.message}
                </Alert>
            </Snackbar>
        </NotifyContext>
    );
};

export const useNotify = () => {
    const context = use(NotifyContext);

    if (!context) {
        throw new Error('useNotify вызван вне NotifyProvider');
    }

    return context.notify;
};
