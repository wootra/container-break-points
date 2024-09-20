import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './layouts/Root';
import { routes } from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,

		children: [
			{
				index: true,
				ErrorBoundary: () => <div>Error</div>,
				element: <div>Hello world!</div>,
			},
			...routes,
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	// <StrictMode>

	<RouterProvider router={router} />
	// </StrictMode>,
);
