import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import styles from './Root.module.css';

export default function Root() {
	return (
		<div className={styles.root}>
			<Nav />
			<Outlet />
		</div>
	);
}
