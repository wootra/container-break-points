import { createContainerBreakPoint } from 'container-breakpoints-react';

const breakPt = createContainerBreakPoint({
	container1: {
		breakSizes: [300, 400, 500, 600],
		breakAreas: ['xs', 'sm', 'md', 'lg', 'xl'],
	},
});

export default breakPt;
