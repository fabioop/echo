/**
 * Modules dependencies.
 */

import { Image } from '@/components/core/image';
import { Link } from '@/components/core/link';
import { useUser } from '@/hooks/use-user';
import styles from './navbar.module.css';

/**
 * Export `Navbar` component.
 */

export const Navbar = () => {
  const { user, isLoading, isAdmin } = useUser();

  return (
    <header className={styles.navbar}>
      <nav className={styles.navigation}>
        <Link ariaLabel='Home' href='/'>
          <span className={styles.logo}>Echo News</span>
        </Link>

        <div className={styles.actions}>
          {isAdmin && <Link ariaLabel='New Article' href='/article/new' label='New Article' isButton />}

          {!user && !isLoading && <Link ariaLabel='Login' href='/api/auth/login' label='Login' />}

          {user && !isLoading && (
            <div className={styles.userInfo}>
              <Link
                ariaLabel='My profile'
                className={styles.userInfo}
                href={`/${user.nickname}`}
                label={user.name || 'User'}
              />

              {user.picture && (
                <div className={styles.userPicture}>
                  <Image src={user.picture} alt={user.name || 'User name'} />
                </div>
              )}
            </div>
          )}

          {user && !isLoading && <Link ariaLabel='Logout' href='/api/auth/logout' label='Logout' />}
        </div>
      </nav>
    </header>
  );
};
