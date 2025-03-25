/**
 * Modules dependencies.
 */

import { useUser } from '@/hooks/use-user';
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';

/**
 * Export `Navbar` component.
 */

export const Navbar = () => {
	const { user, isLoading, isAdmin } = useUser();

	return (
		<header className={styles.navbar}>
			<nav className={styles.navigation}>
				<Link href='/'>home</Link>

				{isAdmin && <Link href='/article/new'>Create Article</Link>}

				{!user && !isLoading && <Link href='/api/auth/login'>login</Link>}

				{user && !isLoading && (
					<div className={styles.userInfo}>
						<p>Welcome {user.name || 'User'}</p>
						{user.picture && user.name && <img src={user.picture} alt={user.name} />}
					</div>
				)}

				{user && !isLoading && <Link href='/api/auth/logout'>logout</Link>}
			</nav>
		</header>
	);
};
