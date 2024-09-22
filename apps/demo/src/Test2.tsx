import { BreakAreaProvider, BreakPointContainer, useBreakAreaInfo } from 'container-breakpoints-react';
import styles from './Test2.module.css';
import { PropsWithChildren } from 'react';

const breakPoints = {
	main: {
		breakAreas: ['sm', 'md', 'lg'],
		breakSizes: [600, 900],
	},
} as const;

function Test2() {
	return (
		<BreakAreaProvider breakPoints={breakPoints}>
			<Container />
			<ControlBox />
		</BreakAreaProvider>
	);
}

const Container = () => {
	return (
		<BreakPointContainer id='main' className={styles.container}>
			<div className={styles.wrapper}>
				<Carousel />
			</div>
		</BreakPointContainer>
	);
};

const Carousel = () => {
	const { isBreakUp } = useBreakAreaInfo<typeof breakPoints>('main');
	return (
		<div className={styles.carousel}>
			<CarouselItem title={'Gone with wind'}>1</CarouselItem>
			{isBreakUp('lg') && <CarouselItem title='Dance with Wolves'>2</CarouselItem>}
			<CarouselItem title='Day after Tomorrow'>3</CarouselItem>
		</div>
	);
};

const CarouselItem = ({ children, title }: PropsWithChildren<{ title: string }>) => {
	return (
		<div className={styles.carouselItem}>
			<h2>{title}</h2>
			<p>{children}</p>
		</div>
	);
};

const ControlBox = () => {
	const { current } = useBreakAreaInfo<typeof breakPoints>('main');
	return (
		<div className={styles.controlBox}>
			<div>current: {current}</div>
		</div>
	);
};

export default Test2;
