import type { FC } from 'react';
import { Outlet } from 'react-router';
import { WithStore } from './providers/with-store';
import { HeaderWidget } from '@/widgets/header';
import { WithTheme } from './providers/with-theme';
import { NotifyProvider } from '@/shared/lib/notify';

const App: FC = () => {
    return (
        <WithTheme>
            <WithStore>
                <NotifyProvider>
                    <div className="px-3 sm:px-4 max-w-[1024px] m-auto min-h-screen flex flex-col">
                        <HeaderWidget />
                        <Outlet />
                    </div>
                </NotifyProvider>
            </WithStore>
        </WithTheme>
    );
};

export default App;
