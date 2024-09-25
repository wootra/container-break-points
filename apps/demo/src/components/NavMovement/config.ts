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

// const obj = {
// 	carrousel: {
// 		breakAreas: ['sm', 'md', 'lg'],
// 		breakSizes: [450, 700],
// 	},
// 	nav: {
// 		breakAreas: ['sm', 'lg'],
// 		breakSizes: [1024],
// 	},
// } as const;

// function ffff<T extends keyof typeof obj>(id: T) {
// 	return obj[id] as (typeof obj)[T];
// }

// const a = ffff('nav');
// export const tt:BreakAreaInfo<typeof obj, "nav"> = "";

export {
	BreakAreaProvider,
	BreakPointContainer,
	useBreakAreaAt,
	useBreakAreaBetween,
	useBreakAreaInfo,
	useBreakAreasDown,
	useBreakAreasUp,
};
