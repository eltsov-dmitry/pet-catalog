import { createRoot } from 'react-dom/client';
import './application/styles/global.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './application/routes';

// basename нужен, когда приложение живёт в подкаталоге: publicPath чинит пути
// к ассетам, но роутер об этом не знает и ищет маршруты от корня домена
const router = createBrowserRouter(routes, { basename: process.env.PUBLIC_PATH });

const root = createRoot(document.getElementById('app')!);
root.render(<RouterProvider router={router} />);
