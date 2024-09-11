import styles from './Nav.module.css';

const Nav = () => {
	return (
		<nav className={styles.nav}>
			<a href='/simple'>Simple</a>
			<a href='/cards'>Cards</a>
		</nav>
	);
};

export default Nav;
