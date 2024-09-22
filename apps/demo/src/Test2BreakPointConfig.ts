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
		breakSizes: [600, 900],
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
