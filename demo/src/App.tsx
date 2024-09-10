import { BreakAreaProvider, BreakPointContainer, useBreakAreaAt } from 'container-breakpoints';
import { containerBreakpoints } from './consts';
import './App.css';

function CardInfo({ id }: { id: string }) {
	const isSmall = useBreakAreaAt(id, 'small-card');
	return isSmall ? <div>sm</div> : <div>md</div>;
}

function Card({ double, id }: { double?: boolean; id: string }) {
	return (
		<BreakPointContainer id={id} className={`card ${double ? 'double' : ''}`}>
			<h1>Card</h1>
			<CardInfo id={id} />
			<div className='card-content'>Ad sit aliqua pariatur duis minim deserunt id dolore.</div>
		</BreakPointContainer>
	);
}

function App() {
	return (
		<BreakAreaProvider breakPoints={containerBreakpoints}>
			<div className='card-holder'>
				<Card id='card1' />
				<Card double id='card2' />
				<Card id='card3' />
				<Card double id='card4' />
			</div>
		</BreakAreaProvider>
	);
}

export default App;
