import { BreakAreaProvider, BreakPointContainer, useBreakAreaInfo } from './Test2BreakPointConfig';
import styles from './Test2.module.css';
import { PropsWithChildren } from 'react';

function Test2() {
	return (
		<BreakAreaProvider>
			<Container />
			<ControlBox />
		</BreakAreaProvider>
	);
}

const Container = () => {
	return (
		<BreakPointContainer id='carrousel' className={styles.container}>
			<div className={styles.wrapper}>
				<Carousel />
			</div>
		</BreakPointContainer>
	);
};

const Carousel = () => {
	const { isBreakUp } = useBreakAreaInfo('carrousel');
	return (
		<div className={styles.carousel}>
			<CarouselItem title={'Gone with wind'}>1</CarouselItem>
			{isBreakUp('md') && <CarouselItem title='Dance with Wolves'>2</CarouselItem>}
			{isBreakUp('lg') && <CarouselItem title='Day after Tomorrow'>3</CarouselItem>}
		</div>
	);
};

const CarouselItem = ({ children, title }: PropsWithChildren<{ title: string }>) => {
	return (
		<div className={styles.carouselItem}>
			<h2>{title}</h2>
			<p style={{ textAlign: 'center', fontSize: '5rem' }}>{children}</p>
		</div>
	);
};

const ControlBox = () => {
	const { current } = useBreakAreaInfo('carrousel');
	return (
		<div className={styles.controlBox}>
			<div>current: {current}</div>
		</div>
	);
};

export default Test2;
