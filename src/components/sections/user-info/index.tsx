/**
 * Modules dependencies.
 */

import { Image } from '@/components/core/image';
import type { User } from '@/types/user';
import styles from './user-info.module.css';

/**
 * Props type.
 */

export const UserInfo = ({ user }: { user: User }) => {
	const { nickname, name, email, picture } = user;

	return (
		<div className={styles.container}>
			<div className={styles.image}>{picture && nickname && <Image src={picture} alt={nickname} />}</div>
			<div className={styles.content}>
				<h1>{name}</h1>
				<div className={styles.info}>
					<p>@{nickname}</p>
					&#x2022;
					<p>{email}</p>
				</div>
			</div>
		</div>
	);
};
