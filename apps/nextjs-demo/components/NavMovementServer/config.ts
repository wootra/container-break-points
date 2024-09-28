import { createContainerBreakPoint } from 'container-breakpoints-react';

const {
	BreakAreaProvider,
	BreakPointContainer,
	useBreakAreaAt,
	useBreakAreaBetween,
	useBreakAreaInfo,
	useBreakAreasDown,
	useBreakAreasUp,
} = createContainerBreakPoint({
	carrousel: {
		breakAreas: ['sm', 'md', 'lg', 'xl'],
		breakSizes: [450, 700, 900],
	},
	nav: {
		breakAreas: ['sm', 'lg'],
		breakSizes: [1024],
	},
});

export {
	BreakAreaProvider,
	BreakPointContainer,
	useBreakAreaAt,
	useBreakAreaBetween,
	useBreakAreaInfo,
	useBreakAreasDown,
	useBreakAreasUp,
};
