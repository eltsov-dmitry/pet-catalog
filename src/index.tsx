import { createRoot } from 'react-dom/client';
import './application/styles/global.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './application/routes';
import App from './application/App';

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('app')!);
root.render(
    <App>
        <RouterProvider router={router} />
    </App>,
);
