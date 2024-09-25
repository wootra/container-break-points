import { createContainerBreakPoint } from 'container-breakpoints-react';

const breakPt1 = createContainerBreakPoint({
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
} as const);
const breakPt2 = createContainerBreakPoint({
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
} as const);
type GroupTypes1 = keyof typeof breakPt1.breakConfig;
type GroupTypes2 = keyof typeof breakPt2.breakConfig;

export { breakPt1, breakPt2 };
export type { GroupTypes1, GroupTypes2 };
