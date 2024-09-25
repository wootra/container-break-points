import { breakPt1, breakPt2 } from './config';
import type { GroupTypes1, GroupTypes2 } from './config';

import './Test.css';
import { PropsWithChildren, useRef } from 'react';

const CardContent = (
	props: ReturnType<typeof breakPt1.useBreakAreaInfo> | ReturnType<typeof breakPt2.useBreakAreaInfo>
) => {
	const count = useRef(0);
	const { current, data: breakPtInfo, isBreakAt, isBreakBetween, isBreakDown, isBreakUp } = props;
	const ref = useRef<HTMLDivElement>(null);
	const isMd = isBreakAt('md-card');
	const isBetween = isBreakBetween('sm-card', 'lg-card');
	const smallerThanMd = isBreakDown('md-card');
	const biggerThanLg = isBreakUp('lg-card');
	const currWidth = ref.current?.clientWidth;
	if (isMd !== null) count.current++;
	return (
		isMd !== null && (
			<div ref={ref}>
				<div>breaks: {JSON.stringify(breakPtInfo?.breakSizes)}</div>
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
};

function CardInfo1({ id }: { id: GroupTypes1 }) {
	const props = breakPt1.useBreakAreaInfo(id);
	return <CardContent {...props} />;
}

function CardInfo2({ id }: { id: GroupTypes2 }) {
	const props = breakPt2.useBreakAreaInfo(id);
	return <CardContent {...props} />;
}

function Card1({ double, id, children }: PropsWithChildren<{ double?: boolean; id: GroupTypes1 }>) {
	return (
		<breakPt1.BreakPointContainer id={id} className={`card ${double ? 'double' : ''}`}>
			<h1>{children}</h1>

			<CardInfo1 id={id} />
			<div className='card-content'>Ad sit aliqua pariatur duis minim deserunt id dolore.</div>
		</breakPt1.BreakPointContainer>
	);
}

function Card2({ double, id, children }: PropsWithChildren<{ double?: boolean; id: GroupTypes2 }>) {
	return (
		<breakPt2.BreakPointContainer id={id} className={`card ${double ? 'double' : ''}`}>
			<h1>{children}</h1>

			<CardInfo2 id={id} />
			<div className='card-content'>Ad sit aliqua pariatur duis minim deserunt id dolore.</div>
		</breakPt2.BreakPointContainer>
	);
}

function Test() {
	return (
		<>
			<breakPt1.BreakAreaProvider>
				<div className='card-holder'>
					<Card1 id='card1'>card1</Card1>
					<Card1 double id='card2'>
						card1
					</Card1>
					<Card1 id='card3'>card1</Card1>
					<Card1 double id='card4'>
						card1
					</Card1>
				</div>
			</breakPt1.BreakAreaProvider>

			<breakPt2.BreakAreaProvider>
				<div className='card-holder2'>
					<Card2 id='card1'>card2</Card2>
					<Card2 double id='card2'>
						card2
					</Card2>
					<Card2 id='card3'>card2</Card2>
					<Card2 double id='card4'>
						card2
					</Card2>
				</div>
			</breakPt2.BreakAreaProvider>
		</>
	);
}

export default Test;
