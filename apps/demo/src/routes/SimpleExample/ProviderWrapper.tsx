import { BreakAreaProvider, BreakPointContainer, useBreakAreaInfo } from 'container-breakpoints-react';
import { BreakPointsOptions, containerBreakpoints } from './consts';
import styles from './ProviderWrapper.module.css';

function WhenXsEnabled() {
	return <div className={styles.xsEnabled}>xs</div>;
}

function WhenSmEnabled() {
	return <div className={styles.smEnabled}>sm</div>;
}

function WhenMdEnabled() {
	return <div className={styles.mdEnabled}>md</div>;
}

function WhenLgEnabled() {
	return <div className={styles.lgEnabled}>lg</div>;
}

function WhenXlEnabled() {
	return <div className={styles.xlEnabled}>xl</div>;
}

function MatchingSize() {
	const { current, data: breakPtInfo, isBreakAt } = useBreakAreaInfo<BreakPointsOptions>('container1');

	return (
		<div className={styles.situationHolder}>
			<h1 className={styles.situationTitle}>Matching Size</h1>
			<div>current area: {current}</div>
			<div className={styles.infoBox}>break points: {breakPtInfo.breakSizes.join(',')}</div>
			<div className={styles.cardGroup}>
				{isBreakAt('xs') && <WhenXsEnabled />}
				{isBreakAt('sm') && <WhenSmEnabled />}
				{isBreakAt('md') && <WhenMdEnabled />}
				{isBreakAt('lg') && <WhenLgEnabled />}
				{isBreakAt('xl') && <WhenXlEnabled />}
			</div>
		</div>
	);
}

function RangeAreas() {
	const { current, data: breakPtInfo, isBreakBetween } = useBreakAreaInfo<BreakPointsOptions>('container1');

	return (
		<div className={styles.situationHolder}>
			<h1 className={styles.situationTitle}>Range Areas</h1>
			<div>current area: {current}</div>
			<div className={styles.infoBox}>break points: {breakPtInfo.breakSizes.join(',')}</div>
			<div className={styles.cardGroup}>
				{isBreakBetween('xs', 'md') && (
					<>
						<div className={styles.infoBox}>xs-md</div>
						<WhenXsEnabled />
						<WhenSmEnabled />
						<WhenMdEnabled />
					</>
				)}
			</div>
			<div className={styles.cardGroup}>
				{isBreakBetween('sm', 'lg') && (
					<>
						<div className={styles.infoBox}>sm-lg</div>
						<WhenSmEnabled />
						<WhenMdEnabled />
						<WhenLgEnabled />
					</>
				)}
			</div>
			<div className={styles.cardGroup}>
				{isBreakBetween('md', 'xl') && (
					<>
						<div className={styles.infoBox}>md-xl</div>
						<WhenMdEnabled />
						<WhenLgEnabled />
						<WhenXlEnabled />
					</>
				)}
			</div>
		</div>
	);
}

function SmallerOrBigger() {
	const { current, data: breakPtInfo, isBreakDown, isBreakUp } = useBreakAreaInfo<BreakPointsOptions>('container1');

	return (
		<div className={styles.situationHolder}>
			<h1 className={styles.situationTitle}>Range Areas</h1>
			<div>current area: {current}</div>
			<div className={styles.infoBox}>break points: {breakPtInfo.breakSizes.join(',')}</div>
			<div className={styles.cardGroup}>
				{isBreakDown('md') && (
					<>
						<div className={styles.infoBox}>smaller than md</div>
						<WhenXsEnabled />
						<WhenSmEnabled />
						<WhenMdEnabled />
					</>
				)}
			</div>
			<div className={styles.cardGroup}>
				{isBreakUp('md') && (
					<>
						<div className={styles.infoBox}>bigger than md</div>
						<WhenMdEnabled />
						<WhenLgEnabled />
						<WhenXlEnabled />
					</>
				)}
			</div>
		</div>
	);
}

function InfoBox() {
	const { current, data: breakPtInfo } = useBreakAreaInfo<BreakPointsOptions>('container1');

	return (
		<div className={styles.situationHolder}>
			<h1 className={styles.situationTitle}>Range Areas</h1>
			<div>current area: {current}</div>
			<div className={styles.infoBox}>break points: {breakPtInfo.breakSizes.join(',')}</div>
		</div>
	);
}

function ProviderWrapper() {
	return (
		<>
			<BreakAreaProvider breakPoints={containerBreakpoints}>
				<div className={styles.providerWrapper}>
					<div className={styles.leftArea}>
						<InfoBox />
					</div>
					<BreakPointContainer id='container1' className={styles.resizeArea}>
						<MatchingSize />
						<RangeAreas />
						<SmallerOrBigger />
					</BreakPointContainer>
				</div>
			</BreakAreaProvider>
		</>
	);
}

export default ProviderWrapper;
