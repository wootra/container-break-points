import { BreakAreaId } from 'container-breakpoints-react';

export const containerBreakpoints = Object.freeze({
	container1: {
		breakSizes: [300, 400, 500, 600],
		breakAreas: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
	},
});

export type BreakPointsOptions = typeof containerBreakpoints;
export type BreakGroup = BreakAreaId<typeof containerBreakpoints>;
