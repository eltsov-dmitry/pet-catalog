import type { FC, PropsWithChildren } from 'react';
import { WithStore } from './providers/with-store';

const App: FC<PropsWithChildren> = ({ children }) => {
    return <WithStore>{children}</WithStore>;
};

export default App;
