import { BreakAreaProvider, BreakPointContainer, useBreakAreaInfo } from './config';
import styles from './styles.module.css';
import { PropsWithChildren } from 'react';

function Test2() {
	return (
		<BreakAreaProvider>
			<div className={styles.container}>
				<BreakPointContainer id='carrousel' className={styles.wrapper}>
					<Carousel />
				</BreakPointContainer>

				<div className={styles.moreContent}>
					<p>
						Excepteur eiusmod amet pariatur consequat non aliquip quis ullamco sint adipisicing consectetur
						pariatur. Excepteur esse minim nostrud aute enim velit ipsum excepteur incididunt deserunt nisi
						sunt consequat. In fugiat mollit sint cupidatat ipsum magna ad dolore nostrud irure. Occaecat
						voluptate exercitation laborum aliqua velit eiusmod Lorem fugiat veniam cupidatat. Quis
						consequat elit officia ut ex do culpa esse proident dolor incididunt ipsum labore. Cupidatat
						ipsum ad non ullamco sunt ipsum proident aliquip nulla commodo. Eiusmod ea mollit sunt in
						pariatur aliqua irure officia sit. Exercitation aute in eu occaecat labore amet cupidatat id
						consequat ad sunt enim Lorem. Consequat laborum sint Lorem et ad. Excepteur incididunt duis
						aliqua aute ullamco reprehenderit et anim consequat. Quis ad non sunt velit minim ad do ipsum
						magna ad laborum. Exercitation proident cillum irure non cillum sunt aliqua do elit non tempor
						quis. Ad voluptate consectetur eu duis proident mollit nostrud nisi adipisicing Lorem. Aliquip
						dolor duis dolore ut in laborum consectetur. Eiusmod culpa nulla amet id laborum voluptate
						pariatur irure magna deserunt. Non eu sunt velit tempor id labore dolore officia eu nisi Lorem.
						Laboris pariatur ea cupidatat qui do consectetur enim sunt. Cillum proident aute in commodo ad.
						Dolore pariatur magna amet pariatur occaecat occaecat enim reprehenderit do enim. Irure
						voluptate enim dolore ut esse qui ea consequat pariatur elit excepteur nulla. Labore nostrud
						eiusmod anim tempor nostrud esse dolor aliquip excepteur fugiat culpa officia. Lorem amet est ex
						et excepteur. Do ipsum deserunt elit cupidatat id nisi elit pariatur ea mollit. Consectetur quis
						adipisicing sint minim amet ea incididunt ad qui. Nisi est ea elit Lorem est. Tempor enim velit
						nulla est exercitation minim ut anim proident. Nostrud id irure velit sunt quis excepteur. Nisi
						cupidatat veniam deserunt proident qui ullamco non anim nisi pariatur minim eiusmod. Ullamco
						sint mollit est exercitation sunt proident ut elit.
					</p>
					More content
					<ControlBox />
				</div>
			</div>
		</BreakAreaProvider>
	);
}

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
