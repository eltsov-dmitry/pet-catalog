import type { FC } from 'react';
import { Outlet } from 'react-router';
import { WithStore } from './providers/with-store';
import { HeaderWidget } from '@/widgets/header';

const App: FC = () => {
    return (
        <WithStore>
            <div className="px-4 max-w-[1024px] m-auto min-h-screen flex flex-col">
                <HeaderWidget />
                <Outlet />
            </div>
        </WithStore>
    );
};

export default App;
