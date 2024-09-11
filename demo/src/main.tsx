import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SimpleExample from './routes/SimpleExample/index.tsx';
import Test from './Test.tsx';
import Root from './layouts/Root.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <div>Hello world!</div>,
			},
			{
				path: '/simple',
				element: <SimpleExample />,
			},
			{
				path: '/cards',
				element: <Test />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<RouterProvider router={router} />
	// </StrictMode>,
);
