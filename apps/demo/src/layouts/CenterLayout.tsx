import { PropsWithChildren } from 'react';
import './Layout.css';
import { BreakAreaProvider, useBreakAreaInfo } from 'container-breakpoints-react';

export const centerLayoutBreakpoints = Object.freeze({
	centerLayout: {
		breakSizes: [320, 480, 640],
		breakAreas: ['micro', 'sm', 'md', 'lg'] as const,
	},
});

export const useCenterLayout = () => {
	return useBreakAreaInfo<typeof centerLayoutBreakpoints>('centerLayout');
};

const CenterLayout = ({ children }: PropsWithChildren) => {
	return (
		<BreakAreaProvider breakPoints={centerLayoutBreakpoints}>
			<div className='center-layout'>{children}</div>
		</BreakAreaProvider>
	);
};

export default CenterLayout;
