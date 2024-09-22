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
		breakAreas: ['sm', 'md', 'lg'],
		breakSizes: [450, 700],
	},
} as const);

export {
	BreakAreaProvider,
	BreakPointContainer,
	useBreakAreaAt,
	useBreakAreaBetween,
	useBreakAreaInfo,
	useBreakAreasDown,
	useBreakAreasUp,
};
