export const containerBreakpoints = Object.freeze({
	card1: {
		breakSizes: [200, 250, 300, 350],
		breakAreas: ['xs-card', 'sm-card', 'md-card', 'lg-card', 'xl-card'],
	},
	card2: {
		breakSizes: [250, 300],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
	card3: {
		breakSizes: [300, 350],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
	card4: {
		breakSizes: [350, 400],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
});

export const containerBreakpoints2 = Object.freeze({
	card1: {
		breakSizes: [220, 300],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
	card2: {
		breakSizes: [270, 320],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
	card3: {
		breakSizes: [320, 400],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
	card4: {
		breakSizes: [370, 420],
		breakAreas: ['sm-card', 'md-card', 'lg-card'],
	},
});
export type Container = keyof typeof containerBreakpoints;
export type ContainerBreakpoint = (typeof containerBreakpoints)[Container];
