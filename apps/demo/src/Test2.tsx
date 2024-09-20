import { BreakAreaId, BreakAreaProvider, BreakPointContainer, useBreakAreaInfo } from 'container-breakpoints-react';
import { containerBreakpoints, containerBreakpoints2 } from './consts';
import styles from './Test2.module.css';

import { PropsWithChildren, useRef } from 'react';

const breakPoints = {
	main: {
		breakSizes: [300, 600],
		breakAreas: ['sm', 'md', 'lg'],
	},
};
function Test2() {
	return (
		<BreakAreaProvider breakPoints={breakPoints}>
			<Container />
			<ControlBox />
		</BreakAreaProvider>
	);
}

const Container = () => {
	const { current } = useBreakAreaInfo('main');

	return (
		<BreakPointContainer id='main' className={styles.container}>
			<div className={styles.wrapper}>test</div>
		</BreakPointContainer>
	);
};

const ControlBox = () => {
	const { current } = useBreakAreaInfo('main');
	return (
		<div className={styles.controlBox}>
			<div>current: {current}</div>
		</div>
	);
};

export default Test2;
