/**
 * Modules dependecies.
 */

import { formatDate } from '@/utils/date';
import { Link } from '../link';
import styles from './header.module.css';

/**
 * Props type.
 */

type Props = {
	authorNickname: string;
	category: string;
	createdAt: string;
	isCard?: boolean;
	isFeatured?: boolean;
	title: string;
};

/**
 * Export `Header` component.
 */

export const Header = ({ title, createdAt, authorNickname, category, isCard = false, isFeatured = true }: Props) => (
	<div className={styles.header}>
		{isFeatured && !isCard ? <h1>{title}</h1> : <h3>{title}</h3>}

		<div className={styles.meta}>
			<time dateTime={createdAt}>{formatDate(createdAt)}</time>
			&#x2022;
			<Link ariaLabel='View author profile' href={`/${authorNickname}`} label={`@${authorNickname}`} />
		</div>

		<span className={styles.category}>{category}</span>
	</div>
);
