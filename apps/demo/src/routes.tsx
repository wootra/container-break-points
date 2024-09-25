import NavMovement from './components/NavMovement';
import SimpleExample from './components/SimpleExample/index';
import Test from './components/Test';
import Test2 from './components/Test2';

export const routes = [
	{
		path: '/simple',
		label: 'Simple Example',
		ErrorBoundary: () => <div>Error1</div>,
		element: <SimpleExample />,
	},
	{
		path: '/test1',
		label: 'Test1',
		ErrorBoundary: () => <div>Error2</div>,
		element: <Test />,
	},
	{
		path: '/test2',
		label: 'Test2',
		ErrorBoundary: () => <div>Error3</div>,
		element: <Test2 />,
	},
	{
		path: '/nav-movement',
		label: 'Nav Movement',
		ErrorBoundary: () => <div>Error3</div>,
		element: <NavMovement />,
	},
];
