export const containerBreakpoints = Object.freeze({
	card1: {
		breakSizes: [150],
		breakAreas: ['small-card', 'big-card'],
	},
	card2: {
		breakSizes: [150],
		breakAreas: ['small-card', 'big-card'],
	},
	card3: {
		breakSizes: [150],
		breakAreas: ['small-card', 'big-card'],
	},
	card4: {
		breakSizes: [150],
		breakAreas: ['small-card', 'big-card'],
	},
});
export type Container = keyof typeof containerBreakpoints;
export type ContainerBreakpoint = (typeof containerBreakpoints)[Container];
