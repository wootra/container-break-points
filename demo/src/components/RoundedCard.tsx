import React from 'react';
import style from './RoundedCard.module.css';
import { useCenterLayout } from '../layouts/CenterLayout';
type Props = {
	header: string;
};
const RoundedCard = ({ header }: Props) => {
	const { current, isBreakAt } = useCenterLayout();

	return (
		<div className={style.roundedCard}>
			<h2>{header}</h2>
			<div className={style.content}>
				<div>current: {current}</div>
				<div>isBreakBetween: {isBreakAt('sm')}</div>
			</div>
		</div>
	);
};

export default RoundedCard;
