'use client';
import React, { useEffect, useRef, useState } from 'react';
import { BreakAreaProvider, BreakPointContainer, useBreakAreaInfo, useBreakAreasDown, useBreakAreasUp } from './config';
import styles from '../../styles/NavMovement.module.css';
import { PropsWithChildren } from 'react';

function NavMovementWithInit() {
	return (
		<div className={styles.outterContainer}>
			<BreakAreaProvider initWidth={1024}>
				<BreakPointContainer id='nav' className={styles.container}>
					<TopNav />
					<div className={styles.horizontal}>
						<ContentArea />
					</div>
				</BreakPointContainer>
			</BreakAreaProvider>
		</div>
	);
}

const menus = ['Menu1', 'menu2', 'Menu3'];
const TopNav = () => {
	const isSmall = useBreakAreasDown('nav', 'sm');
	return (
		isSmall && (
			<div className={styles.topNav}>
				{menus.map(menu => (
					<div key={menu}>{menu}</div>
				))}
			</div>
		)
	);
};

const LeftNav = () => {
	const isBig = useBreakAreasUp('nav', 'lg');
	return (
		isBig && (
			<div className={styles.leftNav}>
				{menus.map(menu => (
					<div key={menu}>{menu}</div>
				))}
			</div>
		)
	);
};

const ContentArea = () => {
	const isBig = useBreakAreasUp('nav', 'lg');
	return (
		<div className={`${styles.contentArea}`}>
			<LeftNav />
			<BreakPointContainer id='carrousel' className={`${styles.wrapper} ${isBig ? styles.largeLayout : ''}`}>
				<Carousel />
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
					<p>More content</p>
				</div>
			</BreakPointContainer>

			<ControlBox />
		</div>
	);
};

const Carousel = () => {
	const { isBreakUp } = useBreakAreaInfo('carrousel');
	return (
		<div className={styles.carousel}>
			<CarouselItem title={'Gone with wind'}>1</CarouselItem>
			{isBreakUp('md') && <CarouselItem title='Dance with Wolves'>2</CarouselItem>}
			{isBreakUp('lg') && <CarouselItem title='Day after Tomorrow'>3</CarouselItem>}
			{isBreakUp('xl') && <CarouselItem title='Beutiful Sunshine'>4</CarouselItem>}
		</div>
	);
};

const CarouselItem = ({ children, title }: PropsWithChildren<{ title: string }>) => {
	return (
		<div className={styles.carouselItem}>
			<h2 className={styles.carouselHeader}>{title}</h2>
			<p className={styles.carouselContent} style={{ textAlign: 'center', fontSize: '5rem' }}>
				{children}
			</p>
		</div>
	);
};

const ControlBox = () => {
	const { current: carrouselCurrent } = useBreakAreaInfo('carrousel');
	const { current: navCurrent } = useBreakAreaInfo('nav');
	return (
		<div className={styles.controlBox}>
			<div>carrousel: {carrouselCurrent}</div>
			<div>nav: {navCurrent}</div>
		</div>
	);
};

export default NavMovementWithInit;
