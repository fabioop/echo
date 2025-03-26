/**
 * Modules dependencies.
 */

import { Image } from '@/components/core/image';
import { Link } from '@/components/core/link';
import type { Article } from '@/types/article';
import { formatDate } from '@/utils/date';
import styles from '../cards.module.css';

/**
 * Props type.
 */

type Props = {
	article: Article;
	isFirst: boolean;
};

/**
 * Export `FeaturedCard` component.
 */

export const FeaturedCard = ({ article, isFirst }: Props) => {
	const { title, smallDescription, authorNickname, slug, imageUrl, category } = article;

	return (
		<div className={`${styles.card} ${styles.featuredCard}`}>
			<div className={styles.image}>
				<Image src={imageUrl} alt={title} />
			</div>

			<div className={styles.content}>
				<div className={styles.header}>
					{isFirst ? <h1>{title}</h1> : <h2>{title}</h2>}

					<div className={styles.meta}>
						<time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
						&#x2022;
						<Link ariaLabel='View author profile' href={`/${authorNickname}`} label={`@${authorNickname}`} />
					</div>

					<span className={styles.category}>{category}</span>
				</div>

				<p>{smallDescription}</p>

				<div className={styles.actions}>
					<Link ariaLabel='Read more' href={`/${authorNickname}/${slug}`} isButton label='Read more' />
				</div>
			</div>
		</div>
	);
};
