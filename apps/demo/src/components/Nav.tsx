import styles from './Nav.module.css';
import { routes } from '../routes';

const Nav = () => {
	return (
		<nav className={styles.nav}>
			{routes.map(r => (
				<a href={r.path}>{r.label}</a>
			))}
		</nav>
	);
};

export default Nav;
