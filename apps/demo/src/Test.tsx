import { BreakAreaId, BreakAreaProvider, BreakPointContainer, useBreakAreaInfo } from 'container-breakpoints-react';
import { containerBreakpoints, containerBreakpoints2 } from './consts';
import './Test.css';
import { PropsWithChildren, useRef } from 'react';

type BreakGroup = BreakAreaId<typeof containerBreakpoints>;

function CardInfo({ id }: { id: BreakGroup }) {
	const count = useRef(0);
	const ref = useRef<HTMLDivElement>(null);
	const { current, data: breakPtInfo, isBreakAt, isBreakBetween, isBreakDown, isBreakUp } = useBreakAreaInfo(id);
	const isMd = isBreakAt('md-card');
	const isBetween = isBreakBetween('sm-card', 'lg-card');
	const smallerThanMd = isBreakDown('md-card');
	const biggerThanLg = isBreakUp('lg-card');
	const currWidth = ref.current?.clientWidth;
	if (isMd !== null) count.current++;
	return (
		isMd !== null && (
			<div ref={ref}>
				<div>breaks: {JSON.stringify(breakPtInfo.breakSizes)}</div>
				<div>render count:{count.current}</div>
				<div>currWidth: {currWidth}</div>
				<div>currArea: {current}</div>
				{isMd && <div>md</div>}

				{isBetween && <div>from sm to lg</div>}
				{smallerThanMd && <div>smaller than md</div>}
				{biggerThanLg && <div>bigger than lg</div>}
			</div>
		)
	);
}

function Card({ double, id, children }: PropsWithChildren<{ double?: boolean; id: BreakGroup }>) {
	return (
		<BreakPointContainer id={id} className={`card ${double ? 'double' : ''}`}>
			<h1>{children}</h1>

			<CardInfo id={id} />
			<div className='card-content'>Ad sit aliqua pariatur duis minim deserunt id dolore.</div>
		</BreakPointContainer>
	);
}

function Test() {
	return (
		<>
			<BreakAreaProvider breakPoints={containerBreakpoints}>
				<div className='card-holder'>
					<Card id='card1'>card1</Card>
					<Card double id='card2'>
						card1
					</Card>
					<Card id='card3'>card1</Card>
					<Card double id='card4'>
						card1
					</Card>
				</div>
			</BreakAreaProvider>

			<BreakAreaProvider breakPoints={containerBreakpoints2}>
				<div className='card-holder2'>
					<Card id='card1'>card2</Card>
					<Card double id='card2'>
						card2
					</Card>
					<Card id='card3'>card2</Card>
					<Card double id='card4'>
						card2
					</Card>
				</div>
			</BreakAreaProvider>
		</>
	);
}

export default Test;
