import {
	BreakAreaProvider,
	BreakPointContainer,
	useBreakAreasDown,
	useBreakAreaAt,
	useBreakAreasUp,
	useBreakAreaBetween,
	useBreakAreaInfo,
} from 'container-breakpoints';
import { containerBreakpoints, containerBreakpoints2 } from './consts';
import './App.css';
import { PropsWithChildren, useRef } from 'react';

function CardInfo({ id }: { id: string }) {
	const count = useRef(0);
	const ref = useRef<HTMLDivElement>(null);
	const isMd = useBreakAreaAt(id, 'md-card');
	const breakPtInfo = useBreakAreaInfo(id);
	const isBetween = useBreakAreaBetween(id, 'sm-card', 'lg-card');
	const smallerThanMd = useBreakAreasDown(id, 'md-card');
	const biggerThanLg = useBreakAreasUp(id, 'lg-card');
	const currWidth = ref.current?.clientWidth;
	if (isMd !== null) count.current++;
	return (
		isMd !== null && (
			<div ref={ref}>
				<div>breaks: {JSON.stringify(breakPtInfo.breakSizes)}</div>
				<div>render count:{count.current}</div>
				<div>currWidth: {currWidth}</div>
				{isMd && <div>md</div>}
				{isBetween && <div>from sm to lg</div>}
				{smallerThanMd && <div>smaller than md</div>}
				{biggerThanLg && <div>bigger than lg</div>}
			</div>
		)
	);
}

function Card({ double, id, children }: PropsWithChildren<{ double?: boolean; id: string }>) {
	return (
		<BreakPointContainer id={id} className={`card ${double ? 'double' : ''}`}>
			<h1>{children}</h1>

			<CardInfo id={id} />
			<div className='card-content'>Ad sit aliqua pariatur duis minim deserunt id dolore.</div>
		</BreakPointContainer>
	);
}

function App() {
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

export default App;
