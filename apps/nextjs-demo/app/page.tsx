import React from 'react';
import styles from '../styles/Home.module.css';
import NavMovement from '../components/NavMovement';

export default function Home() {
	return (
		<div className={styles.root}>
			<h1>Nextjs Demo</h1>
			<div className={styles.content}>
				<NavMovement />
			</div>
		</div>
	);
}
